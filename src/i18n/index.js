// src/i18n/index.js
// Single entry point for all strings.
//   - src/data/translations.js  -> legacy strings (kept as-is)
//   - src/i18n/core.js          -> shared nav / common / safety / privacy (overrides legacy where keys collide)
//   - src/i18n/modules/*.js     -> one file per feature, each `export default { de, es, en }`
// Adding a language = adding one key to each file; `npm run i18n:check` lists what is missing.

import { TRANSLATIONS as LEGACY } from '../data/translations';
import { core } from './core';

export const LANGS = ['de', 'es', 'en'];

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);

export function mergeDeep(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    out[key] = isObj(source[key]) && isObj(out[key]) ? mergeDeep(out[key], source[key]) : source[key];
  }
  return out;
}

const moduleFiles = import.meta.glob('./modules/*.js', { eager: true });

export const TRANSLATIONS = LANGS.reduce((acc, lang) => {
  let merged = mergeDeep(LEGACY[lang] || {}, core[lang] || {});
  Object.keys(moduleFiles).sort().forEach((path) => {
    const mod = moduleFiles[path].default;
    if (mod && mod[lang]) merged = mergeDeep(merged, mod[lang]);
  });
  acc[lang] = merged;
  return acc;
}, {});
