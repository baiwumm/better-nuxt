<script setup lang="ts">
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { getInternalizationList, insertInternalization, updateInternalization, delInternalization } = useSystemApi()
const { i18nCommon } = useMessage()

const toast = useToast()

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

// 获取国际化列表
const { data, pending: loading, refresh } = await useAsyncData(
  'internalization',
  async () => {
    const res = await getInternalizationList({ ...query })
    return res.data ?? []
  },
)

const { columns } = useInternalizationColumns({
  saveLoading,
  deleteId,
  onAddChild: (row) => {
    parentId.value = row.id
    open.value = true
  },
  onEdit: (row) => {
    editData.value = row
    open.value = true
  },
  onDelete: handleDelete,
})

const columnVisibility = ref({
})

// 列固定
const columnPinning = ref({
  left: ['name'],
  right: ['action'],
})

// 重置回调
function handleReset() {
  Object.assign(query, {
    name: undefined,
    zh: undefined,
  })

  refresh()
}

// 删除回调
async function handleDelete(row: InternalizationTree) {
  deleteId.value = row.id
  await delInternalization(row.id).then(({ code }) => {
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

// 表单提交
async function handleSubmit(values: InsertInternalization) {
  saveLoading.value = true
  await (editData.value?.id ? updateInternalization({ ...values, id: editData.value.id }) : insertInternalization(values)).then(({ code }) => {
    if (isSuccess(code)) {
      toast.add({
        title: i18nCommon('saveSuccess'),
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
    <ClientOnly>
      <HeaderContent v-model="query" v-model:open="open" :handle-refresh="refresh" :handle-reset="handleReset" :loading :table="table?.tableApi" />
    </ClientOnly>
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
