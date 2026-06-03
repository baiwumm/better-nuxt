<script setup lang="ts">
import type { SessionWithImpersonatedBy } from 'better-auth/plugins/admin'
import { UAParser } from 'ua-parser-js'

const props = defineProps<{
  session: SessionWithImpersonatedBy
  refresh: VoidFunction
}>()

const { $authClient } = useNuxtApp()
const { successToast, errorToast } = useAppToast()
const { session: activeSession } = useCurrentUser()
const { i18nUser } = useMessage()
const { locale } = useI18n()
const loading = ref(false)

const parser = new UAParser(props.session.userAgent || '')

const uaResult = parser.getResult()
const { device, os, browser } = uaResult
const isMobile = device.type === 'mobile'
const isCurrentSession = activeSession.value?.token === props.session.token

// 撤销会话
async function revokeSession() {
  loading.value = true
  const { error } = await $authClient.admin.revokeUserSession({
    sessionToken: props.session.token,
  }).finally(() => {
    loading.value = false
  })
  if (error) {
    errorToast({ title: error.message })
  }
  else {
    successToast()
    props.refresh()
  }
}
</script>

<template>
  <UCard :ui="{ body: 'sm:p-4' }">
    <div class="flex justify-between items-center gap-4">
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
              {{ i18nUser('currentSession') }}
            </UBadge>
          </div>
          <NuxtTime v-else :datetime="session.createdAt" :locale relative class="text-xs" />
        </div>
      </div>
      <UButton icon="lucide:x" variant="outline" :loading color="error" :disabled="isCurrentSession" size="sm" @click="revokeSession">
        {{ i18nUser('revokeSession') }}
      </UButton>
    </div>
  </UCard>
</template>
