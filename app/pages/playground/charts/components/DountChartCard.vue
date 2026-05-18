<script lang="ts" setup>
import { map } from 'es-toolkit/compat'
import { getChartData } from '../utils'
import CardTitle from './CardTitle.vue'

const props = defineProps<{
  days: number
  height: number
}>()

const colorMode = useColorMode()

// 获取数据
const { data: chartData, pending, refresh } = await useAsyncData(
  'dount-chart-data',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return getChartData(props.days)
  },
)

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  'JavaScript': {
    name: 'JavaScript',
    color: 'var(--ui-primary)',
  },
  'Python': {
    name: 'Python',
    color: 'var(--ui-info)',
  },
  'C++': {
    name: 'C++',
    color: 'var(--ui-success)',
  },
  'Java': {
    name: 'Java',
    color: 'var(--ui-warning)',
  },
  'Go': {
    name: 'Go',
    color: 'var(--ui-error)',
  },
}))

const description = computed(() => $t('pages.playground.charts.donutChart.description'))
</script>

<template>
  <UCard :description :ui="{ body: 'relative' }">
    <DonutChart
      :key="colorMode.value"
      :data="map(chartData, v => v.pv)"
      :categories
      :height
      :radius="80"
      :pad-angle="0.1"
      :arc-width="20"
      :legend-style="{ marginTop: '10px' }"
    >
      <div class="text-center">
        <div class="font-semibold">
          TIOBE Index
        </div>
        <div class="text-muted">
          {{ description }}
        </div>
      </div>
    </DonutChart>
    <template #title>
      <CardTitle title-key="donutChart" :loading="pending" :refresh />
    </template>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
