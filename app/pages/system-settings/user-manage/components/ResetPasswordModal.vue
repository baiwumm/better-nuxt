<script setup lang="ts">
const props = defineProps<{
  formKey: number
  refresh: VoidFunction
}>()

const { i18nPermissions } = useMessage()
const { forgotPasswordFormSchema } = useSchema()

const userId = defineModel<string | null>('userId', { required: true })

const { mutate: setUserPassword, isPending } = useSetUserPassword({
  onSuccess: () => {
    userId.value = null
    props.refresh()
  },
})

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
    }
  },
})

async function onSubmit(data: ForgotPasswordFormSchema) {
  setUserPassword({
    newPassword: data.newPassword,
    userId: userId.value,
  })
}
</script>

<template>
  <AutoFormModal
    :key="formKey"
    v-model:open="open"
    :title="i18nPermissions('resetPassword')"
    :schema="forgotPasswordFormSchema"
    @submit="onSubmit"
  >
    <template #footer="{ disabled, submit, close }">
      <AutoFormModalFooter
        :disabled="disabled"
        :loading="isPending"
        @submit="submit"
        @close="close"
      />
    </template>
  </AutoFormModal>
</template>
