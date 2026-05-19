<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<MenuTree>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nCommon } = useMessage()

const keyword = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
      <UInput v-model="keyword" icon="lucide:search" variant="outline" :placeholder="i18nCommon('searchKeyword')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
