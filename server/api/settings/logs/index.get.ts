/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:04:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-28 16:24:31
 * @Description:操作日志列表
 */
import type { SQL } from 'drizzle-orm'
import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

// 无筛选时的全表 count 加 TTL 缓存（大表 count 是每页开销大头，翻页期间数据量短期不变）
const totalCountCache = new Map<string, { total: number, expiresAt: number }>()
const TOTAL_COUNT_TTL = 5_000

/**
 * 获取日志总数
 * 无筛选条件时走 5 秒 TTL 缓存；带筛选（userId/method）时实时查询
 */
async function getLogsCount(where: SQL | undefined): Promise<number> {
  const key = 'logs:total-count'

  if (!where) {
    const hit = totalCountCache.get(key)

    if (hit && hit.expiresAt > Date.now())
      return hit.total
  }

  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(logs)
    .where(where)

  const total = Number(row?.count || 0)

  if (!where) {
    totalCountCache.set(key, { total, expiresAt: Date.now() + TOTAL_COUNT_TTL })
  }

  return total
}

export default defineEventHandler(async (event) => {
  try {
    const { userId, method, page, pageSize } = LogQuerySchema.parse(getQuery(event))

    const conditions = []

    if (userId) {
      conditions.push(eq(logs.userId, userId))
    }

    if (method) {
      conditions.push(eq(logs.method, method))
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, total] = await Promise.all([
      db.query.logs.findMany({
        where,

        with: {
          user: true,

          geo: true,
        },

        orderBy: desc(logs.createdAt),

        limit: pageSize,

        offset: (page - 1) * pageSize,
      }),

      getLogsCount(where),
    ])

    return responseSuccess({
      list,
      total,
    })
  }
  catch (err) {
    return responseError(err)
  }
})
