<script setup lang="ts">
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'

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
  const { error } = await $authClient.signIn.magicLink({ ...data, callbackURL: '/' }).finally(() => {
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
      title: i18nAuth('magicLink.verifyEmailSent'),
      description: i18nAuth('magicLink.verifyEmailSentDesc'),
      color: 'success',
    })
  }
}
</script>

<template>
  <UPageCard
    :title="i18nAuth('magicLink.title')"
    :description="i18nAuth('magicLink.description')"
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
            label: i18nAuth('magicLink.submit'),
            icon: 'ri:check-fill',
            loading,
            class: 'w-full justify-center',
          },
        },
      }"
      @submit="onSubmit"
    />
    <NuxtLink to="/auth/sign-in">
      <UButton
        type="submit"
        icon="ri:lock-line"
        color="neutral"
        variant="soft"
        class="w-full justify-center"
      >
        {{ i18nAuth('magicLink.signInWithPassword') }}
      </UButton>
    </NuxtLink>
    <USeparator label="or" />
    <LoginProvides />
    <FooterLink :left-text="i18nAuth('signIn.footer')" :right-text="i18nAuth('signIn.footerLink')" to="/auth/sign-up" />
  </UPageCard>
</template>
