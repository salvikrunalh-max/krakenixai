import { ADDONS, BASE_PRICE, type AddonId, formatPrice } from "./pricing";

export function formatPackageNote(addons: AddonId[], total: number): string {
  const labels = addons.map((id) => ADDONS[id].label);
  const stack =
    labels.length === 0
      ? "Frontend baseline only"
      : labels.length === Object.keys(ADDONS).length
        ? "Full stack (foundational discount)"
        : labels.join(", ");
  return `${formatPrice(total)} — ${stack} (incl. ${formatPrice(BASE_PRICE)} baseline)`;
}
