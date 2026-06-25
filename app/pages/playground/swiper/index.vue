<script lang="ts" setup>
import CardsSwiper from './components/CardsSwiper.vue'
import CoverflowSwiper from './components/CoverflowSwiper.vue'
import CreativeSwiper from './components/CreativeSwiper.vue'
import CubeSwiper from './components/CubeSwiper.vue'
import FlipSwiper from './components/FlipSwiper.vue'
import ThumbnailSwiper from './components/ThumbnailSwiper.vue'

const creativeEffectOptions = ref([
  {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-120%', 0, -500],
    },
    next: {
      shadow: true,
      translate: ['120%', 0, -500],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [180, 0, 0],
    },
    next: {
      shadow: true,
      translate: [0, 0, -800],
      rotate: [-180, 0, 0],
    },
  },
  {
    prev: {
      shadow: true,
      translate: ['-125%', 0, -800],
      rotate: [0, 0, -90],
    },
    next: {
      shadow: true,
      translate: ['125%', 0, -800],
      rotate: [0, 0, 90],
    },
  },
  {
    prev: {
      shadow: true,
      origin: 'left center',
      translate: ['-5%', 0, -200],
      rotate: [0, 100, 0],
    },
    next: {
      origin: 'right center',
      translate: ['5%', 0, -200],
      rotate: [0, -100, 0],
    },
  },
])
</script>

<template>
  <div class="space-y-4">
    <UPageHero
      title="Nuxt Swiper"
      :description="$t('pages.playground.swiper.description')"
      :links="[
        {
          label: $t('common.docs'),
          color: 'neutral',
          variant: 'outline',
          icon: 'lucide:file-text',
          trailingIcon: 'lucide:external-link',
          to: 'https://swiperjs.com/',
          target: '_blank',
        },
        {
          label: 'Github',
          icon: 'simple-icons:github',
          to: 'https://github.com/nolimits4web/swiper',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
        },
      ]"
      :ui="{ container: 'py-4!' }"
    >
      <template #headline>
        <UIcon name="devicon:swiper" class="size-12" />
      </template>
    </UPageHero>
    <UPageGrid>
      <UCard title="方块(Cube)">
        <CubeSwiper />
      </UCard>
      <UCard title="翻转(Flip)">
        <FlipSwiper />
      </UCard>
      <UCard title="卡片特效(Cards)">
        <CardsSwiper />
      </UCard>
    </UPageGrid>
    <UCard title="创意效果(Creative)">
      <UPageGrid>
        <UPageCard v-for="(option, i) in creativeEffectOptions" :key="i">
          <CreativeSwiper :creative-effect="option" />
        </UPageCard>
      </UPageGrid>
    </UCard>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UCard title="3d流翻转(Coverflow)">
        <CoverflowSwiper />
      </UCard>
      <UCard title="缩略图(Thumbnail)">
        <ThumbnailSwiper />
      </UCard>
    </div>
  </div>
</template>
