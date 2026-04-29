/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-23 10:06:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-29 14:30:11
 * @Description: 更新
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { menu, updateMenuSchema } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id
    const body = await readBody(event)

    const parsed = updateMenuSchema.parse(body)

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    if (id === parsed.parentId) {
      return responseSuccess(null, '父菜单不能是自己', RESPONSE_CODE.CONFLICT)
    }

    const [res] = await db
      .update(menu)
      .set(parsed)
      .where(eq(menu.id, id))
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
