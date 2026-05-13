<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<InternalizationTree>
  handleRefresh: VoidFunction
  handleReset: VoidFunction
  loading: boolean
}>()

const { i18nCommon, i18nInternalization } = useMessage()

const open = defineModel<boolean>('open', { required: true })
const query = defineModel<InternalizationQueryParams>({ required: true })
</script>

<template>
  <div class="flex items-start sm:items-center justify-between flex-wrap gap-2">
    <div class="flex items-start sm:items-center gap-2 flex-wrap">
      <UInput v-model:model-value="query.name" variant="outline" :placeholder="i18nInternalization('name')" />
      <UInput v-model:model-value="query.zh" variant="outline" :placeholder="i18nInternalization('zh')" />
      <UButton
        icon="lucide:search"
        :loading
        :label="i18nCommon('search')"
        @click="handleRefresh"
      />
      <UButton
        icon="lucide:rotate-ccw"
        color="neutral"
        variant="soft"
        :label="i18nCommon('reset')"
        @click="handleReset"
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
