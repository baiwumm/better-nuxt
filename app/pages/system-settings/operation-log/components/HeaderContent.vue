<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { map } from 'es-toolkit/compat'
import { METHODS } from '@/enums'

const props = defineProps<{
  table?: Table<Log>
  handleRefresh: VoidFunction
  loading: boolean
}>()

const toast = useToast()

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
      toast.add({
        title: $t('common.deleteSuccess'),
        icon: 'lucide:circle-check',
        color: 'success',
      })
      props.table?.resetRowSelection()
      props.handleRefresh()
    }
  }).finally(() => {
    delLoading.value = false
  })
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <USelectMenu
        v-model="query.userId"
        value-key="value"
        :items="userList?.map(({ id, name, username, email, image }) => {
          const userName = username || name || email?.[0]
          return {
            value: id,
            label: userName,
            avatar: {
              src: image ?? undefined,
              alt: userName,
              loading: 'lazy' as const,
            },
          }
        })"
        clear
        :loading="userloading"
        class="w-48"
        :placeholder="$t('pages.systemSettings.operationLog.user')"
      />
      <USelectMenu
        v-model="query.method"
        value-key="value"
        :items="METHODS.items.map(({ value, label, raw }) => ({ value, label, icon: raw.icon }))"
        clear
        class="w-48"
        :placeholder="$t('pages.systemSettings.operationLog.method')"
      />
      <UButton
        icon="lucide:search"
        :loading
        :label="$t('common.search')"
        @click="handleRefresh"
      />
      <UButton
        v-if="selectedRows.length"
        :label="$t('common.batchDelete')"
        color="error"
        variant="soft"
        icon="i-lucide-trash-2"
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
