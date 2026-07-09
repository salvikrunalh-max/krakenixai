import { SectionHeading } from "./section-heading";
import { CtaButton } from "./cta-button";
import { FadeIn } from "./fade-in";

const PACKAGES = [
  {
    name: "Frontend Baseline",
    tagline: "Ideal for small budgets.",
    price: 500,
    originalPrice: null,
    retainer: "No monthly retainer",
    popular: false,
    features: [
      "Professional, conversion-optimized frontend page",
      "Speed & mobile-first build",
      "No monthly retainer",
    ],
  },
  {
    name: "The Scale Pipeline",
    tagline: "Our most popular growth system.",
    price: 1500,
    originalPrice: 2000,
    retainer: "+$50–$200/mo retainer",
    popular: true,
    features: [
      "Everything in Frontend",
      "15-Sec Follow-up Engine",
      "Live Booking",
      "Database Reactivation",
      "CRM integrations",
      "Website Chat Bot (from $350)",
      "Automated Payments / Estimators",
    ],
  },
  {
    name: "The Elite AI Core",
    tagline: "Maximum autonomy & infrastructure.",
    price: 1800,
    originalPrice: 2500,
    retainer: "+$100–$200+/mo retainer",
    popular: false,
    features: [
      "Everything in Scale Pipeline",
      "Voice AI Assistants",
      "Website Chat Bot + live handoff",
      "Direct phone synthesis routing",
      "Custom cloud server infrastructure",
      "Ongoing maintenance",
    ],
  },
];

export function PricingPackages() {
  return (
    <section id="pricing" className="section-compact relative">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Packages"
          title="Transparent pricing. Engineered to scale."
        />

        <div className="section-panel">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 items-stretch">
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 60}>
              <div
                className={`relative card-compact flex flex-col h-full ${
                  pkg.popular
                    ? "glass-card-gold ring-1 ring-gold/30"
                    : "glass-card-cyan"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
                  <p className="text-sm text-muted-light">{pkg.tagline}</p>
                </div>

                <div className="mb-0.5 flex items-baseline gap-2">
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted line-through">
                      ${pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold tabular-nums">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-light mb-3">one-time setup</p>
                <p className="text-sm text-cyan-bright font-medium mb-4">{pkg.retainer}</p>

                <ul className="space-y-2.5 mb-5 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-light">
                      <svg className="w-3.5 h-3.5 text-leaf shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <CtaButton
                  href="#contact"
                  variant={pkg.popular ? "gold" : "outline"}
                  className="w-full"
                  size="sm"
                >
                  Get Started via Secure Relay
                </CtaButton>
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
