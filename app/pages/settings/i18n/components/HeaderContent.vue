<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<I18nTree>
  refresh: VoidFunction
  handleReset: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nLocales } = useMessage()

const query = defineModel<I18nQueryParams>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nLocales('name')" />
      <UInput v-model="query.zh" variant="outline" :placeholder="i18nLocales('zh')" />
      <div class="flex gap-2">
        <AutoFormSearchButton :loading @refresh="refresh" />
        <AutoFormResetButton :loading @reset="handleReset" />
        <AutoFormAddButton @add="handleAdd" />
        <TableColumnVisibility v-if="table" :table="table" class="sm:hidden" />
      </div>
    </div>
    <TableColumnVisibility v-if="table" :table="table" class="hidden sm:flex sm:ml-auto" />
  </div>
</template>
