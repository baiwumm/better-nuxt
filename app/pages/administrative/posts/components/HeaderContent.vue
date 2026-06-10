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
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
      <UInput v-model="query.name" variant="outline" :placeholder="i18nPosts('name')" />
      <UInput v-model="query.code" variant="outline" :placeholder="i18nPosts('code')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
