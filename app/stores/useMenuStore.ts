/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-27 11:06:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-06 15:51:24
 * @Description: 路由菜单
 */
import { defineStore } from 'pinia'

const LEADING_SLASH_RE = /^\/+/
const TRAILING_SLASH_RE = /\/+$/

export const useMenuStore = defineStore('menu-store', () => {
  const menuTree = ref<MenuTree[]>([])
  const loading = ref(false)
  const inited = ref(false)

  const { getMenuList } = useSystemApi()

  const fetchMenuTree = async () => {
    loading.value = true
    try {
      const res = await getMenuList({ enabled: true })
      menuTree.value = res.data ?? []
    }
    finally {
      loading.value = false
    }
  }

  const init = async () => {
    if (inited.value)
      return
    await fetchMenuTree()
  }

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
  }
})
