/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2026-05-27 09:21:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2026-05-27 09:32:20
 * @Description: 获取用户角色菜单
 */
import { and, eq } from 'drizzle-orm'
import { auth } from '#server/utils/auth'
import { db } from '@/db/drizzle'
import { menu, role, roleMenu, userRole } from '@/db/schema'
import { RESPONSE_CODE } from '@/enums'

export default defineEventHandler(async (event) => {
  try {
    // 获取用户会话
    const session = await auth.api.getSession({
      headers: event.headers,
    })

    if (!session?.user?.id) {
      return responseSuccess(null, '未登录', RESPONSE_CODE.UNAUTHORIZED)
    }

    const userId = session.user.id

    /**
     * 1. 查询用户角色菜单
     * 过滤：
     * - role.enabled = true
     * - menu.enabled = true
     */
    const roleMenus = await db
      .select({
        menuId: roleMenu.menuId,
        permissions: roleMenu.permissions,

        menu,
      })
      .from(userRole)
      .innerJoin(
        role,
        and(
          eq(userRole.roleId, role.id),
          eq(role.enabled, true),
        ),
      )
      .innerJoin(
        roleMenu,
        eq(role.id, roleMenu.roleId),
      )
      .innerJoin(
        menu,
        and(
          eq(roleMenu.menuId, menu.id),
          eq(menu.enabled, true),
        ),
      )
      .where(eq(userRole.userId, userId))

    /**
     * 2. 合并重复 menuId 权限
     * permissions 使用位运算 OR
     */
    const permissionMap = new Map<
      string,
      typeof roleMenus[number]
    >()

    for (const item of roleMenus) {
      const existing = permissionMap.get(item.menuId)

      if (existing) {
        existing.permissions |= item.permissions
      }
      else {
        permissionMap.set(item.menuId, {
          ...item,
        })
      }
    }

    /**
     * 3. 提取菜单
     * 查询所有启用菜单
     * 用于递归补全父级
     */
    const allMenus = await db
      .select()
      .from(menu)
      .where(eq(menu.enabled, true))

    /**
     * 转 map
     */
    const allMenuMap = new Map(
      allMenus.map(item => [item.id, item]),
    )

    /**
     * 当前已有菜单
     */
    const finalMenuMap = new Map<
      string,
      any
    >()

    /**
     * 先放入已有权限菜单
     */
    for (const item of Array.from(permissionMap.values())) {
      finalMenuMap.set(item.menu.id, {
        ...item.menu,
        permissions: item.permissions,
      })
    }

    /**
     * 递归补全父级
     */
    function appendParentMenus(parentId?: string | null) {
      if (!parentId) {
        return
      }

      // 已存在直接跳过
      if (finalMenuMap.has(parentId)) {
        return
      }

      const parentMenu = allMenuMap.get(parentId)

      if (!parentMenu) {
        return
      }

      /**
       * 父级默认不给权限
       * permissions = 0
       */
      finalMenuMap.set(parentId, {
        ...parentMenu,
        permissions: 0,
      })

      // 继续递归父级
      appendParentMenus(parentMenu.parentId)
    }

    /**
     * 给所有菜单补全父级
     */
    for (const item of Array.from(finalMenuMap.values())) {
      appendParentMenus(item.parentId)
    }

    const menus = Array.from(finalMenuMap.values())
      .sort((a, b) => {
        const createdAtCompare
          = new Date(a.createdAt).getTime()
            - new Date(b.createdAt).getTime()

        if (createdAtCompare !== 0) {
          return createdAtCompare
        }

        return b.sort - a.sort
      })

    /**
     * 4. 转树结构
     */
    return responseSuccess(
      convertFlatDataToTree(menus),
    )
  }
  catch (err) {
    return responseError(err)
  }
})
