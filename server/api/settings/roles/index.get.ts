/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:21:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-11 14:57:40
 * @Description: 查询角色列表
 */
import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { roles } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, code, enabled, page, pageSize } = RoleQuerySchema.parse(getQuery(event))

    const conditions = []

    if (name) {
      conditions.push(ilike(roles.name, `%${name}%`))
    }

    if (code) {
      conditions.push(ilike(roles.code, `%${code}%`))
    }

    // enabled 精确筛选
    if (enabled !== undefined) {
      conditions.push(
        eq(roles.enabled, enabled),
      )
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db.query.roles.findMany({
        where,
        with: {
          menus: {
            with: {
              menu: true,
            },
          },
          users: {
            with: {
              user: true,
            },
          },
        },
        orderBy: [
          desc(roles.sort),
          asc(roles.createdAt),
        ],
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),

      db
        .select({ count: sql<number>`count(*)` })
        .from(roles)
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
