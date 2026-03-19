import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { db } from '@/db/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  // 启用电子邮件和密码认证
  emailAndPassword: {
    enabled: true,
    // 必须验证才能登录
    requireEmailVerification: true,
    // 验证后自动登录
    autoSignInAfterVerification: true,
  },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     void sendEmail({
  //       to: user.email,
  //       subject: "Verify your email address",
  //       text: `Click the link to verify your email: ${url}`,
  //     });
  //   },
  //   sendOnSignIn: true,
  // },
  plugins: [
    username(),
  ],
})
