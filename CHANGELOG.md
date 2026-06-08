# Changelog

## [1.9.1](https://github.com/baiwumm/better-nuxt/compare/v1.9.0...v1.9.1) (2026-06-08)

### ✨ Features | 新功能

* **auth:** 配置 infra ([c2d2edf](https://github.com/baiwumm/better-nuxt/commit/c2d2edf96e61762b7b810580ceffe9f0484179a2))
* **server:** 修改接口逻辑 ([b62e926](https://github.com/baiwumm/better-nuxt/commit/b62e9261386d002580fcc546cdf73a382b195b33))

### ⚡ Performance Improvements | 性能优化

* 细节优化 ([2f5b19b](https://github.com/baiwumm/better-nuxt/commit/2f5b19bf3d3571ef18d9d6189f1944fb60c1261c))
* **composables:** 优化函数命名 ([7697929](https://github.com/baiwumm/better-nuxt/commit/76979293c74dfc97dcb370f72b53a055c9406556))
* **pages:** 优化目录结构 ([cd23ef3](https://github.com/baiwumm/better-nuxt/commit/cd23ef3e6a866df8f6ef6b5f330b6dfcc11775dc))
* **schema:** 优化表结构和命名，使其更加规范 ([1a5f64f](https://github.com/baiwumm/better-nuxt/commit/1a5f64f82a690ececac3a18695fcd42a5d809763))

### 👷‍ Build System | 构建

* 删掉 nuxt@seo，保证 unhead 只有一个版本 ([7036bae](https://github.com/baiwumm/better-nuxt/commit/7036baedf1f12000ea29194e83cc860a6f17948f))

### 🔧 Continuous Integration | CI 配置

* 更新 better-auth 包版本 ([f3d9e18](https://github.com/baiwumm/better-nuxt/commit/f3d9e1833774764ffce216f88ed7f3e027eb64b9))
* 新增 @better-auth/infra 包 ([f64fda7](https://github.com/baiwumm/better-nuxt/commit/f64fda7f06c89c3920acaf9a5ae815490ccd48f7))
* 新增 unhead 包 ([533267a](https://github.com/baiwumm/better-nuxt/commit/533267afa6893a824096ef40ae237e545f0c9323))

## [1.9.0](https://github.com/baiwumm/better-nuxt/compare/v1.8.4...v1.9.0) (2026-06-05)

### ✨ Features | 新功能

* 新增 @nuxt/hints 、@nuxt/a11y 包 ([c9ea269](https://github.com/baiwumm/better-nuxt/commit/c9ea269eea5de7db6c7b0d03274de84e4fbb8708))
* **account:** 添加 AtiveSessions 组件 ([93877db](https://github.com/baiwumm/better-nuxt/commit/93877dbca249a49e8c27ad2303590cd8a4a78ee4))
* **account:** 添加 ChangePassword 组件 ([74d15ff](https://github.com/baiwumm/better-nuxt/commit/74d15ff181b3e7c84655cbdf69f2400a4fadb16e))
* **account:** 完成《更改电子邮件》功能 ([fc8cce3](https://github.com/baiwumm/better-nuxt/commit/fc8cce3ccfe38213eaed9367e8ce734398d4f011))
* **account:** 完成《用户资料》的 更改和头像上传功能 ([61379d5](https://github.com/baiwumm/better-nuxt/commit/61379d5f816bf3a3365b13f86205c51acd0954a0))
* **account:** 新增《关联账户》功能 ([4f5617d](https://github.com/baiwumm/better-nuxt/commit/4f5617d4456dbc36ac1f8970c8f2bac24ac6812c))
* **account:** 新增《头像裁剪》功能，保证每个用户存储一张头像，节省 Blob 空间 ([db0b707](https://github.com/baiwumm/better-nuxt/commit/db0b707605ff14db5e09349d0c3e57e7abc8b7fb))
* **account:** 新增《主题模式》功能 ([475f1de](https://github.com/baiwumm/better-nuxt/commit/475f1de6a0ee6b397bee62ffca7370f59740e6d7))
* **composables:** 新增 useListSessions 和 useSignOut 函数 ([54ba7ed](https://github.com/baiwumm/better-nuxt/commit/54ba7ed0a3ce330ccd734900d76c1b504f791867))
* **composables:** 新增 useListSessions 和 useSignOut 函数 ([12cd163](https://github.com/baiwumm/better-nuxt/commit/12cd163e1e655404e990b4010aa7b43e54eea987))
* **schema:** menu 表新增 hideInMenu 字段 ([8eeda39](https://github.com/baiwumm/better-nuxt/commit/8eeda39319e89218562339591d4bea821ab436f8))

### 💄 Styles | 风格

* 样式调整 ([a2e0677](https://github.com/baiwumm/better-nuxt/commit/a2e0677f59da7bb15020cfdf513c3d38905d7aba))
* **account:** 调整组件顺序 ([bed5e3d](https://github.com/baiwumm/better-nuxt/commit/bed5e3d016409f4e301322f915a0c9271425c34d))

### ⚡ Performance Improvements | 性能优化

* 封装 $authClient 函数，优化调用方式 ([455835b](https://github.com/baiwumm/better-nuxt/commit/455835b93969995086e5a06ba736e545db16d0fd))
* 封装 useDeviceInfo 函数获取代理信息 ([a985616](https://github.com/baiwumm/better-nuxt/commit/a985616888e89987bd4de43ce21ed4681ae85333))
* 细节优化 ([0b89ab8](https://github.com/baiwumm/better-nuxt/commit/0b89ab8901648ff37e1c116ae9b60b84f34bb025))
* 细节优化 ([f722a5e](https://github.com/baiwumm/better-nuxt/commit/f722a5e8063eb787f5d23ebe9ce75b75ff84a4b0))
* **composables:** 优化 useAppToast 函数 ([7e0eb02](https://github.com/baiwumm/better-nuxt/commit/7e0eb02072666a750a6c1dd035a41b3d2456d4f3))
* **ListAccounts:** 优化 Oauth 交互体验 ([02d4980](https://github.com/baiwumm/better-nuxt/commit/02d4980d0b9434029008c2f93cf47c09d00215bb))

### 🔧 Continuous Integration | CI 配置

* 新增 @nuxthub/core、@vercel/blob 包 ([990418d](https://github.com/baiwumm/better-nuxt/commit/990418d0fcc705d2f7a583eebefe9068bd5e146e))
* 新增 vue-advanced-cropper 包 ([7edc37b](https://github.com/baiwumm/better-nuxt/commit/7edc37b185fd8882357e4bdc40f8da6c60659330))

## [1.8.4](https://github.com/baiwumm/better-nuxt/compare/v1.8.3...v1.8.4) (2026-05-29)

### ✨ Features | 新功能

* 添加 scripts Analytics 统计代码 ([2cdbec9](https://github.com/baiwumm/better-nuxt/commit/2cdbec976221e2813370b98889614e0a79c78e3d))
* **log:** 去除 script 第三方接口 ([5cacc23](https://github.com/baiwumm/better-nuxt/commit/5cacc234d64b28a1f388af7cdc501708a24c9364))

### 💄 Styles | 风格

* 表头样式调整 ([539c9ec](https://github.com/baiwumm/better-nuxt/commit/539c9ec547d85c37ea4c6cbde726afdffe0ae98c))

### 👷‍ Build System | 构建

* 修复部署报错的问题 ([e47f602](https://github.com/baiwumm/better-nuxt/commit/e47f6029e22669908aec90d63a2735aa6e15e25f))
* 修复部署报错的问题 ([a4bf276](https://github.com/baiwumm/better-nuxt/commit/a4bf2766439d4f98d27400e3cf73580192611b9f))
* 修复因 h3 版本冲突导致的问题 ([392b368](https://github.com/baiwumm/better-nuxt/commit/392b3680c6f8f81adc196cda8577ca4ee14be1ae))

## [1.8.3](https://github.com/baiwumm/better-nuxt/compare/v1.8.2...v1.8.3) (2026-05-29)

### ✨ Features | 新功能

* 配置新版本更新通知 ([56cc077](https://github.com/baiwumm/better-nuxt/commit/56cc0770024dbbf494b5ca8da72d01f19964a7ab))
* 新增 @nuxtjs/seo 及 SEO 配置 ([e4c58e1](https://github.com/baiwumm/better-nuxt/commit/e4c58e1112e83570460cc4623001332aaca0a73f))

### ⚡ Performance Improvements | 性能优化

* 去掉 SkewNotification 的 force-open ([cf7f01b](https://github.com/baiwumm/better-nuxt/commit/cf7f01b84a9e4a95f6821d24f1e898c048e05112))
* 优化站点配置管理 ，使用 useSiteConfig 获取站点配置 ([e124f19](https://github.com/baiwumm/better-nuxt/commit/e124f19f207145071446aa54ebadf5f5a3d4d70e))

### 🔧 Continuous Integration | CI 配置

* 新增 @nuxtjs/robots、nuxt-skew-protection 包 ([9df8aeb](https://github.com/baiwumm/better-nuxt/commit/9df8aeba2d8692df56921013976d986afbf0eab0))
* 新增 nuxt-site-config 包 ([8045abd](https://github.com/baiwumm/better-nuxt/commit/8045abd4084acc9cf48dd728c105756f644c6060))

## [1.8.2](https://github.com/baiwumm/better-nuxt/compare/v1.8.1...v1.8.2) (2026-05-28)

### ✨ Features | 新功能

* ip 地区获取兜底 ([0e59142](https://github.com/baiwumm/better-nuxt/commit/0e59142f5eeb62482abb781171e3cfcd4759855d))
* **logs:** 新增“IP 归属地”字段，优化 sql 联表查询 ([04fea3c](https://github.com/baiwumm/better-nuxt/commit/04fea3c2646e236ff2605e91e4c97a65183c75cb))
* **logs:** 优化日志写入逻辑 ([c7bb91d](https://github.com/baiwumm/better-nuxt/commit/c7bb91d4909fc4c76a069b36557a519e7b0a8dba))
* **schema:** 新增 ipGeo 表 ([ef034c2](https://github.com/baiwumm/better-nuxt/commit/ef034c2d5ab042558a2e232d40e0e6ed081dc7ee))

### ⚡ Performance Improvements | 性能优化

* 移除 geoip-lite，使用 ip-api 兜底，过滤本地 ip ([18733ea](https://github.com/baiwumm/better-nuxt/commit/18733eadf49ff86d39c86945ceb8a71f48778615))

### 👷‍ Build System | 构建

* 修改部署报错问题 ([a637ce9](https://github.com/baiwumm/better-nuxt/commit/a637ce9e0f5de979b186079dde563f4aa22b64d7))
* 修改部署报错问题 ([10a9637](https://github.com/baiwumm/better-nuxt/commit/10a96372afd71b8f1987ab5dcfd23ae87683c4f1))
* ts-ip2region2 换成 geoip-lite ([9312c3f](https://github.com/baiwumm/better-nuxt/commit/9312c3f935f1d44689a0d91bea8c0e39afe0d327))

### 🔧 Continuous Integration | CI 配置

* 新增 ts-ip2region2 包 ([d3fc1b8](https://github.com/baiwumm/better-nuxt/commit/d3fc1b89609807edd11cf0bd603ba18ed887ddbf))

## [1.8.1](https://github.com/baiwumm/better-nuxt/compare/v1.8.0...v1.8.1) (2026-05-28)

### ✨ Features | 新功能

* 根据角色设置用户按钮可见权限 ([d6b55c9](https://github.com/baiwumm/better-nuxt/commit/d6b55c9c5027dc5d9e2bd467ce1f9a42b8a42942))
* **error:** 添加 404、500等错误页面 ([fab513a](https://github.com/baiwumm/better-nuxt/commit/fab513aed78a636983072d39cbdf24aa4f5c05d4))

## [1.8.0](https://github.com/baiwumm/better-nuxt/compare/v1.7.1...v1.8.0) (2026-05-26)

### ✨ Features | 新功能

* **CHANGELOG:** 修改仓库地址 ([45ff83c](https://github.com/baiwumm/better-nuxt/commit/45ff83ce4b82dea2e2d182c2d216f8ed652550a0))
* **menu-manage:** 修复调试错误 ([7c03eb9](https://github.com/baiwumm/better-nuxt/commit/7c03eb907329e073c565af3aa3dbf4c987907718))
* **permissions:** 完成角色和用户的关联关系 ([27533d3](https://github.com/baiwumm/better-nuxt/commit/27533d3ac56659f6d1a97487fc64ae92da85dc00))
* **role-manage:** 完成《角色管理》模块的开发 ([3c39861](https://github.com/baiwumm/better-nuxt/commit/3c3986154342d2499f67f2a68313f86ff0cf0df1))
* **role-manage:** 完成《角色授权》的基本交互逻辑 ([918090c](https://github.com/baiwumm/better-nuxt/commit/918090c2a403d3cf0a6ee6146d112fc274bcb671))
* **role-manage:** 优化角色授权的权限回显问题 ([f2370cd](https://github.com/baiwumm/better-nuxt/commit/f2370cd727fe169383f7bb3c95ad4eddef3ac8a6))
* **schema:** 新增 role、roleMenu、userRole 等角色关联的表模型 ([a264866](https://github.com/baiwumm/better-nuxt/commit/a264866d399fa3b3c42b3355c53dba87b698de9e))
* **schema:** role 表 status 改成 enabled ([6cd0ba8](https://github.com/baiwumm/better-nuxt/commit/6cd0ba81bbc528157bedd94acb4aa3dfea6487ee))

### 🐛 Bug Fixes | Bug 修复

* **operation-log:** 解决点击搜索没响应的问题 ([fb9d673](https://github.com/baiwumm/better-nuxt/commit/fb9d673c6e44e6c79298f658415d71a09071c715))

### ⚡ Performance Improvements | 性能优化

* 细节调整 ([8593075](https://github.com/baiwumm/better-nuxt/commit/8593075084ff0410f22a6275b849a528409f579a))
* **enum:** 枚举优化前缀写法 ([62454ce](https://github.com/baiwumm/better-nuxt/commit/62454ce3f812c2581dfcc927959276ee3676382b))

### 🔧 Continuous Integration | CI 配置

* 更新 package 包版本 ([8b14717](https://github.com/baiwumm/better-nuxt/commit/8b14717cdda28f2eeabf6fd5ad086afe2efbb408))

## [1.7.1](https://github.com/baiwumm/better-nuxt/compare/v1.7.0...v1.7.1) (2026-05-22)

### ✨ Features | 新功能

* 新增 Permission 按钮枚举 ([d0c2f67](https://github.com/baiwumm/better-nuxt/commit/d0c2f6732a8961d5b59ea9208ad35844c4b69dff))
* **menu-manage:** 新增“按钮权限”表单和列项 ([56fdf51](https://github.com/baiwumm/better-nuxt/commit/56fdf51882f8f3bac7e4197c5401de1e2f81c306))
* **schema:** menu 表新增 permissions 字段 ([4e8cff4](https://github.com/baiwumm/better-nuxt/commit/4e8cff47736234d306b9a938077724a53212324a))

## [1.7.0](https://github.com/baiwumm/better-nuxt/compare/v1.6.2...v1.7.0) (2026-05-21)

### ✨ Features | 新功能

* **auth:** 添加 admin 插件 ([b4e2224](https://github.com/baiwumm/better-nuxt/commit/b4e2224dbb3a3265ac1e630849a1c44cd76f35d4))
* **composables:** 新增 useConfirmDialog 二次确认函数 ([16e157a](https://github.com/baiwumm/better-nuxt/commit/16e157a4e078cd60d57a8ac1623fd32816a327ba))
* **user-manage:** 添加 封禁/解除封禁 操作 ([ce392cd](https://github.com/baiwumm/better-nuxt/commit/ce392cd82fdbfac06d44184673f689a41567644d))
* **user-manage:** 完成《用户管理》模块页面、接口的开发和 CURD 逻辑 ([a221a99](https://github.com/baiwumm/better-nuxt/commit/a221a993492fc1f26d363abf70cf8f1d18c88757))
* **UserMenu:** 用户退出需要二次确认 ([869d724](https://github.com/baiwumm/better-nuxt/commit/869d724add79975f2d8b8c90e688a806aca7c530))

### 🐛 Bug Fixes | Bug 修复

* 修复新增关闭弹窗表单没有清空的问题，优化组件事件传递 ([37f9a51](https://github.com/baiwumm/better-nuxt/commit/37f9a5117d09fe0293685b2a9fb8f9dfa28475bd))

### ⚡ Performance Improvements | 性能优化

* 使用 useAppToast 统一 toast 提示 ([7a09ae0](https://github.com/baiwumm/better-nuxt/commit/7a09ae0fd8ccf2c3b5531eeac0cb54b27d5835cc))
* 优化用户昵称显示逻辑 ([c584f05](https://github.com/baiwumm/better-nuxt/commit/c584f050b5011308ad4077dbbd421169af3af233))
* **user-manage:** 添加"查看会话"和“撤销会话”操作 ([5382741](https://github.com/baiwumm/better-nuxt/commit/538274105906c854ce0de651d196b8ed6dbec49a))
* **user-manage:** 添加"解除封禁时间"列项 ([42e4b73](https://github.com/baiwumm/better-nuxt/commit/42e4b7328acf3ee739db42089ed9c534fbdb641b))
* **user-manage:** 添加"重置密码"操作 ([ede161c](https://github.com/baiwumm/better-nuxt/commit/ede161cf694d311cd1d20644247c669051b39559))
* **user-manage:** 细节优化 ([8563098](https://github.com/baiwumm/better-nuxt/commit/8563098bf9fd411139396681fc9397268e8abc52))
* **user-manage:** 优化"封禁用户"的逻辑 ([6bf817e](https://github.com/baiwumm/better-nuxt/commit/6bf817e14fccc1eb511ad48f02dbe0d395192014))

## [1.6.2](https://github.com/baiwumm/better-nuxt/compare/v1.6.1...v1.6.2) (2026-05-19)

### ✨ Features | 新功能

* **lightbox:** 新增 图片预览 页面 ([8543e9d](https://github.com/baiwumm/better-nuxt/commit/8543e9df453ec796f76807f3383b56d782886d3c))

### 🔧 Continuous Integration | CI 配置

* 新增 nuxt-easy-lightbox 包 ([9195133](https://github.com/baiwumm/better-nuxt/commit/9195133cf5dbf1aa43134daf4b9f97c46ec14c81))

## [1.6.1](https://github.com/baiwumm/better-nuxt/compare/v1.6.0...v1.6.1) (2026-05-18)

### ✨ Features | 新功能

* **Charts:** 添加滚动动画 ([49fa16f](https://github.com/baiwumm/better-nuxt/commit/49fa16f7c3bf163a771395dc244e4752e3abc364))
* **Charts:** 新增 BubbleChart 气泡图 ([97c6f04](https://github.com/baiwumm/better-nuxt/commit/97c6f0447559b116cffc61b87678f979180900cd))
* **Charts:** 新增 DountChart 圆环图 ([70cd92d](https://github.com/baiwumm/better-nuxt/commit/70cd92dbe1954543621e0a1f64af13ec152e3bf1))
* **Charts:** 新增 GanttChart 甘特图 ([df43cb0](https://github.com/baiwumm/better-nuxt/commit/df43cb0ddcf68fd1abe9513355d76f5f5124db9b))
* **charts:** 新增《图表》页面和《面积图》 ([179a8b9](https://github.com/baiwumm/better-nuxt/commit/179a8b95c56b4596b80b55996a550f4de2d3dc9a))
* **charts:** 新增《柱状图》页面 ([4975579](https://github.com/baiwumm/better-nuxt/commit/4975579f1da4fdb07e25f1e8998cb71f870412a8))
* **layout:** 添加 menu Loading ([5296bc2](https://github.com/baiwumm/better-nuxt/commit/5296bc2c1ecbfb6ff74e338fad3788818a504d65))

### ⚡ Performance Improvements | 性能优化

* **menuStore:** 优化菜单状态的逻辑 ([add275b](https://github.com/baiwumm/better-nuxt/commit/add275bba2b66c26690d5986894ebf64b491c728))

### 🔧 Continuous Integration | CI 配置

* 安装 nuxt-charts 包 ([1474a7b](https://github.com/baiwumm/better-nuxt/commit/1474a7bb1306b55bf58c0b9d38f663a894feec19))
* 安装和配置 '@vercel/speed-insights' ([f3c0539](https://github.com/baiwumm/better-nuxt/commit/f3c0539548e47261b37574fa86ad19f63d61aac5))

## [1.6.0](https://github.com/baiwumm/better-nuxt/compare/v1.5.3...v1.6.0) (2026-05-15)

### ✨ Features | 新功能

* 项目名改成“Better Nuxt” ([6b01684](https://github.com/baiwumm/better-nuxt/commit/6b0168420441785bfc03f327834d4135613cf929))
* 优化 better-auth 验证邮件模板 ([4f65ada](https://github.com/baiwumm/better-nuxt/commit/4f65ada3a09537fe82e9e8e1a711d1720ffbfbd0))
* **components:** 新增 AutoForm 共用组件 ([25f58f9](https://github.com/baiwumm/better-nuxt/commit/25f58f9d7638cfaf5843bd164c8bbfa74f2f367f))

### 💄 Styles | 风格

* **operation-log:** 优化头像名称显示 ([4790fc2](https://github.com/baiwumm/better-nuxt/commit/4790fc2a181cc0a5dd7612009120780cc94e562a))

### ⚡ Performance Improvements | 性能优化

* 抽离操作按钮组件、优化代码结构 ([78cca24](https://github.com/baiwumm/better-nuxt/commit/78cca24ebe28a31ad46facff58c22399c46ab14f))
* 抽取公共函数，优化代码逻辑 ([09386dc](https://github.com/baiwumm/better-nuxt/commit/09386dc520a2c51274f5e62854d19bc99a5fd6e2))
* 优化接口 TS 类型推导方式 ([d48c21a](https://github.com/baiwumm/better-nuxt/commit/d48c21a67ab23d8bf18d047a26dc013d35f97bc3))
* **auth:** 使用 AuthForm 渲染鉴权模块表单 ([9168290](https://github.com/baiwumm/better-nuxt/commit/916829001cca1eb4bc18340b9516885fd7ad2268))
* **AuthForm:** 调整组件 UI ([88c495a](https://github.com/baiwumm/better-nuxt/commit/88c495a5af7c46e64e0e862bd1e7265de5d2362f))
* **hub:** 调整项目结构 ([9f32ec9](https://github.com/baiwumm/better-nuxt/commit/9f32ec9f039717e98a350413f0bb4e50d2fff6ea))
* **internalization:** 调整文件结构，优化代码逻辑 ([b1910ac](https://github.com/baiwumm/better-nuxt/commit/b1910ac840b7c596630e843a45d8893300901ebf))
* **menu-manage:** 调整文件结构，优化代码逻辑 ([a6ea396](https://github.com/baiwumm/better-nuxt/commit/a6ea396b927f5df02f70b85aa69a02f08ec91a1f))
* **operation-log:** 调整文件结构，优化代码逻辑 ([64b8608](https://github.com/baiwumm/better-nuxt/commit/64b8608e59fe6f99dca84f94b28447f6f0be8670))

### 🔧 Continuous Integration | CI 配置

* 更新依赖版本 ([a0339c5](https://github.com/baiwumm/better-nuxt/commit/a0339c514da608897e114c413868b9f452afa250))
* 新增 @norbiros/nuxt-auto-form 包 ([868fa39](https://github.com/baiwumm/better-nuxt/commit/868fa39d00b98079c7159536824c30e52affa554))

## [1.5.3](https://github.com/baiwumm/better-nuxt/compare/v1.5.2...v1.5.3) (2026-05-12)

### ✨ Features | 新功能

* **components:** 新增 BackTop 回到顶部组件 ([bd7437c](https://github.com/baiwumm/better-nuxt/commit/bd7437c56cdca7bfe60b4cb94eb72205530b7623))
* **components:** 新增 Particles 组件 ([b755799](https://github.com/baiwumm/better-nuxt/commit/b755799eab28dcc3a82d4ffa7bf898db9ab83fca))
* **releases:** 新增版本发布页面 ([e904e95](https://github.com/baiwumm/better-nuxt/commit/e904e951b15f3bd5508c81a71096c424c6c1b492))
* **request:** 优化请求逻辑 ([c36f54a](https://github.com/baiwumm/better-nuxt/commit/c36f54a8d47a5ab582489a11137053022534726c))

### 🔧 Continuous Integration | CI 配置

* 新增 ogl 包 ([89b0c72](https://github.com/baiwumm/better-nuxt/commit/89b0c729b31bb373231a2cee35af2f47fd2ed40c))
* **release:** 修改 releaseName ([bd1153b](https://github.com/baiwumm/better-nuxt/commit/bd1153b25b4f05f53f97a5075daa7126bcfab727))

## [1.5.2](https://github.com/baiwumm/better-nuxt/compare/v1.5.1...v1.5.2) (2026-05-11)

### ✨ Features | 新功能

* 设置后台操作邮箱白名单 ([806d7ce](https://github.com/baiwumm/better-nuxt/commit/806d7cee9bdc748ced347b550a5758714ead51a5))
* **about:** 新增《项目信息》页面 ([88b71c9](https://github.com/baiwumm/better-nuxt/commit/88b71c914ee66f94c4de12bf05c41e7cf85ab04c))

## [1.5.1](https://github.com/baiwumm/better-nuxt/compare/v1.5.0...v1.5.1) (2026-05-07)

### ✨ Features | 新功能

* 添加 better-auth-localization 翻译插件 ([67db188](https://github.com/baiwumm/better-nuxt/commit/67db1882fe9ad3a457feb6d2650b9e55190c545f))
* 新增 huggingface 登录 ([12b39ed](https://github.com/baiwumm/better-nuxt/commit/12b39edff08ba1423d2284580e2044d6b7a1f1e0))
* 新增 multiSession 多会话 ([8c47e7a](https://github.com/baiwumm/better-nuxt/commit/8c47e7a39a44ea1ec01271e8824635a6db92d275))
* **auth:** 新增 lastLoginMethodClient 最后一次登录方式 ([34c29a3](https://github.com/baiwumm/better-nuxt/commit/34c29a3c4924e784182624e7aca53eaac412dfc9))

### ⚡ Performance Improvements | 性能优化

* 删除 i18n 文件 ([8114469](https://github.com/baiwumm/better-nuxt/commit/811446902fd06746bcb18b65110500e58f1ac558))

## [1.5.0](https://github.com/baiwumm/better-nuxt/compare/v1.4.2...v1.5.0) (2026-05-07)

### ✨ Features | 新功能

* 调整表单字段最大字数限制 ([46f3fab](https://github.com/baiwumm/better-nuxt/commit/46f3fab12f723bbc5a409ba9a5b400ad8b6998f9))
* input 换成 textarea ([fcec9d1](https://github.com/baiwumm/better-nuxt/commit/fcec9d149ca1d4bcef26f74043e80b06d5939e7f))
* **internalization:** 添加子级时排序没有回显 ([6b67000](https://github.com/baiwumm/better-nuxt/commit/6b6700094d128d26baf51055c61127a5732a330a))
* **Internalization:** 新增《国际化》页面 ([be899ff](https://github.com/baiwumm/better-nuxt/commit/be899ff24e95aa3a8edbf1c1be3386c080a48d24))
* **locales:** 完成动态语言的功能 ([4bb81d7](https://github.com/baiwumm/better-nuxt/commit/4bb81d7abba4ce3489707688bfbae45b06473fc6))

### 🐛 Bug Fixes | Bug 修复

* 修复查询分页没有重置的问题 ([c70186b](https://github.com/baiwumm/better-nuxt/commit/c70186b61873a75736baa6af848408b114f3417d))
* **operation-log:** 修复查询不请求的问题 ([6084338](https://github.com/baiwumm/better-nuxt/commit/6084338b19afb39faa91800c3a2169f8edca9617))

### ⚡ Performance Improvements | 性能优化

* useAsyncData 函数添加 await ([adfc7aa](https://github.com/baiwumm/better-nuxt/commit/adfc7aadb660a85bd310ff1e34b1f9f3fc92fc05))

## [1.4.2](https://github.com/baiwumm/better-nuxt/compare/v1.4.1...v1.4.2) (2026-05-06)

### ✨ Features | 新功能

* 新增《国际化》接口，优化 shared 文件结构 ([227dd96](https://github.com/baiwumm/better-nuxt/commit/227dd9682215824f66a5932a348756af8ba5186c))

### ⚡ Performance Improvements | 性能优化

* 逻辑优化 ([b708b8e](https://github.com/baiwumm/better-nuxt/commit/b708b8ea7dc2b4321d4ae4b34a0160d21ca0cabf))

## [1.4.1](https://github.com/baiwumm/better-nuxt/compare/v1.4.0...v1.4.1) (2026-05-05)

### ✨ Features | 新功能

* 细节调整 ([354913b](https://github.com/baiwumm/better-nuxt/commit/354913b3cd4060e46507a89abb1ede46a7cf4ae7))
* **qrcode:** 配置菜单标题 ([ed5bfcc](https://github.com/baiwumm/better-nuxt/commit/ed5bfcc019a6bbbd8dcccfb87a08234f76ceded9))
* **qrcode:** 新增二维码页面 ([e6ce480](https://github.com/baiwumm/better-nuxt/commit/e6ce480dd0ba48afdba86cfac9c1e3d967d4ed90))

### 🐛 Bug Fixes | Bug 修复

* **operation-log:** 修复水合报错的问题 ([1218070](https://github.com/baiwumm/better-nuxt/commit/12180700c17f1a06466f10b35cc76babb7ef9dfd))

### ⚡ Performance Improvements | 性能优化

* 调整中间件逻辑 ([ab2b817](https://github.com/baiwumm/better-nuxt/commit/ab2b817bdc18ab6d010aa1d08c4ce0942e5357f4))
* 使用 useLoadingIndicator 代替 @bprogress/core ([7cbcdbc](https://github.com/baiwumm/better-nuxt/commit/7cbcdbcdf1c4efa998e2059e63be0330203fc636))
* **operation-log:** 细节优化 ([18ce763](https://github.com/baiwumm/better-nuxt/commit/18ce763444efac4f5d36c256762d7e6da3084fd5))

## [1.4.0](https://github.com/baiwumm/better-nuxt/compare/v1.3.3...v1.4.0) (2026-04-30)

### ✨ Features | 新功能

* **operation-log:** 完成《操作日志》模块的 接口开发和 CURD 逻辑 ([011d9b0](https://github.com/baiwumm/better-nuxt/commit/011d9b0d1ae9d236cb02d452b1d7f28b1741e615))

## [1.3.3](https://github.com/baiwumm/better-nuxt/compare/v1.3.2...v1.3.3) (2026-04-29)

### ✨ Features | 新功能

* 新增非 GET 操作录入日志 ([56141f9](https://github.com/baiwumm/better-nuxt/commit/56141f9350a9bf25453abe0094f2dedc3b9aa464))

### 🔧 Continuous Integration | CI 配置

* 迁移文件，表 id 字段统一改成 string 类型 ([a821ec0](https://github.com/baiwumm/better-nuxt/commit/a821ec091f1eff432b9a10c723ec56a657c405a4))
* 新增 ua-parser-js 包 ([5740740](https://github.com/baiwumm/better-nuxt/commit/5740740456076421d22c9039143020a767f66d72))

## [1.3.2](https://github.com/baiwumm/better-nuxt/compare/v1.3.1...v1.3.2) (2026-04-28)

### ✨ Features | 新功能

* 动态设置项目标题 ([d6d04ba](https://github.com/baiwumm/better-nuxt/commit/d6d04bae5ccc6b9e174bf8aa48b07c9c5156b51c))
* **MultipleTabs:** 完善国际化配置 ([f3c7ec3](https://github.com/baiwumm/better-nuxt/commit/f3c7ec31ddd9273b8541be9cb0151201dbc2fb4d))
* **RouteTransition:** 添加路由过渡动画配置 ([094d332](https://github.com/baiwumm/better-nuxt/commit/094d3326815e9905d8bfc832b18feab7424f8d50))

## [1.3.1](https://github.com/baiwumm/better-nuxt/compare/v1.3.0...v1.3.1) (2026-04-27)

### ✨ Features | 新功能

* **store:** 新增 MultipleTabs 组件和 useTabStore ([00a6aec](https://github.com/baiwumm/better-nuxt/commit/00a6aecce69cdb2d1473a397684be44bf70a65ba))

### 🔧 Continuous Integration | CI 配置

* 新增 motion-v 包 ([4b60e28](https://github.com/baiwumm/better-nuxt/commit/4b60e28bfade4c71fe2600fc03b8105be3740d9f))

## [1.3.0](https://github.com/baiwumm/better-nuxt/compare/1.2.0...v1.3.0) (2026-04-27)

### ✨ Features | 新功能

* 完成侧边栏排版布局，新增菜单页面 ([991f133](https://github.com/baiwumm/better-nuxt/commit/991f133af7571f725957cf2c49c10a235f22bfa7))
* 新提交 ([a394155](https://github.com/baiwumm/better-nuxt/commit/a394155e5df7c9856d615841a98f24074003f41b))
* 新增 FullLoading 组件 ([fa8a361](https://github.com/baiwumm/better-nuxt/commit/fa8a3614a858b6270016ec9cb7f4a0ab0e2cb9a6))
* 新增 husky  commit 规范 ([1742c50](https://github.com/baiwumm/better-nuxt/commit/1742c50c62f75c838f979ddcd089ef6a707c2c73))
* **app:** 添加菜单 keepAlive 缓存配置 ([16a1c07](https://github.com/baiwumm/better-nuxt/commit/16a1c076c72b942cd2cbbafa0509a73361c5de50))
* **components:** 新增 LoadingContent 组件 ([94c0a4b](https://github.com/baiwumm/better-nuxt/commit/94c0a4b0540a6a418daec6a73fa6dce5fea91072))
* **components:** 新增 Spinner 组件 ([8cee59c](https://github.com/baiwumm/better-nuxt/commit/8cee59c3ada9901f23c322507dad5e171f3d0b3d))
* **db:** 新增 menu shcema ([fcddb09](https://github.com/baiwumm/better-nuxt/commit/fcddb09bd49a7c4bebb3fa144f4cf11b08646eb1))
* **layout:** 完成侧边栏布局 ([6366916](https://github.com/baiwumm/better-nuxt/commit/63669165006dac8ef8e19fb61d48ad51b390f749))
* **layout:** 完成动态菜单的加载 ([dd12572](https://github.com/baiwumm/better-nuxt/commit/dd12572b5e2f5f37308a1eb2ca1f100d62fb8f1f))
* **menu-manage:** 完成《菜单管理》模块的 CURD 交互逻辑 ([275fac1](https://github.com/baiwumm/better-nuxt/commit/275fac194431a1c5abfff74cc82b220f6e7a1a55))
* **menu-manage:** 完成《菜单管理》模块的接口模型和 CURD 接口 ([a671717](https://github.com/baiwumm/better-nuxt/commit/a6717172071c57ed8c4d3dbc5771da251359b755))
* **UserMenu:** 完成退出登录逻辑 ([edfd53e](https://github.com/baiwumm/better-nuxt/commit/edfd53e09c0fc77ca0fc152e2f122fad7f1102ce))
* **UserMenu:** 用户信息加载 Loading ([019e7ad](https://github.com/baiwumm/better-nuxt/commit/019e7ad58da8c5ceeda36f00236b5ade836c873f))

### 🐛 Bug Fixes | Bug 修复

* 修复组件导入报错问题 ([dd83063](https://github.com/baiwumm/better-nuxt/commit/dd83063c85c156fa95da8f5770b21ece25e77963))

### 💄 Styles | 风格

* 优化 bprogress 和 NuxtLoadingIndicator 主题色 ([2ce0df6](https://github.com/baiwumm/better-nuxt/commit/2ce0df635b4de2be9d70a33051fbfb24e0e3a0bc))
* **UserMenu:** 折叠模式只显示头像 ([8f24e6c](https://github.com/baiwumm/better-nuxt/commit/8f24e6c3f7da58e934adff55e88e564ceb6cd423))

### ⚡ Performance Improvements | 性能优化

* **menu-manage:** 优化代码逻辑 ([bcf1f7c](https://github.com/baiwumm/better-nuxt/commit/bcf1f7c03f26d712eca0341320881b75d3420164))
* **middleware:** 优化 / 访问的重定向问题 ([f01ccce](https://github.com/baiwumm/better-nuxt/commit/f01ccce1c85c7ac422fdf90d20893403c8c4165a))
* **Spinner:** 优化样式 ([a5d52b6](https://github.com/baiwumm/better-nuxt/commit/a5d52b62891f0619080dcac8881e53877340c3dc))

### 🔧 Continuous Integration | CI 配置

* 解决 process 全局环境报错的问题 ([3bdb036](https://github.com/baiwumm/better-nuxt/commit/3bdb036008c66d7a5ba2b9ca0d077717ff2dc536))
* 修改 release 配置 ([a9c3968](https://github.com/baiwumm/better-nuxt/commit/a9c3968bc5dd15cdf4a74217e82312c367be43b5))

## 1.2.0 (2026-03-24)

### ✨ Features | 新功能

* **forgot-password:** 新增《忘记密码》页面 ([9eab50a](https://github.com/baiwumm/better-nuxt/commit/9eab50ae9422a4e156e7a290b4740691d96f58dd))
* **MagicLink:** 新增邮箱链接登录功能 ([c483f62](https://github.com/baiwumm/better-nuxt/commit/c483f62ee1ae87e54e8a0f4e4eb504a84110405d))
* **reset-password:** 新增《重置密码》页面 ([dad452b](https://github.com/baiwumm/better-nuxt/commit/dad452b623922ffad284f015ac693a1633084041))

### 🎫 Chores | 其他更新

* Release v1.2.0 ([371db6a](https://github.com/baiwumm/better-nuxt/commit/371db6af7105c2a308711aba75069692b0c39ea4))

### ⚡ Performance Improvements | 性能优化

* **auth:** 整理文件结构 ([5f21c74](https://github.com/baiwumm/better-nuxt/commit/5f21c740c875154bcec8e493fb43990d76ac92de))
* Login 页面迁移到 Sign In ([9df064d](https://github.com/baiwumm/better-nuxt/commit/9df064dbe0970b68bef9f63ca44e0e2342f6a683))

## 1.1.0 (2026-03-23)

### ✨ Features | 新功能

* 完成登录页的登录逻辑 ([6220083](https://github.com/baiwumm/better-nuxt/commit/62200831004317065be50c102d24557d218ef82e))
* 完成登录页及基础信息配置 ([671047a](https://github.com/baiwumm/better-nuxt/commit/671047a9d0f3d69a011b508de462c3f26e6e3b69))
* 完成登录注册页面的相关逻辑 ([90c9374](https://github.com/baiwumm/better-nuxt/commit/90c9374608e10ff05f396c4a985997cf43e10963))
* 完善项目基础配置 ([747d235](https://github.com/baiwumm/better-nuxt/commit/747d235bdd2bed9f8e424513f2d8c4936986b18b))
* 完善注册页面逻辑 ([c2b0ae5](https://github.com/baiwumm/better-nuxt/commit/c2b0ae5e42bbd6cfb396600021d7a41f288384f5))
* 新增 @better-auth/infra 包 ([49a7cac](https://github.com/baiwumm/better-nuxt/commit/49a7cac936c6f38378af6da45193e1fbc1484736))
* 新增 @nuxtjs/i18n 包，完成国际化基本配置 ([ff3a9b1](https://github.com/baiwumm/better-nuxt/commit/ff3a9b102f4bef6c70a296c33fdfd5c06dad8a75))
* 新增 @vercel/analytics 统计 ([e887aca](https://github.com/baiwumm/better-nuxt/commit/e887acac020da7d871eed3eccaff9ed773a9ba42))
* 新增 ColorMode 主题切换组件 ([cdaf7ea](https://github.com/baiwumm/better-nuxt/commit/cdaf7eab6e22dc14172e71aebb427b41f87e803c))
* 新增 Locales 语言设置组件，完善多语言配置 ([c013f2e](https://github.com/baiwumm/better-nuxt/commit/c013f2e136490f1c43941b1ddab0cd4def36fab1))
* 新增 Pinia ，完成主题色设置的功能 ([8a9624c](https://github.com/baiwumm/better-nuxt/commit/8a9624ce55011026be7168b98e2054e1d2f583c9))
* 新增 Radius 配置 ([c0da20f](https://github.com/baiwumm/better-nuxt/commit/c0da20fdba81706c1d623147e9ad185772f83131))

### 🐛 Bug Fixes | Bug 修复

* 修复 useFetch 引发的错误 ([fbb288b](https://github.com/baiwumm/better-nuxt/commit/fbb288bed60aa7aa5651c7d1086a9ff201850c54))

### 🎫 Chores | 其他更新

* Release v1.1.0 ([5b47ddf](https://github.com/baiwumm/better-nuxt/commit/5b47ddfd7d9236379e736e0d295c82182e1f11e7))

## 1.0.0 (2026-03-17)

### ✨ Features | 新功能

* 初始化项目 ([5b270bb](https://github.com/baiwumm/better-nuxt/commit/5b270bbf04192556e6abc030e02fc45d673096ec))
* 新增 release-it 版本管理工具 ([288d044](https://github.com/baiwumm/better-nuxt/commit/288d0440b6c5d7f9f70cd9062068c7f381861239))
* 引入 Nuxt UI ([026e8d3](https://github.com/baiwumm/better-nuxt/commit/026e8d31320993b36940b231281b4cb5eef1654b))

### 🎫 Chores | 其他更新

* Release v1.0.0 ([9bb656a](https://github.com/baiwumm/better-nuxt/commit/9bb656a365afa33a5463bffb82002c9da691f9e7))

## [1.2.0](https://github.com/baiwumm/better-nuxt/compare/1.1.0...1.2.0) (2026-03-24)

### ✨ Features | 新功能

* **forgot-password:** 新增《忘记密码》页面 ([9eab50a](https://github.com/baiwumm/better-nuxt/commit/9eab50ae9422a4e156e7a290b4740691d96f58dd))
* **MagicLink:** 新增邮箱链接登录功能 ([c483f62](https://github.com/baiwumm/better-nuxt/commit/c483f62ee1ae87e54e8a0f4e4eb504a84110405d))
* **reset-password:** 新增《重置密码》页面 ([dad452b](https://github.com/baiwumm/better-nuxt/commit/dad452b623922ffad284f015ac693a1633084041))

### ⚡ Performance Improvements | 性能优化

* **auth:** 整理文件结构 ([5f21c74](https://github.com/baiwumm/better-nuxt/commit/5f21c740c875154bcec8e493fb43990d76ac92de))
* Login 页面迁移到 Sign In ([9df064d](https://github.com/baiwumm/better-nuxt/commit/9df064dbe0970b68bef9f63ca44e0e2342f6a683))

## [1.1.0](https://github.com/baiwumm/better-nuxt/compare/1.0.0...1.1.0) (2026-03-23)

### ✨ Features | 新功能

* 完成登录页的登录逻辑 ([6220083](https://github.com/baiwumm/better-nuxt/commit/62200831004317065be50c102d24557d218ef82e))
* 完成登录页及基础信息配置 ([671047a](https://github.com/baiwumm/better-nuxt/commit/671047a9d0f3d69a011b508de462c3f26e6e3b69))
* 完成登录注册页面的相关逻辑 ([90c9374](https://github.com/baiwumm/better-nuxt/commit/90c9374608e10ff05f396c4a985997cf43e10963))
* 完善项目基础配置 ([747d235](https://github.com/baiwumm/better-nuxt/commit/747d235bdd2bed9f8e424513f2d8c4936986b18b))
* 完善注册页面逻辑 ([c2b0ae5](https://github.com/baiwumm/better-nuxt/commit/c2b0ae5e42bbd6cfb396600021d7a41f288384f5))
* 新增 @better-auth/infra 包 ([49a7cac](https://github.com/baiwumm/better-nuxt/commit/49a7cac936c6f38378af6da45193e1fbc1484736))
* 新增 @nuxtjs/i18n 包，完成国际化基本配置 ([ff3a9b1](https://github.com/baiwumm/better-nuxt/commit/ff3a9b102f4bef6c70a296c33fdfd5c06dad8a75))
* 新增 @vercel/analytics 统计 ([e887aca](https://github.com/baiwumm/better-nuxt/commit/e887acac020da7d871eed3eccaff9ed773a9ba42))
* 新增 ColorMode 主题切换组件 ([cdaf7ea](https://github.com/baiwumm/better-nuxt/commit/cdaf7eab6e22dc14172e71aebb427b41f87e803c))
* 新增 Locales 语言设置组件，完善多语言配置 ([c013f2e](https://github.com/baiwumm/better-nuxt/commit/c013f2e136490f1c43941b1ddab0cd4def36fab1))
* 新增 Pinia ，完成主题色设置的功能 ([8a9624c](https://github.com/baiwumm/better-nuxt/commit/8a9624ce55011026be7168b98e2054e1d2f583c9))
* 新增 Radius 配置 ([c0da20f](https://github.com/baiwumm/better-nuxt/commit/c0da20fdba81706c1d623147e9ad185772f83131))

### 🐛 Bug Fixes | Bug 修复

* 修复 useFetch 引发的错误 ([fbb288b](https://github.com/baiwumm/better-nuxt/commit/fbb288bed60aa7aa5651c7d1086a9ff201850c54))

## 1.0.0 (2026-03-17)

### ✨ Features | 新功能

* 初始化项目 ([5b270bb](https://github.com/baiwumm/better-nuxt/commit/5b270bbf04192556e6abc030e02fc45d673096ec))
* 新增 release-it 版本管理工具 ([288d044](https://github.com/baiwumm/better-nuxt/commit/288d0440b6c5d7f9f70cd9062068c7f381861239))
* 引入 Nuxt UI ([026e8d3](https://github.com/baiwumm/better-nuxt/commit/026e8d31320993b36940b231281b4cb5eef1654b))
