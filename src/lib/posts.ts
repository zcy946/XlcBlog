import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
  }).format(date).replaceAll('/', '.');

export function readingMinutes(body = '') {
  // 只统计读者看到的文字，避免版式标签和来源元数据增加阅读时长。
  const text = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?[a-zA-Z][^>]*>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');
  const chinese = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  const words = (text.replace(/[\u3400-\u9fff]/g, '').match(/[a-zA-Z0-9]+/g) ?? []).length;
  return Math.max(1, Math.ceil(chinese / 300 + words / 200));
}
