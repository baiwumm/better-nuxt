/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:22:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:54:20
 * @Description: 新增国际化
 */
import { db } from '@/db/drizzle'
import { i18n, insertI18nSchema } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertI18nSchema.parse(body)

    const [res] = await db
      .insert(i18n)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
