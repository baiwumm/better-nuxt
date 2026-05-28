/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:14:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-28 14:58:28
 * @Description: 记录操作日志
 */
import { eq } from 'drizzle-orm'
import { UAParser } from 'ua-parser-js'
import { auth } from '#server/utils/auth'
import { getGeoByIP } from '#server/utils/ip-geo'
import { db } from '@/db/drizzle'
import { ipGeo, logs } from '@/db/schema'

export default defineEventHandler(async (event) => {
  const method = event.method as Methods
  const url = getRequestURL(event)
  const path = url.pathname

  // 获取用户会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  /**
   * 🚫 过滤：
   * 1. 不记录 GET
   * 2. 未登录不记录
   * 3. 排除日志接口自身
   */
  if (
    method === 'GET'
    || !session?.user?.id
    || path.startsWith('/api/system-settings/operation-log')
  ) {
    return
  }

  const body = await readBody(event).catch(() => null)

  /**
   * 获取真实 IP
   */
  const ip
    = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
      || getRequestHeader(event, 'x-real-ip')
      || event.node.req.socket.remoteAddress
      || ''

  /**
   * User-Agent
   */
  const ua = getRequestHeader(event, 'user-agent') || ''

  const parser = new UAParser(ua)

  const uaResult = parser.getResult()

  const { device, os, browser } = uaResult

  /**
   * ⭐ 异步处理（不阻塞接口）
   */
  void (async () => {
    try {
      /**
       * 检查 ip_geo 是否存在
       */
      const exists = await db.query.ipGeo.findFirst({
        where: eq(ipGeo.ip, ip),
      })

      /**
       * 不存在则写入
       */
      if (!exists && ip && ip !== '::1' && ip !== '127.0.0.1') {
        const geo = getGeoByIP(ip)

        if (geo) {
          await db.insert(ipGeo).values({
            ip,
            ...geo,
          })
        }
      }

      /**
       * 写入日志
       */
      await db.insert(logs).values({
        userId: session.user.id,

        ip,

        action: path,

        method,

        params: body ?? undefined,

        device: device.type ?? 'desktop',

        os: os.name
          ? `${os.name} ${os.version || ''}`.trim()
          : '未知',

        browser: browser.name
          ? `${browser.name} ${browser.version || ''}`.trim()
          : '未知',
      })
    }
    catch (err) {
      console.error('log insert failed:', err)
    }
  })()
})
