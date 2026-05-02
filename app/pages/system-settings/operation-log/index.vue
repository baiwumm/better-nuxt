<script setup lang="ts">
import type { BadgeProps, TableColumn } from '@nuxt/ui'
import type { Column, PaginationState } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { METHODS } from '@/enums'
import HeaderContent from './components/HeaderContent.vue'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UUser = resolveComponent('UUser')
const UCheckbox = resolveComponent('UCheckbox')

const { getLogsList, delLogs } = useSystemApi()

const toast = useToast()
const dayjs = useDayjs()

const table = useTemplateRef('table')
const deleteId = ref<string | null>(null)
// 查询参数
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})
const query = reactive<System.LogParams>({
  userId: undefined,
  method: undefined,
})

// 获取操作日志列表
const { data, pending: loading, refresh } = useAsyncData(
  'operation-log',
  async () => {
    const res = await getLogsList({ page: pagination.value.pageIndex + 1, pageSize: pagination.value.pageSize, ...query })
    return res?.data
  },
)
const list = computed(() => data.value?.list ?? [])
const total = computed(() => data.value?.total ?? 0)

/**
 * @description: 列固定
 */
function getHeader(column: Column<System.Log>, label: string, position: 'left' | 'right') {
  const isPinned = column.getIsPinned()
  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isPinned ? 'lucide:pin-off' : 'lucide:pin',
    class: '-mx-2.5',
    onClick() {
      column.pin(isPinned === position ? false : position)
    },
    ui: {
      label: 'font-semibold',
    },
  })
}

const columns = computed<TableColumn<System.Log>[]>(() => [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        'color': 'neutral',
        'variant': 'ghost',
        'icon': 'lucide:chevron-right',
        'square': true,
        'aria-label': 'Expand',
        'ui': {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-90' : '',
          ],
        },
        'onClick': () => row.toggleExpanded(),
      }),
  },
  {
    id: 'batchSelect',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
  },
  {
    accessorKey: 'user',
    header: $t('pages.systemSettings.operationLog.user'),
    cell: ({ row }) => {
      const u = row.original.user
      const userName = u?.username || u?.name || u?.email?.[0]
      return h(UUser, {
        name: userName,
        description: u.email,
        avatar: {
          src: u.image,
          alt: userName,
          loading: 'lazy',
        },
        class: 'justify-center',
      })
    },
  },
  {
    accessorKey: 'method',
    header: $t('pages.systemSettings.operationLog.method'),
    cell: ({ row }) => {
      const val = row.original.method
      const colorMap: Record<System.Methods, BadgeProps['color']> = {
        [METHODS.GET]: 'success',
        [METHODS.POST]: 'warning',
        [METHODS.PUT]: 'info',
        [METHODS.DELETE]: 'error',
      }
      return h(UBadge, { variant: 'soft', color: colorMap[val] }, () => val)
    },
  },
  {
    accessorKey: 'os',
    header: $t('pages.systemSettings.operationLog.os'),
    cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('os')),
  },
  {
    accessorKey: 'browser',
    header: $t('pages.systemSettings.operationLog.browser'),
    cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('browser')),
  },
  {
    accessorKey: 'device',
    header: $t('pages.systemSettings.operationLog.device'),
    cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('device')),
  },
  {
    accessorKey: 'createdAt',
    header: $t('common.createdAt'),
    cell: ({ row }) => dayjs(row.original.createdAt).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => getHeader(column, $t('common.action'), 'right'),
    cell: ({ row }) => {
      return h(UButton, {
        label: $t('common.delete'),
        color: 'error',
        variant: 'soft',
        size: 'xs',
        icon: 'lucide:trash-2',
        disabled: deleteId.value !== null && row.original.id !== deleteId.value,
        loading: deleteId.value !== null && row.original.id === deleteId.value,
        onClick: () => handleDelete(row.original.id),
      })
    },
  },
])

const columnVisibility = ref({
})

// 刷新
async function handleRefresh() {
  await refresh()
}

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
        title: $t('common.deleteSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      handleRefresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

watch(
  pagination,
  () => {
    handleRefresh()
  },
  { deep: true },
)

onMounted(() => {
  handleRefresh()
})
</script>

<template>
  <div class="space-y-4">
    <HeaderContent v-model="query" :handle-refresh :loading :table="table?.tableApi" />
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:column-pinning="columnPinning"
      v-model:pagination="pagination"
      :loading
      :data="list"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: Math.ceil((total || 0) / pagination.pageSize),
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
          <div>{{ $t('pages.systemSettings.operationLog.action') }}: {{ row.original.action }}</div>
          <div v-if="row.original.params">
            {{ $t('pages.systemSettings.operationLog.params') }}: <pre>{{ row.original.params }}</pre>
          </div>
        </div>
      </template>
    </UTable>
    <div class="flex justify-between items-center flex-col sm:flex-row gap-4">
      <div class="text-sm text-muted">
        {{ $t('common.total', {
          from: pagination.pageIndex * pagination.pageSize + 1,
          to: Math.min((pagination.pageIndex + 1) * pagination.pageSize, total),
          total,
        }) }}
      </div>
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total
        @update:page="(page) => pagination.pageIndex = page - 1"
      />
    </div>
  </div>
</template>
