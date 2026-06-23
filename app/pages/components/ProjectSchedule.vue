<script lang="ts" setup>
import NumberFlow from '@number-flow/vue'
import { random, round } from 'es-toolkit/math'
import KpiCard from './KpiCard.vue'

// 数据加载状态
const loading = ref(false)

const value = ref(0)

const completionRate = ref(0)

// 重新挂载组件
function generateData() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    value.value = round(random(1, 100), 2)
    completionRate.value = round(random(1, 100), 2)
  }, 1200)
}

onMounted(() => {
  generateData()
})
</script>

<template>
  <KpiCard title="项目进度" :refresh="generateData" :loading>
    <template #body>
      <NumberFlow :value suffix="%" class="text-2xl font-semibold" />
      <div class="h-15 flex items-center">
        <UProgress v-model="value" size="xl" />
      </div>
    </template>
    <template #footer>
      <NumberFlow :value="completionRate" prefix="今年同期项目完成率：" suffix="%" class="text-xs" />
    </template>
  </KpiCard>
</template>
