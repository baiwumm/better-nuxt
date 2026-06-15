<!-- components/DepartmentNode.vue -->
<script setup lang="ts">
defineProps<{
  data: DepartmentTree
}>()
</script>

<template>
  <div class="rounded-lg border bg-white p-4 shadow min-w-45">
    <div class="font-semibold">
      {{ data.name }}
    </div>

    <div class="text-xs text-gray-500">
      {{ data.code }}
    </div>

    <div
      v-if="data.leader"
      class="mt-2 text-sm"
    >
      👤 {{ data.leader }}
    </div>
  </div>
</template>
