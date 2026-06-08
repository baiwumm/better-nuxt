<script setup lang="ts">
import type z from 'zod'
import { pick } from 'es-toolkit'
import { USER_ROLE } from '@/enums'

const props = defineProps<{
  data: User | null
  loading: boolean
  formKey: number
}>()

const emit = defineEmits<{
  (e: 'submit', v: SubmitForm): void
}>()

const { i18nUsers, i18nCommon } = useMessage()
const { userFormSchema } = useSchema()
const editFormSchema = userFormSchema.omit({ password: true })
const formSchema = computed(() => props.data ? editFormSchema : userFormSchema)

type UserEditFormSchema = z.infer<typeof editFormSchema>

export type SubmitForm = UserFormSchema | UserEditFormSchema

const modelValue = defineModel<boolean>({ required: true })

// 初始表单状态
const INITIAL_STATE = Object.freeze<UserFormSchema>({
  name: '',
  email: '',
  password: '',
  displayUsername: null,
  role: undefined,
})

const initialState = computed<UserFormSchema>(() => ({
  ...INITIAL_STATE,
  ...(props.data
    ? {
        ...pick(props.data, ['name', 'email', 'displayUsername']),
        role: props.data?.role ? props.data.role.split(',') : undefined,
      } as UserFormSchema
    : {}),
}))

/** 提交 */
function onSubmit(data: SubmitForm) {
  emit('submit', data)
}

const userItems = computed(() => USER_ROLE.items.map(({ value, label }) => ({ label: i18nUsers(label), value })))

const autoFormKey = computed(() => props.data?.id ? `edit-${props.data.id}` : props.formKey)
</script>

<template>
  <AutoFormModal
    :key="autoFormKey"
    v-model:open="modelValue"
    :title="i18nUsers(data?.id ? 'edit' : 'add')"
    :schema="formSchema"
    :initial-state="initialState"
    @submit="onSubmit"
  >
    <template #role="{ state: stateValue }">
      <USelect
        v-model="stateValue.role"
        :placeholder="i18nCommon('select')"
        value-key="value"
        multiple
        :items="userItems"
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
