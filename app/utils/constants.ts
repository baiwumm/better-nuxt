import colors from 'tailwindcss/colors'

/**
 * @description: 主题色
 */
export const neutralColors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'taupe',
  'mauve',
  'mist',
  'olive',
] as const

export const colorsToOmit = [
  'inherit',
  'current',
  'transparent',
  'black',
  'white',
  ...neutralColors,
] as const
export const getPrimaryColors = () => Object.keys(omit(colors, colorsToOmit as any))
export function getColor(color: string, shade: number) {
  return (colors[color as keyof typeof colors] as Record<number, string>)?.[shade]
}
