<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { CellContext, Column } from '@tanstack/vue-table'
import FormModal from './components/FormModal.vue'

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')
const UButton = resolveComponent('UButton')
const USwitch = resolveComponent('USwitch')

const { getMenuList, insertMenu, updateMenu, delMenu } = useSystemApi()

const toast = useToast()
const dayjs = useDayjs()

const keyword = ref('')
const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<System.Menu | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)

// 获取菜单列表
const { data, pending: loading, refresh } = useAsyncData(
  'menu-manage',
  async () => {
    const res = await getMenuList({ keyword: keyword.value })
    return res.data ?? []
  },
)

/**
 * @description: 列固定
 */
function getHeader(column: Column<System.MenuTree>, label: string, position: 'left' | 'right') {
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

const columns = computed<TableColumn<System.MenuTree>[]>(() => [
  {
    accessorKey: 'label',
    header: ({ column }) => getHeader(column, $t('pages.systemSettings.menuManage.label'), 'left'),
    cell: ({ row }) => {
      return h(
        'div',
        {
          style: {
            paddingLeft: `${row.depth * 0.5}rem`,
          },
          class: 'flex items-center gap-2',
        },
        [
          h(UButton, {
            color: 'neutral',
            variant: 'outline',
            size: 'xs',
            icon: row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus',
            class: !row.getCanExpand() && 'invisible',
            ui: {
              base: 'p-0 rounded-sm',
              leadingIcon: 'size-4',
            },
            onClick: row.getToggleExpandedHandler(),
          }),
          h(UBadge, { }, () => $t(row.getValue('label'))),
        ],
      )
    },
  },
  {
    accessorKey: 'to',
    header: $t('pages.systemSettings.menuManage.to'),
    cell: ({ row }) => {
      const val = row.getValue('to')
      return val ? h(UBadge, { variant: 'soft', color: 'secondary' }, () => row.getValue('to')) : '-'
    },
  },
  {
    accessorKey: 'icon',
    header: $t('common.icon'),
    cell: ({ row }) => {
      return h(UIcon, { name: row.getValue('icon'), class: 'size-5' })
    },
  },
  {
    accessorKey: 'badge',
    header: $t('pages.systemSettings.menuManage.badge'),
    cell: ({ row }) => {
      const val = row.getValue('badge')
      return val ? h(UBadge, { variant: 'outline', color: 'neutral' }, () => row.getValue('badge')) : '-'
    },
  },
  ...['keepAlive', 'defaultOpen', 'enabled'].map(v => ({
    accessorKey: v,
    header: $t(`pages.systemSettings.menuManage.${v}`),
    cell: ({ row }: CellContext<System.MenuTree, unknown>) => h(USwitch, {
      disabled: true,
      uncheckedIcon: 'lucide:x',
      checkedIcon: 'lucide:check',
      modelValue: row.getValue(v),
      ui: { root: 'justify-center' },
    }),
  })),
  {
    accessorKey: 'sort',
    header: $t('common.sort'),
    cell: ({ row }) => h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue('sort')),
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
      return h(
        'div',
        {
          class: 'flex justify-center items-center gap-2',
        },
        [
          h(UButton, {
            label: $t('common.edit'),
            color: 'neutral',
            variant: 'outline',
            size: 'xs',
            icon: 'lucide:pencil-line',
            disabled: saveLoading.value,
            onClick: () => {
              editData.value = row.original
              open.value = true
            },
          }),
          h(UButton, {
            label: $t('common.delete'),
            color: 'error',
            variant: 'soft',
            size: 'xs',
            icon: 'lucide:trash-2',
            disabled: deleteId.value !== null && row.original.id !== deleteId.value,
            loading: deleteId.value !== null && row.original.id === deleteId.value,
            onClick: () => handleDelete(row.original),
          }),
        ],
      )
    },
  },
])

const columnVisibility = ref({
  createdAt: false,
})

// 刷新
async function handleRefresh() {
  await refresh()
}

// 列固定
const columnPinning = ref({
  left: ['label'],
  right: ['action'],
})

// 删除回调
async function handleDelete(row: System.MenuTree) {
  deleteId.value = row.id
  await delMenu(row.id).then(({ code }) => {
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

// 表单提交
async function handleSubmit(values: System.InsertMenu) {
  saveLoading.value = true
  await (editData.value?.id ? updateMenu({ ...values, id: editData.value.id }) : insertMenu(values)).then(({ code }) => {
    if (isSuccess(code)) {
      toast.add({
        title: $t('common.saveSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      open.value = false
      handleRefresh()
    }
  }).finally(() => {
    saveLoading.value = false
  })
}

watch(open, (val) => {
  if (!val) {
    editData.value = null
  }
})

onMounted(() => {
  handleRefresh()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 ">
        <UInput v-model:model-value="keyword" icon="lucide:search" variant="outline" :placeholder="$t('common.searchKeyword')" />
        <UButton
          icon="lucide:search"
          :loading
          :label="$t('common.search')"
          @click="handleRefresh"
        />
        <UButton
          icon="lucide:plus"
          color="neutral"
          variant="outline"
          :label="$t('common.add')"
          @click="open = true"
        />
      </div>
      <TableColumnVisibility v-if="table?.tableApi" :table="table.tableApi" />
    </div>
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:column-pinning="columnPinning"
      :loading
      :data
      :columns="columns"
      :get-sub-rows="(row) => row.children"
      :get-row-id="row => row.id"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-center',
        tr: 'group',
        td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default text-center',
      }"
    />
    <FormModal v-model="open" :data="editData" :menu-tree="data || []" :loading="saveLoading" @submit="handleSubmit" />
  </div>
</template>
