import { Enum } from 'enum-plus'

/**
 * @description: HTTP 状态码（可根据实际需求添加业务状态码）
 */
export const RESPONSE_CODE = Enum({
  SUCCESS: { value: 200, label: '请求成功' },
  BAD_REQUEST: { value: 400, label: '请求参数错误' },
  UNAUTHORIZED: { value: 401, label: '未登录或 token 失效' },
  FORBIDDEN: { value: 403, label: '没有权限' },
  NOT_FOUND: { value: 404, label: '资源不存在' },
  CONFLICT: { value: 409, label: '资源冲突' },
  SERVER_ERROR: { value: 500, label: '服务器错误' },

  // PostgreSQL 错误码
  UNIQUE_VIOLATION: { value: '23505', label: '唯一约束冲突' },
})

/**
 * @description: OAuth Provides
 */
export const OAUTH_PROVIDES = Enum({
  GITHUB: { value: 'github', label: 'github', icon: 'simple-icons:github' },
  GOOGLE: { value: 'google', label: 'google', icon: 'material-icon-theme:google' },
  VERCEL: { value: 'vercel', label: 'vercel', icon: 'simple-icons:vercel' },
  HUGGINGFACE: { value: 'huggingface', label: 'huggingface', icon: 'logos:hugging-face-icon' },
})

/**
 * @description: Color Mode
 */
export const COLOR_MODES = Enum({
  LIGHT: { value: 'light', label: 'Light', icon: 'lucide:sun' },
  DARK: { value: 'dark', label: 'Dark', icon: 'lucide:moon' },
  SYSTEM: { value: 'system', label: 'System', icon: 'lucide:monitor' },
})

/**
 * @description: Locales
 */
export const I18N_LOCALES = Enum({
  ZH_CN: { value: 'zh-CN', label: '简体中文', icon: '🇨🇳' },
  ENGLISH: { value: 'en', label: 'English', icon: '🇺🇸' },
})

/**
 * @description: 窗口打开方式
 */
export const MENU_TARGET = Enum({
  SELF: { value: '_self', label: 'pages.systemSettings.menuManage.target.self' },
  BLANK: { value: '_blank', label: 'pages.systemSettings.menuManage.target.blank' },
})

/**
 * @description: 路由动画
 */
export const ROUTE_TRANSITION = Enum({
  DEFAULT: {
    value: 'default',
    label: 'routeTransition.default',
    icon: 'lucide:activity', // 默认状态 / 通用动画
  },

  BLUR_SLIDE: {
    value: 'blur-slide',
    label: 'routeTransition.blurSlide',
    icon: 'lucide:move-right', // 有移动 + 流动感（带模糊滑动）
  },

  FADE: {
    value: 'fade',
    label: 'routeTransition.fade',
    icon: 'lucide:circle', // 渐变、淡入淡出
  },

  BLUR_FADE: {
    value: 'blur-fade',
    label: 'routeTransition.blurFade',
    icon: 'lucide:focus', // 聚焦（从模糊到清晰）
  },

  SLIDE_FADE: {
    value: 'slide-fade',
    label: 'routeTransition.slideFade',
    icon: 'lucide:arrow-right-left', // 左右切换（滑动）
  },

  ZOOM: {
    value: 'zoom',
    label: 'routeTransition.zoom',
    icon: 'lucide:maximize', // 放大（缩放动画）
  },

  SWING: {
    value: 'swing',
    label: 'routeTransition.swing',
    icon: 'lucide:rotate-ccw', // 摆动 / 旋转感
  },

  FLIP: {
    value: 'flip',
    label: 'routeTransition.flip',
    icon: 'lucide:flip-horizontal', // 翻转（很贴）
  },

  SLIDE_UP: {
    value: 'slide-up',
    label: 'routeTransition.slideUp',
    icon: 'lucide:arrow-up', // 向上滑
  },

  DIAGONAL: {
    value: 'diagonal',
    label: 'routeTransition.diagonal',
    icon: 'lucide:arrow-up-right', // 对角线移动
  },
})

/**
 * @description: 窗口打开方式
 */
export const METHODS = Enum({
  GET: { value: 'GET', label: 'GET', icon: 'tabler:http-get' },
  POST: { value: 'POST', label: 'POST', icon: 'tabler:http-post' },
  PUT: { value: 'PUT', label: 'PUT', icon: 'tabler:http-put' },
  DELETE: { value: 'DELETE', label: 'DELETE', icon: 'tabler:http-delete' },
})
