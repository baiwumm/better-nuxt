/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-03-20 09:23:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-06-17 15:32:38
 * @Description: 全局状态
 */
import { defineStore } from 'pinia'

type Transition = typeof ROUTE_TRANSITION.valueType

export const useAppStore = defineStore('app-store', () => {
  const appConfig = useAppConfig()
  const colorMode = useColorMode()
  // 主题偏好（cookie 持久化：SSR 可读请求 Cookie，避免水合闪烁 FOUC；30 天有效期）
  // 主题色
  const primaryColor = useCookie<string>('app-primary-color', {
    default: () => appConfig.ui.colors.primary,
    maxAge: 60 * 60 * 24 * 30,
  })
  const blackAsPrimary = useCookie<boolean>('app-black-as-primary', {
    default: () => true,
    maxAge: 60 * 60 * 24 * 30,
  })
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }
  const setBlackAsPrimary = (val: boolean) => {
    blackAsPrimary.value = val
  }

  // 圆角
  const radius = useCookie<number>('app-radius', {
    default: () => 0.25,
    maxAge: 60 * 60 * 24 * 30,
  })
  const setRadius = (val: number) => {
    radius.value = val
  }

  // 路由动画
  const transition = useCookie<Transition>('app-transition', {
    default: () => ROUTE_TRANSITION.DEFAULT,
    maxAge: 60 * 60 * 24 * 30,
  })
  const setTransition = (val: Transition) => {
    transition.value = val
  }

  // 是否暗色主题
  const isDark = computed(() => colorMode.value === COLOR_MODES.DARK)
  return {
    primaryColor,
    setPrimaryColor,
    blackAsPrimary,
    setBlackAsPrimary,
    radius,
    setRadius,
    isDark,
    transition,
    setTransition,
  }
})
