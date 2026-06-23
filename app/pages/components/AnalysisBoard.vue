<script lang="ts" setup>
import SalesPerformance from './SalesPerformance.vue'
import TrafficSource from './TrafficSource.vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
    <div class="md:col-span-4">
      <SalesPerformance />
    </div>
    <div class="md:col-span-3">
      <TrafficSource />
    </div>
  </div>
</template>
