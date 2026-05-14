<script setup lang="ts">
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'

definePageMeta({
  layout: 'auth',
})

const { $authClient } = useNuxtApp()
const { emailFormSchema } = useSchema()
const { i18nAuth } = useMessage()

const toast = useToast()

const loading = ref(false)

/**
 * @description: 表单提交
 */
async function onSubmit(data: EmailFormSchema) {
  loading.value = true
  const { error } = await $authClient.requestPasswordReset({ ...data, redirectTo: '/auth/reset-password' }).finally(() => {
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
      title: i18nAuth('forgotPassword.success'),
      color: 'success',
    })
  }
}
</script>

<template>
  <UPageCard
    :title="i18nAuth('forgotPassword.title')"
    :description="i18nAuth('forgotPassword.description')"
    class="w-full sm:w-md"
    :ui="{
      title: 'text-xl',
      description: 'text-sm',
    }"
  >
    <AutoForm
      :schema="emailFormSchema"
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
    <MagicLinkButton />
    <USeparator label="or" />
    <LoginProvides />
    <NuxtLink to="/auth/sign-in">
      <UButton
        type="submit"
        color="neutral"
        variant="soft"
        class="w-full justify-center"
      >
        {{ i18nAuth('forgotPassword.footer') }}
      </UButton>
    </NuxtLink>
  </UPageCard>
</template>
