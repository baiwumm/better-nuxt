<script setup lang="ts">
import { OAUTH_PROVIDES } from '@/enums'

type Provider = typeof OAUTH_PROVIDES.valueType

const { $authClient } = useNuxtApp()
const { i18nAuth } = useMessage()
const toast = useToast()
const loading = ref(false)
const oauthType = ref<Provider | null>(null)

/**
 * @description: OAuth 登录
 */
async function onOAuth(provider: typeof OAUTH_PROVIDES.valueType) {
  toast.add({
    title: i18nAuth('waitLogin'),
    color: 'neutral',
  })
  loading.value = true
  oauthType.value = provider
  const { error } = await $authClient.signIn.social({
    provider,
    callbackURL: '/',
  }).finally(() => {
    loading.value = false
    oauthType.value = null
  })
  if (error) {
    toast.add({
      title: i18nAuth('signUp.error'),
      description: error.message || '',
      color: 'error',
    })
  }
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <UButton
      v-for="{ value, label, raw } in OAUTH_PROVIDES.items"
      :key="value"
      :icon="raw.icon"
      color="neutral"
      variant="outline"
      :loading="loading && value === oauthType"
      :disabled="loading && value !== oauthType"
      class="justify-center"
      @click="onOAuth(value)"
    >
      {{ i18nAuth(`provide.${label}`) }}
    </UButton>
  </div>
</template>
