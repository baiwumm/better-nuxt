<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'

defineProps<{
  value: number
  growth: number
  title: string
}>()
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex items-center gap-1">
      <NumberFlow
        :value
        locale="zh-CN"
        :format="{
          style: 'currency',
          currency: 'CNY',
          maximumFractionDigits: 0,
        }"
        class="text-xl font-bold"
      />
      <div :class="cn('flex items-center gap-1 text-xs', growth >= 0 ? 'text-success' : 'text-error')">
        <UIcon :name="growth >= 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'" />
        <NumberFlow
          :value="growth"
          :class="cn('text-xs text-muted', growth >= 0 ? 'text-success' : 'text-error')"
        />
        <span>%</span>
      </div>
    </div>
    <div class="text-xs text-muted">
      {{ title }}
    </div>
  </div>
</template>
