<script setup lang="ts">
import type { SessionWithImpersonatedBy } from 'better-auth/plugins/admin'

const props = defineProps<{
  session: SessionWithImpersonatedBy
  refresh: VoidFunction
}>()

const { session: activeSession } = useCurrentUser()
const signOut = useSignOut()
const { mutate: revokeSession, isPending } = useRevokeSession({
  onSuccess: props.refresh,
})
const { os, browser, isMobile } = useDeviceInfo(props.session.userAgent ?? '')
const { i18nUsers } = useMessage()
const { locale } = useI18n()

const isCurrentSession = activeSession.value?.token === props.session.token
</script>

<template>
  <div class="flex justify-between items-center gap-4 py-4">
    <div class="flex items-center gap-3">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-elevated">
        <UIcon :name="isMobile ? 'lucide:smartphone' : 'lucide:monitor'" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium truncate">
          {{ browser.name || "Unknown Browser" }}
          {{ os.name ? `, ${os.name}` : "" }}
        </span>
        <div v-if="isCurrentSession">
          <UBadge color="info" variant="soft" size="sm">
            {{ i18nUsers('currentSession') }}
          </UBadge>
        </div>
        <NuxtTime v-else :datetime="session.createdAt" :locale relative class="text-xs" />
      </div>
    </div>
    <UButton
      v-if="isCurrentSession"
      :label="$t('auth.logout.title')"
      icon="i-lucide-log-out"
      variant="outline"
      color="error"
      :loading="isPending"
      size="sm"
      @click="() => signOut()"
    />
    <UButton
      v-else
      :label="i18nUsers('revokeSession')"
      icon="lucide:x"
      variant="outline"
      :loading="isPending"
      :disabled="isCurrentSession"
      size="sm"
      @click="revokeSession({ token: session.token })"
    />
  </div>
</template>
