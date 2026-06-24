import { dash, sentinel } from '@better-auth/infra'
/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:01:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-24 14:44:55
 * @Description: BetterAuth 实例
 */
import { render } from '@vue-email/render'
import { betterAuth } from 'better-auth'
import { localization } from 'better-auth-localization'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, captcha, lastLoginMethod, magicLink, multiSession, username } from 'better-auth/plugins'
import { Resend } from 'resend'
import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'

const resend = new Resend(process.env.NUXT_RESEND_API_KEY)

export const auth = betterAuth({
  appName: process.env.NUXT_SITE_NAME,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
    usePlural: true, // 使用复数形式
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        const appName = process.env.NUXT_SITE_NAME
        const EmailChangedEmail = (
          await import('@/components/email/EmailChangedEmail.vue')
        ).default
        const html = await render(EmailChangedEmail, { url, oldEmail: user.email, newEmail, appName })
        await resend.emails.send({
          from: `${appName} <no-reply@baiwumm.com>`,
          to: newEmail,
          subject: '更改您的电子邮件地址',
          html,
        })
      },
    },
  },
  // 启用电子邮件和密码认证
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // 必须验证才能登录
    sendResetPassword: async ({ user, url }) => {
      const appName = process.env.NUXT_SITE_NAME
      const ResetPasswordEmail = (
        await import('@/components/email/ResetPasswordEmail.vue')
      ).default
      const html = await render(ResetPasswordEmail, { url, email: user.email, appName })
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
      const appName = process.env.NUXT_SITE_NAME
      const EmailVerificationEmail = (
        await import('@/components/email/EmailVerificationEmail.vue')
      ).default
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
      storeToken: 'hashed',
      sendMagicLink: async ({ email, url }) => {
        const appName = process.env.NUXT_SITE_NAME
        const MagicLinkEmail = (
          await import('@/components/email/MagicLinkEmail.vue')
        ).default
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
    admin({
      adminUserIds: process.env.BETTER_AUTH_ADMIN_USER_IDS ? process.env.BETTER_AUTH_ADMIN_USER_IDS.split(',') : [],
    }),
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      activityTracking: {
        enabled: true,
      },
    }),
    sentinel({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      security: {
        // Core protections
        credentialStuffing: {
          enabled: true,
          thresholds: { challenge: 3, block: 5 },
        },
        compromisedPassword: {
          enabled: true,
          action: 'block',
        },
        emailValidation: {
          enabled: true,
          strictness: 'medium',
          action: 'block',
        },

        // Location-based
        impossibleTravel: {
          enabled: true,
          action: 'challenge',
        },
        geoBlocking: {
          denyList: ['XX'],
          action: 'block',
        },

        // Abuse prevention
        freeTrialAbuse: {
          enabled: true,
          maxAccountsPerVisitor: 3,
          action: 'block',
        },
        velocity: {
          enabled: true,
          maxSignupsPerVisitor: 5,
          action: 'challenge',
        },

        // Bot protection
        botBlocking: { action: 'challenge' },
        suspiciousIpBlocking: { action: 'block' },

        // Account monitoring
        staleUsers: {
          enabled: true,
          staleDays: 90,
          notifyUser: true,
          notifyAdmin: true,
          adminEmail: 'security@yourapp.com',
        },
      },
    }),
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    }),
  ],
  // 数据库钩子
  databaseHooks: {
    user: {
      create: {
        // 创建用户成功后，自动分配管理员角色
        after: async (user) => {
          const roleId = process.env.BETTER_AUTH_DEFAULT_ROLE_ID
          if (roleId) {
            await db.insert(schema.userRoles).values({ userId: user.id, roleId })
          }
        },
      },
      fields: {
        lastActiveAt: {
          type: 'date',
        },
      },
    },
  },
  // 开启会话缓存
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwe',
    },
  },
  advanced: {
    ipAddress: {
      // For Cloudflare
      // ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],

      // For Vercel
      ipAddressHeaders: ['x-vercel-forwarded-for', 'x-forwarded-for'],

      // For AWS/Generic
      // ipAddressHeaders: ["x-forwarded-for"],
    },
  },
  experimental: {
    joins: true,
  },
})
