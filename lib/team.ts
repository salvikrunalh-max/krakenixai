import { FOUNDER_EMAIL } from "@/lib/brand";

export const TEAM = [
  {
    id: "founder",
    displayName: "Krunal H. Salvi",
    name: "Krunal H. Salvi",
    role: "Founder & Lead Architect",
    email: FOUNDER_EMAIL,
    phone: "918-840-3501",
    specialty: "Vision, system architecture, client partnerships",
    stat: "Founder",
    featured: true,
    hidePersonalName: false,
    showEmail: true,
    icon: "◆",
  },
  {
    id: "natasha",
    displayName: "Natasha McGee",
    name: "Natasha McGee",
    role: "Manager & Sales Lead",
    email: FOUNDER_EMAIL,
    phone: undefined,
    specialty: "Client relationships, sales, project management",
    stat: "Your main point of contact",
    featured: false,
    hidePersonalName: false,
    showEmail: true,
    icon: "★",
  },
] as const;
