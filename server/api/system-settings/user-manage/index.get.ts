/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:04:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-26 15:33:55
 * @Description: 用户管理列表
 */
import { and, desc, ilike, or, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { user } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { keyword, page, pageSize } = UserQuerySchema.parse(getQuery(event))

    const conditions = []

    // keyword 模糊搜索
    if (keyword) {
      conditions.push(
        or(
          ilike(user.name, `%${keyword}%`),
          ilike(user.email, `%${keyword}%`),
        ),
      )
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db.query.user.findMany({
        where,
        orderBy: (user, { desc }) => [desc(user.createdAt)],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        with: {
          roles: {
            with: {
              role: true,
            },
          },
        },
      }),

      db
        .select({ count: sql<number>`count(*)` })
        .from(user)
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
