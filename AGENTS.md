# AGENTS.md — better-nuxt

现代化全栈后台管理系统（Nuxt 4 + Better-Auth + Nuxt UI + Drizzle ORM + PostgreSQL），作者 baiwumm，含 RBAC、动态菜单、i18n、主题配置等能力。

## Project

- **前端**：Nuxt 4.4（Vue 3.5）、Nuxt UI 4.9、Tailwind CSS 4、Pinia（persistedstate）、@nuxtjs/i18n（默认 zh-CN，词条存数据库）、dayjs、@vueuse、motion-v
- **后端**：Nitro（`server/`）、Better-Auth 1.6（邮箱密码 / magic link / OAuth GitHub+Google+Vercel+HuggingFace / admin 插件）、Drizzle ORM 0.45 + PostgreSQL（@neondatabase/serverless）
- **基础设施**：pnpm、Resend 邮件（@vue-email）、Vercel Blob（@nuxthub/core）、nuxt-security、Turnstile、@nuxt/image、nuxt-og-image、@nuxt/scripts（生产环境注入 GA/Clarity/CF/Vercel 统计）
- **入口**：`app/app.vue`（UApp + UTheme + 布局/路由动画）；服务端核心 `server/utils/auth.ts`（BetterAuth 实例）、`server/api/auth/[...all].ts`（auth handler）
- **路径别名**：`@/` → `app/`（如 `@/db/schema`、`@/components/...`），根目录文件用相对路径

## Commands

```bash
pnpm install        # 安装依赖（postinstall 自动执行 nuxt prepare）
pnpm dev            # 开发服务器，端口 5173
pnpm build          # 生产构建
pnpm generate       # 静态站点生成
pnpm preview        # 预览生产构建
pnpm lint           # ESLint（@antfu/eslint-config）
pnpm lint:fix       # 自动修复
pnpm release        # release-it 发版（conventional changelog → CHANGELOG.md）
npx drizzle-kit generate   # 生成迁移（schema: app/db/schema.ts → app/db/migrations）
npx drizzle-kit migrate    # 执行迁移
npx drizzle-kit push       # 直接推送 schema，不生成迁移文件
```

无测试框架/测试脚本。lint 是主要质量门禁（husky pre-commit 触发 commitlint + lint）。

## Workflow（优化迭代规范）

项目已转向 AI 主导（Vibe Coding）的持续优化，每次优化迭代遵循以下规范：

1. **一次一个目标**：单次迭代只做一个优化任务，用 todo 列表拆分步骤，完成一步验证一步
2. **不影响现有功能**：优化默认是等价重构——对外行为（API 响应、权限逻辑、页面交互）保持不变；确需改变行为时，先说明原因并经用户确认
3. **更优方案先确认**：优化中发现更好的实现方式（技术选型、架构、数据模型、接口契约变更，或影响面更大的替代方案）时，先停下用 ask 工具与用户确认，确认后才实施
4. **强制产出文档**：每次迭代结束必须在 `docs/optimizations/YYYY-MM-DD-<slug>.md` 产出一份优化文档（模板见 `docs/optimizations/README.md`），记录背景/方案/改动/验证/遗留，禁止跳步
5. **优先调用 skill**：执行优化迭代时调用项目 skill `vibe-optimize`（`/vibe-optimize`），它规定了完整 7 步流程
6. **依赖安装**：新增第三方依赖前，先检查官方是否提供 skill / MCP（用 `install-capability` 安装），避免重复造轮子
7. **回归意识**：改动涉及 schema/API/权限时，同步更新 relations、zod schema 与相关文档

## Architecture

