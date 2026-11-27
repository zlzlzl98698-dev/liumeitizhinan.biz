import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const { brands } = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/brands.json'), 'utf-8'));

const slugs = new Set();
const issues = [];

for (const b of brands) {
  if (!b.slug) issues.push(`Missing slug for ${b.brandName}`);
  if (slugs.has(b.slug)) issues.push(`Duplicate slug: ${b.slug}`);
  slugs.add(b.slug);
  if (!b.updatedAt || !b.verifiedAt) issues.push(`Missing timestamps for ${b.slug}`);
  if (!b.dataSources || b.dataSources.length === 0) issues.push(`Missing dataSources for ${b.slug}`);
}

console.log(`Audit Brands: ${brands.length} brands checked. Issues: ${issues.length}`);
if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
