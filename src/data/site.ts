// 用真实资料替换这里的示例介绍；填写链接后，页脚会自动显示。
export const profile = {
  name: '夏黎辰',
  title: '夏黎辰 · 思考与创造',
  description: '记录技术、设计与日常思考，也把一些想法做成小小的作品。',
  introduction: '你好，我是 夏黎辰。喜欢简单而有用的事物，在代码与文字之间，把好奇心变成一点点具体的东西。',
  note: '一个安静的角落，存放思考，也存放正在生长的想法。',
  sample: true,
  email: '',
  github: 'https://github.com/zcy946',
};

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  number: string;
  visual: 'journal' | 'widgets' | 'scaffold' | 'loading';
  visualCaption: string;
  featured: boolean;
  status: string;
  sample: boolean;
  url?: string;
  source?: { label: string; url: string };
  paragraphs: { title: string; text: string }[];
}

export const projects: Project[] = [
  {
    slug: 'qlementine',
    name: 'qlementine',
    subtitle: '让 Qt Widgets 拥有现代、统一的外观。',
    description: '面向 Qt5 桌面应用的现代 QStyle 分支，提供统一的控件外观、辅助工具与额外组件。',
    tags: ['Qt5', 'C++17', 'QStyle'],
    number: '01',
    visual: 'widgets',
    visualCaption: 'A MODERN STYLE FOR QT WIDGETS',
    featured: true,
    status: 'Fork 项目',
    sample: false,
    url: 'https://github.com/zcy946/qlementine',
    source: { label: 'oclero/qlementine · Olivier Cléro', url: 'https://github.com/oclero/qlementine' },
    paragraphs: [
      { title: '统一桌面应用的视觉语言', text: 'Qlementine 通过自定义 QlementineStyle，为 Qt Widgets 应用提供现代化的控件外观。它可以替换默认 QStyle，让现有界面在一致的视觉语言下呈现。' },
      { title: '样式之外的组件与工具', text: '除了 QStyle 实现，仓库还包含帮助编写自定义 QWidget 的辅助工具，以及 Qt 标准组件之外的控件，例如 Switch。README 展示了浅色与深色界面效果。' },
      { title: '构建与接入', text: '此分支的 README 以 Qt 5.15.2、C++17 和 CMake 3.21 及以上版本为基础。通过 CMake 引入依赖后，使用 QApplication::setStyle 设置应用样式；具体用法可查看仓库文档。' },
      { title: '项目来源', text: '这是 zcy946 名下的派生仓库，上游为 Olivier Cléro 创建的 oclero/qlementine，采用 MIT 许可证。本页的介绍与源码链接均指向 zcy946/qlementine 分支。' },
    ],
  },
  {
    slug: 'qtforge',
    name: 'QtForge',
    subtitle: '从清晰的工程结构，开始一个 Qt 应用。',
    description: '基于 CMake、Qt5 Widgets 与 C++17 的桌面应用脚手架，集成日志封装库和实时日志查看控件。',
    tags: ['Qt5 Widgets', 'CMake', 'spdlog'],
    number: '02',
    visual: 'scaffold',
    visualCaption: 'A STARTING POINT FOR DESKTOP APPS',
    featured: true,
    status: '应用脚手架',
    sample: false,
    url: 'https://github.com/zcy946/QtForge',
    paragraphs: [
      { title: '为新项目准备一个起点', text: 'QtForge 使用 CMake 管理 Qt5 Widgets 应用，提供可运行的日志控件示例，并自动开启 AUTOMOC、AUTOUIC 和 AUTORCC。工程使用 C++17，适合作为新桌面应用的基础。' },
      { title: '日志输出与界面查看', text: '内置 XlcLogger 动态库封装 spdlog，提供分级日志宏、控制台与可选轮转文件输出，以及常用 Qt 类型的格式化支持。XlcLogWidget 静态库在界面中实时展示日志，支持关键字搜索、级别筛选、按级别着色和多选复制。' },
      { title: '保持清楚的初始化流程', text: '项目约定 QWidget 子类按 initItems、initLayout、initConnections、initWidget 的顺序组织初始化，无需继承额外的抽象基类。控件创建、布局与信号连接各有明确的位置。' },
      { title: '构建与使用', text: '仓库提供 CMake Presets 和 vcpkg 配置，可按本机 Qt kit 设置路径后构建。示例位于 examples/log_widget_demo，库代码位于 libs。项目采用 MIT 许可证；完整的环境要求和接入方式见 GitHub README。' },
    ],
  },
  {
    slug: 'xlc-circular-loading-indicator',
    name: 'XLCCircularLoadingIndicator',
    subtitle: '把熟悉的环形加载动画，带到 Qt 界面里。',
    description: '灵感来自 Windows 10/11 启动动画的 Qt 加载指示组件，提供 Dot、Moon 两种样式和启停接口。',
    tags: ['Qt5', 'QLabel', '加载动画'],
    number: '03',
    visual: 'loading',
    visualCaption: 'A SMALL DETAIL. A BETTER WAIT.',
    featured: true,
    status: '界面组件',
    sample: false,
    url: 'https://github.com/zcy946/XLCCircularLoadingIndicator',
    paragraphs: [
      { title: '让等待有一个清晰的反馈', text: '这个组件的灵感来自 Windows 10/11 的开机动画，使用 segoe_slboot.ttf 中的字体图标呈现加载效果。仓库 README 中提供了动画演示。' },
      { title: '两种样式与简单的控制接口', text: 'XLCCircularLoadingIndicator 继承自 QLabel，构造时可选择 Pattern::Dot 或 Pattern::Moon，默认使用 Dot。通过 Start() 和 Stop() 控制动画，内部使用 QTimer 更新当前显示的字符。' },
      { title: '查看实现与运行示例', text: '项目使用 CMake 构建，链接 Qt5 的 Core、Gui 与 Widgets 模块。组件声明位于 include/XLCCircularLoadingIndicator.h，具体实现与示例代码可在 GitHub 仓库中查看。' },
    ],
  },
  {
    slug: 'xlc-blog',
    name: 'XlcBlog',
    subtitle: '给文字与想法，一个自己的空间。',
    description: '一个以阅读为中心的个人博客。用克制的设计，承载文章、作品和持续的探索。',
    tags: ['Astro', 'TypeScript', '个人网站'],
    number: '04',
    visual: 'journal',
    visualCaption: 'A PERSONAL CORNER OF THE WEB',
    featured: false,
    status: '持续构建',
    sample: false,
    url: '/',
    paragraphs: [
      { title: '从一个自己的空间开始', text: '这个网站将个人介绍、项目和文章放在一起。首页负责介绍，文章页留给阅读，项目页记录从想法到实现的过程。' },
      { title: '让内容成为主角', text: '暖白底色、清晰的字号层级和适度留白构成页面的基础。文字保持舒适的行宽，导航和交互保持简单，同时适配手机和深色阅读环境。' },
      { title: '构建与维护', text: '网站使用 Astro 生成静态页面，文章使用 Markdown 管理。构建产物可以直接部署在自己的服务器上，个人资料和项目资料在配置文件中集中维护。' },
    ],
  },
];
