<script setup lang="ts">
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { getMenuList, insertMenu, updateMenu, delMenu } = useSettingsApi()
const { i18nCommon } = useMessage()
const { successToast } = useAppToast()

const keyword = ref('')
const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<Menu | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)
const formKey = ref(0)

// 获取菜单列表
const { data, pending: loading, refresh } = await useAsyncData(
  'menu-manage',
  async () => {
    const res = await getMenuList({ keyword: keyword.value })
    return res.data ?? []
  },
)

const { columns } = useMenusColumns({
  saveLoading,
  deleteId,
  onEdit: (row) => {
    editData.value = row
    open.value = true
  },
  onDelete: handleDelete,
})

const columnVisibility = ref({
  createdAt: false,
})

// 列固定
const columnPinning = ref({
  left: ['label'],
  right: ['action'],
})

// 新增回调
function handleAdd() {
  open.value = true
  formKey.value++
}

// 删除回调
async function handleDelete(id: string) {
  deleteId.value = id
  await delMenu(id).then(({ code }) => {
    if (isSuccess(code)) {
      successToast({ title: i18nCommon('deleteSuccess') })
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

// 表单提交
async function handleSubmit(values: InsertMenu) {
  saveLoading.value = true
  await (editData.value?.id ? updateMenu({ ...values, id: editData.value.id }) : insertMenu(values)).then(({ code }) => {
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
  }
})
</script>

<template>
  <div class="space-y-4">
    <ClientOnly>
      <HeaderContent
        v-model="keyword"
        :refresh
        :handle-add
        :loading :table="table?.tableApi"
      />
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
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-center truncate',
        tr: 'group',
        td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default text-center',
      }"
    />
    <FormModal
      v-model="open"
      :data="editData"
      :menu-tree="data || []"
      :loading="saveLoading"
      :form-key
      @submit="handleSubmit"
    />
  </div>
</template>
