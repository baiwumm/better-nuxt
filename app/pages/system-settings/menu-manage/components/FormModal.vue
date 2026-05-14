<script setup lang="ts">
import type z from 'zod'
import { pick } from 'es-toolkit'
import { MENU_TARGET } from '@/enums'

const props = defineProps<{
  data: Menu | null
  menuTree: MenuTree[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertMenu): void
}>()

const { i18nMenu, i18nCommon } = useMessage()
const { menuFormSchema } = useSchema()
const { flattenTree } = useTreeTool()

const modelValue = defineModel<boolean>({ required: true })

type FormSchema = z.infer<typeof menuFormSchema>

// 初始表单状态
const INITIAL_STATE = Object.freeze<FormSchema>({
  parentId: null,
  label: '',
  icon: '',
  to: null,
  badge: null,
  keepAlive: false,
  enabled: true,
  defaultOpen: false,
  target: MENU_TARGET.SELF,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof FormSchema)[]

const initialState = computed<FormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
}))

/** 提交 */
function onSubmit(data: FormSchema) {
  emit('submit', data)
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
</script>

<template>
  <AutoFormModal
    :key="data?.id ?? `create-menu`"
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
