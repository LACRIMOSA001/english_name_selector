# 🚀 特工名选择器部署指南 (Agent Name Selector)

你的项目已经准备好发布了！以下是几种最简单的部署方式，只需 2 分钟即可上线。

## 方式一：Vercel (最推荐 ✨)
Vercel 是部署 React 应用的最佳选择，速度极快且完全免费。

1. **注册/登录**: 访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录。
2. **导入项目**:
   - 如果你使用了 GitHub: 在 Vercel 面板点击 "Add New..." -> "Project"，选择你的 GitHub 仓库 `name_selector` 并点击 "Import"。
   - **(无需 GitHub) 命令行部署**:
     1. 确保安装了 Node.js。
     2. 在终端运行 `npm i -g vercel` 安装工具。
     3. 在当前项目目录下运行 `vercel`。
     4. 一路回车（Enter）确认即可。Vercel 会自动上传并生成链接。

3. **完成**: Vercel 会给你一个类似 `name-selector-zx.vercel.app` 的链接，发给朋友即可！

## 方式二：Netlify Drop (最傻瓜 🖱️)
如果你不想用命令行，也不想连接 GitHub。

1. 访问 [app.netlify.com/drop](https://app.netlify.com/drop)。
2. 将你的整个 **`name_selector` 文件夹** 直接拖拽到网页中的虚线框里。
3. 等待几秒，网页面板会显示 "Site is live"。
4. 点击生成的链接访问。

## 方式三：GitHub Pages (传统 🐱)
如果你已经把代码上传到了 GitHub。

1. 进入 GitHub 仓库页面 -> Settings -> Pages。
2. 在 "Build and deployment" 下的 Source 选择 "Deploy from a branch"。
3. Branch 选择 `main` (或 `master`)，文件夹选择 `/(root)`。
4. 点击 Save。等待几分钟，你的网站就会在 `https://<你的用户名>.github.io/name_selector/` 上线。

---

## ✅ 部署检查清单 (Pre-flight Check)

我们已经为你自动完成了以下优化：
- [x] **入口文件**: `name_selector_zx.html` 已重命名为 `index.html`，部署平台可自动识别。
- [x] **性能优化**: React 库已切换为 Production 版本 (体积更小)。
- [x] **移动端适配**: `viewport-fit=cover` 已配置，支持全屏 PWA 体验。
- [x] **资源路径**: 所有音频和图片引用均使用相对路径 `./`，兼容所有子目录部署。

## ⚠️ 注意事项
-由于使用了浏览器端 Babel 编译 (`app.jsx`)，首次加载时可能会有 0.5秒~1秒 的白屏初始化时间，这是正常的。
- 如果部署后遇到音频无法播放，请检查浏览器是否阻止了自动播放，通常需要用户点击一次页面后才能播放声音。
