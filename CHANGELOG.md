# Changelog

## [1.3.3](https://github.com/baiwumm/nuxt-pro-max/compare/v1.3.2...v1.3.3) (2026-04-29)

### ✨ Features | 新功能

* 新增非 GET 操作录入日志 ([56141f9](https://github.com/baiwumm/nuxt-pro-max/commit/56141f9350a9bf25453abe0094f2dedc3b9aa464))

### 🔧 Continuous Integration | CI 配置

* 迁移文件，表 id 字段统一改成 string 类型 ([a821ec0](https://github.com/baiwumm/nuxt-pro-max/commit/a821ec091f1eff432b9a10c723ec56a657c405a4))
* 新增 ua-parser-js 包 ([5740740](https://github.com/baiwumm/nuxt-pro-max/commit/5740740456076421d22c9039143020a767f66d72))

## [1.3.2](https://github.com/baiwumm/nuxt-pro-max/compare/v1.3.1...v1.3.2) (2026-04-28)

### ✨ Features | 新功能

* 动态设置项目标题 ([d6d04ba](https://github.com/baiwumm/nuxt-pro-max/commit/d6d04bae5ccc6b9e174bf8aa48b07c9c5156b51c))
* **MultipleTabs:** 完善国际化配置 ([f3c7ec3](https://github.com/baiwumm/nuxt-pro-max/commit/f3c7ec31ddd9273b8541be9cb0151201dbc2fb4d))
* **RouteTransition:** 添加路由过渡动画配置 ([094d332](https://github.com/baiwumm/nuxt-pro-max/commit/094d3326815e9905d8bfc832b18feab7424f8d50))

## [1.3.1](https://github.com/baiwumm/nuxt-pro-max/compare/v1.3.0...v1.3.1) (2026-04-27)

### ✨ Features | 新功能

* **store:** 新增 MultipleTabs 组件和 useTabStore ([00a6aec](https://github.com/baiwumm/nuxt-pro-max/commit/00a6aecce69cdb2d1473a397684be44bf70a65ba))

### 🔧 Continuous Integration | CI 配置

* 新增 motion-v 包 ([4b60e28](https://github.com/baiwumm/nuxt-pro-max/commit/4b60e28bfade4c71fe2600fc03b8105be3740d9f))

## [1.3.0](https://github.com/baiwumm/nuxt-pro-max/compare/1.2.0...v1.3.0) (2026-04-27)

### ✨ Features | 新功能

* 完成侧边栏排版布局，新增菜单页面 ([991f133](https://github.com/baiwumm/nuxt-pro-max/commit/991f133af7571f725957cf2c49c10a235f22bfa7))
* 新提交 ([a394155](https://github.com/baiwumm/nuxt-pro-max/commit/a394155e5df7c9856d615841a98f24074003f41b))
* 新增 FullLoading 组件 ([fa8a361](https://github.com/baiwumm/nuxt-pro-max/commit/fa8a3614a858b6270016ec9cb7f4a0ab0e2cb9a6))
* 新增 husky  commit 规范 ([1742c50](https://github.com/baiwumm/nuxt-pro-max/commit/1742c50c62f75c838f979ddcd089ef6a707c2c73))
* **app:** 添加菜单 keepAlive 缓存配置 ([16a1c07](https://github.com/baiwumm/nuxt-pro-max/commit/16a1c076c72b942cd2cbbafa0509a73361c5de50))
* **components:** 新增 LoadingContent 组件 ([94c0a4b](https://github.com/baiwumm/nuxt-pro-max/commit/94c0a4b0540a6a418daec6a73fa6dce5fea91072))
* **components:** 新增 Spinner 组件 ([8cee59c](https://github.com/baiwumm/nuxt-pro-max/commit/8cee59c3ada9901f23c322507dad5e171f3d0b3d))
* **db:** 新增 menu shcema ([fcddb09](https://github.com/baiwumm/nuxt-pro-max/commit/fcddb09bd49a7c4bebb3fa144f4cf11b08646eb1))
* **layout:** 完成侧边栏布局 ([6366916](https://github.com/baiwumm/nuxt-pro-max/commit/63669165006dac8ef8e19fb61d48ad51b390f749))
* **layout:** 完成动态菜单的加载 ([dd12572](https://github.com/baiwumm/nuxt-pro-max/commit/dd12572b5e2f5f37308a1eb2ca1f100d62fb8f1f))
* **menu-manage:** 完成《菜单管理》模块的 CURD 交互逻辑 ([275fac1](https://github.com/baiwumm/nuxt-pro-max/commit/275fac194431a1c5abfff74cc82b220f6e7a1a55))
* **menu-manage:** 完成《菜单管理》模块的接口模型和 CURD 接口 ([a671717](https://github.com/baiwumm/nuxt-pro-max/commit/a6717172071c57ed8c4d3dbc5771da251359b755))
* **UserMenu:** 完成退出登录逻辑 ([edfd53e](https://github.com/baiwumm/nuxt-pro-max/commit/edfd53e09c0fc77ca0fc152e2f122fad7f1102ce))
* **UserMenu:** 用户信息加载 Loading ([019e7ad](https://github.com/baiwumm/nuxt-pro-max/commit/019e7ad58da8c5ceeda36f00236b5ade836c873f))

### 🐛 Bug Fixes | Bug 修复

* 修复组件导入报错问题 ([dd83063](https://github.com/baiwumm/nuxt-pro-max/commit/dd83063c85c156fa95da8f5770b21ece25e77963))

### 💄 Styles | 风格

* 优化 bprogress 和 NuxtLoadingIndicator 主题色 ([2ce0df6](https://github.com/baiwumm/nuxt-pro-max/commit/2ce0df635b4de2be9d70a33051fbfb24e0e3a0bc))
* **UserMenu:** 折叠模式只显示头像 ([8f24e6c](https://github.com/baiwumm/nuxt-pro-max/commit/8f24e6c3f7da58e934adff55e88e564ceb6cd423))

### ⚡ Performance Improvements | 性能优化

* **menu-manage:** 优化代码逻辑 ([bcf1f7c](https://github.com/baiwumm/nuxt-pro-max/commit/bcf1f7c03f26d712eca0341320881b75d3420164))
* **middleware:** 优化 / 访问的重定向问题 ([f01ccce](https://github.com/baiwumm/nuxt-pro-max/commit/f01ccce1c85c7ac422fdf90d20893403c8c4165a))
* **Spinner:** 优化样式 ([a5d52b6](https://github.com/baiwumm/nuxt-pro-max/commit/a5d52b62891f0619080dcac8881e53877340c3dc))

### 🔧 Continuous Integration | CI 配置

* 解决 process 全局环境报错的问题 ([3bdb036](https://github.com/baiwumm/nuxt-pro-max/commit/3bdb036008c66d7a5ba2b9ca0d077717ff2dc536))
* 修改 release 配置 ([a9c3968](https://github.com/baiwumm/nuxt-pro-max/commit/a9c3968bc5dd15cdf4a74217e82312c367be43b5))

## 1.2.0 (2026-03-24)

### ✨ Features | 新功能

* **forgot-password:** 新增《忘记密码》页面 ([9eab50a](https://github.com/baiwumm/nuxt-pro-max/commit/9eab50ae9422a4e156e7a290b4740691d96f58dd))
* **MagicLink:** 新增邮箱链接登录功能 ([c483f62](https://github.com/baiwumm/nuxt-pro-max/commit/c483f62ee1ae87e54e8a0f4e4eb504a84110405d))
* **reset-password:** 新增《重置密码》页面 ([dad452b](https://github.com/baiwumm/nuxt-pro-max/commit/dad452b623922ffad284f015ac693a1633084041))

### 🎫 Chores | 其他更新

* Release v1.2.0 ([371db6a](https://github.com/baiwumm/nuxt-pro-max/commit/371db6af7105c2a308711aba75069692b0c39ea4))

### ⚡ Performance Improvements | 性能优化

* **auth:** 整理文件结构 ([5f21c74](https://github.com/baiwumm/nuxt-pro-max/commit/5f21c740c875154bcec8e493fb43990d76ac92de))
* Login 页面迁移到 Sign In ([9df064d](https://github.com/baiwumm/nuxt-pro-max/commit/9df064dbe0970b68bef9f63ca44e0e2342f6a683))

## 1.1.0 (2026-03-23)

### ✨ Features | 新功能

* 完成登录页的登录逻辑 ([6220083](https://github.com/baiwumm/nuxt-pro-max/commit/62200831004317065be50c102d24557d218ef82e))
* 完成登录页及基础信息配置 ([671047a](https://github.com/baiwumm/nuxt-pro-max/commit/671047a9d0f3d69a011b508de462c3f26e6e3b69))
* 完成登录注册页面的相关逻辑 ([90c9374](https://github.com/baiwumm/nuxt-pro-max/commit/90c9374608e10ff05f396c4a985997cf43e10963))
* 完善项目基础配置 ([747d235](https://github.com/baiwumm/nuxt-pro-max/commit/747d235bdd2bed9f8e424513f2d8c4936986b18b))
* 完善注册页面逻辑 ([c2b0ae5](https://github.com/baiwumm/nuxt-pro-max/commit/c2b0ae5e42bbd6cfb396600021d7a41f288384f5))
* 新增 @better-auth/infra 包 ([49a7cac](https://github.com/baiwumm/nuxt-pro-max/commit/49a7cac936c6f38378af6da45193e1fbc1484736))
* 新增 @nuxtjs/i18n 包，完成国际化基本配置 ([ff3a9b1](https://github.com/baiwumm/nuxt-pro-max/commit/ff3a9b102f4bef6c70a296c33fdfd5c06dad8a75))
* 新增 @vercel/analytics 统计 ([e887aca](https://github.com/baiwumm/nuxt-pro-max/commit/e887acac020da7d871eed3eccaff9ed773a9ba42))
* 新增 ColorMode 主题切换组件 ([cdaf7ea](https://github.com/baiwumm/nuxt-pro-max/commit/cdaf7eab6e22dc14172e71aebb427b41f87e803c))
* 新增 Locales 语言设置组件，完善多语言配置 ([c013f2e](https://github.com/baiwumm/nuxt-pro-max/commit/c013f2e136490f1c43941b1ddab0cd4def36fab1))
* 新增 Pinia ，完成主题色设置的功能 ([8a9624c](https://github.com/baiwumm/nuxt-pro-max/commit/8a9624ce55011026be7168b98e2054e1d2f583c9))
* 新增 Radius 配置 ([c0da20f](https://github.com/baiwumm/nuxt-pro-max/commit/c0da20fdba81706c1d623147e9ad185772f83131))

### 🐛 Bug Fixes | Bug 修复

* 修复 useFetch 引发的错误 ([fbb288b](https://github.com/baiwumm/nuxt-pro-max/commit/fbb288bed60aa7aa5651c7d1086a9ff201850c54))

### 🎫 Chores | 其他更新

* Release v1.1.0 ([5b47ddf](https://github.com/baiwumm/nuxt-pro-max/commit/5b47ddfd7d9236379e736e0d295c82182e1f11e7))

## 1.0.0 (2026-03-17)

### ✨ Features | 新功能

* 初始化项目 ([5b270bb](https://github.com/baiwumm/nuxt-pro-max/commit/5b270bbf04192556e6abc030e02fc45d673096ec))
* 新增 release-it 版本管理工具 ([288d044](https://github.com/baiwumm/nuxt-pro-max/commit/288d0440b6c5d7f9f70cd9062068c7f381861239))
* 引入 Nuxt UI ([026e8d3](https://github.com/baiwumm/nuxt-pro-max/commit/026e8d31320993b36940b231281b4cb5eef1654b))

### 🎫 Chores | 其他更新

* Release v1.0.0 ([9bb656a](https://github.com/baiwumm/nuxt-pro-max/commit/9bb656a365afa33a5463bffb82002c9da691f9e7))

## [1.2.0](https://github.com/baiwumm/nuxt-pro-max/compare/1.1.0...1.2.0) (2026-03-24)

### ✨ Features | 新功能

* **forgot-password:** 新增《忘记密码》页面 ([9eab50a](https://github.com/baiwumm/nuxt-pro-max/commit/9eab50ae9422a4e156e7a290b4740691d96f58dd))
* **MagicLink:** 新增邮箱链接登录功能 ([c483f62](https://github.com/baiwumm/nuxt-pro-max/commit/c483f62ee1ae87e54e8a0f4e4eb504a84110405d))
* **reset-password:** 新增《重置密码》页面 ([dad452b](https://github.com/baiwumm/nuxt-pro-max/commit/dad452b623922ffad284f015ac693a1633084041))

### ⚡ Performance Improvements | 性能优化

* **auth:** 整理文件结构 ([5f21c74](https://github.com/baiwumm/nuxt-pro-max/commit/5f21c740c875154bcec8e493fb43990d76ac92de))
* Login 页面迁移到 Sign In ([9df064d](https://github.com/baiwumm/nuxt-pro-max/commit/9df064dbe0970b68bef9f63ca44e0e2342f6a683))

## [1.1.0](https://github.com/baiwumm/nuxt-pro-max/compare/1.0.0...1.1.0) (2026-03-23)

### ✨ Features | 新功能

* 完成登录页的登录逻辑 ([6220083](https://github.com/baiwumm/nuxt-pro-max/commit/62200831004317065be50c102d24557d218ef82e))
* 完成登录页及基础信息配置 ([671047a](https://github.com/baiwumm/nuxt-pro-max/commit/671047a9d0f3d69a011b508de462c3f26e6e3b69))
* 完成登录注册页面的相关逻辑 ([90c9374](https://github.com/baiwumm/nuxt-pro-max/commit/90c9374608e10ff05f396c4a985997cf43e10963))
* 完善项目基础配置 ([747d235](https://github.com/baiwumm/nuxt-pro-max/commit/747d235bdd2bed9f8e424513f2d8c4936986b18b))
* 完善注册页面逻辑 ([c2b0ae5](https://github.com/baiwumm/nuxt-pro-max/commit/c2b0ae5e42bbd6cfb396600021d7a41f288384f5))
* 新增 @better-auth/infra 包 ([49a7cac](https://github.com/baiwumm/nuxt-pro-max/commit/49a7cac936c6f38378af6da45193e1fbc1484736))
* 新增 @nuxtjs/i18n 包，完成国际化基本配置 ([ff3a9b1](https://github.com/baiwumm/nuxt-pro-max/commit/ff3a9b102f4bef6c70a296c33fdfd5c06dad8a75))
* 新增 @vercel/analytics 统计 ([e887aca](https://github.com/baiwumm/nuxt-pro-max/commit/e887acac020da7d871eed3eccaff9ed773a9ba42))
* 新增 ColorMode 主题切换组件 ([cdaf7ea](https://github.com/baiwumm/nuxt-pro-max/commit/cdaf7eab6e22dc14172e71aebb427b41f87e803c))
* 新增 Locales 语言设置组件，完善多语言配置 ([c013f2e](https://github.com/baiwumm/nuxt-pro-max/commit/c013f2e136490f1c43941b1ddab0cd4def36fab1))
* 新增 Pinia ，完成主题色设置的功能 ([8a9624c](https://github.com/baiwumm/nuxt-pro-max/commit/8a9624ce55011026be7168b98e2054e1d2f583c9))
* 新增 Radius 配置 ([c0da20f](https://github.com/baiwumm/nuxt-pro-max/commit/c0da20fdba81706c1d623147e9ad185772f83131))

### 🐛 Bug Fixes | Bug 修复

* 修复 useFetch 引发的错误 ([fbb288b](https://github.com/baiwumm/nuxt-pro-max/commit/fbb288bed60aa7aa5651c7d1086a9ff201850c54))

## 1.0.0 (2026-03-17)

### ✨ Features | 新功能

* 初始化项目 ([5b270bb](https://github.com/baiwumm/nuxt-pro-max/commit/5b270bbf04192556e6abc030e02fc45d673096ec))
* 新增 release-it 版本管理工具 ([288d044](https://github.com/baiwumm/nuxt-pro-max/commit/288d0440b6c5d7f9f70cd9062068c7f381861239))
* 引入 Nuxt UI ([026e8d3](https://github.com/baiwumm/nuxt-pro-max/commit/026e8d31320993b36940b231281b4cb5eef1654b))
