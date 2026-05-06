<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const menuStore = useMenuStore()
const appStore = useAppStore()

const { locale, setLocaleMessage } = useI18n()
const { getLocales } = useSystemApi()
const { data: localeRes } = await useAsyncData('locales', () => getLocales())
const code = localeRes.value?.code

if (code && isSuccess(code)) {
  const data = localeRes.value?.data
  for (const key in data) {
    setLocaleMessage(key, data[key as Locale])
  }
}

const localeMap = {
  'en': 'en',
  'zh-CN': 'zh_cn',
} as const

const uiLocale = computed(() => locales[localeMap[locale.value]])

const lang = computed(() => uiLocale.value.code)
const dir = computed(() => uiLocale.value.dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
})

useFaviconFromTheme()
</script>

<template>
  <UApp :locale="uiLocale" :toaster="{ position: 'top-center', duration: 2000 }">
    <UTheme
      :ui="{
        button: {
          base: 'cursor-pointer',
        },
      }"
    >
      <FullLoading />
      <UMain>
        <ClientOnly>
          <NuxtLoadingIndicator color="var(--ui-primary)" />
        </ClientOnly>
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
