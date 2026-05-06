/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-30 17:47:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-30 17:49:16
 * @Description: 获取 i18n 数据
 */
import { en, zh_CN } from './data'

export default defineEventHandler(async (event) => {
  return responseSuccess({
    en,
    'zh-CN': zh_CN,
  })
})
