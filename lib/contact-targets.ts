import { FOUNDER_EMAIL, FOUNDER_NAME } from "@/lib/brand";

export type ContactTargetId = "founder" | "natasha";

export type ContactTarget = {
  id: ContactTargetId;
  label: string;
  role: string;
  email: string;
  phone?: string;
  interest: string;
};

export const FOUNDER_TARGET: ContactTarget = {
  id: "founder",
  label: FOUNDER_NAME,
  role: "Founder & Lead Architect",
  email: FOUNDER_EMAIL,
  phone: "9188403501",
  interest: "General / fastest response",
};

export const SPECIALIST_TARGETS: ContactTarget[] = [
  {
    id: "natasha",
    label: "Natasha McGee",
    role: "Manager & Sales Lead",
    email: FOUNDER_EMAIL,
    interest: "Sales & pricing",
  },
  {
    id: "founder",
    label: FOUNDER_NAME,
    role: "Founder & Lead Architect",
    email: FOUNDER_EMAIL,
    phone: "9188403501",
    interest: "Enterprise / custom builds",
  },
];

export function getContactTarget(id: string): ContactTarget | undefined {
  if (id === "founder") return FOUNDER_TARGET;
  return SPECIALIST_TARGETS.find((t) => t.id === id);
}
