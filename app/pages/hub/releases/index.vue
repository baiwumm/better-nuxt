<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import pkg from '@@/package.json'

const { getReleasesList } = useCommonApi()
const appScrollContainer = useAppScrollContainer()

const links = computed<ButtonProps[]>(() => [
  {
    label: 'Star on Github',
    to: pkg.git.url,
    color: 'neutral',
    variant: 'subtle',
    icon: 'lucide:star',
  },
])

const { data: releases } = await useAsyncData(
  'releases',
  async () => {
    const res = await getReleasesList()
    return res.data ?? []
  },
  {
    default: () => [],
  },
)
</script>

<template>
  <div>
    <UPageHero
      :title="$t('pages.hub.releases.title')"
      :description="$t('pages.hub.releases.desc')"
      class="md:border-b border-default"
      :links="links"
      :ui="{ container: 'relative py-10 sm:py-16 lg:py-24' }"
    >
      <template #top>
        <div class="absolute z-[-1] rounded-full bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80" />
      </template>
      <template #headline>
        <UBadge icon="lucide:tag">
          {{ `v${pkg.version}` }}
        </UBadge>
      </template>
      <ClientOnly>
        <Particles class="w-full h-full z-[-1]" />
      </ClientOnly>
      <div aria-hidden="true" class="hidden md:block absolute z-[-1] border-x border-default inset-0 mx-4 sm:mx-6 lg:mx-8" />
    </UPageHero>
    <UPageSection :ui="{ container: '!py-0' }">
      <div class="py-4 md:py-8 lg:py-16 md:border-x border-default">
        <UContainer class="max-w-5xl">
          <UChangelogVersions v-if="appScrollContainer" :indicator="{ container: appScrollContainer }">
            <UChangelogVersion
              v-for="release in releases"
              :key="release.tag_name"
              :title="release.name"
              :date="release.created_at"
              :badge="{
                label: release.tag_name,
                icon: 'lucide:tag',
              }"
              :authors="[
                {
                  name: release.author.login,
                  avatar: {
                    src: release.author.avatar_url,
                    alt: release.author.login,
                    loading: 'lazy' as const,
                  },
                  to: release.author.html_url,
                  target: '_blank',
                },
              ]"
              :ui="{
                root: 'flex items-start',
                container: 'max-w-xl',
                header: 'border-b border-default pb-4',
                title: 'text-3xl',
                date: 'text-xs/9 text-highlighted font-mono',
                indicator: 'sticky top-0',
              }"
            >
              <template #body>
                <ClientOnly>
                  <MDC v-if="release.body" :value="release.body" />
                </ClientOnly>
              </template>
            </UChangelogVersion>
          </UChangelogVersions>
        </UContainer>
      </div>
    </UPageSection>
  </div>
</template>
