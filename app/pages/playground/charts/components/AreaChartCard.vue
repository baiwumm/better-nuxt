<script lang="ts" setup>
import { CurveType } from '@unovis/ts'
import { randomInt } from 'es-toolkit/math'
import CardTitle from './CardTitle.vue'

const props = defineProps<{
  days: number
}>()

interface AreaChartItem {
  date: string
  uv: number // 访客数 UV
  pv: number // 浏览量 PV
}

const colorMode = useColorMode()
const dayjs = useDayjs()

const { height } = useResponsiveHeight({
  default: 200,
  sm: 300,
})

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  uv: {
    name: $t('pages.playground.charts.uv'),
    color: '#3b82f6',
  },
  pv: {
    name: $t('pages.playground.charts.pv'),
    color: '#22c55e',
  },
}))

/**
 * 生成近 N 天较真实的图表数据
 */
function getAreaChartData(days = 10): AreaChartItem[] {
  const data: AreaChartItem[] = []
  for (let i = days - 1; i >= 0; i--) {
    data.push({
      date: dayjs().subtract(i, 'day').format('MM-DD'),
      uv: randomInt(500, 1000),
      pv: randomInt(1000, 2000),
    })
  }

  return data
}

// 获取数据
const { data: AreaChartData, pending, refresh } = await useAsyncData(
  'area-chart-data',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return getAreaChartData(props.days)
  },
)
</script>

<template>
  <UCard :description="$t('pages.playground.charts.description', { days })" :ui="{ body: 'relative' }">
    <AreaChart
      :key="colorMode.value"
      :data="AreaChartData || []"
      :height="height"
      :categories="categories"
      :y-grid-line="true"
      :x-formatter="(tick:number) => AreaChartData?.[tick]?.date ?? ''"
      :curve-type="CurveType.MonotoneX"
      :legend-position="LegendPosition.BottomCenter"
    />
    <template #title>
      <CardTitle title-key="areaChart" :loading="pending" :refresh />
    </template>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
