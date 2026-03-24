<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import EmailInput from '../components/EmailInput.vue'
import FooterLink from '../components/FooterLink.vue'
import LoginProvides from '../components/LoginProvides.vue'
import SubmitButton from '../components/SubmitButton.vue'

definePageMeta({
  layout: 'auth',
})

const { $authClient } = useNuxtApp()

const toast = useToast()
const loading = ref(false)

const schema = z.object({
  email: z.email($t('auth.email.error')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
})

/**
 * @description: 表单提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  const { error } = await $authClient.signIn.magicLink({
    ...formData,
    callbackURL: '/dashboard',
  }).finally(() => {
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
      title: $t('auth.magicLink.verifyEmailSent'),
      description: $t('auth.magicLink.verifyEmailSentDesc'),
      color: 'success',
    })
    Object.assign(state, { email: '' })
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.magicLink.title')"
        :description="$t('auth.magicLink.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <EmailInput v-model="state.email" />
          <SubmitButton :text="$t('auth.magicLink.submit')" :loading="loading" />
          <NuxtLink to="/auth/login">
            <UButton
              type="submit"
              icon="ri:lock-line"
              color="neutral"
              variant="soft"
              class="w-full justify-center"
            >
              {{ $t('auth.magicLink.signInWithPassword') }}
            </UButton>
          </NuxtLink>
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
        <FooterLink :left-text="$t('auth.login.footer')" :right-text="$t('auth.login.footerLink')" to="/auth/sign-up" />
      </UPageCard>
    </ClientOnly>
  </div>
</template>
