<script lang="ts" setup>
const route = useRoute()
const { getNoticeDetail } = useAdministrativeApi()
const { i18nNotices } = useMessage()
const { getUserDisplayName } = useCurrentUser()
const { locale } = useI18n()
const siteConfig = useSiteConfig()
const tabStore = useTabStore()
const menuStore = useMenuStore()

const id = computed(() => route.params.id as string)

// 获取公告详情
const { data } = await useAsyncData(`notice-detail-${id.value}`, () => getNoticeDetail(id.value).then(res => res?.data), {
  watch: [id],
})

const typeRaw = computed(() => NOTICE_TYPE.raw(data.value?.type))
const userName = computed(() => getUserDisplayName(data.value?.author))
const email = computed(() => data.value?.author?.email)

watch(
  [
    () => data.value?.title,
    () => menuStore.menuTree,
  ],
  ([title]) => {
    const menu = menuStore.menuPathMap.get('/administrative/notices/:id')
    if (!title || !menu)
      return

    if (tabStore.ignoreNextAdd) {
      tabStore.ignoreNextAdd = false
      return
    }

    tabStore.addTag({
      ...menu,
      to: route.path,
      label: title,
    })
  },
  {
    immediate: true,
  },
)

useHead({
  titleTemplate: computed(() => data.value?.title ?? siteConfig.name),
})
</script>

<template>
  <div>
    <EmptyContainer v-if="!data" />
    <UPageHero
      v-else
      :title="data.title"
      :description="data.summary ?? undefined"
      :ui="{
        container: 'py-0! gap-0!',
        title: 'text-lg sm:text-xl',
        description: 'text-sm sm:text-base mt-2',
      }"
    >
      <template #headline>
        <UBadge variant="soft" :color="typeRaw?.color" :label="i18nNotices(`typeOpts.${typeRaw?.label}`)" />
      </template>
      <div class="space-y-4 mt-4">
        <USeparator />
        <div class="flex justify-between items-center">
          <UUser
            :name="userName"
            :description="userName === email ? undefined : email"
            :avatar="{
              src: data?.author?.image ?? undefined,
              alt: userName,
              loading: 'lazy',
            }"
            :ui="{ wrapper: 'text-left' }"
          />
          <NuxtTime v-if="data.publishedAt" :datetime="data.publishedAt" relative :locale class="text-xs text-muted" />
        </div>
        <USeparator />
        <MDC :value="data.content" />
      </div>
    </UPageHero>
  </div>
</template>
