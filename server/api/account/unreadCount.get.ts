/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-16 15:52:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:00
 * @Description: 获取未读消息数量
 */
import { and, count, eq, isNull } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { noticeReads, notices } from '@/db/schema'

export default defineEventHandler(async (event) => {
  try {
    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session?.user?.id) {
      return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
    }

    const result = await db
      .select({
        count: count(),
      })
      .from(notices)
      .leftJoin(
        noticeReads,
        and(
          eq(noticeReads.noticeId, notices.id),
          eq(noticeReads.userId, session.user.id),
        ),
      )
      .where(
        and(
          eq(notices.published, true),
          isNull(noticeReads.noticeId),
        ),
      )

    return responseSuccess(result[0]?.count ?? 0)
  }
  catch (err) {
    return responseError(err)
  }
})
