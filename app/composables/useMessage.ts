export function useMessage() {
  const { t } = useI18n()

  // 用户鉴权
  const i18nAuth = (field: string, isForm = false) => isForm ? `$i18n:auth.${field}` : t(`auth.${field}`)

  // 公共
  const i18nCommon = (field: string, isForm = false) => isForm ? `$i18n:common.${field}` : t(`common.${field}`)

  // 用户管理
  const i18nUsers = (field: string, isForm = false) => {
    const prefix = 'pages.settings.users'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 菜单管理
  const i18nMenus = (field: string, isForm = false) => {
    const prefix = 'pages.settings.menus'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 角色管理
  const i18nRoles = (field: string, isForm = false) => {
    const prefix = 'pages.settings.roles'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 国际化
  const i18nLocales = (field: string, isForm = false) => {
    const prefix = 'pages.settings.i18n'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 操作日志
  const i18nLogs = (field: string, isForm = false) => {
    const prefix = 'pages.settings.logs'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 权限
  const i18nPermissions = (field: string) => t(`permissions.${field}`)

  // 我的账户
  const i18nAccount = (field: string) => t(`pages.account.${field}`)

  // 消息公告
  const i18nNotices = (field: string, isForm = false) => {
    const prefix = 'pages.administrative.notices'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 部门管理
  const i18nDepartments = (field: string, isForm = false) => {
    const prefix = 'pages.administrative.departments'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 岗位管理
  const i18nPosts = (field: string, isForm = false) => {
    const prefix = 'pages.administrative.posts'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  return {
    i18nLocales,
    i18nCommon,
    i18nLogs,
    i18nMenus,
    i18nAuth,
    i18nUsers,
    i18nRoles,
    i18nPermissions,
    i18nAccount,
    i18nDepartments,
    i18nPosts,
    i18nNotices,
  }
}
