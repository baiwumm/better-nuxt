/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-08-13
 * @Description: Vercel Cron 触发日志清理（生产平台级 cron 入口）
 *
 * 由 vercel.json crons 每日定时调用。
 * 鉴权：
 * - 生产：Vercel 自动注入 x-vercel-cron 头（平台保证，外部无法伪造）
 * - 本地手动测试：携带 X-Cron-Secret 头（需配置 CRON_SECRET 环境变量）
 */
import { runTask } from 'nitropack/runtime/task'

export default defineEventHandler(async (event) => {
  const isVercelCron = Boolean(getRequestHeader(event, 'x-vercel-cron'))
  const secretOk = Boolean(
    process.env.CRON_SECRET
    && getRequestHeader(event, 'x-cron-secret') === process.env.CRON_SECRET,
  )

  if (!isVercelCron && !secretOk) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const result = await runTask('clean-logs')

  return {
    ok: true,
    ...result,
  }
})
