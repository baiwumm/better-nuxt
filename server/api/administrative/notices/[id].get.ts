/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-16 09:14:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-16 16:29:06
 * @Description: 公告详情
 */
import { eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { noticeReads, notices } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params!.id

    // 获取用户会话信息
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!id) {
      return responseSuccess(null, '缺少参数 id', RESPONSE_CODE.BAD_REQUEST)
    }

    // 已登录用户记录已读
    if (session?.user?.id) {
      await db
        .insert(noticeReads)
        .values({
          noticeId: id,
          userId: session.user.id,
        })
        .onConflictDoNothing() // 防止重复插入
    }

    const notice = await db.query.notices.findFirst({
      where: eq(notices.id, id),
      with: {
        reads: {
          with: {
            user: true,
          },
        },
        author: true,
      },
    })

    if (!notice) {
      return responseSuccess(
        null,
        '公告不存在',
        RESPONSE_CODE.NOT_FOUND,
      )
    }

    return responseSuccess({
      ...notice,
      isRead: true,
    })
  }
  catch (err) {
    return responseError(err)
  }
})
