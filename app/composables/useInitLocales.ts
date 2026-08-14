export async function useInitLocales() {
  const { setLocaleMessage } = useI18n()
  const { getLocales } = useSettingsApi()

  // SSR 阶段加载词条：阻塞约 0.3s 换来首屏正确文案、无 missing key 警告、无水合闪烁
  // （曾尝试 server:false + lazy，导致词条不加载/SSR 阶段 key 报错，已回退）
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
