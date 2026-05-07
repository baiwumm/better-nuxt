/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-07 15:47:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-07 15:50:52
 * @Description: theme / UI 设置
 */
import type { DropdownMenuItem } from '@nuxt/ui'
import { COLOR_MODES, I18N_LOCALES, ROUTE_TRANSITION } from '@/enums'
import { getPrimaryColors } from '@/utils/constants'

export function useThemeMenu() {
  const colorMode = useColorMode()
  const appStore = useAppStore()
  const { locale, setLocale } = useI18n()
  const appConfig = useAppConfig()
  const { t } = useI18n()

  const { primaryColor, blackAsPrimary, radius, transition } = storeToRefs(appStore)
  const { setPrimaryColor, setBlackAsPrimary, setRadius, setTransition } = appStore

  const themeItems = computed(() => [{
    label: t('components.themePicker.primaryColor'),
    icon: 'lucide:palette',
    chip: appConfig.ui.colors.primary,
    children: [
      {
        label: 'Black',
        chip: 'black',
        slot: 'primary' as const,
        checked: blackAsPrimary.value,
        type: 'checkbox',
        onSelect: (e: Event) => {
          e.preventDefault()
          setBlackAsPrimary(true)
        },
      },
      ...getPrimaryColors().map(color => ({
        label: color,
        chip: color,
        slot: 'primary' as const,
        checked: !blackAsPrimary.value && primaryColor.value === color,
        type: 'checkbox',
        onSelect: (e: Event) => {
          e.preventDefault()
          setPrimaryColor(color)
          setBlackAsPrimary(false)
        },
      })) as DropdownMenuItem[],
    ],
  }, {
    label: t('components.themePicker.colorMode'),
    icon: 'lucide:sun-moon',
    children: COLOR_MODES.items.map(({ value, label, raw }) => ({
      label,
      icon: raw.icon,
      type: 'checkbox',
      checked: colorMode.preference === value,
      onSelect(e: Event) {
        e.preventDefault()
        colorMode.preference = value
      },
    })),
  }, {
    label: t('components.themePicker.locales'),
    icon: 'lucide:globe',
    children: I18N_LOCALES.items.map(({ value, label, raw }) => ({
      label,
      icon: raw.icon,
      slot: 'locales' as const,
      type: 'checkbox',
      checked: locale.value === value,
      onSelect(e: Event) {
        e.preventDefault()
        setLocale(value)
      },
    })),
  }, {
    label: t('components.themePicker.radius'),
    icon: 'lucide:radius',
    children: [0, 0.125, 0.25, 0.375, 0.5].map(r => ({
      label: String(r),
      type: 'checkbox',
      checked: radius.value === r,
      onSelect(e: Event) {
        e.preventDefault()
        setRadius(r)
      },
    })),
  }, {
    label: t('components.themePicker.transition'),
    icon: 'lucide:route',
    children: ROUTE_TRANSITION.items.map(({ value, label, raw }) => ({
      label: t(label),
      icon: raw.icon,
      type: 'checkbox',
      checked: transition.value === value,
      onSelect(e: Event) {
        e.preventDefault()
        setTransition(value)
      },
    })),
  }] satisfies DropdownMenuItem[])

  return { themeItems }
}
