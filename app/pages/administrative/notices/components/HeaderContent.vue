<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

defineProps<{
  table?: Table<Notice>
  refresh: VoidFunction
  handleAdd: VoidFunction
  loading: boolean
}>()

const { i18nNotices } = useMessage()
const { getNoticesUserList } = useAdministrativeApi()
const { getUserDisplayName } = useCurrentUser()

// 获取作者列表
const { data: userList, pending: userloading } = await useAsyncData(
  'notices-users',
  async () => {
    const res = await getNoticesUserList()
    return res?.data ?? []
  },
)

const query = defineModel<Pick<NoticeQueryParams, 'userId' | 'title' | 'type'>>({ required: true })

const typeItems = computed(() => NOTICE_TYPE.items.map(({ value, label, raw }) => ({ label: i18nNotices(label), value, icon: raw.icon })))
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2 ">
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
        :placeholder="i18nNotices('author')"
      />
      <USelectMenu
        v-model="query.type"
        value-key="value"
        :items="typeItems"
        clear
        class="w-48"
        :placeholder="i18nNotices('type')"
      />
      <UInput v-model="query.title" variant="outline" :placeholder="i18nNotices('title')" />
      <AutoFormSearchButton :loading @refresh="refresh" />
      <AutoFormAddButton @add="handleAdd" />
    </div>
    <TableColumnVisibility v-if="table" :table="table" />
  </div>
</template>
