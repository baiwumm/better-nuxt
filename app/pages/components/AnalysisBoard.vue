<script lang="ts" setup>
import SalesPerformance from './SalesPerformance.vue'
import TrafficSource from './TrafficSource.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div class="md:col-span-3">
      <SalesPerformance />
    </div>
    <div class="md:col-span-2">
      <TrafficSource />
    </div>
  </div>
</template>
