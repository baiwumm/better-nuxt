<script setup lang="ts">
import { EffectCards } from 'swiper/modules'

const containerRef = ref(null)
useSwiper(containerRef, {
  effect: 'cards',
  grabCursor: true,
  loop: true,
  modules: [EffectCards],
})

const slides = ref(generateRandomImages(8))
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false" class="w-60 h-80 mx-auto">
      <swiper-slide v-for="(img, idx) in slides" :key="idx">
        <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
