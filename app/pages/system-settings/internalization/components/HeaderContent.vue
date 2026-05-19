<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<InternalizationTree>
  refresh: VoidFunction
  handleReset: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nInternalization } = useMessage()

const query = defineModel<InternalizationQueryParams>({ required: true })
</script>

<template>
  <div class="flex items-start sm:items-center justify-between flex-wrap gap-2">
    <div class="flex items-start sm:items-center gap-2 flex-wrap">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nInternalization('name')" />
      <UInput v-model="query.zh" variant="outline" :placeholder="i18nInternalization('zh')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormResetButton :loading @reset="handleReset" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