- **`app/pages/`** — 文件路由：`account/`（个人中心）、`administrative/`（部门/组织架构/公告/岗位）、`auth/`（登录注册等）、`exception/`（403/404/500）、`hub/`（概览/版本）、`notices-center/`、`playground/`（组件实验场）、`settings/`（用户/角色/菜单/i18n/日志）
- **`app/db/schema.ts`** — 业务表 Drizzle schema + relations（menus/roles/role_menus/user_roles/i18n/logs/ip_geos/notices/departments/posts…），re-export 根目录 `auth-schema.ts`（Better-Auth 的 users/sessions/accounts/verifications）；`app/db/drizzle.ts` 导出 db 实例
- **`server/utils/auth.ts`** — BetterAuth 配置中枢：插件、OAuth、邮件模板（`app/components/email/*.vue`）、databaseHooks（新用户自动分配默认角色）
- **`server/api/`** — Nitro API，按业务分目录，文件名即路由（`index.get.ts`、`[id].put.ts`），响应统一走 `responseSuccess/responseError`
- **`server/middleware/`** — `auth.ts` 接口鉴权（GET/`/api/auth`/白名单放行，其余校验会话 + 生产环境管理员邮箱白名单）、`logs.ts` 写操作日志 + 异步 IP 地理信息
- **`shared/`** — 前后端共享：`types/`（api/common/settings/administrative）、`utils/`（enums.ts 含 RESPONSE_CODE/METHODS/I18N_LOCALES/PERMISSIONS，schemas.ts）
- **`app/stores/`** — Pinia：useAppStore（主题/语言等）、useMenuStore（菜单树+权限 map）、useTabStore（多标签页）
- **`app/composables/`** — 业务组合式函数：useRequest（$fetch 封装）、usePermissions（按钮权限 bitmask）、useSchema/useTableColumns（表单/表格 schema 驱动）、useMenu、useThemeMenu、usePagination 等

## Conventions

- **响应格式**：所有 API 返回 `IResponse { code, data, msg, timestamp }`（shared/types/api.ts）；成功用 `responseSuccess(data, msg?, code?)`，异常用 `catchError` / `responseError`，状态码取 `RESPONSE_CODE` 枚举
- **前端请求**：用 `useRequest()`（composable）或 `$request`（plugin，baseURL `/api`，自动注入 better-auth cookie token、统一 toast 错误提示）
- **鉴权**：页面走 `app/middleware/auth.global.ts`（会话 + 菜单权限）；接口 GET 默认放行，写操作由 `server/middleware/auth.ts` 拦截；服务端取会话用 `auth.api.getSession({ headers: event.headers })`
- **权限模型**：RBAC，按钮权限为整数 bitmask（`PERMISSIONS` 枚举，见 shared/utils/enums.ts），菜单/部门/i18n 均为树形结构（parentId + sort），前后端统一用 `convertFlatDataToTree`
- **DB 访问**：只经 `@/db/drizzle`（db 实例）与 `@/db/schema`；新表需同时补 relations 与 insert/update zod schema（drizzle-zod）；`auth-schema.ts` 里的 usersRelations 也要同步更新
- **代码风格**：@antfu/eslint-config（无分号、单引号、2 空格）；中文 JSDoc 注释（`@description`）；文件头保留作者注释块
- **i18n**：文案优先走 i18n（DB 词条 + `useI18n`），组件 label 常为 i18n key；新页面/菜单需同步 DB 菜单与 i18n 数据
- **环境变量**：`.env`（勿提交），key 前缀 `NUXT_`；服务端读取走 `useRuntimeConfig` 或直接 `process.env`
- **提交规范**：Conventional Commits（commitlint），发版用 `pnpm release`

## Notes

- pnpm `overrides` 固定 `h3` 1.15.11，升级依赖时勿覆盖
- `nuxt.config.ts` 开启 `experimental.normalizePageNames` 与 5 分钟过期构建检查、nuxt-skew-protection；修改路由/页面结构注意路由动画与 keepalive（`app/app.vue` 的 NuxtPage 配置）
- 部署目标为 Vercel（ipAddressHeaders 按 x-vercel-forwarded-for 配置）；本地开发需配置 `.env`（至少 DATABASE_URL、BETTER_AUTH_SECRET、BETTER_AUTH_URL）
- Playground 页（`app/pages/playground/`）是组件库演示区，新增第三方组件集成时可参考其结构
