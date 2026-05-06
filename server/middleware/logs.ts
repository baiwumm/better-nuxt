/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:14:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 15:49:01
 * @Description: 记录操作日志
 */
import { auth } from '#server/utils/auth'
import { UAParser } from 'ua-parser-js'
import { db } from '@/db/drizzle'
import { logs } from '@/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.method as Methods
  const action = event.path

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  // 🚫 只记录非 GET 和已登录的接口
  if (method === 'GET' || !session?.user?.id || action.startsWith('/api/system-settings/operation-log'))
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
      action,
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
