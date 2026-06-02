import { Enum } from 'enum-plus'
import ThemePreviewDark from '@/components/theme/ThemePreviewDark.vue'
import ThemePreviewLight from '@/components/theme/ThemePreviewLight.vue'
import ThemePreviewSystem from '@/components/theme/ThemePreviewSystem.vue'

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
  SYSTEM: { value: 'system', label: 'System', icon: 'lucide:monitor', component: ThemePreviewSystem },
  LIGHT: { value: 'light', label: 'Light', icon: 'lucide:sun', component: ThemePreviewLight },
  DARK: { value: 'dark', label: 'Dark', icon: 'lucide:moon', component: ThemePreviewDark },
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
  SELF: { value: '_self', label: 'self' },
  BLANK: { value: '_blank', label: 'blank' },
}, {
  labelPrefix: 'target.',
})

/**
 * @description: 路由动画
 */
export const ROUTE_TRANSITION = Enum({
  DEFAULT: {
    value: 'default',
    label: 'default',
    icon: 'lucide:activity', // 默认状态 / 通用动画
  },

  BLUR_SLIDE: {
    value: 'blur-slide',
    label: 'blurSlide',
    icon: 'lucide:move-right', // 有移动 + 流动感（带模糊滑动）
  },

  FADE: {
    value: 'fade',
    label: 'fade',
    icon: 'lucide:circle', // 渐变、淡入淡出
  },

  BLUR_FADE: {
    value: 'blur-fade',
    label: 'blurFade',
    icon: 'lucide:focus', // 聚焦（从模糊到清晰）
  },

  SLIDE_FADE: {
    value: 'slide-fade',
    label: 'slideFade',
    icon: 'lucide:arrow-right-left', // 左右切换（滑动）
  },

  ZOOM: {
    value: 'zoom',
    label: 'zoom',
    icon: 'lucide:maximize', // 放大（缩放动画）
  },

  SWING: {
    value: 'swing',
    label: 'swing',
    icon: 'lucide:rotate-ccw', // 摆动 / 旋转感
  },

  FLIP: {
    value: 'flip',
    label: 'flip',
    icon: 'lucide:flip-horizontal', // 翻转（很贴）
  },

  SLIDE_UP: {
    value: 'slide-up',
    label: 'slideUp',
    icon: 'lucide:arrow-up', // 向上滑
  },

  DIAGONAL: {
    value: 'diagonal',
    label: 'diagonal',
    icon: 'lucide:arrow-up-right', // 对角线移动
  },
}, {
  labelPrefix: 'routeTransition.',
})

/**
 * @description: 请求方式
 */
export const METHODS = Enum({
  GET: { value: 'GET', label: 'GET', icon: 'tabler:http-get' },
  POST: { value: 'POST', label: 'POST', icon: 'tabler:http-post' },
  PUT: { value: 'PUT', label: 'PUT', icon: 'tabler:http-put' },
  DELETE: { value: 'DELETE', label: 'DELETE', icon: 'tabler:http-delete' },
})

/**
 * @description: 系统角色
 */
export const USER_ROLE = Enum({
  ADMIN: { value: 'admin', label: 'Admin' },
  USER: { value: 'user', label: 'User' },
}, {
  labelPrefix: 'systemRole',
})

/**
 * @description: 用户封禁时间
 */
export const BAN_DURATIONS = Enum({
  ONE_HOUR: { value: '1', label: '1Hour', seconds: 60 * 60 },
  TWELVE_HOURS: { value: '2', label: '12Hours', seconds: 60 * 60 * 12 },
  ONE_DAY: { value: '3', label: '1Day', seconds: 60 * 60 * 24 },
  THREE_DAYS: { value: '4', label: '3Days', seconds: 60 * 60 * 24 * 3 },
  SEVEN_DAYS: { value: '5', label: '7Days', seconds: 60 * 60 * 24 * 7 },
}, {
  labelPrefix: 'banExpiresOpts.banDuration',
})

/**
 * @description: 操作权限（全量）
 */
export const PERMISSIONS = Enum({
  SEARCH: { value: 'SEARCH', label: 'search', bits: 1 << 0, icon: 'lucide:search' }, // 查询
  ADD: { value: 'ADD', label: 'add', bits: 1 << 1, icon: 'lucide:plus' }, // 新增
  EDIT: { value: 'EDIT', label: 'edit', bits: 1 << 2, icon: 'lucide:pencil-line' }, // 编辑
  DELETE: { value: 'DELETE', label: 'delete', bits: 1 << 3, icon: 'lucide:trash-2' }, // 删除
  BATCH_DELETE: { value: 'BATCH_DELETE', label: 'batchDelete', bits: 1 << 4, icon: 'i-lucide-list-x' }, // 批量删除
  ADD_CHILD: { value: 'ADD_CHILD', label: 'addChild', bits: 1 << 5, icon: 'lucide:git-branch-plus' }, // 新增子级
  RESET: { value: 'RESET', label: 'reset', bits: 1 << 6, icon: 'lucide:rotate-ccw' }, // 重置
  VIEW_SESSIONS: { value: 'VIEW_SESSIONS', label: 'viewSessions', bits: 1 << 7, icon: 'lucide:messages-square' }, // 查看会话
  BAN_USER: { value: 'BAN_USER', label: 'banUser', bits: 1 << 8, icon: 'lucide:user-x' }, // 封禁用户
  UNBAN_USER: { value: 'UNBAN_USER', label: 'unbanUser', bits: 1 << 9, icon: 'lucide:user-check' }, // 解除封禁
  RESET_PASSWORD: { value: 'RESET_PASSWORD', label: 'resetPassword', bits: 1 << 10, icon: 'lucide:key-round' }, // 重置密码
  ROLE_AUTH: { value: 'ROLE_AUTH', label: 'roleAuth', bits: 1 << 11, icon: 'lucide:shield-check' }, // 角色授权
  ASSIGN_ROLES: { value: 'ASSIGN_ROLES', label: 'assignRoles', bits: 1 << 12, icon: 'lucide:shield-user' }, // 分配角色
})
