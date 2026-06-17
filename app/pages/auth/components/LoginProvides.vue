<script setup lang="ts">
type Provider = typeof OAUTH_PROVIDES.valueType

const { $authClient } = useNuxtApp()
const { i18nAuth } = useMessage()
const oauthType = ref<Provider | null>(null)

const lastMethod = $authClient.getLastUsedLoginMethod()

const { mutate, isPending } = useSignInSocial({
  onSuccess: () => {
    oauthType.value = null
  },
})

/**
 * @description: OAuth 登录
 */
async function onOAuth(provider: typeof OAUTH_PROVIDES.valueType) {
  oauthType.value = provider
  await mutate({
    provider,
    callbackURL: '/',
  })
}
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-2 gap-2">
      <UButton
        v-for="{ value, label, raw } in OAUTH_PROVIDES.items"
        :key="value"
        :label="i18nAuth(`provide.${label}`)"
        :icon="raw.icon"
        :color="lastMethod === value ? 'primary' : 'neutral'"
        :variant="lastMethod === value ? 'soft' : 'outline'"
        :loading="isPending && value === oauthType"
        :disabled="isPending && value !== oauthType"
        class="justify-center"
        :ui="{ base: 'relative' }"
        @click="onOAuth(value)"
      />
    </div>
  </ClientOnly>
</template>
