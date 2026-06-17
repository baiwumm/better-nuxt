/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-15 15:37:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:37
 * @Description: 新增消息公告
 */
import { db } from '@/db/drizzle'
import { insertNoticesSchema, notices } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session?.user?.id) {
      return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
    }

    const body = await readBody(event)

    const parsed = insertNoticesSchema.parse(body)

    const [res] = await db
      .insert(notices)
      .values({
        ...parsed,
        userId: session.user.id,
        publishedAt: parsed.published ? new Date() : null,
      })
      .returning()

    return responseSuccess(res)
  }
  catch (error) {
    return responseError(error)
  }
})
