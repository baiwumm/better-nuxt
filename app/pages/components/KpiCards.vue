<script lang="ts" setup>
import PageView from './PageView.vue'
import PaymentNumber from './PaymentNumber.vue'
import ProjectSchedule from './ProjectSchedule.vue'
import SalesVolume from './SalesVolume.vue'
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <SalesVolume />
    <PageView />
    <PaymentNumber />
    <ProjectSchedule />
  </div>
</template>
