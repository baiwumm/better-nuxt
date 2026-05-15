<script setup lang="ts">
import type { ButtonProps, PageCardProps } from '@nuxt/ui'
import pkg from '@@/package.json'

const config = useRuntimeConfig()

const features = ref<PageCardProps[]>([
  {
    title: '现代化全栈架构',
    description: '基于 Nuxt.js + Better-auth + Nuxt UI + Drizzle ORM + PostgreSQL，构建高性能、类型安全的全栈应用，开发体验与运行效率兼备。',
    icon: 'i-heroicons-server-stack',
  },
  {
    title: '开箱即用的认证系统',
    description: '集成 Better-auth，支持多策略身份验证、会话管理与权限控制，为应用提供安全可靠的用户体系。',
    icon: 'i-heroicons-lock-closed',
  },
  {
    title: '可视化主题配置中心',
    description: '内置 18 种主题主色、明暗模式、圆角档位与路由动画，满足多品牌与个性化展示需求。',
    icon: 'i-heroicons-paint-brush',
  },
  {
    title: '动态菜单与国际化支持',
    description: '菜单管理、角色权限、多语言（中/英）一键切换，灵活适配企业级后台与多地域业务场景。',
    icon: 'i-heroicons-language',
  },
])

const links = computed<ButtonProps[]>(() => [
  {
    label: 'Github',
    to: pkg.git.url,
    target: '_blank',
    icon: 'simple-icons:github',
  },
  {
    label: $t('pages.hub.overview.start'),
    to: '/',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
])
</script>

<template>
  <div class="space-y-6">
    <UPageHero
      :description="config.public.appDesc"
      :links="links"
      :ui="{ container: '!py-0' }"
    >
      <template #headline>
        <UBadge>v{{ pkg.version }}</UBadge>
      </template>
      <template #title>
        Better <span class="text-primary">Nuxt</span>
      </template>
    </UPageHero>
    <UPageSection :ui="{ container: '!py-0' }">
      <UContainer class="max-w-5xl">
        <UPageGrid :ui="{ base: 'lg:grid-cols-2' }">
          <UPageCard
            v-for="(feature, index) in features"
            :key="index"
            variant="soft"
            v-bind="feature"
          />
        </UPageGrid>
      </UContainer>
    </UPageSection>
  </div>
</template>
