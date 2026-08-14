/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-08-13
 * @Description: 清理 90 天前的操作日志（保留策略，Nitro cron 每日触发）
 */
import { lt } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

// 保留期限（天）
const RETENTION_DAYS = 90

export default defineTask({
  meta: {
    name: 'clean-logs',
    description: '清理超过 90 天的操作日志',
  },
  async run() {
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000)

    const result = await db
      .delete(logs)
      .where(lt(logs.createdAt, cutoff))

    return {
      result: `已清理 ${result.rowCount ?? 0} 条 ${RETENTION_DAYS} 天前的日志`,
    }
  },
})
