/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-04-27 15:54:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-04-27 17:11:20
 * @Description: 多标签页
 */
import type { Router } from 'vue-router'
import { defineStore } from 'pinia'

type Path = System.MenuTree['to']
const HOME_PATH = '/'

export const useTabStore = defineStore('tab-store', () => {
  // 用 Map 做去重 + 保序，比 Set 更适合存对象
  const tagMap = ref<Map<string, System.MenuTree>>(new Map())
  // 👉 当前激活
  const activePath = ref<string>('')
  const tags = computed(() => Array.from(tagMap.value.values()))
  const ignoreNextAdd = ref(false)

  // ===== 设置激活 =====
  const setActive = (path: Path) => {
    activePath.value = path || HOME_PATH
  }

  // ===== 添加标签 =====
  const addTag = (tag: System.MenuTree) => {
    if (!tag.to)
      return

    tagMap.value.set(tag.to, tag)
    activePath.value = tag.to
  }

  // ===== 获取相邻 =====
  const getNextPath = (path: Path) => {
    if (!path)
      return HOME_PATH
    const keys = Array.from(tagMap.value.keys())
    const index = keys.indexOf(path)

    // 优先右边，没有就左边
    return keys[index + 1] || keys[index - 1] || HOME_PATH
  }

  // ===== 关闭当前 =====
  const closeTag = (path: Path, router?: Router) => {
    if (!path)
      return
    const isActive = activePath.value === path

    tagMap.value.delete(path)

    if (isActive) {
      ignoreNextAdd.value = true
      const next = getNextPath(path)
      activePath.value = next

      router?.push(next)
    }
  }

  // ===== 关闭其他 =====
  const closeOthers = (path: Path, router?: Router) => {
    if (!path)
      return
    const newMap = new Map<string, System.MenuTree>()

    tagMap.value.forEach((tag, key) => {
      if (key === path) {
        newMap.set(key, tag)
      }
    })

    tagMap.value = newMap

    if (activePath.value !== path) {
      ignoreNextAdd.value = true
      activePath.value = path
      router?.push(path)
    }
  }

  // ===== 关闭左侧 =====
  const closeLeft = (path: Path, router?: Router) => {
    if (!path)
      return
    const keys = Array.from(tagMap.value.keys())
    const index = keys.indexOf(path)

    if (index <= 0)
      return

    const newMap = new Map<string, System.MenuTree>()

    keys.forEach((key, i) => {
      if (i >= index) {
        newMap.set(key, tagMap.value.get(key)!)
      }
    })

    tagMap.value = newMap

    // 如果当前激活被删了
    if (!tagMap.value.has(activePath.value)) {
      ignoreNextAdd.value = true
      activePath.value = path
      router?.push(path)
    }
  }

  // ===== 关闭右侧 =====
  const closeRight = (path: Path, router?: Router) => {
    if (!path)
      return
    const keys = Array.from(tagMap.value.keys())
    const index = keys.indexOf(path)

    const newMap = new Map<string, System.MenuTree>()

    keys.forEach((key, i) => {
      if (i <= index) {
        newMap.set(key, tagMap.value.get(key)!)
      }
    })

    tagMap.value = newMap

    if (!tagMap.value.has(activePath.value)) {
      ignoreNextAdd.value = true
      activePath.value = path
      router?.push(path)
    }
  }

  // ===== 关闭所有 =====
  const closeAll = (router?: Router) => {
    tagMap.value = new Map()

    activePath.value = HOME_PATH

    router?.push(HOME_PATH)
  }

  const hasTag = (path: Path) => {
    if (!path)
      return false
    return tagMap.value.has(path)
  }
  return {
    tags,
    activePath,
    setActive,
    addTag,
    closeTag,
    closeOthers,
    closeLeft,
    closeRight,
    closeAll,
    hasTag,
    ignoreNextAdd,
  }
}, {
  // 开启持久化
  persist: true,
})
