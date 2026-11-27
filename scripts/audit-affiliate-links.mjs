import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const { links } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/affiliate-links.json'), 'utf-8'));

const lines = [
  '# 品牌推广链接审计报告 (AFFILIATE-LINKS-AUDIT)',
  '',
  `生成时间：${new Date().toISOString()}`,
  `品牌总数：${links.length}`,
  '',
  '| 品牌 | Slug | 推广链接 | 优惠码 | rel 属性 | 异常/冲突 |',
  '|---|---|---|---|---|---|',
  ...links.map(l => `| ${l.brandName} | \`${l.slug}\` | ${l.affiliateUrl || '无（纯档案）'} | ${l.couponCodes.join(', ') || '未核实/无'} | \`${l.rel}\` | ${l.hasUrlConflict ? '⚠️ URL/Code 冲突或缺少 #/' : '正常'} |`)
];

// Also scan docs/ for any hardcoded external affiliate domains not coming from data/brands.json
const docsDir = path.join(ROOT, 'docs');
const hardcodedHits = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== 'dist' && ent.name !== 'node_modules') walk(full);
    else if (ent.isFile() && /\.(md|vue|ts|mts)$/.test(ent.name)) {
      const content = fs.readFileSync(full, 'utf-8');
      if (/aff\.com|aff\.cc|civetnet\.com|xiaomingtg\.com|xingdaomeng\.com/.test(content)) {
        hardcodedHits.push(path.relative(ROOT, full));
      }
    }
  }
}
walk(docsDir);

lines.push('', `## Markdown/组件硬编码推广链接扫描`, `命中数量：${hardcodedHits.length}`);
if (hardcodedHits.length) {
  lines.push(...hardcodedHits.map(h => `- ⚠️ ${h}`));
}

fs.writeFileSync(path.join(ROOT, 'reports/AFFILIATE-LINKS-AUDIT.md'), lines.join('\n'), 'utf-8');
console.log(`Affiliate audit complete. Hardcoded hits in docs/: ${hardcodedHits.length}`);
