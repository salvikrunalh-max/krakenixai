export type LostLeadsPresetId =
  | "home-services"
  | "medical-wellness"
  | "professional-legal"
  | "automotive"
  | "personal-care"
  | "food-hospitality";

export type LostLeadsPreset = {
  id: LostLeadsPresetId;
  label: string;
  icon: string;
  leadsPerWeek: number;
  avgJobValue: number;
  responseMinutes: number;
  insight: string;
};

/** Lead-to-booking capture rate by average response time (industry benchmarks). */
export function captureRateFromMinutes(minutes: number): number {
  if (minutes <= 0.25) return 0.82;
  if (minutes <= 1) return 0.78;
  if (minutes <= 5) return 0.58;
  if (minutes <= 15) return 0.42;
  if (minutes <= 30) return 0.28;
  if (minutes <= 60) return 0.18;
  if (minutes <= 240) return 0.1;
  return 0.06;
}

export const KRAKENIX_RESPONSE_MINUTES = 0.25;

export const LOST_LEADS_PRESETS: LostLeadsPreset[] = [
  {
    id: "home-services",
    label: "Home Services & Skilled Trades",
    icon: "🔧",
    leadsPerWeek: 11,
    avgJobValue: 485,
    responseMinutes: 95,
    insight:
      "HVAC, plumbing, and electrical shops average 90+ minutes to callback while crews are on job sites. Emergency calls and $400+ estimate requests go to whoever texts back first — roughly 4 in 10 never hear back.",
  },
  {
    id: "medical-wellness",
    label: "Medical & Wellness Clinics",
    icon: "🏥",
    leadsPerWeek: 16,
    avgJobValue: 285,
    responseMinutes: 35,
    insight:
      "Dental, chiro, med-spa, and wellness clinics see 35% of new-patient inquiries after hours. A next-morning reply loses an estimated 1 in 3 high-value cosmetic, implant, and membership leads.",
  },
  {
    id: "professional-legal",
    label: "Professional & Legal Services",
    icon: "⚖️",
    leadsPerWeek: 8,
    avgJobValue: 1200,
    responseMinutes: 180,
    insight:
      "Law, accounting, and insurance firms often reply 2–4 hours later between client work. Consultation requests over $1,000 in lifetime value go cold fast — 67% of prospects hire the first firm that responds.",
  },
  {
    id: "automotive",
    label: "Automotive & Transportation",
    icon: "🚗",
    leadsPerWeek: 13,
    avgJobValue: 420,
    responseMinutes: 55,
    insight:
      "Dealers and repair shops miss lot walk-ins and service calls during peak bay hours. Leads waiting 45–60 minutes for a callback convert at half the rate of a sub-5-minute text or call-back.",
  },
  {
    id: "personal-care",
    label: "Personal Care & Beauty",
    icon: "💇",
    leadsPerWeek: 15,
    avgJobValue: 88,
    responseMinutes: 40,
    insight:
      "Salons, spas, and barbers get booking DMs and form fills evenings and weekends while staff are with clients. Slow replies cost ~38% of appointment requests to a competitor with online booking.",
  },
  {
    id: "food-hospitality",
    label: "Food & Local Hospitality",
    icon: "🍽️",
    leadsPerWeek: 22,
    avgJobValue: 165,
    responseMinutes: 28,
    insight:
      "Restaurants and venues field catering, private-party, and reservation requests during the dinner rush. A 25–30 minute delay on a $150+ table or event inquiry typically means the guest already booked elsewhere.",
  },
];

export function calculateLostRevenue(
  leadsPerWeek: number,
  avgJobValue: number,
  responseMinutes: number
) {
  const weeksPerMonth = 4.33;
  const monthlyLeads = leadsPerWeek * weeksPerMonth;
  const grossPipeline = monthlyLeads * avgJobValue;

  const currentCapture = captureRateFromMinutes(responseMinutes);
  const novaCapture = captureRateFromMinutes(KRAKENIX_RESPONSE_MINUTES);

  const currentRevenue = grossPipeline * currentCapture;
  const potentialRevenue = grossPipeline * novaCapture;
  const monthlyLost = Math.max(0, potentialRevenue - currentRevenue);
  const annualLost = monthlyLost * 12;
  const leadsLostMonthly = Math.round(monthlyLeads * (novaCapture - currentCapture));

  return {
    monthlyLost,
    annualLost,
    currentCapture,
    novaCapture,
    currentRevenue,
    potentialRevenue,
    leadsLostMonthly,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const CHAT_BOT_OFFER = {
  title: "Website Chat Bot",
  setupFrom: 350,
  monthlyFrom: 49,
  description:
    "AI chat on your site — qualifies visitors, books appointments, and hands hot leads to your team 24/7.",
};
