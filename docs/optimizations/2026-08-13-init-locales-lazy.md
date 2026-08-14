# useInitLocales 优化尝试与回退（回归修复）

- **日期**：2026-08-13
- **类型**：性能优化（已回退）/ Bug 修复
- **影响范围**：`app/composables/useInitLocales.ts`、`app/pages/components/TrafficSource.vue`

## 背景与目标

代码审查（中危）指出 `app.vue` 顶层 `await useInitLocales()` 阻塞 SSR 首屏（每个请求先等 `/api/settings/i18n/locales`）。尝试优化后引入回归，最终回退。

## 尝试方案（已回退）

`useAsyncData` 加 `{ lazy: true, server: false }`，意图：SSR 不请求、客户端水合后加载词条。

**回归**：Nuxt 的 `lazy` 模式 `useAsyncData` **不会自动执行 handler**（需 `watch` 或手动 `execute()` 触发）——词条从未加载 → 登录页全部 i18n key 缺失（`Not found 'auth.magicLink.submit' key in 'zh'` 等大量报错）、页面文案不显示。`TrafficSource.vue` 同样加了 `lazy: true`，导致图表恒为空。

## 回退方案（最终）

- `app/composables/useInitLocales.ts`：**恢复 SSR 加载**（原始 `useAsyncData`）——SSR 阻塞约 0.3s，换取：首屏正确文案、零 missing key 报错、零水合闪烁
- `app/pages/components/TrafficSource.vue`：去掉 `lazy: true`，保留 `server: false`（数据客户端生成；注意不再用 lazy）

## 验证

- `npx eslint`：通过
- dev 日志：SSR 阶段 `Query: select ... from "i18n"` 正常执行；最后一次请求后 **intlify warning 全部消失**

## 教训

- `lazy: true` 必须配合 `watch` 源或手动 `execute()`，否则 handler 永不执行（已在两处代码注释中标注）
- 登录页等入口页面：0.3s SSR 阻塞 ≫ 首屏闪烁/报错，优先正确性

## 遗留

- "阻塞 SSR"这一中危项**维持现状未优化**（回退即放弃优化）；若未来要优化，正确路径是 `useAsyncData` 默认（SSR 加载）但缩小词条接口响应体积 / 加缓存，而非改 lazy
