import type { NavigationMenuItem } from '@nuxt/ui'
import type { ClassValue } from 'clsx'
import type { Composer } from 'vue-i18n'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RESPONSE_CODE } from '@/enums'

/**
 * @description: 合并类名
 * @param {Array} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description: 统一处理 catch 错误
 */
export function catchError(err: unknown): string {
  const { $i18n } = useNuxtApp()
  let message = $i18n.t('common.requestError')

  if (err instanceof Error) {
    message = err.message
  }
  else if (typeof err === 'string') {
    message = err
  }
  return message
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: Api.ResponseCode) => code === RESPONSE_CODE.SUCCESS

/**
 * @description: 处理 label
 * @param {NavigationMenuItem} items
 */
export function tMenu(items: NavigationMenuItem[], t: Composer['t']): NavigationMenuItem[] {
  return items.map(item => ({
    ...item,
    label: item.label ? t(item.label) : item.label,
    children: item.children ? tMenu(item.children, t) : undefined,
  }))
}

/**
 * @description: 根据路径查找菜单
 * @param {*} menu
 * @param {*} path
 */
export function findMenuByPath(menu: NavigationMenuItem[], path: string): NavigationMenuItem | null {
  for (const item of menu) {
    if (item.to === path)
      return item

    if (item.children) {
      const found = findMenuByPath(item.children, path)
      if (found)
        return found
    }
  }
  return null
}
