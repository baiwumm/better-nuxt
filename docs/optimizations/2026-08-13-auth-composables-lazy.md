# useSessionMenu / useAccountInfo 消除裸 await 与无收益 SSR 调用

- **日期**：2026-08-13
- **类型**：性能优化 / SSR 正确性
- **影响范围**：`app/composables/auth/useSessionMenu.ts`、`app/composables/auth/useAccountInfo.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：

1. **`useSessionMenu`**：setup 顶层 `await $authClient.multiSession.listDeviceSessions()`——SSR 执行一次（`$authClient` 不走 `$request`，SSR 无 cookie → 无效/空结果），客户端水合后再执行一次，双重请求且无缓存复用
2. **`useAccountInfo`**：已用 `useAsyncData` 但未设 `server: false`——SSR 调用 `$authClient.accountInfo` 无 cookie 无收益

## 方案

- **`useSessionMenu`**：改用 `useAsyncData` 包裹 + `server: false`；key 参数化为 `device-sessions-${userId}`（切换账户后自动重新获取，与 `refreshNuxtData()` 切换逻辑兼容）；computed 内 `sessions` → `sessions.value`
- **`useAccountInfo`**：加 `server: false`

## 改动内容

- `app/composables/auth/useSessionMenu.ts`：裸 await → `useAsyncData`（`server: false`、函数式 key）；`sessions.value?.map`
- `app/composables/auth/useAccountInfo.ts`：options 加 `server: false`

## 验证

- `npx eslint`（两文件）：通过
- `pnpm dev`：HMR 更新 `useSessionMenu.ts`/`UserMenu.vue` 成功、Nitro 重建无错误；`/auth/sign-in` 200（0.1s）
- 调用方核对（manual）：`useSessionMenu` 仅 `UserMenu.vue` 使用且只用 `sessionItems`（Ref），不受 `sessions` 变 Ref 影响

## 行为变化

- 多会话列表、账户信息：仅客户端获取（SSR 不再发起无效调用）
- 切换账户后 key 变化自动刷新多会话列表

## 遗留与后续

- 观察到 `[intlify] Not found ... key` warning：`useInitLocales` 懒加载后 SSR 首屏词条未就绪的预期表现（`2026-08-13-init-locales-lazy.md`）
- 下一项：首页图表库（unovis）进首屏
