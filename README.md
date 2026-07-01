<div align="center">
  <img width="120" src="./public/logo.svg" alt="Better Nuxt">
  <h1>Better Nuxt</h1>
  <p>前端的全栈之路 - 现代化后台管理系统解决方案</p>
  
  <p>
    <a href="https://github.com/baiwumm/better-nuxt/stargazers"><img src="https://img.shields.io/github/stars/baiwumm/better-nuxt" alt="stars"></a>
    <a href="https://nuxt.com/" target="_blank"><img src="https://img.shields.io/badge/Nuxt.js-4+-00DC82" alt="Nuxt.js"></a>
    <a href="https://www.better-auth.com/" target="_blank"><img src="https://img.shields.io/badge/Better--Auth-1.6-000000" alt="Better-Auth"></a>
    <a href="https://vuejs.org/" target="_blank"><img src="https://img.shields.io/badge/Vue-3.5-4FC08D" alt="Vue"></a>
    <a href="https://ui.nuxt.com/" target="_blank"><img src="https://img.shields.io/badge/Nuxt%20UI-4.9-00DC82" alt="Nuxt UI"></a>
    <a href="https://orm.drizzle.team/" target="_blank"><img src="https://img.shields.io/badge/Drizzle%20ORM-0.45-2C7A4D" alt="Drizzle ORM"></a>
    <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-16-4169E1" alt="PostgreSQL"></a>
</p>
</div>

## 📚 项目简介
[Better Nuxt](https://github.com/baiwumm/better-nuxt) 是一个现代化的全栈后台管理系统，前端基于 [Nuxt.js](https://nuxt.com/) 和 [Nuxt UI](https://ui.nuxt.com/) 构建，后端采用 [Better-Auth](https://www.better-auth.com/) 认证框架与 [Drizzle ORM](https://orm.drizzle.team/) 配合 [PostgreSQL](https://www.postgresql.org/) 数据库实现。本项目集成了当前流行的前后端技术栈，是学习全栈开发和现代认证授权的理想参考项目。
<img src="./public/images//home-light.png" alt="Better Nuxt">

## ✨ 特性

- 🚀 **现代化全栈架构**：基于 Nuxt.js + Better-auth + Nuxt UI + Drizzle ORM + PostgreSQL，构建高性能、类型安全的全栈应用，开发体验与运行效率兼备
- 🔐 **开箱即用的认证系统**：集成 Better-auth，支持多策略身份验证、会话管理与权限控制，为应用提供安全可靠的用户体系
- 🎨 **可视化主题配置中心**：内置 18 种主题主色、明暗模式、圆角档位与路由动画，满足多品牌与个性化展示需求
- 🌐 **国际化支持**：多语言（中/英）一键切换，灵活适配企业级后台与多地域业务场景
- 🛡️ **细粒度权限与动态菜单系统**：集成角色权限（RBAC）、动态菜单生成、按钮级权限控制，前后端统一鉴权，精准管控每个操作节点
- 🔄 **智能版本更新提示**：内置版本检测机制，自动提示用户刷新获取最新版本，避免旧版本缓存导致功能不一致问题

## 🛠️ 技术栈

- **前端框架**：[Vue 3.5](https://vuejs.org/) + [Nuxt.js 4+](https://nuxt.com/)
- **UI 组件库**：[Nuxt UI 4.9](https://ui.nuxt.com/)
- **认证框架**：[Better-Auth 1.6](https://www.better-auth.com/)
- **数据库 ORM**：[Drizzle ORM 0.45](https://orm.drizzle.team/)
- **数据库**：[PostgreSQL 16](https://www.postgresql.org/)

## 📂 文件目录
```txt
better-nuxt/
├── .nuxt/                  # Nuxt 自动生成的构建目录（通常不需要手动修改）
├── app/ 
    └── assets/                 # 静态资源目录（未编译的样式、图片、字体等）
    └── components/             # Vue 组件目录（支持自动导入）
    └── composables/            # 组合式 API 目录（自动导入）
    └── layouts/                # 布局组件目录（如 DefaultLayout, AuthLayout）
    └── middleware/             # 中间件目录（路由守卫、权限校验等）
    └── pages/                  # 页面视图目录（基于文件系统的路由）
├── public/                 # 静态资源目录（不经过打包处理，如 robots.txt, favicon.ico）
├── server/                 # 后端 API 服务目录（Nuxt Nitro Server）
│   └── api/                # API 路由接口
│   └── middleware/         # 服务器端中间件
├── .env                    # 环境变量配置文件（注意勿提交至版本库）
├── .gitignore              # Git 忽略文件配置
├── app.config.ts           # 应用配置文件
├── auth-schema.ts          # Better-Auth 认证相关 Schema 定义
├── CHANGELOG.md            # 版本更新日志
├── commitlint.config.js    # Commit 提交规范校验配置
├── drizzle.config.ts       # Drizzle ORM 配置文件
├── eslint.config.mjs       # ESLint 代码规范配置文件
├── LICENSE                 # 开源许可证文件
├── nuxt.config.ts          # Nuxt 核心配置文件
├── package.json            # 项目依赖及脚本管理文件
├── package-lock.json       # 依赖版本锁定文件
├── README.md               # 项目说明文档
└── tsconfig.json           # TypeScript 配置文件
```

## 🔐 RBAC 权限映射关系
<img src="./public/img/rbac.png" alt="RBAC">

## 📦 快速开始

```bash
# 克隆项目
git clone https://github.com/baiwumm/better-nuxt.git

# 安装依赖
pnpm install

# 配置环境变量
cp .env

# 启动开发服务器
pnpm run dev
```

## 📝 Drizzle ORM 迁移

### 1. 生成迁移

```bash
npx drizzle-kit generate
```

### 2. 执行迁移

```bash
npx drizzle-kit migrate
```

### 3. 直接推送，不生成迁移文件

```bash
npx drizzle-kit push
```

### 4. 注意 auth-schema 文件覆盖

```ts
import { departments, logs, noticeReads, notices, userRoles } from "./app/db/schema";

export const usersRelations = relations(users, ({ many }) => ({
  // auth
  sessions: many(sessions),
  accounts: many(accounts),

  // RBAC
  roles: many(userRoles),

  // system logs
  logs: many(logs),

  // content
  notices: many(notices),
  noticeReads: many(noticeReads),

  // org structure
  leadingDepartments: many(departments),
}));
```

## 📄 许可证

本项目基于 [MIT许可证](./LICENSE) 开源。

## ⭐ Star 历史

<div align="center">
  
  [![Star History Chart](https://api.star-history.com/svg?repos=baiwumm/better-nuxt&type=Date)](https://star-history.com/#baiwumm/better-nuxt&Date)
  
</div>