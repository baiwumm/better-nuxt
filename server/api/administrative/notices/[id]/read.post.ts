/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-08-13
 * @Description: 标记公告已读（独立 POST，避免 GET 详情接口写库）
 */
import { db } from '@/db/drizzle'
import { noticeReads } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id

    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session?.user?.id) {
      return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
    }

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 记录已读（幂等）
    await db
      .insert(noticeReads)
      .values({
        noticeId: id,
        userId: session.user.id,
      })
      .onConflictDoNothing() // 防止重复插入

    return responseSuccess(null, '已标记已读')
  }
  catch (err) {
    return responseError(err)
  }
})
