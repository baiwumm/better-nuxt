/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-20 17:15:31
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-03 14:39:47
 * @Description: 统一 Toast（依赖于 Nuxt UI 的 useToast）
 */
import type { ToastProps } from '@nuxt/ui'

// 定义更严格的类型，排除会破坏语义的属性
type BaseToastOptions = Omit<Partial<ToastProps>, 'icon' | 'color'>

export function useAppToast() {
  const toast = useToast()
  const { i18nCommon } = useMessage()

  const defaultConfigs = {
    success: {
      title: i18nCommon('actionSuccess'),
      icon: 'lucide:circle-check',
      color: 'success' as const,
    },
    error: {
      title: i18nCommon('actionFailed'),
      icon: 'lucide:x',
      color: 'error' as const,
    },
    warning: {
      title: i18nCommon('actionWarning'),
      icon: 'lucide:triangle-alert',
      color: 'warning' as const,
    },
    info: {
      title: i18nCommon('actionInfo'),
      icon: 'lucide:info',
      color: 'info' as const,
    },
  }

  function createToast(type: keyof typeof defaultConfigs, props?: BaseToastOptions) {
    toast.add({
      ...defaultConfigs[type],
      ...props,
    })
  }

  return {
    successToast: (props?: BaseToastOptions) => createToast('success', props),
    errorToast: (props?: BaseToastOptions) => createToast('error', props),
    warningToast: (props?: BaseToastOptions) => createToast('warning', props),
    infoToast: (props?: BaseToastOptions) => createToast('info', props),
  }
}
