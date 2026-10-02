# XlcBlog

极简阅读与个人品牌结合的静态博客。使用 Astro、TypeScript 和原生 CSS，包含个人介绍、项目、Markdown 文章、分类与搜索、明暗主题和手机布局。

## 本地开发

要求 Node.js 22.12 或更新版本。

```sh
npm ci
npm run dev
```

开发地址以终端输出为准，默认是 `http://127.0.0.1:4321`。

```sh
npm run check
npm run build
npm run preview
```

构建会先执行 Astro / TypeScript 检查，再生成静态文件到 `dist/`。

## 替换内容

- `src/data/site.ts`：昵称、个人介绍、联系方式、项目与项目详情。GitHub 与邮箱为空时不会显示链接。
- `src/content/posts/`：Markdown 文章。文件名形成文章地址。
- `src/pages/index.astro`：首页主标题与布局。
- `src/pages/about.astro`：完整的关于页文案。
- `src/styles/global.css`：颜色变量、字体、间距、响应式布局。
- `public/favicon.svg`：站点图标。

当前个人介绍和三篇文章仍含示例文案；替换真实内容后，把相应 `sample` 设为 `false`。

首页展示三个 `featured: true` 的 GitHub 项目，项目列表同时保留 XlcBlog 本站。项目介绍根据下列仓库的 README 与公开实现手动整理，构建和访问网站均不依赖 GitHub API；仓库功能变化后需更新 `src/data/site.ts`。封面为本站绘制的主题示意，并非产品截图。

- [qlementine](https://github.com/zcy946/qlementine)：面向 Qt5 的现代 QStyle 分支；详情页保留 [oclero/qlementine](https://github.com/oclero/qlementine) 和 Olivier Cléro 的上游署名。
- [QtForge](https://github.com/zcy946/QtForge)：CMake、Qt5 Widgets、C++17 应用脚手架，集成 XlcLogger 与 XlcLogWidget。
- [XLCCircularLoadingIndicator](https://github.com/zcy946/XLCCircularLoadingIndicator)：Qt5 环形加载组件，支持 Dot 与 Moon 样式。

新文章示例：

```md
---
title: '文章标题'
description: '一句话摘要'
date: 2026-10-02
category: '技术'
tags: ['Astro']
draft: true
sample: false
---

这里是正文。

## 一个小节

这里是这一节的内容。
```

`draft: true` 的文章不会出现在首页、文章列表或静态详情页。发布时改为 `false`。发布日期仅用于显示和排序，不提供定时发布。文章目录从二级标题自动生成。搜索在浏览器中匹配标题、摘要和标签，不搜索全文。

## 部署到自己的服务器

网站不需要常驻 Node.js 或数据库。服务器只需提供 `dist/` 内的静态文件。

1. 在本地或 CI 设置真实域名并执行构建：

   PowerShell：

   ```powershell
   $env:SITE_URL = 'https://your-domain.example'
   npm run build
   ```

   Linux / CI：

   ```sh
   SITE_URL=https://your-domain.example npm run build
   ```

   未设置 `SITE_URL` 时会省略 canonical 和 Open Graph URL，方便本地预览。`.env.example` 仅用于记录配置示例；构建配置从进程环境变量读取域名。

2. 将 `dist/` 内的内容上传到服务器上的 `/var/www/xlc-blog`，保留目录结构。建议为每次发布建立独立目录，验证后切换网站根目录或符号链接，便于回滚。
3. 修改 `deploy/Caddyfile` 中的域名和根目录，再合并到服务器的 Caddy 配置。不要覆盖服务器上其他网站的配置。
4. 确保域名解析到服务器，允许访问 80 和 443 端口。Caddy 在满足证书签发条件时自动管理 HTTPS。
5. 用 `caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile` 验证后重载 Caddy，再检查首页、文章、项目、静态资源及 404 页面。

`/_astro/` 下带哈希的资源配置了长期缓存，HTML 页面保持可更新。本站使用目录式 URL；部署时应保留目录中的 `index.html`。如沿用 Nginx，应采用类似 `try_files $uri $uri/ =404;` 的静态站配置。

## 设计与行为

- 系统字体，无外部字体、图片或跟踪脚本请求。
- 深浅主题首次跟随系统，手动选择保存在本地浏览器。切换时通过统一的颜色进度在 320 毫秒内渐变，覆盖背景、文字、边框、SVG、阴影、渐变图案和代码高亮；连续点击从当前颜色反向过渡。首屏不播放主题动画，开启减少动态效果时即时切换。`src/styles/global.css` 中每个 `color-mix()` 的前后两个颜色分别为浅色与深色。
- 正文使用 180 毫秒的淡入与轻微上移动画，直接作用于真实内容，期间仍可点击导航、文章和项目；主题背景与导航不参与动画。首屏内联背景样式避免样式资源加载时露出白底；系统设置为减少动态效果时关闭动画。动画样式在 `src/styles/page-transitions.css` 中调整，无需额外脚本。
- 搜索与分类组合筛选，并提供无结果状态、清除按钮和屏幕阅读器结果提示。
- 禁用 JavaScript 时仍可阅读、导航；搜索和主题按钮隐藏。
- 正文支持 Markdown 引用、列表、表格和代码高亮。
- 提供跳转到正文、可见键盘焦点和减少动态效果支持。

目前尚未接入评论、全文检索、RSS、统计或自动部署。
