<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<Role>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nRole } = useMessage()

const query = defineModel<Pick<RoleQueryParams, 'name' | 'code'>>({ required: true })
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nRole('name')" />
      <UInput v-model="query.code" variant="outline" :placeholder="i18nRole('code')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
