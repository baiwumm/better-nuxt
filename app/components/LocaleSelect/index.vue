<script setup lang="ts">
import { en, zh_cn } from '@nuxt/ui/locale'

type Locale = 'en' | 'zh-CN'

const { locale, setLocale } = useI18n()
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="[en, zh_cn]"
    @update:model-value="setLocale($event as Locale)"
  />
</template>
n
