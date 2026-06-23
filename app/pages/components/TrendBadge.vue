<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { round } from 'es-toolkit/math'

withDefaults(defineProps<{
  value: number
  isPercent?: boolean
  precision?: number
}>(), {
  isPercent: false,
  precision: 2,
})
</script>

<template>
  <UBadge size="sm" :color="value >= 0 ? 'success' : 'error'" :icon="value >= 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'" variant="soft">
    <template #default>
      <NumberFlow :value="Math.abs(isPercent ? round(value * 100, precision) : value)" :suffix="isPercent ? '%' : ''" />
    </template>
  </UBadge>
</template>
