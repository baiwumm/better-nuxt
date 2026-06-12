<script setup lang="ts">
import NumberFlow, { continuous } from '@number-flow/vue'
import { randomInt } from 'es-toolkit/math'

const { locale } = defineProps<{
  locale: string
}>()

const hands = ref(randomInt(10, 100))
const handed = ref(false)
const likes = ref(randomInt(10, 100))
const liked = ref(false)
const bookmarks = ref(randomInt(150, 500))
const bookmarksed = ref(false)

function handClick() {
  handed.value ? hands.value-- : hands.value++
  handed.value = !handed.value
}

function likeClick() {
  liked.value ? likes.value-- : likes.value++
  liked.value = !liked.value
}

function bookmarkClick() {
  bookmarksed.value ? bookmarks.value-- : bookmarks.value++
  bookmarksed.value = !bookmarksed.value
}
</script>

<template>
  <UPageCard :ui="{ container: 'lg:flex justify-center flex-row items-center' }">
    <div class="flex items-center gap-2">
      <UButton
        color="neutral"
        variant="ghost"
        :ui="{
          base: cn('group hover:text-success hover:bg-success/10', handed && 'text-success'),
        }"
        @click="handClick"
      >
        <template #leading>
          <UIcon
            :name="handed ? 'heroicons:hand-thumb-up-16-solid' : 'heroicons:hand-thumb-up'"
            class="block size-5 transition-transform group-active:scale-[80%]"
            :class="handed ? 'text-success' : 'text-current'"
          />
        </template>
        <NumberFlow
          will-change :plugins="[continuous]" :value="hands" locales="zh-CN" :format="{
            notation: 'compact',
            compactDisplay: 'short',
            roundingMode: 'trunc',
          }"
        />
      </UButton>
      <UButton
        color="neutral"
        variant="ghost"
        :ui="{
          base: cn('group hover:text-pink-500 hover:bg-pink-100', liked && 'text-pink-500'),
        }"
        @click="likeClick"
      >
        <template #leading>
          <UIcon
            :name="liked ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
            class="block size-5 transition-transform group-active:scale-[80%]"
            :class="liked ? 'text-pink-500' : 'text-current'"
          />
        </template>
        <NumberFlow
          will-change :plugins="[continuous]" :value="likes" locales="zh-CN" :format="{
            notation: 'compact',
            compactDisplay: 'short',
            roundingMode: 'trunc',
          }"
        />
      </UButton>
      <UButton
        color="neutral"
        variant="ghost"
        :ui="{
          base: cn('group hover:text-info hover:bg-info/10', bookmarksed && 'text-info'),
        }"
        @click="bookmarkClick"
      >
        <template #leading>
          <UIcon
            :name="bookmarksed ? 'heroicons:bookmark-16-solid' : 'heroicons:bookmark'"
            class="block size-5 transition-transform group-active:scale-[80%]"
            :class="bookmarksed ? 'text-info' : 'text-current'"
          />
        </template>
        <NumberFlow
          will-change :plugins="[continuous]" :value="bookmarks" :locales="locale" :format="{
            notation: 'compact',
            compactDisplay: 'short',
            roundingMode: 'trunc',
          }"
        />
      </UButton>
    </div>
  </UPageCard>
</template>
