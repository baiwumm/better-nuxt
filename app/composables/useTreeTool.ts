import type { SelectMenuItem } from '@nuxt/ui'

interface FlattenTreeNode<T> {
  id: string
  icon?: string
  children?: T[]
}

export function useTreeTool() {
  const { t } = useI18n()

  /**
   * @description: 扁平树，用于 Select 下拉树
   */
  function flattenTree<T extends FlattenTreeNode<T>>(tree: T[], labelKey: keyof T, isMenu = false, level = 0, result: SelectMenuItem[] = []) {
    tree.forEach((node) => {
      const prefix = ' '.repeat(level) + (level > 0 ? '└ ' : '')
      const label = isMenu ? t(node[labelKey] as string) : node[labelKey]
      result.push({
        id: node.id,
        label: prefix + label,
        icon: node.icon,
      })

      if (node.children && node.children.length) {
        flattenTree(node.children, labelKey, isMenu, level + 1, result)
      }
    })
    return result
  }

  return {
    flattenTree,
  }
}
