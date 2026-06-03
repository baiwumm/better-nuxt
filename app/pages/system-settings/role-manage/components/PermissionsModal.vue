<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'
import type { TreeItemSelectEvent } from 'reka-ui'
import { map } from 'es-toolkit/compat'
import { PERMISSIONS } from '@/enums'

interface CheckedKey { id: string }

const props = defineProps<{
  menuTree: MenuTree[]
  refresh: VoidFunction
}>()

const saveLoading = ref(false)

const { i18nPermissions, i18nCommon } = useMessage()
const { insertRolePermissions, getRolePermissions } = useSystemApi()
const { successToast } = useAppToast()
const { getRoleMenuKeys, generatePermissonsTree, buildRolePermissions, getAllPermissionKeys } = usePermissions()

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
const value = ref<CheckedKey[]>([])

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

/**
 * Tree 数据
 */
const permissionsTree = computed<TreeItem[]>(() =>
  generatePermissonsTree(props.menuTree),
)

/**
 * Tree 展开阻止 click（官方示例逻辑）
 */
function onSelect(e: TreeItemSelectEvent<TreeItem>) {
  if (e.detail.originalEvent.type === 'click') {
    e.preventDefault()
  }
}

const allPermissionKeys = computed(() =>
  getAllPermissionKeys(props.menuTree),
)

/**
 * 是否全选
 */
const isAllSelected = computed(() => {
  const selected = value.value.length
  const total = allPermissionKeys.value.length

  if (selected === 0)
    return false
  if (selected === total)
    return true
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

  try {
    const payload = buildRolePermissions(map(value.value, 'id'))

    const { code } = await insertRolePermissions({
      roleId: roleId.value || '',
      permissions: payload,
    })

    if (isSuccess(code)) {
      successToast({ title: i18nCommon('saveSuccess') })
      roleId.value = null
      props.refresh()
    }
  }
  finally {
    saveLoading.value = false
  }
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
  () => roleMenus.value,
  menus => value.value = getRoleMenuKeys(menus),
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
      <UCheckbox :model-value="isAllSelected" :label="i18nCommon('selectAll')" @update:model-value="handleCheckAll" />
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
            <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
          </div>
        </template>
      </UTree>
      <ContainerLoading v-if="pending" />
    </template>
    <template #footer="{ close }">
      <AutoFormModalFooter :loading="saveLoading" @submit="onSubmit" @close="close" />
    </template>
  </UModal>
</template>
