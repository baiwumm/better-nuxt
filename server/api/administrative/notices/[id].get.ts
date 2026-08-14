/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-16 09:14:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:33:22
 * @Description: 公告详情
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

    // 详情页无需已读列表（打开即标记已读，isRead 恒为 true），避免加载全部已读记录与用户信息
    // 已读标记已拆分为独立 POST 接口（/administrative/notices/:id/read），GET 不再写库
    const notice = await db.query.notices.findFirst({
      where: eq(notices.id, id),
      with: {
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
