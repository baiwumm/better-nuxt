import vue from '@vitejs/plugin-vue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    env: process.env.NODE_ENV,
    adminEmail: process.env.NUXT_ADMIN_EMAIL,
    githubToken: process.env.GITHUB_TOKEN,
    turnstile: {
      secretKey: process.env.TURNSTILE_SECRET_KEY,
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
    '@nuxtjs/robots',
    'nuxt-security',
    '@nuxtjs/turnstile',
    'nuxt-swiper',
    '@formkit/auto-animate/nuxt',
    'nuxt-og-image',
  ],
  css: [
    '~/assets/css/main.css',
    'vue-advanced-cropper/dist/style.css',
    '@tombcato/smart-ticker/style.css',
    '@vue-flow/core/dist/style.css',
    '@vue-flow/minimap/dist/style.css',
    '@vue-flow/controls/dist/style.css',
  ],
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
    experimental: {
      // 启用 Nitro Tasks（server/tasks/ 目录自动注册）
      tasks: true,
    },
    // 定时任务：每周一凌晨 3 点清理过期日志（Vercel 生产部署走平台级 cron，见 vercel.json）
    scheduledTasks: {
      '0 3 * * 1': ['clean-logs'],
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
        // 精简：仅保留 Vercel Analytics（免费内置），移除 GA/Clarity/Cloudflare 冗余统计
        vercelAnalytics: {
          trigger: 'onNuxtReady',
        },
      },
    },
  },
  hub: {
    blob: true,
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          '\'self\'',
          'data:',
          'blob:',
          // 收紧：仅允许实际使用的图片域（头像/演示头像），移除 https: 通配
          'https://i.pravatar.cc',
          'https://avatars.githubusercontent.com',
          'https://lh3.googleusercontent.com',
        ],
      },
      permissionsPolicy: {
        fullscreen: ['self'],
      },
    },
  },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
})
