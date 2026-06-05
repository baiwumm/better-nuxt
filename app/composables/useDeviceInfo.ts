/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-06-05 12:01:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-05 12:02:29
 * @Description: 获取代理信息
 */
import { UAParser } from 'ua-parser-js'

export function useDeviceInfo(userAgent?: string) {
  const parser = new UAParser(userAgent || '')
  const { device, os, browser } = parser.getResult()
  const isMobile = device.type === 'mobile'

  return { device, os, browser, isMobile }
}
