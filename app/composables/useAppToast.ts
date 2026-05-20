export function useAppToast() {
  const toast = useToast()
  const { i18nCommon } = useMessage()

  function successToast(title?: string, description?: string) {
    toast.add({
      title: title || i18nCommon('actionSuccess'),
      description,
      icon: 'lucide:circle-check',
      color: 'success',
    })
  }

  function errorToast(title?: string, description?: string) {
    toast.add({
      title: title || i18nCommon('actionFailed'),
      description,
      icon: 'lucide:x',
      color: 'error',
    })
  }

  function warningToast(title: string, description?: string) {
    toast.add({
      title,
      description,
      icon: 'lucide:triangle-alert',
      color: 'warning',
    })
  }

  function infoToast(title: string, description?: string) {
    toast.add({
      title,
      description,
      icon: 'lucide:info',
      color: 'info',
    })
  }

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
  }
}
