<script lang="ts" setup>
import KpiCards from './components/KpiCards.vue'
import SalesPerformance from './components/SalesPerformance.vue'
import TodoList from './components/TodoList.vue'
import TrafficSource from './components/TrafficSource.vue'
import WeekHeatmap from './components/WeekHeatmap.vue'
</script>

<template>
  <div class="space-y-4">
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
  </div>
</template>
