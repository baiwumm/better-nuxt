import type { TreeItem } from '@nuxt/ui'
import { map } from 'es-toolkit/compat'
import { PERMISSIONS } from '@/enums'

export function usePermissions() {
  const { i18nPermissions } = useMessage()
  const { t } = useI18n()
  /**
   * @description: 反推权限原值
   */
  function getPermissionRaw(bits: number) {
    if (!bits)
      return []
    return PERMISSIONS.items.filter(({ raw }) => (bits & raw.bits) === raw.bits)
  }

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

  /**
   * @description: 处理权限 key ，用于权限回显
   */
  function getRoleMenuKeys(menus: RoleMenu[]): { id: string }[] {
    const checkedSet = new Set<string>()

    for (const menu of menus) {
    // 菜单本身（先加，UTree 回显需要）
      checkedSet.add(menu.menuId)

      // 没有按钮权限，只选菜单本身
      if (menu.permissions === 0) {
        continue
      }

      // 有按钮权限，拆 bitmask
      for (const { raw } of PERMISSIONS.items) {
        if ((menu.permissions & raw.bits) === raw.bits) {
          checkedSet.add(`${menu.menuId}:${raw.value}`)
        }
      }
    }

    return Array.from(checkedSet).map(id => ({ id }))
  }

  /**
   * 生成权限树 -> Tree UI
   * 只有叶子节点才注入 permissions
   */
  function generatePermissonsTree(nodes: MenuTree[]): TreeItem[] {
    return nodes.map((node) => {
      const hasChildren = !!node.children?.length
      const children = hasChildren ? generatePermissonsTree(node.children) : []

      const permissionNodes = !hasChildren
        ? PERMISSIONS.items
            .filter(p => (node.permissions & p.raw.bits))
            .map(p => ({
              id: `${node.id}:${p.value}`,
              label: i18nPermissions(p.label),
              icon: p.raw.icon,
            }))
        : []

      return {
        id: node.id,
        label: t(node.label),
        icon: node.icon,
        children: [
          ...children,
          ...permissionNodes,
        ],
      }
    })
  }

  /**
   * 核心：Tree 选中值 -> permissions bitmask
   *
   */
  function buildRolePermissions(checkedKeys: string[]) {
    const permissionMap = new Map<string, number>()
    const permissionBitMap = new Map(
      PERMISSIONS.items.map(p => [p.value, p.raw.bits]),
    )

    // 先记录所有菜单（哪怕没有权限）
    const menuSet = new Set<string>()

    for (const key of checkedKeys) {
      const parts = key.split(':')

      // 👉 菜单节点
      if (parts.length === 1 && parts[0]) {
        menuSet.add(parts[0])
        continue
      }

      // 👉 权限节点
      const [menuId, permissionValue] = parts

      const bits = permissionValue ? permissionBitMap.get(permissionValue as typeof PERMISSIONS.valueType) : undefined
      if (!bits || !menuId)
        continue

      const current = permissionMap.get(menuId) ?? 0
      permissionMap.set(menuId, current | bits)
    }

    // 👉 补齐没有权限的菜单
    for (const menuId of menuSet) {
      if (!permissionMap.has(menuId)) {
        permissionMap.set(menuId, 0)
      }
    }

    return Array.from(permissionMap.entries()).map(([menuId, permissions]) => ({
      menuId,
      permissions,
    }))
  }

  /**
   * 获取全部权限 key
   */
  function getAllPermissionKeys(menus: MenuTree[]): { id: string }[] {
    return menus.flatMap((menu) => {
    // 菜单本身
      const currentKeys = [{ id: menu.id }]

      // 按钮权限
      const permissionKeys
        = menu.permissions && menu.permissions !== 0
          ? getPermissionValues(menu.permissions).map(
              value => ({ id: `${menu.id}:${value}` }),
            )
          : []

      // 子菜单
      const childrenKeys = menu.children?.length
        ? getAllPermissionKeys(menu.children)
        : []

      return [...currentKeys, ...permissionKeys, ...childrenKeys]
    })
  }

  return {
    getPermissionValues,
    getPermissionBits,
    getPermissionRaw,
    getRoleMenuKeys,
    generatePermissonsTree,
    buildRolePermissions,
    getAllPermissionKeys,
  }
}
