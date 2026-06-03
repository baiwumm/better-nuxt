<script setup lang="ts">
import { OAUTH_PROVIDES } from '@/enums'
import LinkAccount from './LinkAccount.vue'

const { i18nAccount } = useMessage()

const { data: accounts, refresh } = await useListAccounts()

const linkedAccounts = computed(() => accounts.value?.filter(
  account => account.providerId !== 'credential',
))

const allLinkedAccounts = computed(() => {
  return OAUTH_PROVIDES.items.map(({ value }) => {
    const account = linkedAccounts.value?.find(account => account.providerId === value)
    if (account) {
      return {
        key: account.id,
        accountId: account.accountId,
        provider: account.providerId,
      }
    }
    return {
      key: value,
      accountId: undefined,
      provider: value,
    }
  })
})
</script>

<template>
  <div class="space-y-4">
    <UPageCard
      :title="i18nAccount('securitySettings.linkAccounts.title')"
      :description="i18nAccount('securitySettings.linkAccounts.description')"
      variant="naked"
    />
    <UCard :ui="{ body: 'py-0!' }">
      <UPageList divide>
        <UPageCard
          v-for="account in allLinkedAccounts"
          :key="account.key"
          variant="naked"
          :ui="{
            body: 'w-full',
          }"
        >
          <template #body>
            <ClientOnly>
              <LinkAccount :provider="account.provider" :account-id="account.accountId" :refresh />
            </ClientOnly>
          </template>
        </UPageCard>
      </UPageList>
    </UCard>
  </div>
</template>
