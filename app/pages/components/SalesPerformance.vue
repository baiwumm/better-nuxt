<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { random, round, sumBy } from 'es-toolkit/math'
import StatisticItem from './StatisticItem.vue'

interface SalesData {
  date: string
  sales: number
}

const dayjs = useDayjs()
const colorMode = useColorMode()

const { height } = useResponsiveHeight({
  default: 200,
  sm: 300,
})

const loading = ref(false)
const value = ref(7)
const currentPeriod = ref(7)
const dataSource = ref<SalesData[]>([])
const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  sales: {
    name: '销售业绩',
    color: 'var(--ui-primary)',
  },
}))

const items = ref<SelectItem[]>([
  {
    label: '近7天',
    value: 7,
  },
  {
    label: '近半个月',
    value: 15,
  },
  {
    label: '近一个月',
    value: 30,
  },
])

function generateSalesData(days: number) {
  const result: SalesData[] = []

  let currentSales = 5000

  for (let i = days - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day')

    // 波动 ±8%
    const factor = round(1 + random(-0.08, 0.08), 2)

    // 缓慢增长趋势
    const trend = 1 + (days - i) * 0.002

    // 周末降低 15%
    const weekendFactor
      = [0, 6].includes(date.day())
        ? 0.85
        : 1

    currentSales *= factor
    currentSales *= trend

    result.push({
      date: date.format('MM-DD'),
      sales: Math.round(currentSales * weekendFactor),
    })
  }

  return result
}

function growth(current: number, prev: number) {
  if (!prev)
    return 0

  return Number(
    (((current - prev) / prev) * 100).toFixed(1),
  )
}

async function generateData() {
  loading.value = true

  const period = value.value

  const result = await new Promise<SalesData[]>((resolve) => {
    setTimeout(() => {
      resolve(generateSalesData(period * 2))
    }, 1200)
  })

  dataSource.value = result

  // 请求成功后再切换周期
  currentPeriod.value = period

  loading.value = false
}

//
// 当前周期
//
const currentData = computed(() =>
  dataSource.value.slice(-currentPeriod.value),
)

//
// 上一周期
//
const previousData = computed(() =>
  dataSource.value.slice(0, currentPeriod.value),
)

//
// 今日销售额
//
const todaySales = computed(
  () => currentData.value.at(-1)?.sales ?? 0,
)

//
// 昨日销售额
//
const yesterdaySales = computed(
  () => currentData.value.at(-2)?.sales ?? 0,
)

//
// 今日环比
//
const todayGrowth = computed(() =>
  growth(
    todaySales.value,
    yesterdaySales.value,
  ),
)

//
// 当前周期总销售额
//
const totalSales = computed(() =>
  sumBy(currentData.value, item => item.sales),
)

//
// 上一周期总销售额
//
const prevTotalSales = computed(() =>
  sumBy(previousData.value, item => item.sales),
)

//
// 总销售环比
//
const totalGrowth = computed(() =>
  growth(
    totalSales.value,
    prevTotalSales.value,
  ),
)

//
// 日均销售额
//
const avgSales = computed(() => {
  if (!currentData.value.length)
    return 0

  return Math.round(
    totalSales.value / currentData.value.length,
  )
})

//
// 上一周期日均销售额
//
const prevAvgSales = computed(() => {
  if (!previousData.value.length)
    return 0

  return Math.round(
    prevTotalSales.value / previousData.value.length,
  )
})

//
// 日均环比
//
const avgGrowth = computed(() =>
  growth(
    avgSales.value,
    prevAvgSales.value,
  ),
)

// 卡片数据
const statistics = computed(() => [
  {
    title: '周期销售额',
    value: totalSales.value,
    growth: totalGrowth.value,
  },
  {
    title: '日均销售额',
    value: avgSales.value,
    growth: avgGrowth.value,
  },
  {
    title: '今日销售额',
    value: todaySales.value,
    growth: todayGrowth.value,
  },
])

onMounted(() => {
  generateData()
})
</script>

<template>
  <UCard :ui="{ body: 'relative space-y-4' }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="text-lg font-semibold">
            销售业绩
          </div>
          <UButton icon="lucide:rotate-ccw" variant="ghost" :disabled="loading" color="neutral" size="sm" :class="{ 'animate-spin': loading }" @click="generateData" />
        </div>
        <USelect v-model="value" :items="items" class="w-48" size="sm" @update:model-value="generateData" />
      </div>
    </template>
    <div class="grid grid-cols-2 sm:grid-cols-3">
      <StatisticItem v-for="(v, key) in statistics" v-bind="v" :key />
    </div>
    <BarChart
      :key="colorMode.value"
      :data="currentData"
      :height
      :y-axis="['sales']"
      :categories
      :y-grid-line="true"
      :x-formatter="(tick:number) => currentData?.[tick]?.date ?? ''"
      :curve-type="CurveType.MonotoneX"
      :legend-position="LegendPosition.BottomCenter"
      :radius="4"
      :legend-style="{ marginTop: '10px' }"
    />
    <ContainerLoading v-if="loading" />
  </UCard>
</template>
