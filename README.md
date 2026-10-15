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

`draft: true` 的文章不会出现在首页、文章列表或静态详情页。发布时改为 `false`。发布日期仅用于显示和排序，不提供定时发布。文章目录从二至四级标题自动生成。搜索在浏览器中匹配标题、摘要和标签，不搜索全文。

### 早报版式

在 frontmatter 中设置 `format: briefing` 可使用早报版式；不填写时默认为普通文章。样式位于 `src/styles/briefing.css`。可直接复制 [早报排版样例](templates/briefing.md)，实际效果见 [2026-10-14 南沙早报](src/content/posts/nansha-morning-2026-10-14.md)。

样例放在 `templates/`，不会被收录为文章。创建新一期时复制到文章目录，例如：

```powershell
Copy-Item -LiteralPath templates/briefing.md -Destination src/content/posts/nansha-morning-2026-10-15.md
```

1. 修改 frontmatter 的标题、摘要、日期和标签；保留 `format: briefing`。
2. 替换全部“示例”文案、`【填写项】`、2000 年的日期及 `example.com` 链接。样例覆盖完整公告、四级小节、短公告、无新增类别、近期摘要和截止提醒，可按需复制或删除整个区块。
3. 同步本期总数、分类数量、近期公告数量及提醒涉及的事项数。某分类有新增公告时，移除导航的 `is-empty`，将 `briefing-empty` 区块换成普通分类标题和公告。
4. 核对重点日期、分类导航和正文标题的锚点链接。Markdown 标题自动生成锚点，例如 `### 2000年1月2日18:00` 对应 `#2000年1月2日1800`；修改标题或日期后同步更新 `href`，不要使用重复标题。
5. 样例默认 `draft: true`、`sample: true`。准备预览时将 `draft` 改为 `false`，启动 `npm run dev`，打开 `/writing/文件名/`（不含 `.md`）；确认内容完整后再将 `sample` 改为 `false`，执行 `npm run build`。草稿不会生成详情页，`sample` 仅控制示例标记，不控制是否发布。

早报使用 Markdown。用 `<section class="briefing-item">` 包住单条公告，保留三级 Markdown 标题，依次放置发布日期（`briefing-meta`）、摘要（`briefing-summary`）、键值事项（`dl.briefing-facts`）、背景说明、来源（`footer.briefing-source`）。没有键值事项的短公告可加 `briefing-item--brief`。HTML 包装标签与 Markdown 内容之间留一行空白，标题才能正常解析并进入目录。

顶部使用 `briefing-overview` 和 `briefing-categories` 提供重点日期与分类锚点；`briefing-empty` 用于本期无新增的类别，`briefing-digest` 用于近期公告，`briefing-deadline` 用于按日期排列的提醒。日期使用明确的年月日，不使用随访问时间变化的“明天”或倒计时。复制示例时同步更新分类数量、锚点链接和提醒。

阅读时长忽略 HTML 包装、注释和 Markdown 链接地址。若文章带有 `nansha-report-metadata`，修改内容后应更新其中的 `report_body_sha256`：取该注释开始之前的全部 UTF-8 内容（包含 frontmatter 和空行）计算 SHA-256，保留来源核验记录。

### HTML 邮件速览

邮件沿用早报配色，使用适合手机邮箱的单栏版式，按当日提醒、重点摘要、后续节点、相对期限和其他公告排列。截止类内容逐项保留，包括办理条件、受理方式及相对送达期限；非时限类背景可摘要。模板与内容分开维护，输出 HTML 正文和纯文本备份。

```sh
npm run email:render -- examples/email/nansha-morning-2026-10-15.json
```

查看 [10/15 邮件样例](examples/email/nansha-morning-2026-10-15.html) 和 [复用说明](templates/email/README.md)。该命令只生成本地文件；邮件发送服务可单独接入。

## 部署到 Cloudflare Pages（当前生产环境）

- 正式地址：`https://1610161.xyz`
- Pages 项目：`xlc-blog`，默认地址：`https://xlc-blog.pages.dev`
- GitHub 仓库：`zcy946/XlcBlog`，生产分支：`main`
- 构建命令：`npm run build`，输出目录：`dist`，根目录为仓库根目录。
- 构建环境变量：`SITE_URL=https://1610161.xyz`、`NODE_VERSION=24.18.0`。

以上设置位于 Cloudflare Pages 项目配置中。推送到 GitHub 的 `main` 分支会自动构建并发布；本地尚未提交、推送的修改不会上线。可在 Pages 的 Deployments 中检查构建日志及部署状态。

网站为纯静态页面，不需要 Cloudflare 运行时适配器、数据库、R2 存储桶或腾讯云服务器。图片可放入 `public/`，随网站一起发布。

更换域名时，同时调整 Pages 的 Custom domains、Cloudflare DNS 和构建环境变量 `SITE_URL`，然后重新部署，使 canonical 和 Open Graph URL 使用新域名。

## 部署到自己的服务器（可选）

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
- 文章目录收录二至四级标题，子目录默认折叠，支持原生键盘展开和锚点跳转。滚动时标识当前小节；桌面端自动展开所在分支，保留手动开合选择，目录过长时可独立滚动。开合使用 220 毫秒的高度过渡和轻微淡入淡出，支持连续点击反向切换；减少动态效果或浏览器不支持相关 CSS 特性时直接开合。移动端保持手动展开，避免阅读时改变正文位置；禁用 JavaScript 时仍可展开与跳转。
- 禁用 JavaScript 时仍可阅读、导航；搜索和主题按钮隐藏。
- 正文支持 Markdown 引用、列表、表格和代码高亮。
- 提供跳转到正文、可见键盘焦点和减少动态效果支持。

目前尚未接入评论、全文检索、RSS 或统计；生产环境使用 Cloudflare Pages 的 Git 自动部署。
