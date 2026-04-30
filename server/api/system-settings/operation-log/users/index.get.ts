/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 09:27:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-30 09:57:34
 * @Description: 获取日志中出现过的用户列表（去重）
 */
import { sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { logs, user } from '@/db/schema'

export default defineEventHandler(async () => {
  try {
    const data = await db
      .select()
      .from(user)
      .where(
        sql`exists (
      select 1 from ${logs}
      where ${logs.userId} = ${user.id}
    )`,
      )

    return responseSuccess(data)
  }
  catch (err) {
    return responseError(err)
  }
})
