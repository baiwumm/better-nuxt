<script setup lang="ts">
import { EffectCoverflow, Pagination } from 'swiper/modules'

const containerRef = ref(null)
useSwiper(containerRef, {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    clickable: true,
  },
  modules: [Pagination, EffectCoverflow],
})

const slides = ref(generateRandomImages(8))
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false">
      <swiper-slide v-for="(img, idx) in slides" :key="idx" class="size-80!">
        <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
