export const INDUSTRY_TICKER = [
  "Beauty Industry",
  "Food Services",
  "Construction & Trades",
  "Medical & Healthcare",
  "Automotive",
  "Home & Local Services",
  "Professional Services",
  "And more",
] as const;

export const INDUSTRIES = [
  {
    id: "beauty",
    name: "Beauty Industry",
    pain: "Appointments pile up while staff are with clients",
    solution: "Instant booking + SMS follow-up keeps chairs full",
    icon: "💅",
  },
  {
    id: "food-services",
    name: "Food Services",
    pain: "Calls during rush hours go unanswered",
    solution: "Automated reservations & waitlist while staff serves",
    icon: "🍽️",
  },
  {
    id: "construction-trades",
    name: "Construction & Trades",
    pain: "Estimate requests sit for hours on job sites",
    solution: "Live estimator + instant lead routing to your team",
    icon: "🏗️",
  },
  {
    id: "medical",
    name: "Medical & Healthcare",
    pain: "After-hours patient inquiries go missed",
    solution: "Voice AI + secure appointment booking around the clock",
    icon: "🏥",
  },
  {
    id: "automotive",
    name: "Automotive",
    pain: "Lot inquiries and service calls backlog",
    solution: "15-sec response + CRM sync for every lead",
    icon: "🚗",
  },
  {
    id: "home-local",
    name: "Home & Local Services",
    pain: "Dormant lead lists never get reactivated",
    solution: "Database reactivation turns old contacts into booked jobs",
    icon: "🏠",
  },
] as const;

export const INDUSTRY_OPTIONS = [
  ...INDUSTRIES.map((i) => ({
    value: i.id,
    label: i.name,
  })),
  { value: "other", label: "Other" },
];
