<script setup lang="ts">
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'

definePageMeta({
  layout: 'auth',
})

const { signInFormSchema } = useSchema()
const { i18nAuth } = useMessage()
const { mutate, isPending } = useSignInEmail()

/**
 * @description: 登录提交
 */
async function onSubmit(data: SignInFormSchema) {
  mutate({ ...data, callbackURL: '/' })
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
            loading: isPending,
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
