import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    env: process.env.NODE_ENV,
    adminEmail: process.env.NUXT_ADMIN_EMAIL,
    githubToken: process.env.GITHUB_TOKEN,
    haloToken: process.env.HALO_TOKEN,
    public: {
      apiBase: '/api', // 后端接口前缀
      appName: process.env.NUXT_APP_NAME || 'Nuxt Pro Max',
      appDesc: process.env.NUXT_APP_DESC || '',
      appDomain: process.env.BETTER_AUTH_URL || '',
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
    'nuxt-qrcode',
    '@nuxtjs/mdc',
    '@norbiros/nuxt-auto-form',
  ],
  css: ['~/assets/css/main.css', '~/assets/css/transition.css'],
  ui: {
    fonts: false,
  },
  i18n: {
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
    baseUrl: process.env.BETTER_AUTH_URL || 'https://nuxt.baiwumm.com',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    locales: [
      { code: 'en', name: 'English' },
      { code: 'zh-CN', name: '简体中文' },
    ],
  },
  experimental: {
    normalizePageNames: true,
  },
  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },
})
