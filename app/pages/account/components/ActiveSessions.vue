<script setup lang="ts">
import ActiveSession from './ActiveSession.vue'

const { i18nAccount } = useMessage()

const { data: sessions, refresh, pending } = useListSessions()
</script>

<template>
  <div class="space-y-4">
    <UPageCard
      :title="i18nAccount('securitySettings.activeSessions.title')"
      :description="i18nAccount('securitySettings.activeSessions.description')"
      variant="naked"
    />
    <UCard :ui="{ body: 'relative py-0!' }">
      <template v-if="pending">
        <div v-for="i in 2" :key="i" class="flex justify-between items-center">
          <div class="flex items-center gap-4 py-4">
            <USkeleton class="size-12 rounded-xl" />

            <div class="grid gap-2">
              <USkeleton class="h-4 w-60" />
              <USkeleton class="h-4 w-50" />
            </div>
          </div>
          <USkeleton class="h-6 w-30" />
        </div>
      </template>
      <UPageList v-else divide>
        <UPageCard
          v-for="session in sessions"
          :key="session.id"
          variant="naked"
          :ui="{
            body: 'w-full',
          }"
        >
          <template #body>
            <ActiveSession :refresh :session />
          </template>
        </UPageCard>
      </UPageList>
    </UCard>
  </div>
</template>
