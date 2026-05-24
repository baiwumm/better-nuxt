<script setup lang="ts">
import { pick } from 'es-toolkit'
import { MENU_TARGET, PERMISSIONS } from '@/enums'

const props = defineProps<{
  data: Menu | null
  menuTree: MenuTree[]
  loading: boolean
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertMenu): void
}>()

const { i18nMenu, i18nCommon, i18nPermissions } = useMessage()
const { menuFormSchema } = useSchema()
const { flattenTree } = useTreeTool()
const { getPermissionValues, getPermissionBits } = usePermissions()

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<MenuFormSchema>({
  parentId: null,
  label: '',
  permissions: [],
  icon: '',
  to: null,
  badge: null,
  keepAlive: false,
  enabled: true,
  defaultOpen: false,
  target: MENU_TARGET.SELF,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof MenuFormSchema)[]

const initialState = computed<MenuFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? {
        ...pick(props.data, FORM_FIELDS),
        permissions: getPermissionValues(props.data?.permissions),
      }
    : {}),
}))

/** 提交 */
function onSubmit(data: MenuFormSchema) {
  emit('submit', {
    ...data,
    permissions: getPermissionBits(data.permissions || []),
  })
}

// 递归查找树形结构中的节点
const menuMap = computed(() => {
  const map = new Map<string, MenuTree>()

  function traverse(tree: MenuTree[]) {
    tree.forEach((node) => {
      map.set(node.id, node)
      if (node.children)
        traverse(node.children)
    })
  }

  traverse(props.menuTree)
  return map
})

const parentIcon = computed(() => {
  const parentId = initialState.value?.parentId
  return parentId ? menuMap.value.get(parentId)?.icon : undefined
})
const selectMenuItems = computed(() => flattenTree(props.menuTree, 'label', true))

const targetItems = computed(() => MENU_TARGET.items.map(({ value, label }) => ({ label: i18nMenu(label), value })))

const permissionItems = computed(() => PERMISSIONS.items.map(({ value, label, raw }) => ({ label: i18nPermissions(label), value, icon: raw.icon })))

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.formKey)
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nMenu(data?.id ? 'edit' : 'add')"
    :schema="menuFormSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
    <template #parentId="{ field, state: stateValue }">
      <USelectMenu
        v-model="stateValue[field]"
        value-key="id"
        :items="selectMenuItems"
        :placeholder="i18nCommon('select')"
        :icon="parentIcon"
        clear
        class="w-full"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
      />
    </template>
    <template #permissions="{ state: stateValue }">
      <USelectMenu
        v-model="stateValue.permissions"
        :placeholder="i18nCommon('select')"
        value-key="value"
        multiple
        :items="permissionItems"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        class="w-full"
      />
    </template>
    <template #target="{ state: stateValue }">
      <USelect
        v-model="stateValue.target"
        :placeholder="i18nCommon('select')"
        value-key="value"
        :items="targetItems"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        class="w-full"
      />
    </template>
    <template #footer="{ disabled, submit, close }">
      <AutoFormModalFooter
        :disabled="disabled"
        :loading="loading"
        @submit="submit"
        @close="close"
      />
    </template>
  </AutoFormModal>
</template>
