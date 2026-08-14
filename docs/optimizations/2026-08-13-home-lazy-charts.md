# 首页图表库懒加载 + ClientOnly（首屏 bundle 与 SSR 负担优化）

- **日期**：2026-08-13
- **类型**：性能优化
- **影响范围**：`app/pages/index.vue`

## 背景与目标

代码审查（`docs/optimizations/2026-08-13-code-review.md` 中危）发现：首页 dashboard 直接渲染 `SalesPerformance`/`TrafficSource`（unovis 图表）与 `KpiCards`（@number-flow）等组件，未懒加载——unovis 图表库被打进首屏 JS chunk；且这些组件数据均为客户端生成（`ref` + `onMounted`），SSR 只产生空图表标记，增加服务端渲染负担却无收益。

## 方案

1. **懒加载**：5 个首页组件改为 `defineAsyncComponent(() => import(...))`——代码分割，图表库不再进入首屏 bundle
2. **ClientOnly**：整体包裹——SSR 不解析组件 import（图表库代码服务端不加载）、不渲染空图表标记，输出轻量占位；客户端水合后按需加载渲染

数据为纯客户端模拟数据（`randomInt`/`random` 生成），无 SEO/首屏内容需求，ClientOnly 无副作用。

## 改动内容

- `app/pages/index.vue`：静态 import 改为 `defineAsyncComponent`；模板包 `<ClientOnly>`

## 验证

- `npx eslint app/pages/index.vue`：通过
- `pnpm dev`：HMR 更新 `pages/index.vue` 成功，无编译错误；`/auth/sign-in` 200

## 行为变化

- 首屏 JS 不再包含 unovis/@number-flow 图表库（按需加载）
- 首页 SSR 输出轻量占位（原渲染空图表标记）
- 首页内容渲染时机：客户端水合后（模拟数据展示，与之前一致）

## 遗留与后续

- `[intlify]` warning 为 `useInitLocales` 懒加载的预期表现（`2026-08-13-init-locales-lazy.md`）
- 六个中高危优化目标已全部完成；剩余项见总清单（低危为主）
