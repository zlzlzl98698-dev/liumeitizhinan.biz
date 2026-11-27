import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/keyword-database.json'), 'utf-8'));
const clusterData = JSON.parse(fs.readFileSync(path.join(ROOT, 'reports/keyword-clusters.json'), 'utf-8'));

const report = [
  '# 关键词机会与内容缺口周报',
  '',
  `生成时间：${new Date().toISOString()}`,
  `总关键词数：${db.totalKeywords}`,
  `内容互抢检测冲突：${clusterData.cannibalizationConflicts.length}`,
  '',
  '## 专题集群分布',
  ...Object.entries(clusterData.clusters).map(([k, v]) => `- \`${k}\`: ${v} 词`),
  '',
  '## 搜索意图分布',
  ...Object.entries(clusterData.intentBuckets).map(([k, v]) => `- \`${k}\`: ${v} 词`),
  '',
  '## 待接入外部数据源',
  '- Google Search Console 导出 CSV (`data/gsc-import.csv`)',
  '- Bing Webmaster Tools 导出 CSV (`data/bing-import.csv`)'
].join('\n');

fs.writeFileSync(path.join(ROOT, 'reports/KEYWORD-OPPORTUNITY-REPORT.md'), report, 'utf-8');
console.log('Generated reports/KEYWORD-OPPORTUNITY-REPORT.md');
