export function useMessage() {
  const { t } = useI18n()

  // 用户鉴权
  const i18nAuth = (field: string, isForm = false) => isForm ? `$i18n:auth.${field}` : t(`auth.${field}`)

  // 公共
  const i18nCommon = (field: string, isForm = false) => isForm ? `$i18n:common.${field}` : t(`common.${field}`)

  // 用户管理
  const i18nUser = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.userManage'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 菜单管理
  const i18nMenu = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.menuManage'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 角色管理
  const i18nRole = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.roleManage'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 国际化
  const i18nInternalization = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.internalization'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 操作日志
  const i18nLog = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.operationLog'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 权限
  const i18nPermissions = (field: string) => t(`permissions.${field}`)

  return {
    i18nInternalization,
    i18nCommon,
    i18nLog,
    i18nMenu,
    i18nAuth,
    i18nUser,
    i18nRole,
    i18nPermissions,
  }
}
