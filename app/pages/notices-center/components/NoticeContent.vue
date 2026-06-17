<script setup lang="ts">
defineProps<{
  data: Notice
  hasPrev: boolean
  hasNext: boolean
}>()

const emits = defineEmits(['close', 'prev', 'next'])

const { locale } = useI18n()
</script>

<template>
  <UDashboardPanel id="notice-content" :ui="{ root: 'min-h-full' }">
    <UDashboardNavbar :title="data.title" :toggle="false">
      <template #leading>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          class="-ms-1.5"
          @click="emits('close')"
        />
      </template>
      <template #right>
        <UButton
          :label="$t('pages.noticesCenter.prev')"
          icon="lucide:arrow-left"
          variant="outline"
          color="neutral"
          :disabled="!hasPrev"
          size="sm"
          @click="emits('prev')"
        />
        <UButton
          :label="$t('pages.noticesCenter.next')"
          icon="lucide:arrow-right"
          variant="outline"
          color="neutral"
          :disabled="!hasNext"
          size="sm"
          @click="emits('next')"
        />
      </template>
    </UDashboardNavbar>

    <div class="flex justify-between items-center gap-4 p-4 sm:px-6 border-b border-default shrink-0">
      <UserView :user="data.author" />
      <NuxtTime v-if="data.publishedAt" :datetime="data.publishedAt" relative :locale class="text-xs text-muted" />
    </div>

    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <MDC :value="data.content" />
    </div>
  </UDashboardPanel>
</template>
