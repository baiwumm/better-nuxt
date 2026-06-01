<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import AccountSettings from './components/AccountSettings.vue'
import SecuritySettings from './components/SecuritySettings.vue'

const { i18nAccount } = useMessage()

const items = ref<TabsItem[]>([
  {
    label: i18nAccount('accountSettings.title'),
    icon: 'i-lucide-user-round-cog',
    slot: 'accountSettings',
  },
  {
    label: i18nAccount('securitySettings.title'),
    icon: 'i-lucide-shield',
    slot: 'securitySettings',
  },
])
</script>

<template>
  <UTabs
    :items="items"
    :ui="{
      content: 'w-full lg:max-w-2xl mx-auto sm:px-6 lg:py-12',
    }"
  >
    <template #accountSettings>
      <AccountSettings />
    </template>
    <template #securitySettings>
      <SecuritySettings />
    </template>
  </UTabs>
</template>
