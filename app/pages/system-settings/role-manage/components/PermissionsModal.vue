<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'
import type { TreeItemSelectEvent } from 'reka-ui'
import { map } from 'es-toolkit/compat'
import { PERMISSIONS } from '@/enums'

const props = defineProps<{
  menuTree: MenuTree[]
  refresh: VoidFunction
}>()

const saveLoading = ref(false)

const { t } = useI18n()

const { i18nPermissions, i18nCommon } = useMessage()
const { insertRolePermissions, getRolePermissions } = useSystemApi()
const { successToast } = useAppToast()
const { getPermissionValues } = usePermissions()

const roleId = defineModel<string | null>('roleId', { required: true })

/**
 * Tree 选中值
 * 格式：
 * [
 *   "menu1",
 *   "menu1:SEARCH",
 *   "menu1:ADD"
 * ]
 */
const value = ref<any[]>([])

// 获取角色权限
const { data: roleMenus, pending, refresh } = await useAsyncData(
  'role-menu-permissions',
  async () => {
    const res = await getRolePermissions(roleId.value!)
    return res.data ?? []
  },
  {
    immediate: false,
    default: () => [],
  },
)

/**
 * 是否打开 modal
 */
const open = computed({
  get: () => !!roleId.value,
  set: (val) => {
    if (!val)
      roleId.value = null
  },
})

function getPermissionKeys(menus: RoleMenu[]): { id: string }[] {
  return menus.flatMap((menu) => {
    // 没有按钮权限，只选菜单本身
    if (menu.permissions === 0) {
      return [{ id: menu.menuId }]
    }

    // 有按钮权限，拆 bitmask
    return PERMISSIONS.items
      .filter(({ raw }) => (menu.permissions & raw.bits) === raw.bits)
      .map(p => ({ id: `${menu.menuId}:${p.value}` }))
  })
}

/**
 * 菜单树 -> Tree UI
 * 只有叶子节点才注入 permissions
 */
function transformMenuTree(nodes: MenuTree[]): TreeItem[] {
  return nodes.map((node) => {
    const children = node.children
      ? transformMenuTree(node.children)
      : []

    const permissionNodes = !node.children || node.children.length === 0
      ? PERMISSIONS.items
          .filter(p => (node.permissions & p.raw.bits))
          .map(p => ({
            id: `${node.id}:${p.value}`,
            label: i18nPermissions(p.label),
            icon: p.raw.icon,
          }))
      : []

    return {
      id: node.id,
      label: t(node.label),
      icon: node.icon,
      children: [
        ...children,
        ...permissionNodes,
      ],
    }
  })
}

/**
 * Tree 数据
 */
const permissionsTree = computed<TreeItem[]>(() =>
  transformMenuTree(props.menuTree),
)
console.log('permissionsTree', permissionsTree.value)

/**
 * Tree 展开阻止 click（官方示例逻辑）
 */
function onSelect(e: TreeItemSelectEvent<TreeItem>) {
  if (e.detail.originalEvent.type === 'click') {
    e.preventDefault()
  }
}

/**
 * 核心：Tree 选中值 -> permissions bitmask
 */
function buildRolePermissions(checkedKeys: string[]) {
  const map = new Map<string, number>()

  // 先记录所有菜单（哪怕没有权限）
  const menuSet = new Set<string>()

  for (const key of checkedKeys) {
    const parts = key.split(':')

    // 👉 菜单节点
    if (parts.length === 1 && parts[0]) {
      menuSet.add(parts[0])
      continue
    }

    // 👉 权限节点
    const [menuId, permissionValue] = parts

    const permissionItem = PERMISSIONS.items.find(
      p => p.value === permissionValue,
    )

    if (!permissionItem || !menuId)
      continue

    const current = map.get(menuId) ?? 0
    map.set(menuId, current | permissionItem.raw.bits)
  }

  // 👉 补齐没有权限的菜单
  for (const menuId of menuSet) {
    if (!map.has(menuId)) {
      map.set(menuId, 0)
    }
  }

  return Array.from(map.entries()).map(([menuId, permissions]) => ({
    menuId,
    permissions,
  }))
}

/**
 * 获取全部权限 key
 */
function getAllPermissionKeys(menus: MenuTree[]): { id: string }[] {
  return menus.flatMap((menu) => {
    const currentKeys
      = !menu.permissions || menu.permissions === 0
        ? [{ id: menu.id }] // 没有权限配置，只选菜单本身
        : getPermissionValues(menu.permissions).map(
            value => ({ id: `${menu.id}:${value}` }),
          )

    const childrenKeys = menu.children?.length
      ? getAllPermissionKeys(menu.children)
      : []

    return [...currentKeys, ...childrenKeys]
  })
}
const allPermissionKeys = computed(() => getAllPermissionKeys(props.menuTree))

/**
 * 是否全选
 */
const isAllSelected = computed(() => {
  if (!value.value.length) {
    return false
  }
  if (value.value.length === allPermissionKeys.value.length) {
    return true
  }
  return 'indeterminate'
})

/**
 * 全选
 */
function handleCheckAll(checked: boolean | 'indeterminate') {
  if (checked) {
    value.value = allPermissionKeys.value
  }
  else {
    value.value = []
  }
}

/**
 * 提交
 */
async function onSubmit() {
  saveLoading.value = true
  const payload = buildRolePermissions(map(value.value, 'id'))
  await insertRolePermissions({
    roleId: roleId.value || '',
    permissions: payload,
  }).then(({ code }) => {
    if (isSuccess(code)) {
      successToast(i18nCommon('saveSuccess'))
      roleId.value = null
      props.refresh()
    }
  }).finally(() => {
    saveLoading.value = false
  })
}

watch(open, (v) => {
  if (v && roleId.value) {
    refresh()
  }
  if (!v) {
    value.value = []
  }
})

watch(
  roleMenus,
  (menus) => {
    value.value = getPermissionKeys(menus)
    console.log('value', value.value)
  },
  { immediate: true },
)
</script>

<template>
  <UModal
    v-model:open="open"
    :title="i18nPermissions(PERMISSIONS.label(PERMISSIONS.ROLE_AUTH))"
    :ui="{ body: 'relative', footer: 'justify-end' }"
  >
    <template #description>
      <UCheckbox :model-value="isAllSelected" label="全选" @update:model-value="handleCheckAll" />
    </template>
    <template #body>
      <UTree
        v-model="value"
        :items="permissionsTree"
        multiple
        propagate-select
        bubble-select
        :get-key="i => i.id"
        @select="onSelect"
      >
        <template #item-leading="{ item, selected, indeterminate, handleSelect }">
          <div class="flex items-center gap-2">
            <UCheckbox
              :model-value="indeterminate ? 'indeterminate' : selected"
              tabindex="-1"
              @change="handleSelect"
              @click.stop
            />
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4"
            />
          </div>
        </template>
      </UTree>
      <ContainerLoading v-if="pending" />
    </template>

    <template #footer="{ close }">
      <AutoFormModalFooter
        :loading="saveLoading"
        @submit="onSubmit"
        @close="close"
      />
    </template>
  </UModal>
</template>
