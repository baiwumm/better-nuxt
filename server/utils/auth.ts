import { i18n } from '@better-auth/i18n'
/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:01:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-23 18:14:26
 * @Description: BetterAuth 实例
 */
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { db } from '@/db/drizzle'
import * as schema from '@/db/schema'

const { emails } = useResend()

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
      const name = user.name || user.email.split('@')[0]
      await emails.send({
        from: 'NuxtProMax <no-reply@baiwumm.com>',
        to: user.email,
        subject: '重置您的密码',
        html: `
          <div style="font-family: Arial;">
            <h2>Hi ${name}</h2>
            <p>点击按钮：</p>
            <a href="${url}" style="
              padding:10px 16px;
              background:#000;
              color:#fff;
              text-decoration:none;
            ">
              重置密码
            </a>
          </div>
        `,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true, // 注册时自动发送验证邮件
    sendOnSignIn: true, // 登录时如果未验证，发送验证邮件
    autoSignInAfterVerification: true, // 验证成功后自动登录
    sendVerificationEmail: async ({ user, url }) => {
      const name = user.name || user.email.split('@')[0]
      await emails.send({
        from: 'NuxtProMax <no-reply@baiwumm.com>',
        to: user.email,
        subject: '验证您的电子邮件地址',
        html: `
          <div style="font-family: Arial;">
            <h2>Hi ${name}</h2>
            <p>点击按钮验证邮箱：</p>
            <a href="${url}" style="
              padding:10px 16px;
              background:#000;
              color:#fff;
              text-decoration:none;
            ">
              验证邮箱
            </a>
          </div>
        `,
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
  },
  plugins: [
    username(),
    i18n({
      translations: {
        'zh-CN': {
          USER_NOT_FOUND: '用户未找到',
          INVALID_EMAIL_OR_PASSWORD: '邮箱或密码错误',
          INVALID_PASSWORD: '密码错误',
          CREDENTIAL_ACCOUNT_NOT_FOUND: '凭证账户未找到',
          EMAIL_NOT_VERIFIED: '邮箱未验证',
        },
      },
    }),
  ],
})
