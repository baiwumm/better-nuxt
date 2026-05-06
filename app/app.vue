<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const menuStore = useMenuStore()
const appStore = useAppStore()

const { locale, setLocaleMessage } = useI18n()
const { getLocales } = useSystemApi()

const localeMap = {
  'en': 'en',
  'zh-CN': 'zh_cn',
} as const

const uiLocale = computed(() => locales[localeMap[locale.value]])

const lang = computed(() => uiLocale.value.code)
const dir = computed(() => uiLocale.value.dir)
const isReady = ref(false)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})

useFaviconFromTheme()

onMounted(() => {
  // 加载必要的初始化数据（如用户信息、配置等）
  Promise.all([
    getLocales(),
  ]).then(([localeRes]) => {
    if (isSuccess(localeRes.code)) {
      const data = localeRes?.data ?? {}
      for (const key in data) {
        setLocaleMessage(key, data[key as Locale])
      }
    }
  }).finally(() => {
    isReady.value = true
  })
})
</script>

<template>
  <div v-if="!isReady" class="fixed inset-0 flex w-screen h-screen justify-center items-center flex-col z-999 overflow-hidden bg-default">
    <LoadingContent />
  </div>
  <UApp v-else :locale="uiLocale" :toaster="{ position: 'top-center', duration: 2000 }">
    <UTheme
      :ui="{
        button: {
          base: 'cursor-pointer',
        },
      }"
    >
      <FullLoading />
      <NuxtLoadingIndicator color="var(--ui-primary)" />
      <UMain>
        <NuxtLayout>
          <NuxtPage
            :transition="{ name: appStore.transition, mode: 'out-in' }"
            :keepalive="{ include: menuStore.keepAliveList }"
          />
        </NuxtLayout>
      </UMain>
    </UTheme>
  </UApp>
</template>
