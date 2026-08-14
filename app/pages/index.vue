<script lang="ts" setup>
// 首页展示组件懒加载：图表库（unovis/@number-flow 等）不进首屏 bundle
// ClientOnly：SSR 不渲染图表（数据均为客户端生成，SSR 只输出占位，减轻服务端负担）
const KpiCards = defineAsyncComponent(() => import('./components/KpiCards.vue'))
const SalesPerformance = defineAsyncComponent(() => import('./components/SalesPerformance.vue'))
const TodoList = defineAsyncComponent(() => import('./components/TodoList.vue'))
const TrafficSource = defineAsyncComponent(() => import('./components/TrafficSource.vue'))
const WeekHeatmap = defineAsyncComponent(() => import('./components/WeekHeatmap.vue'))
</script>

<template>
  <div class="space-y-4">
    <ClientOnly>
      <KpiCards />
      <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
        <div class="grid grid-cols-1 gap-4">
          <SalesPerformance />
          <TrafficSource />
        </div>
        <div class="grid grid-cols-1 gap-4 h-fit">
          <TodoList />
          <WeekHeatmap />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
