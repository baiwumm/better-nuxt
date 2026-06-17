<script lang="ts" setup>
const { unreadCount, refreshUnreadCount } = useNotice()

await useAsyncData(
  'unread-notices-count',
  refreshUnreadCount,
)
</script>

<template>
  <UChip :text="unreadCount" size="3xl" inset>
    <UButton
      icon="i-lucide-bell"
      color="neutral"
      variant="ghost"
      square
      aria-label="Notice Button"
      to="/notices-center"
    />
  </UChip>
</template>
