import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const DIST = path.join(ROOT, 'docs/.vitepress/dist');
const SITE_URL = 'https://liumeitizhinan.biz';

const sectionNames = {
  '': '首页',
  ai: 'AI 与流媒体',
  brands: '机场品牌库',
  clients: '客户端软件',
  compare: '品牌与工具对比',
  guides: '使用教程',
  network: '线路与节点',
  pricing: '价格与套餐',
  recommend: '机场推荐',
  reviews: '独立深度评测',
  risk: '风险与替代',
  tools: '测试与工具',
  troubleshooting: '故障排查',
  about: '关于与合规'
};

function parseFrontmatter(raw) {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = m[1];
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const descMatch = fm.match(/^description:\s*(.+)$/m);
  const noindex = /^noindex:\s*true\s*$/m.test(fm);
  const strip = (s) => (s ? s.trim().replace(/^['"]|['"]$/g, '') : '');
  return {
    title: strip(titleMatch?.[1]),
    description: strip(descMatch?.[1]),
    noindex
  };
}

const pages = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.vitepress', 'public', 'node_modules'].includes(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && ent.name.endsWith('.md')) {
      const raw = fs.readFileSync(full, 'utf-8');
      const { title, description, noindex } = parseFrontmatter(raw);
      if (noindex) continue;
      let rel = path.relative(DOCS, full).replace(/\\/g, '/');
      rel = rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
      if (rel && !rel.endsWith('/')) rel += '/';
      const url = rel ? `${SITE_URL}/${rel}` : `${SITE_URL}/`;
      const section = rel.split('/').filter(Boolean)[0] || '';
      pages.push({
        url,
        rel: rel || '/',
        title: title || rel || '流媒体指南',
        desc: description || '',
        section
      });
    }
  }
}

walk(DOCS);
pages.sort((a, b) => a.url.localeCompare(b.url));

const grouped = new Map();
for (const p of pages) {
  const key = p.section;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(p);
}

const fullLines = [
  '# 流媒体指南 (liumeitizhinan.biz) - llms-full.txt',
  '',
  `> 本索引汇总本站全部可索引页面的规范 URL、核心主题与摘要说明（共 ${pages.length} 篇），供大模型检索与引用参考。所有品牌对比与测速仅代表对应采样时间点，禁止虚构未实测结论。`,
  ''
];

for (const [sec, items] of grouped.entries()) {
  const secTitle = sectionNames[sec] || sec;
  fullLines.push(`## ${secTitle} (${items.length})`);
  for (const it of items) {
    fullLines.push(`- [${it.title}](${it.url})${it.desc ? ': ' + it.desc : ''}`);
  }
  fullLines.push('');
}

if (fs.existsSync(DIST)) {
  fs.writeFileSync(path.join(DIST, 'llms-full.txt'), fullLines.join('\n'), 'utf-8');
  console.log(`Generated dist/llms-full.txt with ${pages.length} indexable URLs.`);
}
