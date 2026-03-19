<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import z from 'zod'
import { OAUTH_PROVIDES } from '@/enums'
import { authClient } from '@/utils/auth-client'

definePageMeta({
  layout: 'login',
})

const toast = useToast()

const loading = ref(false)

const schema = z.object({
  email: z.email($t('pages.login.email.error')),
  password: z.string($t('pages.login.password.label')).min(8, $t('pages.login.password.error')),
  rememberMe: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

/**
 * @description: 错误提示
 */
function onError(msg?: string) {
  toast.add({
    title: $t('pages.login.error'),
    description: msg || '',
    color: 'error',
  })
}

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
    onError(error.message)
  }
}

/**
 * @description: OAuth 登录
 */
async function onOAuth(provider: typeof OAUTH_PROVIDES.valueType) {
  const { error } = await authClient.signIn.social({
    provider,
    callbackURL: '/dashboard',
  })
  if (error) {
    onError(error.message)
  }
}
</script>

<template>
  <div>
    <ClientOnly>
      <UPageCard
        :title="$t('pages.login.title')"
        :description="$t('pages.login.description')"
        class="w-full sm:w-md"
        :ui="{
          title: 'text-xl',
          description: 'text-sm',
        }"
      >
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField :label="$t('pages.login.email.label')" name="email" required>
            <UInput v-model="state.email" :placeholder="$t('pages.login.email.placeholder')" class="w-full" />
          </UFormField>

          <UFormField :label="$t('pages.login.password.label')" name="password" required>
            <UInput v-model="state.password" type="password" :placeholder="$t('pages.login.password.placeholder')" class="w-full" />
            <template #hint>
              <ULink as="button">
                {{ $t('pages.login.password.forgot') }}
              </ULink>
            </template>
          </UFormField>
          <UCheckbox v-model="state.rememberMe" name="rememberMe" :label="$t('pages.login.rememberMe')" />
          <UButton type="submit" icon="ri:check-fill" :loading class="w-full justify-center">
            {{ $t('pages.login.submit') }}
          </UButton>
        </UForm>
        <USeparator label="or" />
        <div class="grid grid-cols-3 gap-2">
          <UButton v-for="{ value, label, raw } in OAUTH_PROVIDES.items" :key="value" :icon="raw.icon" color="neutral" variant="outline" class="justify-center" @click="onOAuth(value)">
            {{ label }}
          </UButton>
        </div>
        <div class="flex justify-center items-center text-xs">
          <ULink as="button">
            {{ $t('pages.login.signUpText') }}
          </ULink>
          <ULink as="button" class="font-bold">
            {{ $t('pages.login.signUp') }}
          </ULink>
        </div>
      </UPageCard>
    </ClientOnly>
  </div>
</template>
