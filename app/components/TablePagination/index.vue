<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

const props = defineProps<{
  table: Table<any>
  total: number
  pageSizeOptions?: number[]
}>()

const { t } = useI18n()

const pagination = computed(() => props.table.getState().pagination)

const from = computed(() =>
  props.total === 0
    ? 0
    : pagination.value.pageIndex * pagination.value.pageSize + 1,
)

const to = computed(() =>
  Math.min(
    (pagination.value.pageIndex + 1) * pagination.value.pageSize,
    props.total,
  ),
)

function onPageChange(page: number) {
  props.table.setPagination({
    ...pagination.value,
    pageIndex: page - 1,
  })
}

function onPageSizeChange(size: number) {
  props.table.setPagination({
    pageIndex: 0,
    pageSize: size,
  })
}

const pageSizeItems = computed(() =>
  props.pageSizeOptions?.map(size => ({
    label: $t('common.pageSize', { size }),
    value: size,
  })),
)
</script>

<template>
  <div class="flex justify-between items-center flex-col sm:flex-row gap-4">
    <div class="text-sm text-muted">
      {{ t('common.total', { from, to, total }) }}
    </div>

    <div class="flex items-center gap-3">
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="total"
        @update:page="onPageChange"
      />

      <USelect
        v-if="pageSizeOptions?.length"
        :model-value="pagination.pageSize"
        :items="pageSizeItems"
        value-key="value"
        @update:model-value="onPageSizeChange"
      />
    </div>
  </div>
</template>
