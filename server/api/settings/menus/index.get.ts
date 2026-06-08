/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:05:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:57:48
 * @Description: 查询菜单树
 */
import { and, asc, desc, eq, ilike, or } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menus } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { keyword, enabled } = MenuQuerySchema.parse(getQuery(event))

    const conditions = []

    // keyword 模糊搜索
    if (keyword) {
      conditions.push(
        or(
          ilike(menus.label, `%${keyword}%`),
          ilike(menus.to, `%${keyword}%`),
        ),
      )
    }

    // enabled 精确筛选
    if (enabled !== undefined) {
      conditions.push(
        eq(menus.enabled, enabled),
      )
    }

    const data = await db
      .select()
      .from(menus)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(
        asc(menus.createdAt),
        desc(menus.sort),
      )

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
