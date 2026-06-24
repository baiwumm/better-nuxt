<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { shuffle } from 'es-toolkit/array'
import { motion } from 'motion-v'

interface Item {
  src: string
  title: string
  width: number
  height: number
}

const visibleRef = ref(false)
const indexRef = ref(0)
const isRegenerating = ref(false)

function generateRandomImages(count = 50): Item[] {
  return Array.from({ length: count }).map(() => {
    const width = faker.number.int({ min: 200, max: 500 })
    const height = faker.number.int({ min: 200, max: 500 })

    return {
      src: faker.image.urlPicsumPhotos({ width, height, blur: 0 }),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      width,
      height,
    }
  })
}

const images = ref(generateRandomImages(50))

function showImg(index: number) {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => (visibleRef.value = false)

// 重新生成图片并触发重新排版
async function regenerateImages() {
  isRegenerating.value = true

  // 模拟异步操作，让动画更平滑
  await new Promise(resolve => setTimeout(resolve, 1000))

  images.value = generateRandomImages(50)
  isRegenerating.value = false
}

// 重置图片（重新排版但保持相同的布局数据）
function reshuffleImages() {
  // 只重新排序现有的图片，不重新生成内容
  images.value = shuffle(images.value)
}
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Nuxt Easy Lightbox"
      :description="$t('pages.playground.lightbox.description')"
      :links="[
        {
          label: $t('pages.playground.lightbox.generate'),
          color: 'neutral',
          variant: 'outline',
          loading: isRegenerating,
          icon: 'lucide:refresh-cw',
          onClick: regenerateImages,
        },
        {
          label: $t('pages.playground.lightbox.reshuffle'),
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:shuffle',
          onClick: reshuffleImages,
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/modbender/nuxt-easy-lightbox',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="lucide:image-plus" class="size-12" />
      </template>
    </UPageHero>
    <UPageColumns :ui="{ base: 'xl:columns-4 break-inside-avoid gap-4 space-y-4' }">
      <ClientOnly>
        <motion.div
          v-for="(item, index) in images"
          :key="index"
          layout
          :initial="{
            opacity: 0,
            y: 30,
            scale: 0.96,
            filter: 'blur(10px)',
          }"
          :while-in-view="{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }"
          :transition="{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1.1,
          }"
          :viewport="{
            once: true,
            amount: 0.1,
          }"
          class="will-change-transform"
          @click="() => showImg(index)"
        >
          <NuxtImg
            :src="item.src"
            class="w-full rounded-lg cursor-pointer"
            :style="{
              aspectRatio: item.width / item.height,
              objectFit: 'cover',
            }"
            :width="item.width"
            :height="item.height"
          />
        </motion.div>
        <VueEasyLightbox
          :visible="visibleRef"
          :imgs="images"
          :index="indexRef"
          @hide="onHide"
        />
      </ClientOnly>
    </UPageColumns>
  </div>
</template>
