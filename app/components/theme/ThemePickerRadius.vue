<script setup lang="ts">
const appStore = useAppStore()

const radiuses = [0, 0.125, 0.25, 0.375, 0.5]
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      {{ $t('components.themePicker.radius') }}
    </div>
    <div class="grid grid-cols-5 gap-1.5">
      <UButton v-for="r in radiuses" :key="r" color="neutral" size="sm" :variant="appStore.radius === r ? 'subtle' : 'outline'" class="capitalize ring-default rounded-sm text-[11px] justify-center px-2" :label="String(r)" @click="appStore.setRadius(r)" />
    </div>
  </div>
</template>
