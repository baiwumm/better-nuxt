<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { randomInt, sumBy } from 'es-toolkit/math'
import KpiCard from './KpiCard.vue'
import TrendBadge from './TrendBadge.vue'

const colorMode = useColorMode()

// 数据加载状态
const loading = ref(false)

// 模拟数据长度
const dataLength = 10

const dataSource = ref<{ payments: number }[]>([])

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  payments: {
    name: 'Payments',
    color: 'var(--ui-primary)',
  },
}))

// 重新挂载组件
function generateData() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dataSource.value = Array.from({ length: dataLength }, _ => ({ payments: randomInt(1000, 10000) }))
  }, 1200)
}

const total = computed(() => sumBy(dataSource.value, v => v.payments))

// 计算转换率
const conversionRate = computed(() => {
  const data = dataSource.value

  // 至少需要 2 个数据点才能计算增长率
  if (!data || data.length < 2)
    return 0

  const current = data.at(-1)?.payments ?? 0
  const previous = data[data.length - 2]?.payments ?? 0

  // 避免分母为 0
  if (previous === 0)
    return 0

  return (current - previous) / previous
})

onMounted(() => {
  generateData()
})
</script>

<template>
  <KpiCard title="支付笔数" :refresh="generateData" :loading>
    <template #body>
      <NumberFlow :value="total" class="text-2xl font-semibold" />
      <BarChart
        :key="colorMode.value"
        :data="dataSource"
        :height="60"
        :categories
        hide-legend
        hide-x-axis
        hide-y-axis
        :y-axis="['payments']"
        :padding="{
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }"
      >
        <template #tooltip="{ values }">
          <div class="text-xs">
            {{ values?.payments }}
          </div>
        </template>
      </BarChart>
    </template>
    <template #footer>
      <div class="flex items-center gap-1 text-xs">
        <span>转化率：</span>
        <TrendBadge :value="conversionRate" is-percent />
      </div>
    </template>
  </KpiCard>
</template>
