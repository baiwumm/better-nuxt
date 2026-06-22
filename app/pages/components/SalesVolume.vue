<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { randomInt } from 'es-toolkit/math'
import KpiCard from './KpiCard.vue'

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
    daily: randomInt(-100, 100),
    week: randomInt(-100, 100),
    completionRate: randomInt(1, 100),
  })
}

function reloadComponent() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    updateState()
  }, 1200)
}

onMounted(() => {
  reloadComponent()
})
</script>

<template>
  <KpiCard title="总销售额" :refresh="reloadComponent" :loading>
    <template #body>
      <NumberFlow
        :value="state.total"
        :trend="0"
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
        <UBadge size="sm" :color="state.daily >= 0 ? 'success' : 'error'" :icon="state.daily >= 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'" variant="soft">
          <template #default>
            <NumberFlow :value="state.daily" suffix="%" />
          </template>
        </UBadge>
        <span>周同比：</span>
        <UBadge size="sm" :color="state.week >= 0 ? 'success' : 'error'" :icon="state.week >= 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'" variant="soft">
          <template #default>
            <NumberFlow :value="state.week" suffix="%" />
          </template>
        </UBadge>
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
