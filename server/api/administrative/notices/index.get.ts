/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-15 15:31:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 12:14:50
 * @Description: 消息公告
 */
import { and, desc, eq, ilike, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { notices } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    const currentUserId = session?.user?.id

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
          reads: {
            with: {
              user: true,
            },
          },
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

    const result = list.map(item => ({
      ...item,
      isRead: item.reads.some(
        read => read.userId === currentUserId,
      ),
    }))

    const total = Number(totalResult[0]?.count || 0)

    return responseSuccess({
      list: result,
      total,
    })
  }
  catch (err) {
    return responseError(err)
  }
})
