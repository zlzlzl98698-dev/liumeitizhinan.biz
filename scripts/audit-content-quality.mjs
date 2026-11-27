import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'docs/.vitepress/dist');
const DOCS = path.join(ROOT, 'docs');

const errors = [];
const warnings = [];
const stats = {
  totalMarkdownFiles: 0,
  byTier: { home: 0, level1: 0, level2: 0, level3: 0, reviews: 0, compare: 0, brands: 0, legal: 0 },
  reviewsHanChars: {},
  comparisonsHanChars: {},
  level3HanChars: {}
};

function walkMd(dir, res = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory() && !['.vitepress', 'node_modules', 'public'].includes(ent.name)) walkMd(full, res);
    else if (ent.isFile() && ent.name.endsWith('.md')) res.push(full);
  }
  return res;
}

const level1Routes = new Set(['/recommend/', '/pricing/', '/brands/', '/vpn/', '/clients/', '/ai/', '/network/', '/guides/', '/troubleshooting/', '/risk/']);
const level2ClientRoutes = new Set(['/clients/windows/', '/clients/android/', '/clients/ios/', '/clients/macos/', '/clients/linux/', '/clients/openwrt/']);
const level2OtherRoutes = new Set([
  '/recommend/streaming/', '/recommend/ai-tools/', '/recommend/stable/', '/recommend/beginners/',
  '/pricing/budget/', '/pricing/billing-cycles/', '/pricing/pay-as-you-go/', '/pricing/rules/',
  '/vpn/vpn-vs-proxy/', '/vpn/platforms/',
  '/network/iepl-vs-iplc/', '/network/bgp-transit-vs-direct/', '/network/native-ip-vs-datacenter/', '/network/regions-and-metrics/',
  '/risk/avoid-pitfalls/', '/risk/account-and-refund/', '/risk/free-nodes-and-annual/', '/risk/alternatives/',
  '/compare/', '/tools/streaming-check/', '/reviews/'
]);
const legalRoutes = new Set(['/about/', '/editorial-standards/', '/disclosure/', '/corrections/']);

const mdFiles = walkMd(DOCS);
const seenTitles = new Map();
const seenH1s = new Map();

for (const file of mdFiles) {
  const rel = path.relative(DOCS, file).replace(/\\/g, '/');
  if (rel === '404.md') continue;
  stats.totalMarkdownFiles++;
  const raw = fs.readFileSync(file, 'utf-8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const fm = m ? m[1] : '';
  const body = m ? m[2] : raw;
  const hanCount = (body.match(/[\u4e00-\u9fff]/g) || []).length;

  let route = '/' + rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '/');
  if (route !== '/' && !route.endsWith('/')) route += '/';

  // Determine tier
  if (route === '/') stats.byTier.home++;
  else if (level1Routes.has(route)) stats.byTier.level1++;
  else if (level2ClientRoutes.has(route) || level2OtherRoutes.has(route)) stats.byTier.level2++;
  else if (route.startsWith('/reviews/')) {
    stats.byTier.reviews++;
    stats.reviewsHanChars[route] = hanCount;
  } else if (route.startsWith('/compare/')) {
    stats.byTier.compare++;
    stats.comparisonsHanChars[route] = hanCount;
  } else if (route.startsWith('/brands/')) {
    stats.byTier.brands++;
  } else if (legalRoutes.has(route)) {
    stats.byTier.legal++;
  } else {
    stats.byTier.level3++;
    stats.level3HanChars[route] = hanCount;
  }

  // Check duplicate title / H1
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/^"|"$/g, '').trim() : '';
  if (title) {
    if (seenTitles.has(title)) errors.push(`Duplicate title "${title}" on ${route} and ${seenTitles.get(title)}`);
    else seenTitles.set(title, route);
  } else if (route !== '/') {
    errors.push(`Missing frontmatter title on ${route}`);
  }

  const h1Match = body.match(/^#\s+(.+)$/m);
  const h1 = h1Match ? h1Match[1].trim() : '';
  if (h1) {
    if (seenH1s.has(h1)) errors.push(`Duplicate H1 "${h1}" on ${route} and ${seenH1s.get(h1)}`);
    else seenH1s.set(h1, route);
  }

  // Check length targets cleanly by editorial tier
  if (route === '/reviews/guangsu/' && hanCount < 9000) {
    warnings.push(`Flagship review /reviews/guangsu/ has ${hanCount} Han chars (< 9000 target)`);
  } else if (route.startsWith('/reviews/') && route !== '/reviews/' && route !== '/reviews/guangsu/' && hanCount < 1500) {
    warnings.push(`Review page ${route} has ${hanCount} Han chars (< 1500 sparse-source minimum)`);
  }
  if (route.startsWith('/compare/') && route !== '/compare/' && hanCount < 1100) {
    warnings.push(`Comparison page ${route} has ${hanCount} Han chars (< 1100 minimum)`);
  }
  // Check FAQ schema vs visible FaqBlock (home renders faqs inside HomeHub)
  if (/^faqs:/m.test(fm) && route !== '/' && !body.includes('<FaqBlock')) {
    errors.push(`Frontmatter has faqs: without visible <FaqBlock> on ${route}`);
  }
}

