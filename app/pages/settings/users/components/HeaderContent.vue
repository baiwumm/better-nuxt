<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table: Table<User>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nCommon } = useMessage()

const query = defineModel<Pick<UserQueryParams, 'keyword'>>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
      <UInput v-model="query.keyword" icon="lucide:search" variant="outline" :placeholder="i18nCommon('searchKeyword')" />
      <div class="flex gap-2">
        <AutoFormSearchButton :loading @refresh="refresh" />
        <AutoFormAddButton @add="handleAdd" />
        <TableColumnVisibility v-if="table" :table="table" class="sm:hidden" />
      </div>
    </div>
    <TableColumnVisibility v-if="table" :table="table" class="hidden sm:flex sm:ml-auto" />
  </div>
</template>
