import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'docs/.vitepress/dist');
const SITE_URL = 'https://liumeitizhinan.biz';

const items = [];
function walkHtml(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(full);
    else if (ent.isFile() && ent.name === 'index.html') {
      const rel = path.relative(DIST, path.dirname(full)).replace(/\\/g, '/');
      if (rel === '' || rel.startsWith('assets')) continue;
      const html = fs.readFileSync(full, 'utf-8');
      if (html.includes('noindex')) continue;
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="(.*?)"/);
      const url = `${SITE_URL}/${rel}/`;
      items.push({
        title: (titleMatch ? titleMatch[1] : rel).replace(/&/g, '&amp;').replace(/</g, '&lt;'),
        description: (descMatch ? descMatch[1] : '').replace(/&/g, '&amp;').replace(/</g, '&lt;'),
        link: url,
        pubDate: new Date('2026-11-27T12:00:00+08:00').toUTCString()
      });
    }
  }
}

if (fs.existsSync(DIST)) walkHtml(DIST);

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>流媒体指南 (liumeitizhinan.biz)</title>
    <link>${SITE_URL}/</link>
    <description>流媒体使用指南、AI 工具网络连接教程、客户端配置与机场品牌数据库</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items.slice(0, 50).map(it => `
    <item>
      <title>${it.title}</title>
      <link>${it.link}</link>
      <guid>${it.link}</guid>
      <pubDate>${it.pubDate}</pubDate>
      <description>${it.description}</description>
    </item>`).join('')}
  </channel>
</rss>`;

fs.writeFileSync(path.join(DIST, 'rss.xml'), rss.trim(), 'utf-8');
console.log(`Generated dist/rss.xml with ${Math.min(items.length, 50)} items.`);