// Check keyword cannibalization in article-keyword-map.json
const kwPath = path.join(ROOT, 'data/keywords/article-keyword-map.json');
if (fs.existsSync(kwPath)) {
  const kwData = JSON.parse(fs.readFileSync(kwPath, 'utf-8'));
  const pkMap = new Map();
  for (const t of kwData.tasks) {
    if (t.contentStatus === 'backlog_planned') continue;
    const pk = t.primaryKeyword.toLowerCase();
    if (pkMap.has(pk)) {
      errors.push(`Primary keyword cannibalization "${t.primaryKeyword}" between ${t.targetUrl} and ${pkMap.get(pk)}`);
    } else {
      pkMap.set(pk, t.targetUrl);
    }
    const mdTarget = path.join(DOCS, t.targetUrl.replace(/^\//, ''), 'index.md');
    if (!fs.existsSync(mdTarget)) {
      errors.push(`Live keyword task ${t.id} points to missing markdown file: ${mdTarget}`);
    }
  }
}

// Check orphan routes in dist/ (exclude /404/ and /)
if (fs.existsSync(DIST)) {
  const distRoutes = new Set();
  const inboundCount = new Map();
  function scanHtml(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) scanHtml(full);
      else if (ent.isFile() && ent.name === 'index.html') {
        const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
        const r = rel ? `/${rel}/` : '/';
        distRoutes.add(r);
        inboundCount.set(r, 0);
      }
    }
  }
  scanHtml(DIST);

  function countInbound(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) countInbound(full);
      else if (ent.isFile() && ent.name === 'index.html') {
        const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
        const selfRoute = rel ? `/${rel}/` : '/';
        const html = fs.readFileSync(full, 'utf-8');
        for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
          let href = m[1];
          if (!href.endsWith('/')) href += '/';
          if (href !== selfRoute && inboundCount.has(href)) {
            inboundCount.set(href, inboundCount.get(href) + 1);
          }
        }
      }
    }
  }
  countInbound(DIST);

  for (const [r, cnt] of inboundCount.entries()) {
    if (r !== '/' && r !== '/404/' && cnt === 0) {
      errors.push(`Orphan page detected (0 inbound internal links): ${r}`);
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'reports/content-quality-metrics.json'), JSON.stringify({ generatedAt: new Date().toISOString(), stats, errors, warnings }, null, 2), 'utf-8');
console.log(`Content Quality Audit: ${stats.totalMarkdownFiles} markdown files checked. Errors: ${errors.length}, Warnings: ${warnings.length}`);
if (warnings.length) console.log('Warnings:', warnings.slice(0, 10));
if (errors.length) {
  console.error('Errors:', errors.slice(0, 15));
  process.exit(1);
}
