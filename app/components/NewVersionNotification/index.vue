<script setup lang="ts">
const { i18nCommon } = useMessage()
</script>

<template>
  <SkewNotification v-slot="{ isCurrentChunksOutdated, dismiss, reload, timeAgo }">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="isCurrentChunksOutdated" class="fixed bottom-4 right-4 z-50">
        <div class="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-full shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 px-4 py-3">
          <span class="text-lg">✨</span>
          <div class="text-sm font-medium">
            {{ i18nCommon('newVersion') }} {{ timeAgo }}
          </div>
          <UButton color="primary" size="xs" :label="i18nCommon('reload')" icon="lucide:refresh-cw" @click="reload" />
          <UButton color="neutral" variant="ghost" size="xs" icon="i-heroicons-x-mark-20-solid" @click="dismiss" />
        </div>
      </div>
    </Transition>
  </SkewNotification>
</template>
