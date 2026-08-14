# 确认禁用 sentinel 滥用防护插件并清理客户端死代码

- **日期**：2026-08-13
- **类型**：其他（行为变更确认 + 死代码清理）
- **影响范围**：`server/utils/auth.ts`、`app/plugins/auth-client.ts`

## 背景与目标

2026-08-13 代码审查（对照 `better-auth-best-practices` / `nuxt` / `supabase-postgres-best-practices` skill）发现 pending diff 中 BetterAuth 的 `sentinel` 滥用防护插件被整体注释（`server/utils/auth.ts:134-229`），导致凭据填充挑战/拦截、泄露密码阻断、一次性邮箱阻断、可疑 IP 检测、注册限流（5/visitor）等能力全部失效；而客户端 `sentinelClient` 仍处于启用状态，每次页面加载会请求已 404 的 identify 端点，前后端不一致。

按项目 AGENTS.md 规则（行为变更需用户确认），已通过询问确认：**用户有意禁用 sentinel**（保留现状）。本迭代仅做收尾：文档化该决策、清理客户端死代码与服务端死 import，不做其他修复。

## 方案

1. 服务端保持 `sentinel` 插件注释状态（用户确认的现状，不恢复）。
2. 移除客户端 `sentinelClient` 配置及其 import —— 服务端不再提供对应能力，客户端调用已无意义且产生无效请求。
3. 移除服务端 `sentinel` 死 import —— 避免 `@antfu/eslint-config` 的 no-unused-vars 报错。
4. 产出本说明文档，记录决策与影响。

## 改动内容

- `server/utils/auth.ts`：
  - `import { dash, sentinel } from '@better-auth/infra'` → `import { dash } from '@better-auth/infra'`（sentinel 仅被注释区引用，属死代码）
  - `import { admin, captcha, lastLoginMethod, magicLink, multiSession, username } from 'better-auth/plugins'` → 移除 `captcha`（captcha 插件同样被注释，属死代码；lint 校验时发现）
- `app/plugins/auth-client.ts`：
  - import 行移除 `sentinelClient`
  - 移除 `sentinelClient({ identifyUrl: process.env.BETTER_AUTH_IDENTIFY_URL, autoSolveChallenge: true })` 配置块
- `docs/optimizations/2026-08-13-sentinel-disabled.md`：本说明文档

## 验证

- 对改动文件执行 eslint，无报错（详见执行记录）。
- 运行时行为变化：客户端不再发起 sentinel identify 请求（此前为 404 无效请求）；其余不变。
- 注意：本次为行为变更的确认与收尾，不涉及恢复防护能力。

## 遗留与后续

- **captcha 插件同样处于注释状态**（`server/utils/auth.ts:230-233`），但前端 `app/composables/auth/useSignInEmail.ts` / `useSignUpEmail.ts` / `useRequestPasswordReset.ts` 仍在发送 `x-captcha-response` header —— 服务端不会校验，属于"假安全"。建议后续要么启用 captcha 插件，要么移除前端 header 逻辑（需用户确认）。
- `rateLimit` 未显式配置（BetterAuth 默认 100 次/10s，无共享存储），暴力破解防护偏宽松。
- 若未来希望重新启用 sentinel，恢复 `server/utils/auth.ts` 注释区并重新添加客户端 `sentinelClient` 即可。
