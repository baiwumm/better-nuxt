export function useMessage() {
  const { t } = useI18n()

  // 国际化
  const i18nInternalization = (field: string, isForm = false) => {
    const prefix = 'pages.systemSettings.internalization'
    return isForm ? `$i18n:${prefix}.${field}` : t(`${prefix}.${field}`)
  }

  // 国际化
  const i18nCommon = (field: string, isForm = false) => isForm ? `$i18n:common.${field}` : t(`common.${field}`)

  return {
    i18nInternalization,
    i18nCommon,
  }
}
