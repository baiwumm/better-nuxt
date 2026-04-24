/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:05:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-24 15:15:22
 * @Description: 查询菜单树
 */
import { asc, desc, ilike, or } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menu } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const keyword = query.keyword as string | undefined
    let data
    if (keyword) {
      data = await db
        .select()
        .from(menu)
        .where(
          or(
            ilike(menu.label, `%${keyword}%`),
            ilike(menu.to, `%${keyword}%`),
          ),
        )
        .orderBy(
          asc(menu.createdAt),
          desc(menu.sort),
        )
    }
    else {
      data = await db
        .select()
        .from(menu)
        .orderBy(
          asc(menu.createdAt),
          desc(menu.sort),
        )
    }

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
