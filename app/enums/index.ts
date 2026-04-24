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
