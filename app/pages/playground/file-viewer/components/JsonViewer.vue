<script lang="ts" setup>
import { textRenderer } from '@file-viewer/renderer-text'

const colorMode = useColorMode()

const options = computed(() => ({
  rendererMode: 'replace',
  theme: colorMode,
  toolbar: { position: 'bottom-right' },
  renderers: [textRenderer],
}))
</script>

<template>
  <ClientOnly>
    <file-viewer url="/files/package.json" :options="options" />
  </ClientOnly>
</template>
