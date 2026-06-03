<script setup lang="ts">
const props = defineProps<{
  formKey: number
  refresh: VoidFunction
}>()

const { $authClient } = useNuxtApp()
const { successToast, errorToast } = useAppToast()

const { i18nPermissions } = useMessage()
const { forgotPasswordFormSchema } = useSchema()
const loading = ref(false)

const userId = defineModel<string | null>('userId', { required: true })

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
    }
  },
})

async function onSubmit(data: ForgotPasswordFormSchema) {
  loading.value = true
  const { error } = await $authClient.admin.setUserPassword({
    newPassword: data.newPassword,
    userId: userId.value,
  }).finally(() => {
    loading.value = false
  })
  if (error) {
    errorToast({ title: error.message })
  }
  else {
    successToast()
    userId.value = null
    props.refresh()
  }
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
        :loading="loading"
        @submit="submit"
        @close="close"
      />
    </template>
  </AutoFormModal>
</template>
