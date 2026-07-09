export type ContactTargetId =
  | "founder"
  | "natasha"
  | "alex"
  | "elena"
  | "marcus";

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
  label: "Krunal H Salvi",
  role: "Founder & Lead Architect",
  email: "krunal@krakenix.ai",
  phone: "9188403501",
  interest: "General / fastest response",
};

export const SPECIALIST_TARGETS: ContactTarget[] = [
  {
    id: "natasha",
    label: "Natasha",
    role: "Manager & Sales Lead",
    email: "natasha@krakenix.ai",
    interest: "Sales & pricing",
  },
  {
    id: "alex",
    label: "Alex Rivera",
    role: "Systems Engineer",
    email: "alex@krakenix.ai",
    interest: "Voice AI & infrastructure",
  },
  {
    id: "elena",
    label: "Elena Morales",
    role: "Client Success Lead",
    email: "elena@krakenix.ai",
    interest: "Onboarding & CRM",
  },
  {
    id: "marcus",
    label: "Marcus Chen",
    role: "Automation Specialist",
    email: "marcus@krakenix.ai",
    interest: "Automation & workflows",
  },
  {
    id: "founder",
    label: "Krunal H Salvi",
    role: "Founder & Lead Architect",
    email: "krunal@krakenix.ai",
    phone: "9188403501",
    interest: "Enterprise / custom builds",
  },
];

export function getContactTarget(id: string): ContactTarget | undefined {
  if (id === "founder") return FOUNDER_TARGET;
  return SPECIALIST_TARGETS.find((t) => t.id === id);
}
