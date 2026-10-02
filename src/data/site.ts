// 用真实资料替换这里的示例介绍；填写链接后，页脚会自动显示。
export const profile = {
  name: 'XLC',
  title: 'XLC · 思考与创造',
  description: '记录技术、设计与日常思考，也把一些想法做成小小的作品。',
  introduction: '你好，我是 XLC。喜欢简单而有用的事物，在代码与文字之间，把好奇心变成一点点具体的东西。',
  note: '一个安静的角落，存放思考，也存放正在生长的想法。',
  sample: true,
  email: '',
  github: '',
};

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  number: string;
  visual: 'journal' | 'reading';
  status: string;
  sample: boolean;
  url?: string;
  paragraphs: { title: string; text: string }[];
}

export const projects: Project[] = [
  {
    slug: 'xlc-blog',
    name: 'XlcBlog',
    subtitle: '给文字与想法，一个自己的空间。',
    description: '一个以阅读为中心的个人博客。用克制的设计，承载文章、作品和持续的探索。',
    tags: ['Astro', 'TypeScript', '个人网站'],
    number: '01',
    visual: 'journal',
    status: '持续构建',
    sample: false,
    url: '/',
    paragraphs: [
      { title: '从一个自己的空间开始', text: '这个网站将个人介绍、项目和文章放在一起。首页负责介绍，文章页留给阅读，项目页记录从想法到实现的过程。' },
      { title: '让内容成为主角', text: '暖白底色、清晰的字号层级和适度留白构成页面的基础。文字保持舒适的行宽，导航和交互保持简单，同时适配手机和深色阅读环境。' },
      { title: '构建与维护', text: '网站使用 Astro 生成静态页面，文章使用 Markdown 管理。构建产物可以直接部署在自己的服务器上，个人资料和项目资料在配置文件中集中维护。' },
    ],
  },
  {
    slug: 'reading-notes',
    name: '拾页',
    subtitle: '读过的文字，留下自己的回声。',
    description: '一个关于阅读与记录的项目构想：收集书摘，整理笔记，让零散的阅读有所连接。',
    tags: ['阅读', '知识整理', '概念设计'],
    number: '02',
    visual: 'reading',
    status: '示例项目',
    sample: true,
    paragraphs: [
      { title: '项目构想', text: '拾页是用于展示项目页面的示例，并非已上线的真实产品。它设想了一种更安静的阅读记录方式：一张书卡、一段摘录，以及一小段自己的思考。' },
      { title: '值得保留的体验', text: '阅读记录不必追求数量。这个构想更关注重新遇到一段文字时，能否回忆起当时的问题，以及后来发生的变化。' },
      { title: '替换为你的作品', text: '准备好真实项目后，可以在项目资料中替换名称、描述、技术标签和正文，并添加可访问的项目地址。' },
    ],
  },
];
