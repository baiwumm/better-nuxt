/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:05:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:54:02
 * @Description: 查询国际化树
 */
import { and, asc, desc, gte, ilike, lte } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { i18n } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const { name, zh, startTime, endTime } = I18nQuerySchema.parse(getQuery(event))

    const conditions = []

    // 模糊搜索
    if (name) {
      conditions.push(ilike(i18n.name, `%${name}%`))
    }
    if (zh) {
      conditions.push(ilike(i18n.zh, `%${zh}%`))
    }
    if (startTime) {
      conditions.push(gte(i18n.createdAt, new Date(startTime)))
    }

    if (endTime) {
      conditions.push(lte(i18n.createdAt, new Date(endTime)))
    }

    const data = await db
      .select()
      .from(i18n)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(
        asc(i18n.createdAt),
        desc(i18n.sort),
      )

    return responseSuccess(convertFlatDataToTree(data))
  }
  catch (err) {
    return responseError(err)
  }
})
