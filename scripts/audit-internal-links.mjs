import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'docs/.vitepress/dist');

const existingRoutes = new Set(['/']);
function collectRoutes(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collectRoutes(full);
    else if (ent.isFile() && ent.name === 'index.html') {
      const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
      existingRoutes.add(rel ? `/${rel}/` : '/');
    }
  }
}

if (fs.existsSync(DIST)) collectRoutes(DIST);

const broken = [];
let totalLinks = 0;

function checkLinks(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) checkLinks(full);
    else if (ent.isFile() && ent.name === 'index.html') {
      const html = fs.readFileSync(full, 'utf-8');
      const localLeaks = html.match(/(?:file:\/\/\/|[a-zA-Z]:[\/\\]Users[\/\\])[^"'<>\s)]+/gi);
      if (localLeaks) {
        broken.push({ page: path.relative(DIST, full), href: `LOCAL_PATH_LEAK: ${localLeaks[0]}` });
      }
      const matches = [...html.matchAll(/href="(\/[^"#?]*)"/g)];
      for (const m of matches) {
        const href = m[1];
        if (href.startsWith('/assets/') || href.startsWith('/icons/') || href.startsWith('/logos/') || href.startsWith('/reports/') || href === '/rss.xml' || href === '/sitemap.xml' || href === '/404.html') continue;
        totalLinks++;
        const normalized = href.endsWith('/') ? href : `${href}/`;
        if (!existingRoutes.has(normalized) && !fs.existsSync(path.join(DIST, href.replace(/^\//, '')))) {
          broken.push({ page: path.relative(DIST, full), href });
        }
      }
    }
  }
}

if (fs.existsSync(DIST)) checkLinks(DIST);

console.log(`Internal Links Audit: ${totalLinks} internal links checked across ${existingRoutes.size} routes. Broken: ${broken.length}`);
if (broken.length) {
  console.error(broken.slice(0, 15));
  process.exit(1);
}
