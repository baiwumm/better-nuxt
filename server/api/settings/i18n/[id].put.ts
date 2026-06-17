/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 10:06:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:52
 * @Description: 更新
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { i18n, updateI18nSchema } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id
    const body = await readBody(event)

    const parsed = updateI18nSchema.parse(body)

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    if (id === parsed.parentId) {
      return responseSuccess(null, '父级不能是自己', RESPONSE_CODE.CONFLICT)
    }

    const [res] = await db
      .update(i18n)
      .set(parsed)
      .where(eq(i18n.id, id))
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
