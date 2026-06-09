/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:24:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-30 09:27:36
 * @Description: 批量删除
 */
import { inArray } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const schema = z.object({
      ids: z.array(z.string()).min(1),
    })

    const { ids } = await readBody(event).then(schema.parse)

    const [res] = await db.delete(logs).where(inArray(logs.id, ids)).returning()

    return responseSuccess(res)
  }
  catch (err) {
    return responseError(err)
  }
})
