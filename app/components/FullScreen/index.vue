<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <UButton
    :icon="isFullscreen ? 'lucide:minimize' : 'lucide:fullscreen'"
    color="neutral"
    variant="ghost"
    square
    aria-label="Theme Picker"
    @click="toggle"
  />
</template>
