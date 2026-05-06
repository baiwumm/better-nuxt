/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:05:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 15:14:34
 * @Description: 查询国际化树
 */
import { and, asc, desc, gte, ilike, lte } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { internalization } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, zh, startTime, endTime } = InternalizationQuerySchema.parse(getQuery(event))

    const conditions = []

    // 模糊搜索
    if (name) {
      conditions.push(ilike(internalization.name, `%${name}%`))
    }
    if (zh) {
      conditions.push(ilike(internalization.zh, `%${zh}%`))
    }
    if (startTime) {
      conditions.push(gte(internalization.createdAt, new Date(startTime)))
    }

    if (endTime) {
      conditions.push(lte(internalization.createdAt, new Date(endTime)))
    }

    const data = await db
      .select()
      .from(internalization)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(
        asc(internalization.createdAt),
        desc(internalization.sort),
      )

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
