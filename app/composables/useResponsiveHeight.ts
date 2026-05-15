import { breakpointsTailwind } from '@vueuse/core'

export function useResponsiveHeight(options: {
  default: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}) {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const height = computed(() => {
    if (breakpoints.xl.value && options.xl)
      return options.xl

    if (breakpoints.lg.value && options.lg)
      return options.lg

    if (breakpoints.md.value && options.md)
      return options.md

    if (breakpoints.sm.value && options.sm)
      return options.sm

    return options.default
  })

  return {
    height,
  }
}
