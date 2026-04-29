/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:14:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-29 09:55:26
 * @Description: 记录操作日志
 */
import { auth } from '#server/utils/auth'
import { UAParser } from 'ua-parser-js'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.method as typeof logs.$inferInsert.method

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  // 🚫 只记录非 GET 和已登录的接口
  if (method === 'GET' || !session?.user?.id)
    return

  const body = await readBody(event)

  const ip
    = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]
      || event.node.req.socket.remoteAddress
      || ''

  const ua = getRequestHeader(event, 'user-agent') || ''

  const parser = new UAParser(ua)
  const uaResult = parser.getResult()
  const { device, os, browser } = uaResult

  try {
    await db.insert(logs).values({
      userId: session.user.id,
      ip,
      action: event.path,
      method,
      params: body ?? undefined,
      device: device.type ?? 'desktop',
      os: os.name ? `${os.name} ${os.version || ''}`.trim() : '未知',
      browser: browser.name ? `${browser.name} ${browser.version || ''}`.trim() : '未知',
    })
  }
  catch (err) {
    console.error('log insert failed:', err)
  }
})
