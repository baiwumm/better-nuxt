/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-22 17:31:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-08 16:59:08
 * @Description: 删除角色
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { roles } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    const [res] = await db.delete(roles).where(eq(roles.id, id)).returning()

    return responseSuccess(res)
  }
  catch (err) {
    return responseError(err)
  }
})
