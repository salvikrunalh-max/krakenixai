import { SectionHeading } from "./section-heading";
import { CtaButton } from "./cta-button";

const WINS = [
  {
    title: "Team Leadership & Revenue Acceleration",
    metric: "20–35%",
    metricLabel: "revenue growth",
    body: "Led 160+ person operations teams to exceed sales and service targets, delivering 20-35% revenue growth and 25%+ customer satisfaction increases while slashing response delays through disciplined systems and data-driven execution.",
  },
  {
    title: "Process Automation & Efficiency Gains",
    metric: "15%",
    metricLabel: "error & cost cut",
    body: "Implemented new procedures and technologies that streamlined daily operations, reduced errors by 15%, and cut operational costs by 15% — freeing teams to focus on high-value work instead of chasing leads or manual tasks.",
  },
  {
    title: "Customer Response & Retention Mastery",
    metric: "95%",
    metricLabel: "satisfaction",
    body: "Drove live chat and social support excellence (Salesforce/Avergent expertise), maintaining 95% satisfaction ratings while identifying upselling opportunities and resolving 50+ inquiries daily — turning slow responses into instant closes and loyal clients.",
  },
] as const;

export function EarlyOperatorWins() {
  return (
    <section id="operator-wins" className="section-compact relative">
      <div className="section-glow section-glow-cyan" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Beta results"
          title="Early Operator Wins"
          description="Proven in the trenches. Built for yours."
          accent="gold"
        />

        <ul className="space-y-3 md:space-y-4 mb-5 md:mb-6">
          {WINS.map((win) => (
            <li
              key={win.title}
              className="glass-card-emerald card-compact flex flex-col sm:flex-row gap-3 sm:gap-5 items-start"
            >
              <div className="shrink-0 rounded-xl border border-emerald/35 bg-emerald/10 px-3 py-2.5 text-center min-w-[5.5rem] sm:min-w-[6.5rem]">
                <p className="text-xl sm:text-2xl font-extrabold text-emerald tabular-nums leading-none">
                  {win.metric}
                </p>
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-wider text-emerald/80 font-semibold mt-1">
                  {win.metricLabel}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5 leading-snug">
                  {win.title}
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">{win.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-light text-center max-w-3xl mx-auto mb-5 md:mb-6 leading-relaxed">
          These results come from real high-volume service environments — the same realities
          KrakenIX now automates at scale for beauty, trades, medical, auto, and food operators
          across Southern Oklahoma &amp; North Texas.
        </p>

        <div className="text-center">
          <CtaButton href="#contact?intent=foundational" size="md">
            Ready for your wins? Claim a Foundational Slot.
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
