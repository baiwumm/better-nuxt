import { dash, sentinel } from '@better-auth/infra'
/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:01:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-25 10:24:40
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
        /**
         * 撞库攻击防护
         *
         * 同一访客短时间内大量登录失败时触发
         *
         * challenge: 要求额外验证
         * block: 直接封禁
         */
        credentialStuffing: {
          enabled: true,
          thresholds: {
            challenge: 10,
            block: 20,
          },
        },

        /**
         * 泄露密码检测
         *
         * 阻止用户使用已出现在公开泄露数据库中的密码
         */
        compromisedPassword: {
          enabled: true,
          action: 'block',
        },

        /**
         * 邮箱质量检测
         *
         * 检测：
         * - 临时邮箱
         * - 一次性邮箱
         * - 异常邮箱
         */
        emailValidation: {
          enabled: true,
          strictness: 'medium',
          action: 'block',
        },

        /**
         * 不可能旅行检测
         *
         * 例如：
         * 5分钟前在香港登录
         * 现在又在美国登录
         *
         * 这种情况通常是账号共享、
         * Cookie 泄露或代理切换导致
         */
        impossibleTravel: {
          enabled: true,
          action: 'challenge',
        },

        /**
         * 注册频率限制
         *
         * 防止机器人批量注册账号
         */
        velocity: {
          enabled: true,
          maxSignupsPerVisitor: 5,
          action: 'challenge',
        },

        /**
         * 机器人检测
         *
         * 已经有 Turnstile 的情况下
         * 可以继续保留
         */
        // botBlocking: {
        //   action: 'challenge',
        // },

        /**
         * 可疑 IP 检测
         *
         * 数据中心 IP
         * 已知恶意 IP
         * VPN 等
         *
         * 建议 challenge
         * 不要直接 block
         * 否则容易误伤正常用户
         */
        suspiciousIpBlocking: {
          action: 'challenge',
        },
      },
    }),
    // captcha({
    //   provider: 'cloudflare-turnstile',
    //   secretKey: process.env.TURNSTILE_SECRET_KEY!,
    // }),
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
