export function useMessage() {
  const { t } = useI18n()

  // 国际化
  const i18nInternalization = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.internalization'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 国际化
  const i18nCommon = (field: string, isForm = false) => isForm ? `$i18n:common.${field}` : t(`common.${field}`)

  // 操作日志
  const i18nLog = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.operationLog'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  return {
    i18nInternalization,
    i18nCommon,
    i18nLog,
  }
}
