<script setup lang="ts">
import type { CreativeEffectOptions } from 'swiper/types'
import { EffectCreative, Pagination } from 'swiper/modules'

const props = defineProps<{
  creativeEffect: CreativeEffectOptions
}>()

const containerRef = ref(null)
useSwiper(containerRef, {
  effect: 'creative',
  centeredSlides: true,
  grabCursor: true,
  loop: true,
  pagination: {
    clickable: true,
  },
  modules: [EffectCreative, Pagination],
  creativeEffect: props.creativeEffect,
})

const slides = ref(generateRandomImages(8))
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false" class="h-60 w-80 mx-auto">
      <swiper-slide v-for="(img, idx) in slides" :key="idx">
        <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
