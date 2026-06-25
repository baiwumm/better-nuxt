<script setup lang="ts">
import { EffectCube, Pagination } from 'swiper/modules'

const cubeContainerRef = ref(null)
useSwiper(cubeContainerRef, {
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  loop: true,
  pagination: {
    clickable: true,
  },
  modules: [EffectCube, Pagination],
})

const slides = ref(generateRandomImages(8))
</script>

<template>
  <ClientOnly>
    <swiper-container ref="cubeContainerRef" :init="false" class="size-80 mx-auto">
      <swiper-slide v-for="(img, idx) in slides" :key="idx">
        <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
