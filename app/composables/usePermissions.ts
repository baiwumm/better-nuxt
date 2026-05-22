import { map } from 'es-toolkit/compat'
import { PERMISSIONS } from '@/enums'

export function usePermissions() {
  /**
   * @description: 反推权限值
   */
  function getPermissionValues(bits: number) {
    if (!bits)
      return []
    return map(PERMISSIONS.items.filter(({ raw }) => (bits & raw.bits) === raw.bits), 'value')
  }

  /**
   * @description: 转 bits
   */
  function getPermissionBits(values: string[]) {
    return PERMISSIONS.items
      .filter(({ value }) => values.includes(value))
      .reduce((sum, { raw }) => sum | raw.bits, 0)
  }

  return {
    getPermissionValues,
    getPermissionBits,
  }
}
