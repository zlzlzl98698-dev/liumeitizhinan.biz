import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'docs/.vitepress/dist');

const titles = new Map();
const descs = new Map();
const pages = [];
const errors = [];
const warnings = [];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && ent.name === 'index.html') {
      const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
      const html = fs.readFileSync(full, 'utf-8');
      if (html.includes('name="robots" content="noindex')) continue;
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="(.*?)"/);
      const canonicalMatch = html.match(/<link rel="canonical" href="(.*?)"/);
      const h1Matches = html.match(/<h1[\s>]/g) || [];
      const hasJsonLd = html.includes('application/ld+json');

      const title = titleMatch ? titleMatch[1] : '';
      const desc = descMatch ? descMatch[1] : '';
      const canonical = canonicalMatch ? canonicalMatch[1] : '';

      if (!title) errors.push(`Missing <title> on /${rel}/`);
      if (title.length > 62) warnings.push(`Long <title> (${title.length} chars) on /${rel}/: ${title}`);
      if (!desc) errors.push(`Missing meta description on /${rel}/`);
      if (!canonical || !canonical.startsWith('https://liumeitizhinan.biz/')) errors.push(`Invalid canonical on /${rel}/: ${canonical}`);
      if (h1Matches.length !== 1) errors.push(`Expected 1 H1, got ${h1Matches.length} on /${rel}/`);

      if (titles.has(title)) errors.push(`Duplicate title "${title}" on /${rel}/ and ${titles.get(title)}`);
      else titles.set(title, `/${rel}/`);

      if (descs.has(desc)) errors.push(`Duplicate description on /${rel}/ and ${descs.get(desc)}`);
      else descs.set(desc, `/${rel}/`);

      pages.push({ path: `/${rel ? rel + '/' : ''}`, title, canonical, h1Count: h1Matches.length, hasJsonLd });
    }
  }
}

if (fs.existsSync(DIST)) walk(DIST);

const report = [
  '# SEO 页面质量审计报告 (SEO-AUDIT-REPORT)',
  '',
  `生成时间：${new Date().toISOString()}`,
  `已扫描可索引页面数：${pages.length}`,
  `发现异常/冲突数：${errors.length}`,
  `标题超长警告数（>62 字符）：${warnings.length}`,
  '',
  ...(errors.length ? ['## 异常项', ...errors.map(e => `- ❌ ${e}`)] : ['## 审计结论', '- ✅ 全部可索引页面 Title 唯一、Description 唯一、H1 唯一、Canonical 正确指向 `https://liumeitizhinan.biz/`。']),
  ...(warnings.length ? ['', '## 长度优化提示', ...warnings.map(w => `- ⚠️ ${w}`)] : []),
  '',
  '## 页面抽样清单（前 30 页）',
  '| 页面路径 | H1 数 | JSON-LD | Canonical |',
  '|---|---|---|---|',
  ...pages.slice(0, 30).map(p => `| \`${p.path}\` | ${p.h1Count} | ${p.hasJsonLd ? 'Yes' : 'No'} | ${p.canonical} |`)
].join('\n');

fs.writeFileSync(path.join(ROOT, 'reports/SEO-AUDIT-REPORT.md'), report, 'utf-8');
console.log(`SEO Audit: ${pages.length} pages scanned, ${errors.length} errors, ${warnings.length} title warnings.`);
if (errors.length) {
  console.error(errors.slice(0, 10).join('\n'));
  process.exit(1);
}
