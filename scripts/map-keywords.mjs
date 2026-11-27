import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/keyword-database.json'), 'utf-8'));
const gaps = db.keywords.filter(k => !k.existingPage || k.contentStatus === 'gap');
console.log(`Mapped ${db.keywords.length} keywords. Content gaps remaining: ${gaps.length}`);
