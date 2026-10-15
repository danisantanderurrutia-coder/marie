#!/usr/bin/env node
// Lists i18n keys that are missing or identical-to-English across de / es / en.
// Usage: npm run i18n:check   (exit code 1 if any key is missing)
// Builds a merged view the same way src/i18n/index.js does, without Vite.

import { readdirSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const LANGS = ['de', 'es', 'en'];
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const merge = (a, b) => { const o = { ...a }; for (const k of Object.keys(b)) o[k] = isObj(b[k]) && isObj(o[k]) ? merge(o[k], b[k]) : b[k]; return o; };

const legacy = (await import(pathToFileURL(join(root, 'data/translations.js')))).TRANSLATIONS;
const core = (await import(pathToFileURL(join(root, 'i18n/core.js')))).core;
const files = readdirSync(join(root, 'i18n/modules')).filter((f) => f.endsWith('.js')).sort();
const mods = [];
for (const f of files) mods.push((await import(pathToFileURL(join(root, 'i18n/modules', f)))).default);

const T = {};
for (const l of LANGS) { let m = merge(legacy[l] || {}, core[l] || {}); mods.forEach((x) => { if (x[l]) m = merge(m, x[l]); }); T[l] = m; }

const flat = (o, p = '', out = {}) => { for (const k of Object.keys(o)) { const v = o[k]; const q = p ? `${p}.${k}` : k; if (isObj(v)) flat(v, q, out); else out[q] = v; } return out; };
const F = Object.fromEntries(LANGS.map((l) => [l, flat(T[l])]));
const all = new Set(LANGS.flatMap((l) => Object.keys(F[l])));
let missing = 0;
console.log('Keys per language:', LANGS.map((l) => `${l}=${Object.keys(F[l]).length}`).join('  '));
for (const k of [...all].sort()) {
  const gone = LANGS.filter((l) => !(k in F[l]));
  if (gone.length) { missing++; console.log(`MISSING [${gone.join(',')}]  ${k}`); }
}
for (const l of ['de', 'es']) for (const k of Object.keys(F[l])) {
  const v = F[l][k];
  if (typeof v === 'string' && v.length > 14 && v === F.en[k]) console.log(`SAME-AS-EN [${l}]  ${k}`);
}
console.log(missing ? `\n${missing} key(s) missing.` : '\nAll keys present in de / es / en.');
process.exit(missing ? 1 : 0);
