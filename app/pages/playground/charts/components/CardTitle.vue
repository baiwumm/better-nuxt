<script lang="ts" setup>
defineProps<{
  titleKey: string
  loading: boolean
  refresh: VoidFunction
}>()
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <div class="text-highlighted font-semibold">
      {{ $t(`pages.playground.charts.${titleKey}.title`) }}
    </div>
    <UButton icon="lucide:rotate-ccw" size="md" color="neutral" variant="ghost" :loading @click="refresh" />
  </div>
</template>
