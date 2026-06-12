<script setup lang="ts">
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue'
import { computed } from 'vue'

const { seconds = 3600 } = defineProps<{ seconds?: number }>()

const remainingSeconds = ref(seconds)

const hh = computed(() => Math.floor(remainingSeconds.value / 3600))
const mm = computed(() => Math.floor((remainingSeconds.value % 3600) / 60))
const ss = computed(() => remainingSeconds.value % 60)

const { pause, resume, isActive } = useIntervalFn(() => {
  if (remainingSeconds.value > 0) {
    remainingSeconds.value--
  }

  // 倒计时结束自动暂停
  if (remainingSeconds.value === 0) {
    remainingSeconds.value = seconds
  }
}, 1000)

onActivated(() => {
  if (!isActive.value)
    resume()
})
onDeactivated(() => {
  if (isActive.value)
    pause()
})
</script>

<template>
  <UPageCard :ui="{ container: 'lg:flex justify-center flex-row items-center' }">
    <NumberFlowGroup>
      <div
        style="font-variant-numeric: tabular-nums"
        class="text-3xl flex items-baseline font-semibold"
      >
        <NumberFlow :trend="-1" :value="hh" :format="{ minimumIntegerDigits: 2 }" />
        <NumberFlow
          prefix=":"
          :trend="-1"
          :value="mm"
          :digits="{ 1: { max: 5 } }"
          :format="{ minimumIntegerDigits: 2 }"
        />
        <NumberFlow
          prefix=":"
          :trend="-1"
          :value="ss"
          :digits="{ 1: { max: 5 } }"
          :format="{ minimumIntegerDigits: 2 }"
        />
      </div>
    </NumberFlowGroup>
  </UPageCard>
</template>
