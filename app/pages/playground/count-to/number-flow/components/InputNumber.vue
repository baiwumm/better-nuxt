<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { ref } from 'vue'

const { locale, min = 0, max = 99 } = defineProps<{
  locale: string
  min?: number
  max?: number
}>()
const modelValue = defineModel({ default: 88 })
const animated = ref(true)
// Hide the caret during transitions so you can't see it shifting around:
const showCaret = ref(true)
</script>

<template>
  <UPageCard :ui="{ container: 'lg:flex justify-between flex-row items-center' }">
    <UButton
      :disabled="min != null && modelValue <= min"
      icon="lucide:minus"
      variant="link"
      size="xl"
      @click="modelValue--"
    />
    <NumberFlow
      :value="modelValue"
      :locales="locale"
      :format="{ useGrouping: false }"
      aria-hidden="true"
      :animated
      class="pointer-events-none text-2xl font-bold"
      will-change
      @animationsstart="showCaret = false"
      @animationsfinish="showCaret = true"
    />
    <UButton
      :disabled="max != null && modelValue >= max"
      icon="lucide:plus"
      variant="link"
      size="xl"
      @click="modelValue++"
    />
  </UPageCard>
</template>
