#!/usr/bin/env node
/**
 * i18n validation — guards the project's most common bug class:
 * missing / mismatched translation keys across locales (see known-issues.md #6).
 *
 * Checks:
 *   1. Key parity — every locale (th, de) has the exact same key set as en.
 *   2. Source references — every static t('...') key used in src/ exists in en.
 *   3. Empty values — no translation resolves to an empty string.
 *
 * Run with: npm run validate
 * Exits non-zero on any failure so it can gate CI / pre-commit.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const locales = ['en', 'th', 'de'];

const data = {};
for (const l of locales) {
  data[l] = JSON.parse(fs.readFileSync(path.join(root, `src/locales/${l}/translation.json`), 'utf8'));
}

/** Flatten nested objects AND arrays into dotted keys (arrays → `key.0`, `key.1`, ...). */
function flatten(obj, prefix = '', out = {}) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => flatten(v, prefix ? `${prefix}.${i}` : String(i), out));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out[prefix] = obj;
  }
  return out;
}

const flat = {};
for (const l of locales) flat[l] = flatten(data[l]);

let failures = 0;
const fail = (msg) => { console.error('  ✗', msg); failures++; };

// 1. Key parity across locales (en is the reference)
console.log('1. Key parity (vs en)');
const enKeys = new Set(Object.keys(flat.en));
for (const l of ['th', 'de']) {
  const lKeys = new Set(Object.keys(flat[l]));
  for (const k of enKeys) if (!lKeys.has(k)) fail(`[${l}] missing key: ${k}`);
  for (const k of lKeys) if (!enKeys.has(k)) fail(`[${l}] extra key: ${k}`);
}
if (!failures) console.log('   ✓ all 3 locales share identical key sets');

// 2. Static t('...') references that must exist in en
console.log('2. Source key references');
const before = failures;
const srcFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?)$/.test(e.name)) srcFiles.push(p);
  }
})(path.join(root, 'src'));

const refRe = /\bt\(\s*['"`]([^'"`]+)['"`]/g;
const referenced = new Set();
for (const f of srcFiles) {
  const txt = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = refRe.exec(txt))) referenced.add(m[1]);
}
// Skip dynamic keys built via template interpolation — can't be statically verified.
const staticRefs = [...referenced].filter((k) => !k.includes('${'));
for (const k of staticRefs.sort()) {
  if (!(k in flat.en)) fail(`referenced in source but missing in en: ${k}`);
}
if (failures === before) console.log(`   ✓ all ${staticRefs.length} static t() keys exist in en`);

// 3. Empty string values
console.log('3. Empty values');
const before3 = failures;
for (const l of locales) {
  for (const [k, v] of Object.entries(flat[l])) {
    if (v === '') fail(`[${l}] empty value: ${k}`);
  }
}
if (failures === before3) console.log('   ✓ no empty string values');

console.log('');
if (failures) {
  console.error(`i18n validation FAILED with ${failures} issue(s).`);
  process.exit(1);
}
console.log('i18n validation PASSED.');
