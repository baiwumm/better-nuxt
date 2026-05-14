<script setup lang="ts">
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'

definePageMeta({
  layout: 'auth',
})

const { $authClient } = useNuxtApp()
const { signInFormSchema } = useSchema()
const { i18nAuth } = useMessage()

const toast = useToast()

const loading = ref(false)

/**
 * @description: 登录提交
 */
async function onSubmit(data: SignInFormSchema) {
  loading.value = true
  const { error } = await $authClient.signIn.email({ ...data, callbackURL: '/' }).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: i18nAuth('signIn.error'),
      description: error.message || '',
      color: 'error',
    })
  }
}
</script>

<template>
  <UPageCard
    :title="i18nAuth('signIn.title')"
    :description="i18nAuth('signIn.description')"
    class="w-full sm:w-md"
    :ui="{
      title: 'text-xl',
      description: 'text-sm',
    }"
  >
    <AutoForm
      :schema="signInFormSchema"
      :config="{
        submit: {
          props: {
            label: i18nAuth('signIn.submit'),
            icon: 'ri:check-fill',
            loading,
            class: 'w-full justify-center',
          },
        },
      }"
      @submit="onSubmit"
    >
      <template #password-hint>
        <ULink as="button" to="/auth/forgot-password">
          {{ i18nAuth('password.forgot') }}
        </ULink>
      </template>
    </AutoForm>
    <MagicLinkButton />
    <USeparator label="or" />
    <LoginProvides />
    <FooterLink :left-text="i18nAuth('signIn.footer')" :right-text="i18nAuth('signIn.footerLink')" to="/auth/sign-up" />
  </UPageCard>
</template>
