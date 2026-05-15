/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:01:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-15 10:04:50
 * @Description: BetterAuth 实例
 */
import { render } from '@vue-email/render'
import { betterAuth } from 'better-auth'
import { localization } from 'better-auth-localization'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { lastLoginMethod, magicLink, multiSession, username } from 'better-auth/plugins'
import { Resend } from 'resend'
import EmailVerificationEmail from '@/components/email/EmailVerificationEmail.vue'

import MagicLinkEmail from '@/components/email/MagicLinkEmail.vue'
import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'

const resend = new Resend(process.env.NUXT_RESEND_API_KEY)

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  // 启用电子邮件和密码认证
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // 必须验证才能登录
    sendResetPassword: async ({ user, url }) => {
      const config = useRuntimeConfig()
      const appName = config.public.appName
      const html = await render(EmailVerificationEmail, { url, email: user.email, appName })
      await resend.emails.send({
        from: `${appName} <no-reply@baiwumm.com>`,
        to: user.email,
        subject: '重置您的密码',
        html,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true, // 注册时自动发送验证邮件
    sendOnSignIn: true, // 登录时如果未验证，发送验证邮件
    autoSignInAfterVerification: true, // 验证成功后自动登录
    sendVerificationEmail: async ({ user, url }) => {
      const config = useRuntimeConfig()
      const appName = config.public.appName
      const html = await render(EmailVerificationEmail, { url, email: user.email, appName })
      await resend.emails.send({
        from: `${appName} <no-reply@baiwumm.com>`,
        to: user.email,
        subject: '验证您的电子邮件地址',
        html,
      })
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    vercel: {
      clientId: process.env.VERCEL_CLIENT_ID!,
      clientSecret: process.env.VERCEL_CLIENT_SECRET!,
    },
    huggingface: {
      clientId: process.env.HUGGINGFACE_CLIENT_ID!,
      clientSecret: process.env.HUGGINGFACE_CLIENT_SECRET!,
    },
  },
  plugins: [
    username(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const config = useRuntimeConfig()
        const appName = config.public.appName
        const html = await render(MagicLinkEmail, { url, email, appName })
        await resend.emails.send({
          from: `${appName} <no-reply@baiwumm.com>`,
          to: email,
          subject: '邮箱一键登录',
          html,
        })
      },
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
    multiSession(),
    localization({
      defaultLocale: 'zh-Hans',
      fallbackLocale: 'default',
    }),
  ],
})
