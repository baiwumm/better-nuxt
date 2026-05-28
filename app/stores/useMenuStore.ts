/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-27 11:06:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-28 10:04:30
 * @Description: 路由菜单
 */
import { defineStore } from 'pinia'

const LEADING_SLASH_RE = /^\/+/
const TRAILING_SLASH_RE = /\/+$/

export const useMenuStore = defineStore('menu-store', () => {
  const menuTree = ref<MenuTree[]>([])
  const loading = ref(false)
  const inited = ref(false)

  const { getMenus } = useMeApi()

  const fetchMenuTree = async () => {
    loading.value = true
    try {
      const res = await getMenus()
      menuTree.value = res.data ?? []
    }
    finally {
      loading.value = false
      inited.value = true
    }
  }

  const init = async () => {
    if (inited.value)
      return
    await fetchMenuTree()
  }

  // 生成扁平化的菜单路径映射，方便后续根据路径获取菜单项
  const menuPathMap = computed(() => {
    const map = new Map<string, MenuTree>()

    function travel(list: MenuTree[]) {
      list.forEach((item) => {
        if (item.to) {
          map.set(item.to, item)
        }
        if (item.children?.length) {
          travel(item.children)
        }
      })
    }

    travel(menuTree.value)

    return map
  })

  // 按钮权限 Map
  const permissionsMap = computed(() => {
    const map = new Map<string, number>()

    function walk(list: MenuTree[]) {
      for (const item of list) {
        if (item.to) {
          map.set(
            item.to,
            item.permissions ?? 0,
          )
        }

        if (item.children?.length) {
          walk(item.children)
        }
      }
    }

    walk(menuTree.value)

    return map
  })

  // =========================
  // 🧠 keepAlive 逻辑（核心）
  // =========================

  const normalizeRouteName = (to: string) => {
    if (!to || to === '/')
      return 'index'

    return to
      .replace(LEADING_SLASH_RE, '')
      .replace(TRAILING_SLASH_RE, '')
      .split('/')
      .filter(Boolean)
      .join('-')
  }

  const getKeepAliveNames = (list: MenuTree[] = []) => {
    const result = new Set<string>()

    const walk = (arr: MenuTree[]) => {
      for (const item of arr) {
        if (item.keepAlive && item.to) {
          result.add(normalizeRouteName(item.to))
        }

        if (item.children?.length) {
          walk(item.children)
        }
      }
    }

    walk(list)
    return result
  }

  // 👉 computed（响应式 keepAlive）
  const keepAliveNames = computed(() => {
    return getKeepAliveNames(menuTree.value)
  })

  const keepAliveList = computed(() => {
    return Array.from(keepAliveNames.value)
  })
  return {
    menuTree,
    loading,
    inited,
    fetchMenuTree,
    init,
    keepAliveNames,
    keepAliveList,
    menuPathMap,
    permissionsMap,
  }
})
