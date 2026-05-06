/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 09:22:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 09:52:49
 * @Description: 新增国际化
 */
import { db } from '@/db/drizzle'
import { insertInternalizationSchema, internalization } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const parsed = insertInternalizationSchema.parse(body)

    const [res] = await db
      .insert(internalization)
      .values(parsed)
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
