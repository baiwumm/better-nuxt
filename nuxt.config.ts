// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    env: process.env.NODE_ENV,
    authEmail: 'me@baiwumm.com',
    public: {
      apiBase: '/api', // 后端接口前缀
      appName: process.env.NUXT_APP_NAME || 'Nuxt Pro Max',
      appDesc: process.env.NUXT_APP_DESC || '',
      appDomain: process.env.NUXT_APP_DOMAIN || '',
      env: process.env.NODE_ENV,
    },
  },
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
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'dayjs-nuxt',
    'nuxt-resend',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vercel/analytics',
  ],
  css: ['~/assets/css/main.css', '~/assets/css/transition.css'],
  ui: {
    fonts: false,
  },
  i18n: {
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
    baseUrl: 'https://nuxt.baiwumm.com',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    locales: [
      { code: 'en', name: 'English', file: 'en-US.ts' },
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.ts' },
    ],
  },
  experimental: {
    normalizePageNames: true,
  },
})
