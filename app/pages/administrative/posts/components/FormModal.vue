<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: Post | null
  departmentTree: DepartmentTree[]
  loading: boolean
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertPost): void
}>()

const { i18nPosts, i18nCommon } = useMessage()
const { postFormSchema } = useSchema()
const { getUserDisplayName } = useCurrentUser()
const menuStore = useMenuStore()

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<PostFormSchema>({
  departmentId: null,
  name: '',
  code: '',
  description: null,
  enabled: true,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof PostFormSchema)[]

const initialState = computed<PostFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
}))

/** 提交 */
function onSubmit(data: RoleFormSchema) {
  emit('submit', data)
}

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.formKey)

/**
   * @description: 扁平树，用于 Select 下拉树
   */
function flattenTree(tree: DepartmentTree[], level = 0, result: SelectMenuItem[] = []) {
  tree.forEach((node) => {
    const prefix = '　'.repeat(level) + (level > 0 ? '└ ' : '')
    const label = `${node.name}(${node.code})`
    result.push({
      id: node.id,
      label: prefix + label,
      avatar: node.leader
        ? {
            src: node.leader.image ?? undefined,
            alt: getUserDisplayName(node.leader),
            loading: 'lazy' as const,
          }
        : undefined,
    })

    if (node.children && node.children.length) {
      flattenTree(node.children, level + 1, result)
    }
  })
  return result
}

const departmentItems = computed(() => flattenTree(props.departmentTree))

const menu = computed(() => menuStore.menuPathMap.get('/administrative/departments'))
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nPosts(data?.id ? 'edit' : 'add')"
    :schema="postFormSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
    <template #departmentId="{ field, state: stateValue }">
      <USelectMenu
        v-model="stateValue[field]"
        value-key="id"
        :items="departmentItems"
        :placeholder="i18nCommon('select')"
        :icon="menu?.icon"
        clear
        class="w-full"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
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
