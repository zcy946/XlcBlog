import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    // 让语法高亮跟随站点的 CSS 颜色变量，统一深浅主题。
    shikiConfig: { theme: 'css-variables' },
  },
});
