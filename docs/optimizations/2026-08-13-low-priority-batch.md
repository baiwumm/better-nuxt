# 低危项处理记录（冗余索引 / 串行瀑布 / menus.get 评估）

- **日期**：2026-08-13
- **类型**：性能优化 / 评估结论
- **影响范围**：`app/db/schema.ts`、`app/pages/settings/users/index.vue`、`app/pages/administrative/departments/index.vue`、`server/api/account/menus.get.ts`（评估不改）

## 一、删除 6 处冗余索引（已完成）

复合主键前缀或复合索引首列重复的索引，每次 INSERT/UPDATE 带来无收益写开销：

- `role_menus_role_idx`（PK `(role_id, menu_id)` 前缀冗余）
- `user_roles_user_idx`（PK `(user_id, role_id)` 前缀冗余）
- `notice_reads_notice_idx`（PK `(notice_id, user_id)` 前缀冗余）
- `menus_parent_idx` / `i18n_parent_idx` / `departments_parent_idx`（各自 `*_sort_idx(parent_id, sort)` 首列冗余）

改动：`app/db/schema.ts` 删除声明；迁移 `0015_bumpy_terror.sql`（6 条 DROP INDEX）手动执行（沿用 WS Pool 模式）+ 补迁移记录。验证：eslint 通过、dev 正常。

## 二、两处串行瀑布合并（已完成）

`settings/users` 页 `user-roleList` 与 `user-manage`、`administrative/departments` 页 `departments-users` 与 `department-list` 均为两个独立 `useAsyncData` 依次 await（串行）。合并为单个 `useAsyncData` + `Promise.all` 并行：

- users 页：`getRoleList` 与 `getUserList` 并行；`roleList`/`list`/`total` 改为 computed 派生
- departments 页：`getUserList` 与 `getDepartmentList` 并行；保留 `watch: [userPage]` 与用户选择器数据转换逻辑；模板 `:data`/`:department-tree` 改为 `data?.departments`

验证：eslint 通过、dev 正常（`/auth/sign-in` 200）。

## 三、menus.get 二次全量查询（评估：维持现状）

审查报告建议"复用首次 join 结果"。逐行核对数据流后确认：**该建议不成立**——

- 首次查询（31-57 行）只返回用户**有权限**的菜单
- 第二次查询（86-89 行，全量启用菜单）用于 `appendParentMenus`（119-153 行）**递归补全无权限的父级**——父级不在首次结果中，必须从全量查询获取
- menus 为小表（<100 行），单次全表查询成本 <5ms；改用按父级链 inArray 查询或缓存均引入复杂度，收益 ≈ 0

结论：维持现状，记录评估理由。

## 遗留

- 其余低危项：i18n 硬编码、`timestamptz`/UUIDv7、logs 保留策略、循环依赖、appStore 持久化 FOUC 等，见总清单
