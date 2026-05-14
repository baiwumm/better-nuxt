<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import HeaderContent from './components/HeaderContent.vue'

const { getLogsList, delLogs } = useSystemApi()
const { i18nCommon, i18nLog } = useMessage()
const { initialPagination, pageSizeOptions } = usePagination()

const toast = useToast()

const table = useTemplateRef('table')
const deleteId = ref<string | null>(null)
// 查询参数
const query = reactive<Pick<LogQueryParams, 'userId' | 'method'>>({
  userId: undefined,
  method: undefined,
})

const pagination = computed<PaginationState>(() => table.value?.tableApi?.getState().pagination ?? initialPagination)

// 获取操作日志列表
const { data, pending: loading, refresh } = await useAsyncData(
  'operation-log',
  async () => {
    const res = await getLogsList({ page: pagination.value.pageIndex + 1, pageSize: pagination.value.pageSize, ...query })
    return res?.data
  },
  {
    // 如果存在待处理的请求，则完全不发出新的请求
    dedupe: 'defer',
  },
)
const list = computed(() => data.value?.list ?? [])
const total = computed(() => data.value?.total ?? 0)

const { columns } = useLogColumns({
  deleteId,
  onDelete: handleDelete,
})

const columnVisibility = ref({
})

// 列固定
const columnPinning = ref({
  right: ['action'],
})

// 删除回调
async function handleDelete(id: string) {
  deleteId.value = id
  await delLogs({ ids: [id] }).then(({ code }) => {
    if (isSuccess(code)) {
      toast.add({
        title: i18nCommon('deleteSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

watch(
  () => pagination.value,
  () => {
    refresh()
  },
  { deep: true },
)
</script>

<template>
  <div class="space-y-4">
    <ClientOnly>
      <HeaderContent v-if="table?.tableApi" v-model="query" :handle-refresh="refresh" :loading :table="table?.tableApi" />
    </ClientOnly>
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:column-pinning="columnPinning"
      :loading
      :data="list"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil((total || 0) / initialPagination.pageSize),
        manualPagination: true,
      }"
      :get-row-id="row => row.id"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-center',
        tr: 'group',
        td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default text-center',
      }"
    >
      <template #expanded="{ row }">
        <div class="space-y-2 text-left">
          <div>{{ i18nLog('action') }}: {{ row.original.action }}</div>
          <div v-if="row.original.params">
            {{ i18nLog('params') }}: <pre>{{ row.original.params }}</pre>
          </div>
        </div>
      </template>
    </UTable>
    <ClientOnly>
      <TablePagination v-if="table?.tableApi" :table="table?.tableApi" :total="total" :page-size-options="pageSizeOptions" />
    </ClientOnly>
  </div>
</template>
