/** Pricing sanity check — run via: node scripts/verify-pricing.mjs */

const BASE = 500;
const ADDONS = { voice: 600, crm: 400, sms: 350, payments: 300 };
const FULL_RAW = BASE + Object.values(ADDONS).reduce((a, b) => a + b, 0);
const FULL_DISCOUNTED = 1800;

const checks = [
  ["baseline only", new Set(), BASE],
  ["voice only", new Set(["voice"]), BASE + 600],
  ["all addons discounted", new Set(Object.keys(ADDONS)), FULL_DISCOUNTED],
  ["full raw before discount", null, FULL_RAW],
];

function calc(selected) {
  if (selected === null) return FULL_RAW;
  let total = BASE;
  for (const id of selected) total += ADDONS[id];
  const all = selected.size === Object.keys(ADDONS).length;
  if (all) total = FULL_DISCOUNTED;
  return total;
}

let failed = 0;
for (const [label, sel, expected] of checks) {
  const got = calc(sel);
  if (got !== expected) {
    console.error(`FAIL ${label}: expected ${expected}, got ${got}`);
    failed++;
  } else {
    console.log(`OK   ${label}: $${got}`);
  }
}

if (FULL_RAW !== 2150) {
  console.error(`FAIL full stack raw should be 2150, got ${FULL_RAW}`);
  failed++;
}

if (FULL_RAW - FULL_DISCOUNTED !== 350) {
  console.error(`FAIL discount should be $350`);
  failed++;
}

process.exit(failed > 0 ? 1 : 0);
