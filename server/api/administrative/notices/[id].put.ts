/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-15 15:39:03
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-15 18:01:02
 * @Description: 编辑消息公告
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { notices, updateNoticesSchema } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id
    const body = await readBody(event)

    const parsed = updateNoticesSchema.parse(body)

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    const oldNotice = await db.query.notices.findFirst({
      where: eq(notices.id, id),
    })

    if (!oldNotice) {
      return responseSuccess(
        null,
        '公告不存在',
        RESPONSE_CODE.NOT_FOUND,
      )
    }

    const updateData = {
      ...parsed,
    }

    if (parsed.published !== undefined) {
      if (!oldNotice.published && parsed.published) {
        updateData.publishedAt = new Date()
      }
      else if (!parsed.published) {
        updateData.publishedAt = null
      }
    }
    const [res] = await db
      .update(notices)
      .set(updateData)
      .where(eq(notices.id, id))
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
