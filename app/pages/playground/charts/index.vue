<script lang="ts" setup>
import AreaChartCard from './components/AreaChartCard.vue'
import BarChartCard from './components/BarChartCard.vue'
import DountChartCard from './components/DountChartCard.vue'
import LineChartCard from './components/LineChartCard.vue'

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  uv: {
    name: $t('pages.playground.charts.uv'),
    color: 'var(--ui-primary)',
  },
  pv: {
    name: $t('pages.playground.charts.pv'),
    color: 'var(--ui-success)',
  },
}))

const { height } = useResponsiveHeight({
  default: 200,
  sm: 300,
})
</script>

<template>
  <div class="space-y-4">
    <UAlert
      :title="$t('pages.playground.charts.title')"
      icon="lucide:chart-column-big"
      orientation="horizontal"
      color="neutral"
      variant="outline"
      :actions="[
        {
          label: 'Nuxt Charts',
          icon: 'lucide:chart-spline',
          to: 'https://nuxtcharts.com/',
          target: '_blank',
          size: 'sm',
        },
      ]"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <AreaChartCard :days="10" :height :categories />
      <BarChartCard :days="5" :height :categories />
      <LineChartCard :days="10" :height :categories />
      <DountChartCard :days="5" :height />
    </div>
  </div>
</template>
