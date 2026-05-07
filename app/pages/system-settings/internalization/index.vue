<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import FormModal from './components/FormModal.vue'

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const inputDate = useTemplateRef('inputDate')

const { getInternalizationList, insertInternalization, updateInternalization, delInternalization } = useSystemApi()

const toast = useToast()
const dayjs = useDayjs()

const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<Internalization | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)
const parentId = ref<string | null>(null)
const query = reactive<InternalizationQueryParams>({
  name: undefined,
  zh: undefined,
})
const createTime = ref({
  start: undefined,
  end: undefined,
})

// 获取国际化列表
const { data, pending: loading, refresh } = await useAsyncData(
  'internalization',
  async () => {
    const res = await getInternalizationList({
      ...query,
      startTime: createTime.value?.start ? dayjs(createTime.value.start).valueOf() : undefined,
      endTime: createTime.value?.end ? dayjs(createTime.value.end).valueOf() : undefined,
      ...query,
    })
    return res.data ?? []
  },
)

/**
 * @description: 列固定
 */
function getHeader(column: Column<InternalizationTree>, label: string, position: 'left' | 'right') {
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

const columns = computed<TableColumn<InternalizationTree>[]>(() => [
  {
    accessorKey: 'name',
    header: ({ column }) => getHeader(column, $t('pages.systemSettings.internalization.name'), 'left'),
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
          h(UBadge, { }, () => row.getValue('name')),
        ],
      )
    },
  },
  ...['zh', 'en'].map<TableColumn<InternalizationTree>>(key => ({
    accessorKey: key,
    header: $t(`pages.systemSettings.internalization.${key}`),
    cell: ({ row }) => {
      const val = row.getValue(key)
      return val ? h(UBadge, { variant: 'soft', color: 'neutral' }, () => row.getValue(key)) : '-'
    },
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
            label: $t('common.addChild'),
            color: 'neutral',
            variant: 'outline',
            size: 'xs',
            icon: 'lucide:plus',
            disabled: saveLoading.value,
            onClick: () => {
              parentId.value = row.original.id
              open.value = true
            },
          }),
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
})

// 列固定
const columnPinning = ref({
  left: ['name'],
  right: ['action'],
})

// 重置回调
function handleReset() {
  // 重置 query（保留响应式）
  Object.assign(query, {
    name: undefined,
    zh: undefined,
  })

  // 重置时间
  createTime.value = {
    start: undefined,
    end: undefined,
  }

  refresh()
}

// 删除回调
async function handleDelete(row: InternalizationTree) {
  deleteId.value = row.id
  await delInternalization(row.id).then(({ code }) => {
    if (isSuccess(code)) {
      toast.add({
        title: $t('common.deleteSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

// 表单提交
async function handleSubmit(values: InsertInternalization) {
  saveLoading.value = true
  await (editData.value?.id ? updateInternalization({ ...values, id: editData.value.id }) : insertInternalization(values)).then(({ code }) => {
    if (isSuccess(code)) {
      toast.add({
        title: $t('common.saveSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      open.value = false
      refresh()
    }
  }).finally(() => {
    saveLoading.value = false
  })
}

watch(open, (val) => {
  if (!val) {
    editData.value = null
    parentId.value = null
  }
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-start sm:items-center justify-between flex-wrap gap-2">
      <div class="flex items-start sm:items-center gap-2 flex-wrap">
        <UInput v-model:model-value="query.name" variant="outline" :placeholder="$t('pages.systemSettings.internalization.name')" />
        <UInput v-model:model-value="query.zh" variant="outline" :placeholder="$t('pages.systemSettings.internalization.zh')" />
        <UInputDate ref="inputDate" v-model="createTime" range>
          <template #trailing>
            <UPopover :reference="inputDate?.inputsRef[0]?.$el">
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-calendar"
                class="px-0"
              />
              <template #content>
                <UCalendar v-model="createTime" class="p-2" :number-of-months="2" range />
              </template>
            </UPopover>
          </template>
        </UInputDate>
        <UButton
          icon="lucide:search"
          :loading
          :label="$t('common.search')"
          @click="refresh"
        />
        <UButton
          icon="lucide:rotate-ccw"
          color="neutral"
          variant="soft"
          :label="$t('common.reset')"
          @click="handleReset"
        />
        <UButton
          icon="lucide:plus"
          color="neutral"
          variant="outline"
          :label="$t('common.add')"
          @click="open = true"
        />
      </div>
      <TableColumnVisibility v-if="table" :table="table?.tableApi" />
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
    <FormModal v-model="open" :data="editData" :internalization-tree="data || []" :loading="saveLoading" :parent-id="parentId" @submit="handleSubmit" />
  </div>
</template>
