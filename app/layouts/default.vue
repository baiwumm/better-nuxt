<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem, NavigationMenuItem } from '@nuxt/ui'
import pkg from '~~/package.json'

const menuStore = useMenuStore()
const tabStore = useTabStore()
const siteConfig = useSiteConfig()

const open = ref(false)
const route = useRoute()
const { menuItems } = useMenu()
const appScrollContainer = useAppScrollContainer()

const skeletonWidths = computed(() => {
  return Array.from({ length: 6 }, () => {
    const widths = ['w-[70%]', 'w-[75%]', 'w-[80%]', 'w-[85%]', 'w-[90%]']
    return widths[Math.floor(Math.random() * widths.length)]
  })
})

// 动态标题
const title = computed(() => {
  if (!menuStore.menuPathMap) {
    return ''
  }
  const menu = menuStore.menuPathMap.get(route.path)
  return menu?.label ? $t(menu.label) : ''
})

const groups = computed(() => [{
  id: 'searchMenu',
  label: $t('layout.searchMenu'),
  items: menuItems.value,
}, {
  id: 'friendLink',
  label: $t('layout.friendLink'),
  items: [
    {
      label: $t('layout.github'),
      icon: 'simple-icons:github',
      to: pkg.git.url,
      target: '_blank',
    },
    {
      label: $t('layout.blog'),
      icon: 'lucide:house',
      to: 'https://baiwumm.com',
      target: '_blank',
    },
  ],
}] as CommandPaletteGroup<CommandPaletteItem>[])

watch(
  () => [route.path, menuStore.menuTree],
  () => {
    if (!menuStore.menuTree?.length)
      return

    const path = route.path

    tabStore.setActive(path)

    if (path === '/')
      return

    const menu = menuStore.menuPathMap.get(path)

    if (!menu)
      return

    // 🚨 关键修复点
    if (tabStore.ignoreNextAdd) {
      tabStore.ignoreNextAdd = false
      return
    }

    tabStore.addTag(menu)
  },
  { immediate: true },
)

useHead({
  titleTemplate: computed(() => {
    return title.value ? `${title.value} - ${siteConfig.name}` : siteConfig.name
  }),
})

onMounted(async () => {
  await menuStore.init()
})

onMounted(() => {
  appScrollContainer.value = document.querySelector('.app-scroll-container')
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
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

        <div v-if="menuStore.loading" class="grid gap-2">
          <USkeleton
            v-for="(width, index) in skeletonWidths"
            :key="index"
            class="h-4"
            :class="width"
          />
        </div>

        <UNavigationMenu
          v-else
          :collapsed
          :items="menuItems as NavigationMenuItem[]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed
          :items="groups[1]?.items"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />
    <UDashboardPanel id="app-container" :ui="{ body: 'app-scroll-container' }">
      <template #header>
        <UDashboardNavbar>
          <template #title>
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-500"
              enter-from-class="opacity-0 translate-x-[-10px] blur-sm"
              enter-to-class="opacity-100 translate-x-0 blur-0"
              leave-active-class="transition-all duration-500"
              leave-from-class="opacity-100 translate-x-0 blur-0"
              leave-to-class="opacity-0 translate-x-[10px] blur-sm"
            >
              <span :key="title" class="block">
                {{ title }}
              </span>
            </Transition>
          </template>
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>
          <template #right>
            <div class="flex items-center gap-2">
              <FullScreen />
              <ThemePicker />
            </div>
          </template>
        </UDashboardNavbar>
        <UDashboardToolbar>
          <MultipleTabs />
        </UDashboardToolbar>
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
