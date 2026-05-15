<script lang="ts" setup>
import AreaChartCard from './components/AreaChartCard.vue'
import BarChartCard from './components/BarChartCard.vue'
</script>

<template>
  <div class="space-y-4">
    <UAlert
      variant="soft"
      :title="$t('pages.playground.charts.title')"
      icon="lucide:chart-column-big"
      orientation="horizontal"
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
      <AreaChartCard :days="10" />
      <BarChartCard :days="5" />
    </div>
  </div>
</template>
