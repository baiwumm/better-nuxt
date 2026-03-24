<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import EmailInput from '../components/EmailInput.vue'
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import MagicLinkButton from '../components/MagicLinkButton.vue'
import PasswordInput from '../components/PasswordInput.vue'
import SubmitButton from '../components/SubmitButton.vue'

definePageMeta({
  layout: 'auth',
})

const { $authClient } = useNuxtApp()

const toast = useToast()

const loading = ref(false)

const schema = z.object({
  email: z.email($t('auth.email.error')),
  password: z.string($t('auth.password.label')).min(8, $t('auth.password.error')),
  rememberMe: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

/**
 * @description: 登录提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  const { error } = await $authClient.signIn.email({
    ...formData,
    callbackURL: '/dashboard',
  }).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: $t('auth.signUp.error'),
      description: error.message || '',
      color: 'error',
    })
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.signIn.title')"
        :description="$t('auth.signIn.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <EmailInput v-model="state.email" />
          <PasswordInput v-model="state.password">
            <template #hint>
              <ULink as="button" to="/auth/forgot-password">
                {{ $t('auth.password.forgot') }}
              </ULink>
            </template>
          </PasswordInput>
          <UCheckbox v-model="state.rememberMe" name="rememberMe" :label="$t('auth.signIn.rememberMe')" />
          <SubmitButton :text="$t('auth.signIn.submit')" :loading="loading" />
          <MagicLinkButton />
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
        <FooterLink :left-text="$t('auth.signIn.footer')" :right-text="$t('auth.signIn.footerLink')" to="/auth/sign-up" />
      </UPageCard>
    </ClientOnly>
  </div>
</template>
