<script setup lang="ts">
import LoginProvides from '../components/LoginProvides.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'reset-password',
})

const { forgotPasswordFormSchema } = useSchema()
const { i18nAuth } = useMessage()
const route = useRoute()

const { mutate: resetPassword, isPending } = useResetPassword({
  onSuccess: () => {
    navigateTo('/auth/sign-in')
  },
})

const token = computed(() => route.query.token as string)

/**
 * @description: 表单提交
 */
async function onSubmit(data: ForgotPasswordFormSchema) {
  resetPassword({ ...data, token: token.value })
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
            loading: isPending,
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
