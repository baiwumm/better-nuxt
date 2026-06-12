import { Enum } from 'enum-plus'

export const HERO_MODE = Enum({
  TEXT: { value: 'text', label: '文本' },
  INIT_CURRENCY: { value: 'intl-currency', label: 'Intl 国际化' },
  PRICE: { value: 'price', label: '数字' },
})

export const DIRECTION = Enum({
  ANY: { value: 'ANY', label: '任意' },
  UP: { value: 'UP', label: '向上' },
  DOWN: { value: 'DOWN', label: '向下' },
})

export const EASING = Enum({
  LEANER: { value: 'linear', label: '线性' },
  EASE_IN_OUT: { value: 'easeInOut', label: '加速' },
  BOUNCE: { value: 'bounce', label: '回弹' },
  EASE_OUT_CUBIC: { value: 'easeOutCubic', label: '柔和' },
  EASE_OUT_EXPO: { value: 'easeOutExpo', label: '极速' },
  BACK_OUT: { value: 'backOut', label: '灵动' },
})

export const CONTROL = Enum({
  AUTO_SCALE: { value: 'autoScale', label: '自动缩放' },
  FADING_EDGE: { value: 'fadingEdge', label: '渐变边缘' },
  DISABLE_ANIMATION: { value: 'disableAnimation', label: '禁用动画' },
})

export const intlConfig: { val: number, locale: string, options: Intl.NumberFormatOptions }[] = [
  { val: 1345.56, locale: 'en-US', options: { style: 'currency', currency: 'USD' } },
  { val: 0.455, locale: 'zh-CN', options: { style: 'percent', minimumFractionDigits: 1 } },
  { val: 92458, locale: 'en-US', options: { style: 'unit', unit: 'meter-per-second' } },
  { val: 4544654321, locale: 'zh-CN', options: { notation: 'compact', compactDisplay: 'long' } },
  { val: 23456.78, locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } },
]

export const textSequence = [
  'Smart Ticker', // Base
  'Smart Diff', // 1. Prefix Match: 'Smart' stays
  '哈基米Smooth', // 4. Letters + Numbers
  '哈キハ하키미Smile', // 6. Complete Change
  'ハキミ하키Smart', // 7. Symbols + Digits
]
