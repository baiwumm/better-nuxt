<script lang="ts" setup>
import { pdfRenderer } from '@file-viewer/renderer-pdf'

const colorMode = useColorMode()

const options = computed(() => ({
  rendererMode: 'replace',
  theme: colorMode,
  toolbar: { position: 'bottom-right' },
  renderers: [pdfRenderer],
}))
</script>

<template>
  <ClientOnly>
    <file-viewer url="/files/pdf.pdf" :options="options" />
  </ClientOnly>
</template>
