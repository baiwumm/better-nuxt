<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import { authClient } from '@/utils/auth-client'
import LoginProvides from '../components/LoginProvides.vue'

definePageMeta({
  layout: 'login',
})

const toast = useToast()

const loading = ref(false)
const show = ref(false)

const schema = z.object({
  name: z.string().min(1, $t('auth.name.placeholder')),
  email: z.email($t('auth.email.error')),
  password: z.string($t('auth.password.label')).min(8, $t('auth.password.error')),
})

type Schema = z.output<typeof schema>

const state = refManualReset({
  name: '',
  email: '',
  password: '',
})

/**
 * @description: 注册提交
 * @param {*} payload
 */
async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const formData = payload.data
  loading.value = true
  const { error } = await authClient.signUp.email(formData).finally(() => {
    loading.value = false
  })
  if (error) {
    toast.add({
      title: $t('auth.signUp.error'),
      description: error.message || '',
      color: 'error',
    })
  }
  else {
    toast.add({
      title: $t('auth.signUp.verifyEmailSent'),
      description: $t('auth.signUp.verifyEmailSentDesc'),
      color: 'success',
    })
    state.reset()
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('auth.signUp.title')"
        :description="$t('auth.signUp.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField :label="$t('auth.name.label')" name="name" required>
            <UInput v-model="state.name" :placeholder="$t('auth.name.placeholder')" class="w-full" />
          </UFormField>

          <UFormField :label="$t('auth.email.label')" name="email" required>
            <UInput v-model="state.email" :placeholder="$t('auth.email.placeholder')" class="w-full" />
          </UFormField>

          <UFormField :label="$t('auth.password.label')" name="password" required>
            <UInput v-model="state.password" :type="show ? 'text' : 'password'" :placeholder="$t('auth.password.placeholder')" class="w-full">
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'"
                  :aria-pressed="show"
                  aria-controls="password"
                  @click="show = !show"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton type="submit" icon="ri:check-fill" :loading class="w-full justify-center">
            {{ $t('auth.signUp.submit') }}
          </UButton>
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
        <div class="flex justify-center items-center text-xs">
          <ULink as="button">
            {{ $t('auth.signUp.footer') }}
          </ULink>
          <ULink as="button" to="/auth/login" class="font-bold">
            {{ $t('auth.signUp.footerLink') }}
          </ULink>
        </div>
      </UPageCard>
    </ClientOnly>
  </div>
</template>
