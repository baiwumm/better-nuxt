<script lang="ts" setup>
defineProps<{
  title: string
  refresh: VoidFunction
  loading: boolean
}>()
</script>

<template>
  <UCard :ui="{ root: 'relative divide-none', header: 'w-full', body: 'w-full py-0!' }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-muted text-sm">
          {{ title }}
        </div>
        <UButton icon="lucide:rotate-ccw" variant="ghost" color="neutral" size="sm" :class="{ 'animate-spin': loading }" @click="refresh" />
      </div>
    </template>

    <slot name="body" />

    <ContainerLoading v-if="loading" />

    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
