<script setup lang="ts">
import { COLOR_MODES } from '@/enums'

const colorMode = useColorMode()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-muted text-xs">
      {{ $t('components.themePicker.colorMode') }}
    </div>
    <div class="grid grid-cols-3 gap-1.5">
      <UButton v-for="{ value, label, raw } in COLOR_MODES.items" :key="value" color="neutral" size="sm" :variant="colorMode.preference === value ? 'subtle' : 'outline'" class="ring-default rounded-sm text-xs justify-center" :label="label" :icon="raw.icon" @click="colorMode.preference = value" />
    </div>
  </div>
</template>
