// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css',
        },
      ],
    },
  },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false
  }
})
