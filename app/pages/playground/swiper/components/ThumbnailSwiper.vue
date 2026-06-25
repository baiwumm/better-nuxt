<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

const containerRef = ref(null)
const thumbsSwiperRef = ref(null)

const swiperOptions = reactive<SwiperOptions>({
  navigation: true,
  modules: [FreeMode, Navigation, Thumbs],
})

useSwiper(containerRef, swiperOptions)

useSwiper(thumbsSwiperRef, {
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [FreeMode, Navigation, Thumbs],
})

const slides = ref(generateRandomImages(8))

watch(thumbsSwiperRef, (newVal) => {
  if (newVal) {
    Object.assign(swiperOptions, { thumbs: { swiper: newVal } })
  }
})
</script>

<template>
  <ClientOnly>
    <div class="h-80">
      <swiper-container ref="containerRef" :init="false" class="h-4/5">
        <swiper-slide v-for="(img, idx) in slides" :key="idx">
          <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
        </swiper-slide>
      </swiper-container>
      <swiper-container ref="thumbsSwiperRef" class="thumbs-swiper h-1/5 pt-2.5! [&_.swiper-slide-thumb-active]:opacity-100">
        <swiper-slide v-for="(img, idx) in slides" :key="idx" class="cursor-pointer transition-all duration-300 opacity-40">
          <img :src="img" class="size-full object-cover rounded-md" loading="lazy">
        </swiper-slide>
      </swiper-container>
    </div>
  </ClientOnly>
</template>
