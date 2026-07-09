export const BASE_PRICE = 500;

export const ADDONS = {
  voice: { id: "voice", label: "Voice AI Automation", price: 600, description: "Inbound call handling & routing" },
  crm: { id: "crm", label: "CRM & n8n Workflows", price: 400, description: "Webhooks, sync, automations" },
  sms: { id: "sms", label: "Instant SMS/Email Engine", price: 350, description: "15-second lead response" },
  payments: { id: "payments", label: "Payment & Estimator Setup", price: 300, description: "Checkout & live quotes" },
} as const;

export type AddonId = keyof typeof ADDONS;

export const FULL_STACK_RAW = BASE_PRICE + Object.values(ADDONS).reduce((s, a) => s + a.price, 0);
export const FOUNDATIONAL_DISCOUNT = FULL_STACK_RAW - 1800;
export const FULL_STACK_PRICE = 1800;

export function calculatePrice(selected: Set<AddonId>) {
  const addonTotal = [...selected].reduce((sum, id) => sum + ADDONS[id].price, 0);
  const rawTotal = BASE_PRICE + addonTotal;
  const allSelected = selected.size === Object.keys(ADDONS).length;
  const discount = allSelected ? FOUNDATIONAL_DISCOUNT : 0;
  const total = rawTotal - discount;

  return { rawTotal, discount, total, allSelected };
}

export function formatPrice(amount: number) {
  return `$${amount.toLocaleString()}`;
}
