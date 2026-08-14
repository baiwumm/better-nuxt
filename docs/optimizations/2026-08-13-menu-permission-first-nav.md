# 修复菜单权限首次导航被跳过

- **日期**：2026-08-13
- **类型**：Bug 修复 / 安全加固
- **影响范围**：`app/middleware/auth.global.ts`、`app/stores/useMenuStore.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：`auth.global.ts` 的菜单权限校验依赖 `menuStore.inited/loading`，而菜单只在客户端（`watch(user.id, immediate)` 等 session 就绪后）加载。首次导航（登录后跳转、直接输入 URL）时菜单未加载 → middleware 直接 `return` 放行 → **UI 级权限校验形同虚设**。

## 方案

1. **middleware**：菜单未就绪（`!inited || loading`）时 `await menuStore.init()` 等待加载完成后再校验——SSR 阶段也可执行（菜单接口走 `$request`，SSR 会转发 cookie，见 `2026-08-13-api-security.md` 的 SSR 认证链路修复）
2. **store**：`fetchMenuTree` 加 `pendingPromise` in-flight 防重——middleware 的 `init()` 与 `watch(user.id)` 可能并发触发，共享同一请求避免重复拉取

## 改动内容

- `app/middleware/auth.global.ts`：`if (!inited || loading) return` → `if (!inited || loading) await menuStore.init()`
- `app/stores/useMenuStore.ts`：`fetchMenuTree` 增加 `pendingPromise` 防重（完成/失败后置空）

## 验证

- `npx eslint`（两个文件）：通过
- `pnpm dev` 日志：SSR 阶段真实执行菜单查询 SQL（`role_menus` + `menus`）——middleware 等待菜单加载生效（修复前菜单查询仅出现在客户端）
- `curl`：`/auth/sign-in` 200；`/`（未登录）302 重定向登录页（middleware 正常工作）

## 行为变化

- 已登录用户直接访问任意路由：先等待菜单加载再校验权限（原本直接放行）——无权限路径正确返回 403
- 首次导航/刷新页面：菜单在 SSR 阶段即可用（进 payload），客户端水合无需再等待

## 遗留与后续

- `showError({ statusMessage })` 触发 h3 建议改用 `message` 的 warning（不影响功能，未处理）
- 下一项：`useInitLocales` 顶层 await 阻塞 SSR
