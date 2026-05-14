<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'
import { getColor } from '@/utils/constants'

defineProps<{
  collapsed?: boolean
}>()

// 获取登录用户信息
const { userName, email, avatar, isPending } = useCurrentUser()
// 获取多会话信息
const { sessionItems } = await useSessionMenu()
// 用户操作
const { logout } = useAuthActions()

const { $authClient } = useNuxtApp()
const lastMethod = $authClient.getLastUsedLoginMethod()

const { themeItems } = useThemeMenu()

const items = computed(() => ([
  [{
    type: 'label',
    label: userName.value,
    avatar: {
      src: avatar.value,
      alt: userName.value,
      loading: 'lazy',
    },
  }],
  themeItems.value,
  [
    {
      label: $t('layout.github'),
      icon: 'simple-icons:github',
      to: pkg.git.url,
      target: '_blank',
    },
    {
      label: $t('layout.blog'),
      icon: 'i-lucide-house',
      to: 'https://baiwumm.com',
      target: '_blank',
    },
  ],
  [
    {
      label: $t('layout.lastMethod'),
      icon: 'lucide:key-round',
      kbds: lastMethod ? [lastMethod] : undefined,
    },
    {
      label: $t('layout.switchAccount'),
      icon: 'lucide:users',
      children: sessionItems.value,
    },
    {
      label: $t('auth.logout.title'),
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: logout,
    },
  ],
]) satisfies DropdownMenuItem[][])
</script>

<template>
  <ClientOnly>
    <div v-if="isPending" class="flex justify-center w-full">
      <Spinner />
    </div>
    <UDropdownMenu
      v-else
      :items="items"
      arrow
      :content="{ align: 'center', collisionPadding: 12 }"
      :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        block
        :square="collapsed"
        class="data-[state=open]:bg-elevated"
        :ui="{
          trailingIcon: 'text-dimmed',
        }"
        :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
      >
        <UUser
          :name="collapsed ? undefined : userName"
          :description="collapsed || userName === email ? undefined : email"
          :avatar="{
            src: avatar,
            alt: userName,
            loading: 'lazy',
          }"
          :chip="{
            color: 'success',
            position: 'bottom-right',
          }"
          :ui="{ wrapper: 'text-left' }"
        />
      </UButton>
      <template #primary-leading="{ item }">
        <div class="inline-flex items-center justify-center shrink-0 size-5">
          <span
            :class="cn('inline-block size-2 rounded-full', item.chip === 'black' ? 'bg-black dark:bg-white' : '')"
            :style="{
              backgroundColor: item.chip === 'black' ? undefined : getColor(item.chip, 500),
            }"
          />
        </div>
      </template>

      <template #locales-leading="{ item }">
        <span>{{ item.icon }}</span>
      </template>
    </UDropdownMenu>
  </ClientOnly>
</template>
