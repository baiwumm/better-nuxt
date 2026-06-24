<script lang="ts" setup>
import { motion } from 'motion-v'
import AreaChartCard from './components/AreaChartCard.vue'
import BarChartCard from './components/BarChartCard.vue'
import BubbleChartCard from './components/BubbleChartCard.vue'
import DountChartCard from './components/DountChartCard.vue'
import GanttChartCard from './components/GanttChartCard.vue'
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

const chartCards = computed(() => [
  {
    component: AreaChartCard,
    props: {
      days: 10,
      categories: categories.value,
    },
  },
  {
    component: BarChartCard,
    props: {
      days: 5,
      categories: categories.value,
    },
  },
  {
    component: LineChartCard,
    props: {
      days: 10,
      categories: categories.value,
    },
  },
  {
    component: DountChartCard,
    props: {
      days: 5,
    },
  },
  {
    component: BubbleChartCard,
    props: {
      days: 5,
    },
  },
  {
    component: GanttChartCard,
  },
])
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Nuxt Charts"
      :description="$t('pages.playground.charts.subTitle')"
      :links="[
        {
          label: 'Document',
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:file-text',
          trailingIcon: 'lucide:external-link',
          to: 'https://nuxtcharts.com',
          target: '_blank',
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/dennisadriaans/vue-chrts',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="lucide:chart-column-big" class="size-12" />
      </template>
    </UPageHero>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <motion.div
        v-for="(card, index) in chartCards"
        :key="index"
        layout
        :initial="{
          opacity: 0,
          y: 30,
          scale: 0.96,
          filter: 'blur(10px)',
        }"
        :while-in-view="{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        }"
        :transition="{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 1.1,
        }"
        :viewport="{
          once: true,
          amount: 0.1,
        }"
        class="will-change-transform"
      >
        <Component
          :is="card.component"
          :height
          v-bind="card.props"
        />
      </motion.div>
    </div>
  </div>
</template>
