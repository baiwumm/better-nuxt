<script setup lang="ts">
import LoginProvides from '../components/LoginProvides.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'reset-password',
})

const { $authClient } = useNuxtApp()
const { forgotPasswordFormSchema } = useSchema()
const { i18nAuth } = useMessage()
const route = useRoute()

const toast = useToast()
const token = computed(() => route.query.token as string)
const loading = ref(false)

/**
 * @description: 表单提交
 */
async function onSubmit(data: ForgotPasswordFormSchema) {
  loading.value = true
  const { error } = await $authClient.resetPassword({ ...data, token: token.value }).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: error.message,
      color: 'error',
    })
  }
  else {
    toast.add({
      title: i18nAuth('resetPassword.success'),
      color: 'success',
    })
    navigateTo('/auth/sign-in')
  }
}
</script>

<template>
  <UPageCard
    :title="i18nAuth('resetPassword.title')"
    :description="i18nAuth('resetPassword.description')"
    class="w-full sm:w-md"
    :ui="{
      title: 'text-xl',
      description: 'text-sm',
    }"
  >
    <AutoForm
      :schema="forgotPasswordFormSchema"
      :config="{
        submit: {
          props: {
            label: i18nAuth('forgotPassword.submit'),
            icon: 'ri:check-fill',
            loading,
            class: 'w-full justify-center',
          },
        },
      }"
      @submit="onSubmit"
    />
    <USeparator label="or" />
    <LoginProvides />
  </UPageCard>
</template>
