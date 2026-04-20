<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem, NavigationMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'

const open = ref(false)

const items = ref<NavigationMenuItem[][]>([[{
  label: $t('pages.dashboard.title'),
  icon: 'lucide:monitor',
  to: '/dashboard',
  badge: 'New',
}, {
  label: $t('pages.systemSettings.title'),
  icon: 'i-lucide-settings',
  defaultOpen: true,
  type: 'trigger',
  children: [{
    label: $t('pages.systemSettings.userManage.title'),
    icon: 'ri:group-line',
    to: '/system-settings/user-manage',
  }],
}], [{
  label: 'Github',
  icon: 'simple-icons:github',
  to: pkg.git.url,
  target: '_blank',
}, {
  label: 'Blog',
  icon: 'i-lucide-house',
  to: 'https://baiwumm.com',
  target: '_blank',
}]])

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: items.value.flat(),
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <SidebarLogo :collapsed />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed
          :items="items[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed
          :items="items[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups as CommandPaletteGroup<CommandPaletteItem>[]" />

    <slot />
  </UDashboardGroup>
</template>
