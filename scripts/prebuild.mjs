import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('[prebuild] Running brand & affiliate audits...');
execSync('node scripts/audit-brands.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-conflicts.mjs', { stdio: 'inherit' });
execSync('node scripts/audit-affiliate-links.mjs', { stdio: 'inherit' });
console.log('[prebuild] Pre-build checks passed.');
