/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-08 18:04:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-11 14:50:42
 * @Description: 岗位管理
 */
import { and, desc, ilike, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { posts } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, code, page, pageSize } = PostQuerySchema.parse(getQuery(event))

    const conditions = []

    if (name) {
      conditions.push(ilike(posts.name, `%${name}%`))
    }

    if (code) {
      conditions.push(ilike(posts.code, `%${code}%`))
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db.query.posts.findMany({
        where,
        with: {
          department: {
            with: {
              leader: true,
            },
          },
        },
        orderBy: [
          desc(posts.sort),
          desc(posts.createdAt),
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),

      db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
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
