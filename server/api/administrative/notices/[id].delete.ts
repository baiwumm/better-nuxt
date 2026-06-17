/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-15 15:37:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:18
 * @Description: 删除消息公告
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { notices } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    const [res] = await db.delete(notices).where(eq(notices.id, id)).returning()

    return responseSuccess(res)
  }
  catch (err) {
    return responseError(err)
  }
})
