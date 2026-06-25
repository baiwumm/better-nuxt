import FileViewer from '@file-viewer/vue3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FileViewer)
})
