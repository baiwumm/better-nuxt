<script lang="ts" setup>
import { spreadsheetRenderer } from '@file-viewer/renderer-spreadsheet'

const colorMode = useColorMode()

const options = computed(() => ({
  rendererMode: 'replace',
  theme: colorMode,
  toolbar: { position: 'bottom-right' },
  renderers: [spreadsheetRenderer],
}))
</script>

<template>
  <ClientOnly>
    <file-viewer url="/files/excel.xlsx" :options="options" />
  </ClientOnly>
</template>
