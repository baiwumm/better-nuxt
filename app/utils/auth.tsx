/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-18 17:01:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-03-20 18:02:25
 * @Description: BetterAuth 实例
 */
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { db } from '@/db/drizzle'
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  // 启用电子邮件和密码认证
  emailAndPassword: {
    enabled: true,
    // 必须验证才能登录
    requireEmailVerification: true,
    // 验证后自动登录
    autoSignInAfterVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const resend = useResend()
      const name = user.name || user.email.split("@")[0]
      await resend.emails.send({
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
          `
      })
    },
    sendOnSignIn: true,
  },
  plugins: [
    username(),
  ],
})
