/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-15 15:31:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-15 16:09:30
 * @Description: 消息公告
 */
import { and, desc, eq, ilike, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { notices } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { userId, title, type, page, pageSize } = NoticesQuerySchema.parse(getQuery(event))

    const conditions = []

    if (userId) {
      conditions.push(eq(notices.userId, userId))
    }

    if (title) {
      conditions.push(ilike(notices.title, `%${title}%`))
    }

    if (type) {
      conditions.push(eq(notices.type, type))
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db.query.notices.findMany({
        where,
        with: {
          reads: true,
          author: true,
        },

        orderBy: [desc(notices.pinned), desc(notices.createdAt)],

        limit: pageSize,

        offset: (page - 1) * pageSize,

      }),

      db
        .select({ count: sql<number>`count(*)` })
        .from(notices)
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
