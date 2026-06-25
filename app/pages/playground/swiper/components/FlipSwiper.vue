<script setup lang="ts">
import { EffectFlip, Navigation, Pagination } from 'swiper/modules'

const containerRef = ref(null)
useSwiper(containerRef, {
  effect: 'flip',
  grabCursor: true,
  navigation: true,
  loop: true,
  pagination: {
    clickable: true,
  },
  modules: [EffectFlip, Pagination, Navigation],
})

const slides = ref(generateRandomImages(8))
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false" class="size-80 mx-auto">
      <swiper-slide v-for="(img, idx) in slides" :key="idx">
        <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
