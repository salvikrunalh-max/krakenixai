import type { AddonId } from "./pricing";

const STORAGE_KEY = "krakenix-calculator";

export type CalculatorSelection = {
  addons: AddonId[];
  total: number;
};

export function saveCalculatorSelection(selection: CalculatorSelection) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
}

export function loadCalculatorSelection(): CalculatorSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorSelection;
  } catch {
    return null;
  }
}
