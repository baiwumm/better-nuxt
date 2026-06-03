<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { map } from 'es-toolkit/compat'
import { METHODS, PERMISSIONS } from '@/enums'

const props = defineProps<{
  table: Table<Log>
  refresh: VoidFunction
  loading: boolean
}>()

const route = useRoute()
const { i18nLog, i18nCommon, i18nPermissions } = useMessage()
const { getUserDisplayName } = useCurrentUser()
const { successToast } = useAppToast()
const { hasPermission } = usePermissions()

const query = defineModel<Pick<LogQueryParams, 'userId' | 'method'>>({ required: true })
const delLoading = ref(false)

const { getLogsUserList, delLogs } = useSystemApi()

// 获取操作用户列表
const { data: userList, pending: userloading } = await useAsyncData(
  'operation-log-users',
  async () => {
    const res = await getLogsUserList()
    return res?.data ?? []
  },
)

const selectedRows = computed(() =>
  props.table?.getSelectedRowModel().rows.map(r => r.original) || [],
)

// 批量删除回调
async function handleBatchDelete() {
  const ids = map(selectedRows.value, 'id')
  delLoading.value = true
  await delLogs({ ids }).then(({ code }) => {
    if (isSuccess(code)) {
      successToast({ title: i18nCommon('deleteSuccess') })
      props.table?.resetRowSelection()
      props.refresh()
    }
  }).finally(() => {
    delLoading.value = false
  })
}

const raw = computed(() => PERMISSIONS.raw(PERMISSIONS.BATCH_DELETE))
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <USelectMenu
        v-model="query.userId"
        value-key="value"
        :items="userList?.map(u => {
          const userName = getUserDisplayName(u)
          return {
            value: u.id,
            label: userName,
            avatar: {
              src: u.image ?? undefined,
              alt: userName,
              loading: 'lazy' as const,
            },
          }
        })"
        clear
        :loading="userloading"
        class="w-48"
        :placeholder="i18nLog('user')"
      />
      <USelectMenu
        v-model="query.method"
        value-key="value"
        :items="METHODS.items.map(({ value, label, raw }) => ({ value, label, icon: raw.icon }))"
        clear
        class="w-48"
        :placeholder="i18nLog('method')"
      />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <UButton
        v-if="selectedRows.length && hasPermission(route.path, raw.bits)"
        :label="i18nPermissions(raw.label)"
        color="error"
        variant="soft"
        :icon="raw.icon"
        :loading="delLoading"
        @click="handleBatchDelete"
      >
        <template #trailing>
          <UKbd>
            {{ selectedRows.length }}
          </UKbd>
        </template>
      </UButton>
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
