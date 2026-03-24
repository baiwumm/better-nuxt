<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
  <div class="w-screen min-h-screen overflow-hidden flex justify-center items-center p-4">
    <div class="fixed inset-0 z-0">
      <Squares
        direction="diagonal"
        :speed="0.1"
        :square-size="40"
        :border-color="appStore.isDark ? '#3A3A3A' : '#D1D1D1'"
        :hover-fill-color="appStore.isDark ? '#2C2C2C' : '#B0B0B0'"
      />
    </div>
    <div class="fixed z-1 top-5 right-5 flex gap-2 items-center">
      <ThemePicker />
    </div>
    <slot />
  </div>
</template>
