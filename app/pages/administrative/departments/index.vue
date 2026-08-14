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
const query = reactive<DepartmentQueryParams>({
  name: undefined,
  code: undefined,
})

// 用户列表与部门列表并行获取（避免串行瀑布）
const { data, pending: loading, refresh } = await useAsyncData(
  'department-list',
  async () => {
    const [userRes, depRes] = await Promise.all([
      getUserList({ page: userPage.value, pageSize: 10 }),
      getDepartmentList({ ...query }),
    ])
    // 用户选择器数据转换
    const userOptions = (userRes?.data?.list ?? []).map((item) => {
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
    })
    return {
      users: userOptions,
      departments: depRes?.data ?? [],
    }
  },
  {
    watch: [userPage],
    default: () => ({ users: [], departments: [] }),
  },
)
const userList = computed(() => data.value?.users ?? [])

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
  <div class="flex flex-col gap-4 h-full">
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
      sticky
      :loading
      :data="data?.departments || []"
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
      :department-tree="data?.departments || []"
      :loading="saveLoading"
      :form-key
      :user-list
      @submit="handleSubmit"
    />
  </div>
</template>
