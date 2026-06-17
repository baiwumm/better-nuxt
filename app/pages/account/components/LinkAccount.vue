<script setup lang="ts">
import { upperFirst } from 'es-toolkit/string'

const props = defineProps<{
  provider: string
  refresh: VoidFunction
  accountId?: string
}>()

const { i18nAccount } = useMessage()

const siteConfig = useSiteConfig()
const route = useRoute()
const confirm = useConfirmDialog()

const { data: accountInfo, pending } = useAccountInfo(() => props.accountId)

const { mutate: linkSocial, isPending: isLinking } = useLinkSocial()

const { mutate: unlinkAccount, isPending: isUnlinking } = useUnlinkAccount({
  onSuccess: () => props.refresh(),
})

const displayName = computed(() => {
  if (!accountInfo.value) {
    return props.accountId
  }
  return accountInfo.value?.data?.login
    || accountInfo.value?.data?.username
    || accountInfo.value?.user?.email
    || accountInfo.value?.user?.name
})

const provideRaw = computed(() => OAUTH_PROVIDES.raw(props.provider))

// 解除关联二次确认
async function handleUnlink() {
  await confirm({
    title: $t('pages.account.securitySettings.linkAccounts.unlinkConfirmTitle', { provider: upperFirst(props.provider) }),
    description: i18nAccount('securitySettings.linkAccounts.unlinkConfirmDescription'),
    confirmLabel: i18nAccount('securitySettings.linkAccounts.unlinkConfirmLabel'),
    loadingLabel: i18nAccount('securitySettings.linkAccounts.inUnlink'),
    onConfirm: async () => {
      const flag = await unlinkAccount({ providerId: props.provider })
      return flag
    },
  })
}
</script>

<template>
  <div class="flex justify-between items-center gap-4 py-4">
    <div class="flex gap-3 items-center">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-elevated">
        <UIcon :name="provideRaw?.icon" class="size-6" />
      </div>
      <div class="flex justify-center flex-col">
        <div class="text-base font-bold">
          {{ upperFirst(provider) }}
        </div>
        <USkeleton v-if="pending" class="h-4 w-50" />
        <div v-else class="text-xs text-muted">
          {{ accountId ? displayName : $t('pages.account.securitySettings.linkAccounts.displayName', { provider: upperFirst(provider) }) }}
        </div>
      </div>
    </div>
    <UButton
      v-if="accountId"
      variant="outline"
      size="sm"
      icon="lucide:link-2-off"
      :label="i18nAccount('securitySettings.linkAccounts.unlink')"
      :loading="isUnlinking"
      :disabled="pending"
      @click="handleUnlink"
    />
    <UButton
      v-else
      variant="outline"
      size="sm"
      icon="lucide:link-2"
      :label="i18nAccount('securitySettings.linkAccounts.link')"
      :loading="isLinking"
      :disabled="pending"
      @click="linkSocial({ provider, callbackURL: `${siteConfig.url}/${route.path}` })"
    />
  </div>
</template>
