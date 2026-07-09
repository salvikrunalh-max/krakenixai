import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const TESTIMONIALS = [
  {
    quote: "We went from 45-minute response times to under 15 seconds. Booked 23 appointments in the first week.",
    role: "HVAC Contractor",
    location: "Texas",
    tag: "Construction & Trades",
  },
  {
    quote: "The voice AI handles after-hours calls better than our old receptionist. ROI in 11 days.",
    role: "Medical Practice",
    location: "Florida",
    tag: "Medical & Healthcare",
  },
  {
    quote: "Reactivated 340 dormant leads and closed 18 jobs without lifting a finger.",
    role: "Roofing Company",
    location: "Georgia",
    tag: "Home & Local Services",
  },
  {
    quote: "Client DMs used to sit for hours. Now appointments book while we're with customers.",
    role: "Beauty Business",
    location: "North Carolina",
    tag: "Beauty Industry",
  },
  {
    quote: "Reservation calls during rush hours? Handled. We focus on guests, not the phone.",
    role: "Restaurant Owner",
    location: "Arizona",
    tag: "Food Services",
  },
  {
    quote: "Lot inquiries used to pile up. 15-second response keeps sales moving.",
    role: "Auto Dealership",
    location: "Ohio",
    tag: "Automotive",
  },
];

export function SocialProof() {
  return (
    <section className="section-compact relative border-y border-cyan/8">
      <div className="section-glow section-glow-cyan" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Trusted by operators"
          title="Results that speak for themselves"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.role} delay={i * 40}>
              <div className="glass-card-emerald card-compact h-full transition-colors">
                <span className="text-xs uppercase tracking-wider text-cyan/80 font-medium">{t.tag}</span>
                <div className="flex gap-0.5 my-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-light leading-relaxed mb-2 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold text-foreground">{t.role}</p>
                <p className="text-xs text-muted-light">{t.location}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {["Twilio", "n8n", "Stripe", "Google Cloud", "Vercel"].map((brand) => (
            <span
              key={brand}
              className="text-xs font-medium tracking-wide text-muted border border-white/5 rounded-lg px-3 py-1.5 bg-white/[0.02]"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
