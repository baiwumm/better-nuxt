/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:21:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-22 17:27:13
 * @Description: 查询角色列表
 */
import { and, asc, desc, eq, ilike, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { role } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, code, enabled, page, pageSize } = RoleQuerySchema.parse(getQuery(event))

    const conditions = []

    if (name) {
      conditions.push(ilike(role.name, `%${name}%`))
    }

    if (code) {
      conditions.push(ilike(role.code, `%${code}%`))
    }

    // enabled 精确筛选
    if (enabled !== undefined) {
      conditions.push(
        eq(role.enabled, enabled),
      )
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [list, totalResult] = await Promise.all([
      db
        .select()
        .from(role)
        .where(where)
        .orderBy(
          asc(role.createdAt),
          desc(role.sort),
        )
        .limit(pageSize)
        .offset((page - 1) * pageSize),

      db
        .select({ count: sql<number>`count(*)` })
        .from(role)
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
