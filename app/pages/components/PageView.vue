<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { at, last } from 'es-toolkit/array'
import { randomInt, sumBy } from 'es-toolkit/math'
import KpiCard from './KpiCard.vue'

const colorMode = useColorMode()

// 数据加载状态
const loading = ref(false)
// 组件 key
const componentKey = ref(0)
const dayjs = useDayjs()

// 模拟数据长度
const dataLength = 10

const dataSource = ref<{ pv: number, date: string }[]>([])

const categories = computed<Record<string, BulletLegendItemInterface>>(() => ({
  pv: {
    name: $t('pages.playground.charts.pv'),
    color: 'var(--ui-primary)',
  },
}))

// 重新挂载组件
function reloadComponent() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    dataSource.value = Array.from({ length: dataLength }, (_, i) => ({ pv: randomInt(1000, 10000), date: dayjs().subtract(dataLength - i, 'day').format('MM-DD') }))
    componentKey.value += 1
  }, 1200)
}

const total = computed(() => sumBy(dataSource.value, v => v.pv))
// 获取数组倒数第一个元素
const lastData = computed(() => last(dataSource.value)?.pv ?? 0)
// 获取数组倒数第二个元素
const penultimateData = computed(() => at(dataSource.value, [-2])[0]?.pv ?? 0)

onMounted(() => {
  reloadComponent()
})
</script>

<template>
  <KpiCard title="近十日访问量" :refresh="reloadComponent" :loading>
    <template #body>
      <NumberFlow
        :value="total"
        :trend="0"
        class="text-2xl font-semibold"
      />
      <AreaChart
        :key="colorMode.value"
        :data="dataSource"
        :height="60"
        :categories
        hide-legend
        hide-x-axis
        hide-y-axis
        :padding="{
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }"
      >
        <template #tooltip="{ values }">
          <div class="text-xs">
            {{ values?.pv }}
          </div>
        </template>
      </AreaChart>
    </template>
    <template #footer>
      <div class="flex items-center gap-1 text-xs">
        <span>今日访问量：{{ lastData }}</span>
        <span>日同比：</span>
        <UBadge size="sm" :color="lastData > penultimateData ? 'success' : 'error'" :icon="lastData > penultimateData ? 'lucide:arrow-up' : 'lucide:arrow-down'" variant="soft">
          <template #default>
            <NumberFlow :value="Math.abs(lastData - penultimateData)" />
          </template>
        </UBadge>
      </div>
    </template>
  </KpiCard>
</template>
