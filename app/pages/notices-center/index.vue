<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { isNumber } from 'es-toolkit/predicate'
import NoticeContent from './components/NoticeContent.vue'
import NoticeList from './components/NoticeList.vue'
import NoticeSkeleton from './components/NoticeSkeleton.vue'

const { getNoticeList, getNoticeDetail } = useAdministrativeApi()
const noticeId = ref<string | null>(null)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
const { unreadCount } = useNotice()

const isPanelOpen = computed({
  get() {
    return !!noticeId.value
  },
  set(value: boolean) {
    if (!value) {
      noticeId.value = null
    }
  },
})

// 获取消息公告列表
const { data, pending: loading } = await useAsyncData(
  'notices-center-list',
  async () => {
    const res = await getNoticeList({ page: 1, pageSize: 999, published: true })
    return res?.data
  },
  {
    server: false,
  },
)
const list = computed(() => data.value?.list ?? [])

const {
  data: noticeDetail,
  pending,
} = useAsyncData(
  () => noticeId.value
    ? `notice-${noticeId.value}`
    : 'notice-empty',
  async () => {
    if (!noticeId.value) {
      return null
    }

    return await getNoticeDetail(noticeId.value).then(res => res?.data)
  },
  {
    watch: [noticeId],
    immediate: true,
    server: false,
    default: () => null,
  },
)

watch(noticeId, (id) => {
  if (!id) {
    return
  }

  const notice = data.value?.list?.find(
    item => item.id === id,
  )

  if (notice && !notice.isRead) {
    notice.isRead = true
    unreadCount.value = Math.max(
      0,
      unreadCount.value - 1,
    )
  }
})

const currentIndex = computed(() => {
  return list.value.findIndex(
    item => item.id === noticeId.value,
  )
})

function prevNotice() {
  const idx = currentIndex.value
  if (idx > 0) {
    noticeId.value = list.value[idx - 1]?.id ?? null
  }
}

function nextNotice() {
  const idx = currentIndex.value
  if (idx < list.value.length - 1) {
    noticeId.value = list.value[idx + 1]?.id ?? null
  }
}

const hasPrev = computed(() => isNumber(currentIndex.value) ? currentIndex.value > 0 : false)
const hasNext = computed(() => isNumber(currentIndex.value) ? currentIndex.value < list.value.length - 1 : false)
</script>

<template>
  <div class="flex-1 flex h-full overflow-hidden">
    <UDashboardPanel
      id="notices-list"
      :default-size="25"
      :min-size="20"
      :max-size="30"
      resizable
      :ui="{
        root: 'min-h-full',
      }"
    >
      <ClientOnly>
        <ContainerLoading v-if="loading" />
        <NoticeList v-model="noticeId" :notices="list" />
      </ClientOnly>
    </UDashboardPanel>
    <div class="hidden lg:flex flex-1 size-full min-h-full min-w-0">
      <div v-if="!noticeId" class="flex justify-center items-center size-full">
        <EmptyContainer
          :title="$t('pages.noticesCenter.emptyTitle')"
        />
      </div>

      <NoticeSkeleton v-else-if="pending" />

      <NoticeContent
        v-else-if="noticeDetail"
        :data="noticeDetail"
        :has-prev
        :has-next
        @prev="prevNotice"
        @next="nextNotice"
        @close="noticeId = null"
      />
    </div>
    <ClientOnly>
      <USlideover v-if="isMobile" v-model:open="isPanelOpen">
        <template #content>
          <NoticeSkeleton v-if="pending" />

          <NoticeContent
            v-else-if="noticeDetail"
            :data="noticeDetail"
            :has-prev
            :has-next
            @prev="prevNotice"
            @next="nextNotice"
            @close="noticeId = null"
          />
        </template>
      </USlideover>
    </ClientOnly>
  </div>
</template>
