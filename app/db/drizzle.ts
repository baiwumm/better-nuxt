import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import * as schema from './schema'

// 本地开发保留完整连接池与 SQL 日志（便于调试）；
// 生产（Vercel serverless）限制连接数并关闭 SQL 日志，防止绑定参数（密码 hash、token 等）泄漏
const isDev = process.env.NODE_ENV !== 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: isDev ? 10 : 1,
})

export const db = drizzle(pool, {
  schema,
  logger: isDev,
})
