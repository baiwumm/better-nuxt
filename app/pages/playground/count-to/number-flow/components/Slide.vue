<script setup lang="ts">
import NumberFlow, { continuous } from '@number-flow/vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'

const { locale } = defineProps<{
  locale: string
}>()
</script>

<template>
  <UPageCard :ui="{ container: 'lg:flex justify-center flex-row items-center' }">
    <SliderRoot
      v-slot="{ modelValue }"
      :default-value="[50]"
      class="relative flex h-5 w-full touch-none select-none items-center mt-3"
    >
      <SliderTrack class="relative h-1 grow rounded-full bg-zinc-100 dark:bg-zinc-800">
        <SliderRange class="absolute h-full rounded-full bg-black dark:bg-white" />
      </SliderTrack>
      <SliderThumb
        class="relative block h-5 w-5 rounded-[1rem] bg-white shadow-md ring ring-black/10"
        aria-label="Volume"
      >
        <NumberFlow
          v-if="modelValue?.[0] != null"
          :locales="locale"
          will-change
          :value="modelValue[0]"
          :plugins="[continuous]"
          :opacity-timing="{
            duration: 250,
            easing: 'ease-out',
          }"
          :transform-timing="{
            easing: `linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)`,
            duration: 500,
          }"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 text-lg font-semibold"
        />
      </SliderThumb>
    </SliderRoot>
  </UPageCard>
</template>
