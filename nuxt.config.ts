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
    'nuxt-qrcode',
    '@nuxtjs/mdc',
    '@norbiros/nuxt-auto-form',
    '@vercel/speed-insights',
    'nuxt-charts',
    'nuxt-easy-lightbox',
    '@nuxt/image',
    '@nuxt/scripts',
    'nuxt-skew-protection',
    '@nuxt/hints',
    '@nuxt/a11y',
    '@nuxthub/core',
  ],
  css: ['~/assets/css/main.css', 'vue-advanced-cropper/dist/style.css'],
  ui: {
    fonts: false,
  },
  i18n: {
    defaultLocale: 'zh-CN',
    strategy: 'no_prefix',
    baseUrl: process.env.NUXT_SITE_URL || 'https://nuxt.baiwumm.com',
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
    checkOutdatedBuildInterval: 5 * 60 * 1000, // 5 minutes
  },
  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },
  scripts: {
    assets: {
      fallbackOnSrcOnBundleFail: true,
    },
  },
  $production: {
    scripts: {
      registry: {
        vercelAnalytics: {
          trigger: 'onNuxtReady',
        },
        clarity: {
          trigger: 'onNuxtReady',
        },
        googleAnalytics: { trigger: 'onNuxtReady' },
        cloudflareWebAnalytics: { trigger: 'onNuxtReady' },
      },
    },
  },
  hub: {
    blob: true,
  },
})
