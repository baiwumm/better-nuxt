export async function useInitLocales() {
  const { setLocaleMessage } = useI18n()
  const { getLocales } = useSettingsApi()

  const { data } = await useAsyncData(
    'locales',
    () => getLocales(),
  )

  const code = data.value?.code

  if (code && isSuccess(code)) {
    const locales = data.value?.data

    for (const key in locales) {
      setLocaleMessage(
        key,
        locales[key as Locale],
      )
    }
  }
}
