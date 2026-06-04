<script setup lang="ts">
defineProps<{
  refresh: VoidFunction
}>()

const { i18nUser } = useMessage()

const userId = defineModel<string | null>('userId', { required: true })
const { data, pending, refresh, clear } = useListUserSessions(() => userId.value ?? undefined)

const open = computed({
  get: () => !!userId.value,
  set: (value) => {
    if (!value) {
      userId.value = null
      clear()
    }
  },
})

watch(open, (value) => {
  if (value && userId.value) {
    refresh()
  }
})
</script>

<template>
  <UModal v-model:open="open" :title="i18nUser('sessionsList')" :ui="{ body: 'relative' }">
    <template #body>
      <div v-if="data?.sessions?.length" class="space-y-4">
        <SessionCard v-for="session in data.sessions" :key="session.id" :session :refresh />
      </div>
      <EmptyContainer v-else />
      <ContainerLoading v-if="pending" />
    </template>
  </UModal>
</template>
