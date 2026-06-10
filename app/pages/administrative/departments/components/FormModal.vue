<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: Department | null
  departmentTree: DepartmentTree[]
  loading: boolean
  formKey: number
  userList: (SelectMenuItem & User)[]
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertDepartment): void
}>()

const { i18nDepartments, i18nCommon } = useMessage()
const { departmentFormSchema } = useSchema()
const menuStore = useMenuStore()
const route = useRoute()
const leaderMenu = useTemplateRef('leaderMenu')
const { getUserDisplayName } = useCurrentUser()

const modelValue = defineModel<boolean>({ required: true })
const userPage = defineModel<number>('userPage', { required: true })
const users = ref<(SelectMenuItem & User)[]>([])

// 初始表单状态
const INITIAL_STATE = Object.freeze<DepartmentFormSchema>({
  parentId: null,
  name: '',
  code: '',
  leaderId: null,
  description: null,
  enabled: true,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof DepartmentFormSchema)[]

const initialState = computed<DepartmentFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? pick(props.data, FORM_FIELDS)
    : {}),
}))

/** 提交 */
function onSubmit(data: DepartmentFormSchema) {
  emit('submit', data)
}

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.formKey)

const menu = computed(() => menuStore.menuPathMap.get(route.path))

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

const items = computed(() => flattenTree(props.departmentTree))

watch(() => props.userList, () => {
  users.value = [...users.value, ...(props.userList ?? [])]
}, { immediate: true })

useInfiniteScroll(
  () => leaderMenu.value?.viewportRef,
  () => {
    userPage.value++
  },
  {
    canLoadMore: () => {
      return (props.userList?.length ?? 0) >= 10
    },
  },
)

const avatarMaps = computed(() => {
  const map = new Map()
  users.value.forEach((user) => {
    if (user?.id) {
      map.set(user.id, user)
    }
  })
  return map
})
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nDepartments(data?.id ? 'edit' : 'add')"
    :schema="departmentFormSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
    <template #parentId="{ field, state: stateValue }">
      <USelectMenu
        v-model="stateValue[field]"
        value-key="id"
        :items="items"
        :placeholder="i18nCommon('select')"
        :icon="menu?.icon"
        clear
        class="w-full"
        :ui="{
          trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
      />
    </template>
    <template #leaderId="{ state: stateValue }">
      <USelectMenu
        ref="leaderMenu"
        v-model="stateValue.leaderId"
        value-key="id"
        :items="users"
        :placeholder="i18nCommon('select')"
        :avatar="avatarMaps.get(stateValue.leaderId)?.avatar"
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
