<script setup lang="ts">
import type { ContextMenuItem } from '@nuxt/ui'
import { motion } from 'motion-v'
import { useMenuStore } from '@/stores/useMenuStore'
import { useTabStore } from '@/stores/useTabStore'

const HOME_PATH = '/'

const menuStore = useMenuStore()
const tabStore = useTabStore()
const router = useRouter()

// 首页固定展示
const homeTag = computed(() => {
  if (!menuStore.menuTree) {
    return null
  }
  const item = findMenuByPath(menuStore.menuTree, HOME_PATH)
  return item || null
})

function getItems(tag: MenuTree | null): ContextMenuItem[][] {
  return [
    [
      {
        label: $t('components.multipleTabs.closeTag'),
        icon: 'lucide:x',
        disabled: tag?.to === HOME_PATH,
        onSelect() {
          if (!tag)
            return
          tabStore.closeTag(tag.to, router)
        },
      },
    ],
    [
      {
        label: $t('components.multipleTabs.closeLeft'),
        icon: 'lucide:arrow-left-to-line',
        disabled: tag?.to === HOME_PATH,
        onSelect() {
          if (!tag)
            return
          tabStore.closeLeft(tag.to, router)
        },
      },
      {
        label: $t('components.multipleTabs.closeRight'),
        icon: 'lucide:arrow-right-to-line',
        onSelect() {
          if (!tag)
            return
          tabStore.closeRight(tag.to, router)
        },
      },
    ],
    [
      {
        label: $t('components.multipleTabs.closeOthers'),
        icon: 'lucide:arrow-right-left',
        onSelect() {
          if (!tag)
            return
          tabStore.closeOthers(tag.to, router)
        },
      },
    ],
  ]
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UContextMenu :items="getItems(homeTag)">
      <UButton
        v-if="homeTag"
        :icon="homeTag.icon"
        :label="$t(homeTag.label)"
        :variant="tabStore.activePath === homeTag.to ? 'solid' : 'soft'"
        trailing-icon="lucide:pin"
        size="sm"
        class="transition-colors"
        @click="homeTag?.to && router.push({ path: homeTag.to })"
      />
    </UContextMenu>
    <template v-if="tabStore.tags.length">
      <motion.div
        v-for="tag in tabStore.tags"
        :key="tag.id"
        layout
        :initial="{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }"
        :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
        :exit="{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }"
        :transition="{ type: 'spring', stiffness: 500, damping: 30, duration: 0.75 }"
      >
        <UContextMenu :items="getItems(tag)">
          <UButton
            :icon="tag.icon"
            :label="$t(tag.label)"
            :variant="tabStore.activePath === tag.to ? 'solid' : 'soft'"
            size="sm"
            class="transition-colors"
            @click="tag?.to && router.push({ path: tag.to })"
          >
            <template #trailing>
              <div class="flex justify-center items-center rounded-full size-4 hover:bg-primary hover:text-inverted hover:cursor-auto transition-colors" @click.stop.prevent="tabStore.closeTag(tag.to, router)">
                <UIcon name="lucide:x" />
              </div>
            </template>
          </UButton>
        </UContextMenu>
      </motion.div>
    </template>
  </div>
</template>
