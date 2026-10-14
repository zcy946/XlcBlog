export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface TocNode extends TocHeading {
  children: TocNode[];
}

export function buildToc(headings: TocHeading[]): TocNode[] {
  const tree: TocNode[] = [];
  const ancestors: TocNode[] = [];

  for (const heading of headings) {
    // 跳过一级标题时也结束上一节，避免后续小标题挂到错误的父级。
    while (ancestors.length && ancestors[ancestors.length - 1].depth >= heading.depth) {
      ancestors.pop();
    }
    if (heading.depth < 2 || heading.depth > 4) continue;

    const node: TocNode = { ...heading, children: [] };
    const parent = ancestors[ancestors.length - 1];
    (parent ? parent.children : tree).push(node);
    ancestors.push(node);
  }

  return tree;
}
