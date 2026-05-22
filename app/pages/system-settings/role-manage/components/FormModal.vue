<script setup lang="ts">
import { pick } from 'es-toolkit'

const props = defineProps<{
  data: Role | null
  loading: boolean
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: InsertRole): void
}>()

const { i18nRole } = useMessage()
const { roleFormSchema } = useSchema()

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<RoleFormSchema>({
  name: '',
  code: '',
  description: null,
  enabled: true,
  sort: 0,
})
const FORM_FIELDS = Object.keys(INITIAL_STATE) as (keyof RoleFormSchema)[]

const initialState = computed<RoleFormSchema>(() => ({
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
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nRole(data?.id ? 'edit' : 'add')"
    :schema="roleFormSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
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
