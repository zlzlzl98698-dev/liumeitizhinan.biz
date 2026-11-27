import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUB = path.join(ROOT, 'docs/public');
const brands = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/brands.json'), 'utf-8')).brands;

const missing = [];
for (const b of brands) {
  if (b.logo && !fs.existsSync(path.join(PUB, b.logo.replace(/^\//, '')))) {
    missing.push(`Missing logo: ${b.logo}`);
  }
  if (b.speedtest20260811?.image && !fs.existsSync(path.join(PUB, b.speedtest20260811.image.replace(/^\//, '')))) {
    missing.push(`Missing speedtest: ${b.speedtest20260811.image}`);
  }
  if (b.guangsu20260819Tests) {
    for (const t of b.guangsu20260819Tests) {
      if (!fs.existsSync(path.join(PUB, t.image.replace(/^\//, '')))) {
        missing.push(`Missing guangsu test image: ${t.image}`);
      }
    }
  }
}

console.log(`Image Assets Audit: checked all brand logos & evidence images. Missing: ${missing.length}`);
if (missing.length) {
  console.error(missing);
  process.exit(1);
}
