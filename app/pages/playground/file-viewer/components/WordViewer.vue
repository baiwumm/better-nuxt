<script lang="ts" setup>
import { wordRenderer } from '@file-viewer/renderer-word'

const colorMode = useColorMode()

const options = computed(() => ({
  rendererMode: 'replace',
  theme: colorMode.value,
  toolbar: { position: 'bottom-right' },
  renderers: [wordRenderer],
}))
</script>

<template>
  <ClientOnly>
    <file-viewer url="/files/word.docx" :options="options" />
  </ClientOnly>
</template>
