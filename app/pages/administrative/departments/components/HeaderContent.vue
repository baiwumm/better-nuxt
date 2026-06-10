<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<DepartmentTree>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nDepartments } = useMessage()

const query = defineModel<Pick<DepartmentQueryParams, 'name' | 'code'>>({ required: true })
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nDepartments('name')" />
      <UInput v-model="query.code" variant="outline" :placeholder="i18nDepartments('code')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
