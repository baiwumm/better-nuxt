<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import type { SubmitForm } from './components/FormModal.vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { pick } from 'es-toolkit/object'
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { initialPagination, pageSizeOptions } = usePagination()
const { getUserList } = useSystemApi()
const { $authClient } = useNuxtApp()
const toast = useToast()
const { i18nCommon } = useMessage()
const confirm = useConfirmDialog()

const table = useTemplateRef('table')
const pagination = computed<PaginationState>(() => table.value?.tableApi?.getState().pagination ?? initialPagination)
const open = ref(false)
const editData = ref<User | null>(null)
const saveLoading = ref(false)
const deleteLoading = ref(false)
const formKey = ref(0)

// 查询参数
const query = reactive<Pick<UserQueryParams, 'keyword'>>({
  keyword: undefined,
})

// 获取用户列表
const { data, pending: loading, refresh } = await useAsyncData(
  'user-manage',
  async () => {
    const res = await getUserList({ page: pagination.value.pageIndex + 1, pageSize: pagination.value.pageSize, ...query })
    return res?.data
  },
  {
    // 如果存在待处理的请求，则完全不发出新的请求
    dedupe: 'defer',
  },
)
const list = computed(() => data.value?.list ?? [])
const total = computed(() => data.value?.total ?? 0)

const { columns } = userUserColumns({
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
  left: ['user'],
  right: ['action'],
})

// 新增回调
function handleAdd() {
  open.value = true
  formKey.value++
}

// 删除回调
async function handleDelete(id: string) {
  deleteLoading.value = true
  const confirmed = await confirm({
    title: i18nCommon('confirmDeleteTitle'),
    description: i18nCommon('confirmDeleteDescription'),
    confirmLabel: i18nCommon('confirmDelete'),
    loadingLabel: i18nCommon('inDelete'),
    onConfirm: async () => {
      const { error } = await $authClient.admin.removeUser({
        userId: id,
      })
      if (error) {
        toast.add({
          title: error.message || i18nCommon('deleteFailed'),
          color: 'error',
          icon: 'lucide:x',
        })
        return false
      }
      return true
    },
  })
  if (confirmed) {
    toast.add({
      title: i18nCommon('deleteSuccess'),
      icon: 'lucide:circle-check',
      color: 'success',
    })
    refresh()
  }
}

// toast 提示
function handleToast(msg?: string) {
  if (msg) {
    toast.add({
      title: msg,
      color: 'error',
      icon: 'lucide:x',
    })
  }
  else {
    toast.add({
      title: i18nCommon('saveSuccess'),
      icon: 'lucide:circle-check',
      color: 'success',
    })
    open.value = false
    refresh()
  }
}

// 表单提交
async function handleSubmit(values: SubmitForm) {
  saveLoading.value = true
  if (editData.value?.id) {
    const { error } = await $authClient.admin.updateUser({
      userId: editData.value.id,
      data: values,
    })
    handleToast(error?.message)
  }
  else {
    const { displayUsername, ...formData } = values
    const { error } = await $authClient.admin.createUser(({
      ...formData,
      data: {
        displayUsername,
      },
    }))
    handleToast(error?.message)
  }
  saveLoading.value = false
}

watch(
  () => pagination.value,
  () => {
    refresh()
  },
  { deep: true },
)

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
        v-if="table?.tableApi"
        v-model="query"
        :refresh
        :handle-add
        :loading
        :table="table?.tableApi"
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
