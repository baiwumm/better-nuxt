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
  const { error } = await authClient.signIn.email({
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
        :title="$t('auth.login.title')"
        :description="$t('auth.login.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField :label="$t('auth.email.label')" name="email" required>
            <UInput v-model="state.email" :placeholder="$t('auth.email.placeholder')" class="w-full" />
          </UFormField>

          <UFormField :label="$t('auth.password.label')" name="password" required>
            <UInput v-model="state.password" :type="show ? 'text' : 'password'" :placeholder="$t('auth.password.placeholder')" class="w-full" />
            <template #hint>
              <ULink as="button">
                {{ $t('auth.password.forgot') }}
              </ULink>
            </template>
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
          </UFormField>
          <UCheckbox v-model="state.rememberMe" name="rememberMe" :label="$t('auth.login.rememberMe')" />
          <UButton type="submit" icon="ri:check-fill" :loading class="w-full justify-center">
            {{ $t('auth.login.submit') }}
          </UButton>
        </UForm>
        <USeparator label="or" />
        <LoginProvides />
        <div class="flex justify-center items-center text-xs">
          <ULink as="button">
            {{ $t('auth.login.footer') }}
          </ULink>
          <ULink as="button" to="/auth/sign-up" class="font-bold">
            {{ $t('auth.login.footerLink') }}
          </ULink>
        </div>
      </UPageCard>
    </ClientOnly>
  </div>
</template>
