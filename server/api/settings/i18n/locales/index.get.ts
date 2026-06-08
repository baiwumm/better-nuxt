/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 17:47:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:52:17
 * @Description: 获取 i18n 数据
 */
import { asc, desc } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { i18n } from '@/db/schema'

export default defineEventHandler(async () => {
  try {
    const data = await db
      .select()
      .from(i18n)
      .orderBy(
        asc(i18n.createdAt),
        desc(i18n.sort),
      )

    // 将数据转成树形结构
    const localesTree = convertFlatDataToTree(data)
    // 转成层级对象
    const result = transformToLangTree(localesTree as I18nTree[])

    return responseSuccess(result)
  }
  catch (err) {
    return responseError(err)
  }
})
