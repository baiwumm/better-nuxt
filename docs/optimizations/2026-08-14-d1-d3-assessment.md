# D1 / D3 评估结论（无需改动）

- **日期**：2026-08-14
- **类型**：评估记录

## D1：schema/auth-schema 循环依赖

**现状**：`app/db/schema.ts` import `users`（auth-schema.ts），`auth-schema.ts` import `departments/logs/noticeReads/notices/userRoles`（schema.ts）——互引形成循环。

**评估**：ESM 循环引用在**声明式 schema 场景**（Drizzle 表定义与 relations）下运行时正常——模块初始化时仅构建对象引用，实际访问发生在调用时（对象已就绪）。项目 dev + 生产均已验证无异常。

**结论**：拆分（抽 `app/db/common.ts` 公共列 / 调整 relations 归属）属大面积重构，改动触及全部表定义与迁移对比，存在 schema 语义漂移风险；而循环依赖实际无害、无功能/性能收益。**维持现状**。

## D3：playground 样式全局注入

**现状**：全量检查 `app/pages/playground/` 全部组件（34 个文件），所有 `<style>` 均为 `<style scoped>`，且无任何全局 css/style 引用 playground 组件。

**结论**：审查报告所述"playground 样式全局注入"在**当前代码中已不存在**（组件样式已隔离）。**无需改动**。
