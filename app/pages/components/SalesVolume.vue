<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { random, randomInt } from 'es-toolkit/math'
import KpiCard from './KpiCard.vue'
import TrendBadge from './TrendBadge.vue'

const loading = ref(false)

const state = reactive({
  total: 0,
  daily: 0,
  week: 0,
  completionRate: 0,
})

function updateState() {
  Object.assign(state, {
    total: randomInt(100000, 100000000),
    daily: random(-1, 1),
    week: random(-1, 1),
    completionRate: randomInt(1, 100),
  })
}

function generateData() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    updateState()
  }, 1200)
}

onMounted(() => {
  generateData()
})
</script>

<template>
  <KpiCard title="总销售额" :refresh="generateData" :loading>
    <template #body>
      <NumberFlow
        :value="state.total"
        locale="zh-CN"
        :format="{
          style: 'currency',
          currency: 'CNY',
          maximumFractionDigits: 0,
        }"
        class="text-2xl font-semibold"
      />
      <div class="flex items-center gap-1 text-xs h-15">
        <span>日同比：</span>
        <TrendBadge :value="state.daily" is-percent :precision="0" />
        <span>周同比：</span>
        <TrendBadge :value="state.week" is-percent :precision="0" />
      </div>
      <USeparator />
    </template>

    <template #footer>
      <NumberFlow
        :value="state.completionRate"
        prefix="前年同期业绩完成率："
        suffix="%"
        class="text-xs"
      />
    </template>
  </KpiCard>
</template>
