<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { CurveType } from '@unovis/ts'
import { randomInt, sumBy } from 'es-toolkit/math'

interface TrafficData {
  date: string
  desktop: number
  mobile: number
}
const colorMode = useColorMode()

const { height } = useResponsiveHeight({
  default: 200,
  sm: 300,
})

const loading = ref(false)

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  desktop: {
    name: 'Desktop',
    color: 'var(--ui-primary)',
  },
  mobile: {
    name: 'Mobile',
    color: 'var(--ui-success)',
  },
}))

/**
 * 生成近 N 天较真实的图表数据
 */
function generateData(days = 12): TrafficData[] {
  const data: TrafficData[] = []
  for (let i = 1; i <= days; i++) {
    data.push({
      date: `${i}月`,
      desktop: randomInt(100, 1000),
      mobile: randomInt(100, 1000),
    })
  }

  return data
}

// 获取数据（模拟随机数据无 SSR 价值，改纯客户端生成，避免阻塞 SSR 首屏 2 秒）
// 注意不可用 lazy：lazy 的 useAsyncData 需 watch/execute 才触发，否则图表恒为空
const { data: chartData, pending, refresh } = await useAsyncData(
  'traffic-source-data',
  () => generateData(),
  {
    default: () => [],
    server: false,
  },
)

const total = computed(() => sumBy(chartData.value, v => v.desktop + v.mobile))
</script>

<template>
  <UCard :ui="{ body: 'relative' }">
    <template #title>
      <div class="flex items-center justify-between gap-2">
        <div class="text-highlighted font-semibold">
          流量来源
        </div>
        <UButton icon="lucide:rotate-ccw" size="sm" color="neutral" variant="ghost" :loading @click="() => refresh()" />
      </div>
    </template>
    <div class="space-y-4">
      <div class="flex flex-col gap-1">
        <NumberFlow :value="total" class="text-xl font-bold" />
        <div class="text-xs text-muted">
          会话总数
        </div>
      </div>
      <AreaChart
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
    </div>
    <ContainerLoading v-if="pending" />
  </UCard>
</template>
