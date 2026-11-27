import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const { conflicts } = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/raw-conflicts.json'), 'utf-8'));

const md = [
  '# 数据冲突与待核实审计报告 (DATA-CONFLICTS)',
  '',
  `生成时间：${new Date().toISOString()}`,
  `总计发现数据冲突/需核实项：${conflicts.length} 项`,
  '',
  '| 品牌 | Slug | 冲突字段 | 来源 A | 来源 B | 处理原则 |',
  '|---|---|---|---|---|---|',
  ...conflicts.map(c => `| ${c.brandName} | \`${c.brandSlug}\` | ${c.field} | ${c.sourceA} | ${c.sourceB} | ${c.handling} |`)
].join('\n');

fs.writeFileSync(path.join(ROOT, 'reports/DATA-CONFLICTS.md'), md, 'utf-8');
console.log(`Generated reports/DATA-CONFLICTS.md with ${conflicts.length} conflicts.`);
