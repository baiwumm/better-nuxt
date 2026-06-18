<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<Post>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nPosts } = useMessage()

const query = defineModel<Pick<PostQueryParams, 'name' | 'code'>>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nPosts('name')" />
      <UInput v-model="query.code" variant="outline" :placeholder="i18nPosts('code')" />
      <div class="flex gap-2">
        <AutoFormSearchButton :loading @refresh="refresh" />
        <AutoFormAddButton @add="handleAdd" />
        <TableColumnVisibility v-if="table" :table="table" class="sm:hidden" />
      </div>
    </div>
    <TableColumnVisibility v-if="table" :table="table" class="hidden sm:flex sm:ml-auto" />
  </div>
</template>
