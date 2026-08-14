/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:04:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-10 13:48:29
 * @Description: 用户管理列表
 */
import { and, ilike, or, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { keyword, page, pageSize } = UserQuerySchema.parse(getQuery(event))

    const conditions = []

    // keyword 模糊搜索
    if (keyword) {
      conditions.push(
        or(
          ilike(users.name, `%${keyword}%`),
          ilike(users.email, `%${keyword}%`),
        ),
      )
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db.query.users.findMany({
        where,
        orderBy: (user, { desc }) => [desc(user.createdAt)],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        with: {
          // 仅返回 providerId，避免 OAuth token / 密码哈希等敏感字段泄露
          accounts: {
            columns: {
              providerId: true,
            },
          },
          roles: {
            with: {
              role: true,
            },
          },
          // 仅返回部门名称（前端列表只展示名称）
          departments: {
            columns: {
              name: true,
            },
          },
        },
      }),

      db
        .select({ count: sql<number>`count(*)` })
        .from(users)
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
