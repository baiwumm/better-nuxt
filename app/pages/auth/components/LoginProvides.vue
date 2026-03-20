<script setup lang="ts">
import { OAUTH_PROVIDES } from '@/enums'

const toast = useToast()

/**
 * @description: OAuth 登录
 */
async function onOAuth(provider: typeof OAUTH_PROVIDES.valueType) {
  const { error } = await authClient.signIn.social({
    provider,
    callbackURL: '/dashboard',
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
  <div class="grid grid-cols-3 gap-2">
    <UButton v-for="{ value, label, raw } in OAUTH_PROVIDES.items" :key="value" :icon="raw.icon" color="neutral" variant="outline" class="justify-center" @click="onOAuth(value)">
      {{ $t(`auth.provide.${label}`) }}
    </UButton>
  </div>
</template>
