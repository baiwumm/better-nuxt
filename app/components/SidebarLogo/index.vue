<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import pkg from '@@/package.json'

defineProps<{
  collapsed?: boolean
}>()

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: $t('components.sidebarLogo.version'),
      icon: 'lucide:tag',
      slot: 'version' as const,
    },
  ],
  [
    {
      label: $t('components.sidebarLogo.title'),
      icon: 'lucide:code',
    },
    {
      label: 'Nuxt.js',
      icon: 'skill-icons:nuxtjs-dark',
      to: 'https://nuxt.com',
      target: '_blank',
    },
    {
      label: 'Nuxt UI',
      icon: 'logos:nuxt-icon',
      to: 'https://ui.nuxt.com',
      target: '_blank',
    },
    {
      label: 'Better Auth',
      icon: 'simple-icons:betterauth',
      to: 'https://better-auth.com',
      target: '_blank',
    },
    {
      label: 'Drizze',
      icon: 'material-icon-theme:drizzle',
      to: 'https://orm.drizzle.team',
      target: '_blank',
    },
    {
      label: 'Pinia',
      icon: 'skill-icons:pinia-dark',
      to: 'https://pinia.vuejs.org',
      target: '_blank',
    },
  ],
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    arrow
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
    >
      <div class="flex items-center gap-2 font-bold text-base">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1792 1792"><path fill="var(--ui-primary)" d="M1792 336v1120q0 139-98.5 237.5T1456 1792H336q-139 0-237.5-98.5T0 1456V336Q0 197 98.5 98.5T336 0h1120q139 0 237.5 98.5T1792 336m-685 1089q14 19 24 30.5t35.5 24.5t57.5 13h149q31 0 52.5-21.5t21.5-52.5V373q0-31-21.5-52.5T1373 299h-149q-31 0-53 21.5t-22 52.5v671L685 367q-13-19-24-31t-36-24.5t-57-12.5H419q-31 0-52.5 21.5T345 373v1046q0 31 21.5 52.5T419 1493h149q31 0 53-21.5t22-52.5V748z" />
        </svg>
        <template v-if="!collapsed">
          <span>Nuxt</span>
          <span class="text-primary">ProMax</span>
        </template>
      </div>
    </UButton>
    <template #version-trailing>
      <UBadge variant="soft">
        {{ pkg.version }}
      </UBadge>
    </template>
  </UDropdownMenu>
</template>
