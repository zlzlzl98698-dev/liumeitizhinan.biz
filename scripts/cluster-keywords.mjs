import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/keyword-database.json'), 'utf-8'));

const clusters = {};
const intentBuckets = {};
const urlMap = {};
const conflicts = [];

for (const item of db.keywords) {
  clusters[item.contentCluster] = (clusters[item.contentCluster] || 0) + 1;
  intentBuckets[item.searchIntent] = (intentBuckets[item.searchIntent] || 0) + 1;
  if (item.targetUrl) {
    if (!urlMap[item.targetUrl]) urlMap[item.targetUrl] = [];
    urlMap[item.targetUrl].push(item.primaryKeyword);
  }
  const dup = db.keywords.filter(k => k.primaryKeyword === item.primaryKeyword && k.targetUrl !== item.targetUrl);
  if (dup.length > 0) {
    conflicts.push({ primaryKeyword: item.primaryKeyword, urls: [item.targetUrl, ...dup.map(d => d.targetUrl)] });
  }
}

fs.writeFileSync(path.join(ROOT, 'reports/keyword-clusters.json'), JSON.stringify({
  updatedAt: '2026-11-27',
  clusters,
  intentBuckets,
  cannibalizationConflicts: conflicts
}, null, 2), 'utf-8');

console.log(`Clustered ${db.keywords.length} keywords across ${Object.keys(clusters).length} clusters. Cannibalization conflicts: ${conflicts.length}`);
