<script setup lang="ts">
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'

definePageMeta({
  layout: 'auth',
})

const { signUpFormSchema } = useSchema()
const { i18nAuth } = useMessage()
const { mutate, isPending } = useSignUpEmail()

/**
 * @description: 注册提交
 */
async function onSubmit(data: SignUpFormSchema) {
  mutate({ ...data, callbackURL: '/' })
}
</script>

<template>
  <UPageCard
    :title="i18nAuth('signUp.title')"
    :description="i18nAuth('signUp.description')"
    class="w-full sm:w-md"
    :ui="{
      title: 'text-xl',
      description: 'text-sm',
    }"
  >
    <AutoForm
      :schema="signUpFormSchema"
      :config="{
        submit: {
          props: {
            label: i18nAuth('signUp.submit'),
            icon: 'ri:check-fill',
            loading: isPending,
            class: 'w-full justify-center',
          },
        },
      }"
      @submit="onSubmit"
    />
    <MagicLinkButton />
    <USeparator label="or" />
    <LoginProvides />
    <FooterLink :left-text="i18nAuth('signUp.footer')" :right-text="i18nAuth('signUp.footerLink')" to="/auth/sign-in" />
  </UPageCard>
</template>
