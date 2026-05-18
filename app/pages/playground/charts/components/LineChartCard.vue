<script lang="ts" setup>
import { CurveType } from '@unovis/ts'
import { getChartData } from '../utils'
import CardTitle from './CardTitle.vue'

const props = defineProps<{
  days: number
  height: number
  categories: Record<string, BulletLegendItemInterface>
}>()

const colorMode = useColorMode()

// 获取数据
const { data: chartData, pending, refresh } = await useAsyncData(
  'line-chart-data',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return getChartData(props.days)
  },
)
</script>

<template>
  <UCard :description="$t('pages.playground.charts.description', { days })" :ui="{ body: 'relative' }">
    <LineChart
      :key="colorMode.value"
      :data="chartData || []"
      :height
      :categories
      :y-grid-line="true"
      :x-formatter="(tick:number) => chartData?.[tick]?.date ?? ''"
      :curve-type="CurveType.MonotoneX"
      :legend-position="LegendPosition.BottomCenter"
      :legend-style="{ marginTop: '10px' }"
    />
    <template #title>
      <CardTitle title-key="lineChart" :loading="pending" :refresh />
    </template>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
