<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<DepartmentTree>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nDepartments } = useMessage()

const query = defineModel<DepartmentQueryParams>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nDepartments('name')" />
      <UInput v-model="query.code" variant="outline" :placeholder="i18nDepartments('code')" />
      <div class="flex gap-2">
        <AutoFormSearchButton :loading @refresh="refresh" />
        <AutoFormAddButton @add="handleAdd" />
        <TableColumnVisibility v-if="table" :table="table" class="sm:hidden" />
      </div>
    </div>
    <TableColumnVisibility v-if="table" :table="table" class="hidden sm:flex sm:ml-auto" />
  </div>
</template>
