# 修复接口安全漏洞链（GET 鉴权 / 凭据泄露 / 日志脱敏 / captcha）

- **日期**：2026-08-13
- **类型**：Bug 修复 / 安全加固
- **影响范围**：`server/middleware/auth.ts`、`server/middleware/logs.ts`、`server/utils/auth.ts`、`server/api/settings/users/index.get.ts`、`app/plugins/request.ts`

## 背景与目标

2026-08-13 代码审查（`docs/optimizations/2026-08-13-code-review.md` 高危 2/3/4/5）确认的安全漏洞链：

1. **高危 2**：所有 GET 接口无鉴权，未登录可读用户/角色/菜单/日志/部门等管理数据
2. **高危 3**：用户列表接口 `with: { accounts: true }` 返回 OAuth accessToken/refreshToken/idToken/密码哈希
3. **高危 4**：captcha 插件被注释（前端发 token、服务端不校验的"假安全"），可脚本化暴力登录/批量注册
4. **高危 5**：操作日志将请求体明文落库（含改密密码），且日志接口未鉴权

两项行为变更（GET 鉴权收紧、captcha 启用）已经用户确认（ask 询问）。

## 方案

1. **GET 鉴权收紧**：中间件改为对所有 `/api` 请求（除白名单）校验登录态，未登录返回 401；GET 仅要求登录，非 GET 保留生产环境管理员邮箱白名单校验。白名单：`/api/auth/*`、`/api/_*`、`/api/account/avatar`、`/api/settings/i18n/locales`（登录页与 error.vue 的 i18n 词条依赖，未登录可读）。
2. **SSR 认证链路修复（配套，必须）**：`getSession` 只认 Cookie（不解析 Authorization）。原 `request.ts` 读 `better-auth.session-token`（连字符）与 BetterAuth 实际 cookie 名 `better-auth.session_token`（下划线）不匹配，SSR 内部请求无认证——此前 GET 放行掩盖了该问题，收紧后会导致所有 SSR 页面 401。修复：SSR 时用 `useRequestHeaders(['cookie'])` 转发 Cookie；客户端修正 cookie 名并保留 Authorization 注入。
3. **用户列表脱敏**：`accounts` 仅返回 `providerId`（前端只用于展示 provider 图标），`departments` 仅返回 `name`，`roles` 保留 role 全字段。
4. **日志脱敏**：新增敏感字段黑名单（password/oldPassword/newPassword/confirmPassword/token/secret/accessToken/refreshToken/idToken/x-captcha-response/authorization），写入 `logs.params` 前递归掩码为 `***`，深度上限 5。
5. **captcha 启用**：恢复 `captcha({ provider: 'cloudflare-turnstile', secretKey: process.env.TURNSTILE_SECRET_KEY })`。插件默认端点（`/sign-up/email`、`/sign-in/email`、`/request-password-reset`）恰好与前端 3 个发送 `x-captcha-response` 的流程一致；magic link / social 登录不受影响。

## 改动内容

- `server/middleware/auth.ts`：白名单新增 `/api/settings/i18n/locales`；GET 从"直接放行"改为"校验 session 后放行"
- `app/plugins/request.ts`：SSR 转发 Cookie（`useRequestHeaders`）；cookie 名修正为 `better-auth.session_token`
- `server/api/settings/users/index.get.ts`：`accounts`/`departments` 用 `columns` 裁剪敏感列
- `server/middleware/logs.ts`：新增 `SENSITIVE_KEYS` + `maskSensitiveFields()` 递归脱敏
- `server/utils/auth.ts`：恢复 `captcha` import 与插件配置

## 验证

- `npx eslint`（5 个改动文件）：通过，无错误
- `pnpm build`：client 构建成功（5939 modules）、SSR 构建成功（1995 modules，含全部服务端改动，类型编译通过）；**Nitro 产物打包阶段 OOM**（`JavaScript heap out of memory`，Node 默认 4GB 堆不足，Windows 大项目打包的既有环境问题，与本次改动无关）——建议构建时设 `NODE_OPTIONS=--max-old-space-size=8192` 重试
- 行为核对（manual）：白名单依赖确认（`useInitLocales` → `/api/settings/i18n/locales`，`app/error.vue:11` 同样依赖）；captcha 默认端点与前端 token 发送点逐一对应

## 行为变化（已确认）

- 未登录访问管理 GET 接口：放行 → `401`（HTTP 状态仍为 200，body `code=401`，见遗留）
- 登录/注册/忘记密码：服务端开始真实校验 Turnstile token（此前不校验）
- 用户列表响应体：不再包含 OAuth 凭据与密码哈希
- 操作日志：敏感字段存 `***` 而非明文
- SSR 页面数据请求：正确携带认证（修复了潜在的 SSR 401 回归）

## 遗留与后续

- **`app/plugins/request.ts:60` 的 401 跳转仍指向不存在的 `/login`**（真实路由 `/auth/sign-in`），GET 鉴权收紧后 401 更频繁，此 bug 影响放大——建议下一步修复（高危 7）
- 鉴权失败返回 HTTP 200 仅 body 带 code（中危 M4），建议 `setResponseStatus(event, 401/403)`
- 日志接口 `GET /api/settings/logs` 已随 GET 收紧纳入鉴权，但日志数据本身仍无 RBAC 细分（管理员白名单之外的普通用户可读自己的操作？见低危 L3 后续）
- 其余高危项（TrafficSource SSR 阻塞、tabStore Map 持久化、pageSize 上限等）见 `2026-08-13-code-review.md` 路线，后续迭代处理
