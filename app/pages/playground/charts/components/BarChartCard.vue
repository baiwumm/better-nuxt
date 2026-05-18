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
  'bar-chart-data',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return getChartData(props.days)
  },
)
</script>

<template>
  <UCard :description="$t('pages.playground.charts.description', { days })" :ui="{ body: 'relative' }">
    <BarChart
      :key="colorMode.value"
      :data="chartData || []"
      :height
      :y-axis="['uv', 'pv']"
      :categories
      :y-grid-line="true"
      :x-formatter="(tick:number) => chartData?.[tick]?.date ?? ''"
      :curve-type="CurveType.MonotoneX"
      :legend-position="LegendPosition.BottomCenter"
      :radius="4"
      :legend-style="{ marginTop: '10px' }"
    />
    <template #title>
      <CardTitle title-key="barChart" :loading="pending" :refresh />
    </template>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
