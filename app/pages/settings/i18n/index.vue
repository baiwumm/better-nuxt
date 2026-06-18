<script setup lang="ts">
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { getI18nList, insertI18n, updateI18n, delI18n } = useSettingsApi()
const { i18nCommon } = useMessage()
const { successToast } = useAppToast()

const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<I18n | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)
const parentId = ref<string | null>(null)
const formKey = ref(0)
const query = reactive<I18nQueryParams>({
  name: undefined,
  zh: undefined,
})

// 获取国际化列表
const { data, pending: loading, refresh } = await useAsyncData(
  'i18n',
  async () => {
    const res = await getI18nList({ ...query })
    return res.data ?? []
  },
)

const { columns } = useI18nColumns({
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

// 新增回调
function handleAdd() {
  open.value = true
  formKey.value++
}

// 重置回调
function handleReset() {
  Object.assign(query, {
    name: undefined,
    zh: undefined,
  })

  refresh()
}

// 删除回调
async function handleDelete(id: string) {
  deleteId.value = id
  await delI18n(id).then(({ code }) => {
    if (isSuccess(code)) {
      successToast({ title: i18nCommon('deleteSuccess') })
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

// 表单提交
async function handleSubmit(values: I18nFormSchema) {
  saveLoading.value = true
  await (editData.value?.id ? updateI18n({ ...values, id: editData.value.id }) : insertI18n(values)).then(({ code }) => {
    if (isSuccess(code)) {
      successToast({ title: i18nCommon('saveSuccess') })
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
  <div class="flex flex-col gap-4 h-full">
    <ClientOnly>
      <HeaderContent
        v-model="query"
        :refresh
        :handle-reset
        :handle-add
        :loading
        :table="table?.tableApi"
      />
    </ClientOnly>
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      v-model:column-pinning="columnPinning"
      sticky
      :loading
      :data
      :columns="columns"
      :get-sub-rows="(row) => row.children"
      :get-row-id="row => row.id"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-center truncate',
        tr: 'group',
        td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default text-center',
      }"
    />
    <FormModal
      v-model="open"
      :data="editData"
      :i18n-tree="data || []"
      :loading="saveLoading"
      :parent-id
      :form-key
      @submit="handleSubmit"
    />
  </div>
</template>
