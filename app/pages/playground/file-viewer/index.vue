<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import ExcelViewer from './components/ExcelViewer.vue'
import JsonViewer from './components/JsonViewer.vue'
import PdfViewer from './components/PdfViewer.vue'
import WordViewer from './components/WordViewer.vue'
import '@file-viewer/vue3/dist/file-viewer3.css'

const items = [
  {
    label: 'Word',
    icon: 'ri:file-word-2-line',
    slot: 'word' as const,
  },
  {
    label: 'Excel',
    icon: 'ri:file-excel-2-line',
    slot: 'excel' as const,
  },
  {
    label: 'Pdf',
    icon: 'ri:file-pdf-2-line',
    slot: 'pdf' as const,
  },
  {
    label: 'Json',
    icon: 'lucide:file-braces',
    slot: 'json' as const,
  },
] satisfies TabsItem[]
</script>

<template>
  <UTabs
    :items="items"
    :unmount-on-hide="false"
    class="gap-4 flex-1 min-h-0"
    :ui="{ list: 'shrink-0', content: 'h-full min-h-0' }"
  >
    <template #word>
      <WordViewer />
    </template>
    <template #excel>
      <ExcelViewer />
    </template>
    <template #pdf>
      <PdfViewer />
    </template>
    <template #json>
      <JsonViewer />
    </template>
  </UTabs>
</template>
