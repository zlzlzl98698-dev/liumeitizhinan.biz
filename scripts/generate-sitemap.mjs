import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'docs/.vitepress/dist');
const SITE_URL = 'https://liumeitizhinan.biz';

const urls = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && ent.name === 'index.html') {
      const relDir = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
      const html = fs.readFileSync(full, 'utf-8');
      if (html.includes('name="robots" content="noindex')) continue;
      const url = relDir === '' ? `${SITE_URL}/` : `${SITE_URL}/${relDir}/`;
      urls.push(url);
    }
  }
}

if (fs.existsSync(DIST)) walk(DIST);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.sort().map(u => `  <url><loc>${u}</loc><lastmod>2026-11-27</lastmod></url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf-8');
console.log(`Verified & wrote dist/sitemap.xml with ${urls.length} indexable canonical URLs.`);
