import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('[postbuild] Generating RSS, llms-full, auditing SEO, links, images, and sitemap...');
execSync('node scripts/generate-rss.mjs', { stdio: 'inherit' });
execSync('node scripts/generate-sitemap.mjs', { stdio: 'inherit' });
execSync('node scripts/generate-llms.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-seo.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-internal-links.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-images.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-content-quality.mjs', { stdio: 'inherit' });
console.log('[postbuild] All post-build QA checks completed.');
