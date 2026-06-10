/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-08 18:04:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-10 10:56:39
 * @Description: 部门管理
 */
import { and, desc, ilike } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { departments } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, code } = DepartmentQuerySchema.parse(getQuery(event))

    const conditions = []

    if (name) {
      conditions.push(ilike(departments.name, `%${name}%`))
    }

    if (code) {
      conditions.push(ilike(departments.code, `%${code}%`))
    }

    const where = conditions.length ? and(...conditions) : undefined

    const data = await db.query.departments.findMany({
      where,
      with: {
        leader: true,
        posts: true,
      },

      orderBy: [desc(departments.createdAt), desc(departments.createdAt)],

    })

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
