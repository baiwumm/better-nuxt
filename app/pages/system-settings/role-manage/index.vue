<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { getRoleList, insertRole, updateRole, delRole } = useSystemApi()
const { i18nCommon } = useMessage()
const { successToast } = useAppToast()
const { initialPagination, pageSizeOptions } = usePagination()

const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<Role | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)
const formKey = ref(0)
// 查询参数
const query = reactive<Pick<RoleQueryParams, 'name' | 'code'>>({
  name: undefined,
  code: undefined,
})

const pagination = computed<PaginationState>(() => table.value?.tableApi?.getState().pagination ?? initialPagination)

// 获取角色列表
const { data, pending: loading, refresh } = await useAsyncData(
  'role-manage',
  async () => {
    const res = await getRoleList({ page: pagination.value.pageIndex + 1, pageSize: pagination.value.pageSize, ...query })
    return res?.data
  },
)

const list = computed(() => data.value?.list ?? [])
const total = computed(() => data.value?.total ?? 0)

const { columns } = useRoleColumns({
  saveLoading,
  deleteId,
  onEdit: (row) => {
    editData.value = row
    open.value = true
  },
  onDelete: handleDelete,
})

const columnVisibility = ref({})

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
  await delRole(id).then(({ code }) => {
    if (isSuccess(code)) {
      successToast(i18nCommon('deleteSuccess'))
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

// 表单提交
async function handleSubmit(values: InsertRole) {
  saveLoading.value = true
  await (editData.value?.id ? updateRole({ ...values, id: editData.value.id }) : insertRole(values)).then(({ code }) => {
    if (isSuccess(code)) {
      successToast(i18nCommon('saveSuccess'))
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
        v-model="query"
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
        tbody: 'relative',
        th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-center',
        tr: 'group',
        td: 'empty:p-0 group-has-[td:not(:empty)]:border-b border-default text-center',
      }"
    />
    <ClientOnly>
      <TablePagination v-if="table?.tableApi" :table="table?.tableApi" :total="total" :page-size-options="pageSizeOptions" />
    </ClientOnly>
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
