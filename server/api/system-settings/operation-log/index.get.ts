/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:04:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-28 16:24:31
 * @Description:操作日志列表
 */
import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

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

    const [list, totalResult] = await Promise.all([
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

      db
        .select({ count: sql<number>`count(*)` })
        .from(logs)
        .where(where),
    ])

    const total = Number(totalResult[0]?.count || 0)

    return responseSuccess({
      list,
      total,
    })
  }
  catch (err) {
    return responseError(err)
  }
})
