# 鉴权失败设置真实 HTTP 状态码

- **日期**：2026-08-13
- **类型**：Bug 修复 / REST 语义修正
- **影响范围**：`server/middleware/auth.ts`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危 M4）发现：中间件鉴权失败时 `responseSuccess(null, '未登录', 401)` 返回的 **HTTP 状态是 200**，仅 body 内 `code=401`——浏览器缓存/CDN/标准客户端无法识别，跨源代理可能误缓存。审查建议 `setResponseStatus(event, 401/403)`。

## 方案

- 未登录分支：`setResponseStatus(event, RESPONSE_CODE.UNAUTHORIZED)`（401）
- 非管理员分支：`setResponseStatus(event, RESPONSE_CODE.FORBIDDEN)`（403）
- body 仍保持统一 `IResponse` 结构（`{ code, data, msg, timestamp }`），业务码与 HTTP 状态一致

范围限定：只改中间件的鉴权失败分支，不全局改动 `responseSuccess`（避免影响其他业务码 HTTP 200 的既有模式）。

## 改动内容

- `server/middleware/auth.ts`：两处鉴权失败分支加 `setResponseStatus`

## 验证

- `npx eslint server/middleware/auth.ts`：通过
- `curl` 实测：
  - 未登录 `GET /api/settings/users` → **HTTP 401** + body `{ code: 401, msg: '未登录' }`（原为 HTTP 200）
  - 未登录 `POST /api/administrative/notices/x/read` → **HTTP 401**
  - 白名单 `GET /api/settings/i18n/locales` → HTTP 200（不变）
- 前端兼容（manual）：`$request`（ofetch）对 HTTP 401 走 `onResponseError`，`response._data` 仍含 `code: 401` → 命中既有 401 分支（toast + 跳转 `/auth/sign-in`，高危 7 已修）；`onResponse` 不再收到 401 body（消除了原先误弹"未登录"toast 的问题）

## 行为变化

- 鉴权失败响应：HTTP 200 → 401/403（body 结构不变）
- 浏览器/CDN 现在能正确识别鉴权失败；前端跳转逻辑不变

## 遗留与后续

- 各 handler 内部的业务错误（如 `BAD_REQUEST`）仍为 HTTP 200 + body code——保留项目既有模式，如需统一可后续中央化处理
- 下一中危项：rateLimit 未显式配置（BetterAuth 默认 100 次/10s 宽松且多实例不共享，需共享存储才能根治）
