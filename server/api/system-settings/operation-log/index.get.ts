/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:04:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 15:44:25
 * @Description:操作日志列表
 */
import { and, desc, eq, sql } from 'drizzle-orm'
import { map } from 'es-toolkit/compat'
import { db } from '@/db/drizzle'
import { logs, user } from '@/db/schema'

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
      db
        .select()
        .from(logs)
        .leftJoin(user, eq(logs.userId, user.id))
        .where(where)
        .orderBy(desc(logs.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),

      db
        .select({ count: sql<number>`count(*)` })
        .from(logs)
        .where(where),
    ])

    const total = Number(totalResult[0]?.count || 0)

    return responseSuccess({
      list: map(list, v => ({ ...v.logs, user: v.user })),
      total,
    })
  }
  catch (err) {
    return responseError(err)
  }
})
