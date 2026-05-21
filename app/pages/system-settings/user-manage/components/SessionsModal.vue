<script setup lang="ts">
import type { SessionWithImpersonatedBy } from 'better-auth/plugins/admin'

defineProps<{
  refresh: VoidFunction
}>()

const { $authClient } = useNuxtApp()
const { errorToast } = useAppToast()
const { i18nUser } = useMessage()

const userId = defineModel<string | null>('userId', { required: true })
const sessionsList = ref<SessionWithImpersonatedBy[]>([])
const loading = ref(false)

async function getSessionsList() {
  loading.value = true
  const { data, error } = await $authClient.admin.listUserSessions({
    userId: userId.value,
  }).finally(() => loading.value = false)
  if (error) {
    errorToast(error.message)
  }
  else {
    sessionsList.value = data?.sessions ?? []
  }
}

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
      sessionsList.value = []
    }
  },
})

watch(open, (value) => {
  if (value && userId.value) {
    getSessionsList()
  }
})
</script>

<template>
  <UModal v-model:open="open" :title="i18nUser('sessionsList')" :ui="{ body: 'relative' }">
    <template #body>
      <div v-if="sessionsList?.length" class="space-y-4">
        <SessionCard v-for="session in sessionsList" :key="session.id" :session :refresh="getSessionsList" />
      </div>
      <EmptyContainer v-else />
      <ContainerLoading v-if="loading" />
    </template>
  </UModal>
</template>
