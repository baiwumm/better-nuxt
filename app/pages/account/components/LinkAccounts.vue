<script setup lang="ts">
import LinkAccount from './LinkAccount.vue'

const { i18nAccount } = useMessage()

const { data: accounts, refresh, pending } = useListAccounts()

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
    <UCard :ui="{ body: 'relative py-0!' }">
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
            <div v-if="pending" class="flex items-center gap-4 py-4">
              <USkeleton class="size-12 rounded-full" />

              <div class="grid gap-2">
                <USkeleton class="h-4 w-60" />
                <USkeleton class="h-4 w-50" />
              </div>
            </div>
            <LinkAccount v-else :provider="account.provider" :account-id="account.accountId" :refresh />
          </template>
        </UPageCard>
      </UPageList>
    </UCard>
  </div>
</template>
