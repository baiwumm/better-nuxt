/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 17:47:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-07 10:25:43
 * @Description: 获取 i18n 数据
 */
import { asc, desc } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { internalization } from '@/db/schema'

export default defineEventHandler(async () => {
  try {
    const data = await db
      .select()
      .from(internalization)
      .orderBy(
        asc(internalization.createdAt),
        desc(internalization.sort),
      )

    // 将数据转成树形结构
    const localesTree = convertFlatDataToTree(data)
    // 转成层级对象
    const result = transformToLangTree(localesTree as InternalizationTree[])

    return responseSuccess(result)
  }
  catch (err) {
    return responseError(err)
  }
})
