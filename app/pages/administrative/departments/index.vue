<script setup lang="ts">
import FormModal from './components/FormModal.vue'
import HeaderContent from './components/HeaderContent.vue'

const { getDepartmentList, insertDepartment, updateDepartment, delDepartment } = useAdministrativeApi()
const { i18nCommon } = useMessage()
const { successToast } = useAppToast()
const { getUserList } = useSettingsApi()
const { getUserDisplayName } = useCurrentUser()

const table = useTemplateRef('table')
const open = ref(false)
const editData = ref<Department | null>(null)
const saveLoading = ref(false)
const deleteId = ref<string | null>(null)
const formKey = ref(0)
const userPage = ref(1)

// 查询参数
const query = reactive<Pick<DepartmentQueryParams, 'name' | 'code'>>({
  name: undefined,
  code: undefined,
})

// 获取用户列表
const { data: userList } = await useAsyncData(
  'departments-users',
  async () => {
    const res = await getUserList({ page: userPage.value, pageSize: 10 })
    return res?.data ?? []
  },
  {
    watch: [userPage],
    default: () => [],
    transform: (data) => {
      return data.list.map((item) => {
        const label = getUserDisplayName(item)
        return {
          ...item,
          label,
          value: item.id,
          avatar: {
            src: item.image ?? undefined,
            alt: label,
            loading: 'lazy' as const,
          },
        }
      }) ?? []
    },
  },
)

// 获取部门列表
const { data, pending: loading, refresh } = await useAsyncData(
  'department-list',
  async () => {
    const res = await getDepartmentList({ ...query })
    return res?.data ?? []
  },
)

const { columns } = useDepartmentsColumns({
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
  left: ['name'],
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
  await delDepartment(id).then(({ code }) => {
    if (isSuccess(code)) {
      successToast({ title: i18nCommon('deleteSuccess') })
      refresh()
    }
  }).finally(() => {
    deleteId.value = null
  })
}

// 表单提交
async function handleSubmit(values: InsertDepartment) {
  saveLoading.value = true
  await (editData.value?.id ? updateDepartment({ ...values, id: editData.value.id }) : insertDepartment(values)).then(({ code }) => {
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
      v-model:user-page="userPage"
      :data="editData"
      :department-tree="data || []"
      :loading="saveLoading"
      :form-key
      :user-list
      @submit="handleSubmit"
    />
  </div>
</template>
