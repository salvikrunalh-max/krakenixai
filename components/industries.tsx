import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const CARD_VARIANTS = ["glass-card-cyan", "glass-card-emerald", "glass-card-amber"] as const;

export function Industries() {
  return (
    <section id="industries" className="section-compact relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Whatever you do, leads can't wait"
          description="Every local business that runs on calls and appointments — not just one niche."
        />

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {INDUSTRIES.map((industry, i) => (
            <FadeIn key={industry.id} delay={i * 60}>
              <div
                className={`${CARD_VARIANTS[i % CARD_VARIANTS.length]} card-compact h-full group`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0" aria-hidden>
                    {industry.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{industry.name}</h3>
                    <p className="text-xs text-muted mb-1.5">{industry.pain}</p>
                    <p className="text-sm text-cyan-bright/90 leading-snug">{industry.solution}</p>
                    <Link
                      href="#calculator"
                      className="inline-block mt-2 text-xs font-semibold text-gold hover:text-gold-hover transition-colors"
                    >
                      Build estimate →
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
