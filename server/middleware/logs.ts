/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-29 09:14:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:36:37
 * @Description: 记录操作日志
 */
import { eq } from 'drizzle-orm'
import { UAParser } from 'ua-parser-js'
import { db } from '@/db/drizzle'
import { ipGeos, logs } from '@/db/schema'

// 敏感字段黑名单：命中即掩码，防止密码/token 等明文落库
const SENSITIVE_KEYS = [
  'password',
  'oldPassword',
  'newPassword',
  'confirmPassword',
  'token',
  'secret',
  'accessToken',
  'refreshToken',
  'idToken',
  'x-captcha-response',
  'authorization',
]

/**
 * 递归脱敏请求体中的敏感字段
 * @param data 请求体
 * @param depth 递归深度上限，防止循环引用
 */
function maskSensitiveFields(data: unknown, depth = 0): unknown {
  if (depth > 5 || data == null || typeof data !== 'object')
    return data

  if (Array.isArray(data))
    return data.map(item => maskSensitiveFields(item, depth + 1))

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    result[key] = SENSITIVE_KEYS.includes(key)
      ? '***'
      : maskSensitiveFields(value, depth + 1)
  }

  return result
}

export default defineEventHandler(async (event) => {
  const method = event.method as Methods
  const url = getRequestURL(event)
  const path = url.pathname
  const contentType = getRequestHeader(event, 'content-type')

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
    || path.startsWith('/api/settings/logs')
    || !path.startsWith('/api')
  ) {
    return
  }

  const body = contentType?.includes('multipart/form-data')
    ? {
        type: 'file-upload',
      }
    : await readBody(event).catch(() => undefined)

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

  if (!ip || ip === '::1' || ip === '127.0.0.1')
    return

  /**
   * 写入日志
   */
  await db.insert(logs).values({
    userId: session.user.id,

    ip,

    action: path,

    method,

    params: maskSensitiveFields(body) ?? undefined,

    device: device.type ?? 'desktop',

    os: os.name
      ? `${os.name} ${os.version || ''}`.trim()
      : '未知',

    browser: browser.name
      ? `${browser.name} ${browser.version || ''}`.trim()
      : '未知',
  })

  // 异步做 geo（不阻塞）
  void (async () => {
    const exists = await db.query.ipGeos.findFirst({
      where: eq(ipGeos.ip, ip),
    })

    if (!exists) {
      const geo = await getGeoByIP(ip)
      if (geo) {
        await db.insert(ipGeos).values({ ip, ...geo })
      }
    }
  })()
})
