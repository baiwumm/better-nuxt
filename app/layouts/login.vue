<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})
</script>

<template>
  <div class="w-screen min-h-screen overflow-hidden flex justify-center items-center">
    <div class="fixed inset-0 z-0">
      <Squares
        direction="diagonal"
        :speed="0.1"
        :square-size="50"
        :border-color="isDark ? '#3A3A3A' : '#D1D1D1'"
        :hover-fill-color="isDark ? '#2C2C2C' : '#B0B0B0'"
      />
    </div>
    <div class="fixed z-1 top-5 right-5 flex gap-2 items-center">
      <UColorModeButton />
      <ClientOnly>
        <LocaleSelect />
      </ClientOnly>
    </div>
    <slot />
  </div>
</template>
