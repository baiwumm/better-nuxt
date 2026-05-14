<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<MenuTree>
  handleRefresh: VoidFunction
  loading: boolean
}>()

const { i18nCommon } = useMessage()

const open = defineModel<boolean>('open', { required: true })
const keyword = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
      <UInput v-model:model-value="keyword" icon="lucide:search" variant="outline" :placeholder="i18nCommon('searchKeyword')" />
      <UButton
        icon="lucide:search"
        :loading
        :label="i18nCommon('search')"
        @click="handleRefresh"
      />
      <UButton
        icon="lucide:plus"
        color="neutral"
        variant="outline"
        :label="i18nCommon('add')"
        @click="open = true"
      />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
