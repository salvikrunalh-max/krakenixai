import { SectionHeading } from "./section-heading";
import { CtaButton } from "./cta-button";
import { FadeIn } from "./fade-in";
import { FOUNDER_SMS_HREF } from "@/lib/brand";

const BULLETS = [
  "Custom AI agent orchestration",
  "Bespoke software & mobile applications",
  "ERP / CRM & back-office system integration",
  "Secure automation for enterprise operations",
];

export function EnterpriseCta() {
  return (
    <section id="enterprise" className="section-compact relative">
      <div className="section-glow section-glow-cyan" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Enterprise & custom builds"
          title="Custom AI agents, software & back-office systems"
          description="Serving Ardmore, OK · Southern Oklahoma · North Texas. On-site and remote delivery for organizations that need more than a template."
          accent="gold"
        />

        <FadeIn>
          <div className="glass-card-purple card-compact">
            <p className="text-sm text-muted-light leading-relaxed mb-4">
              Large corporations and enterprise teams: contact us for custom AI agents,
              proprietary software, applications, and full back-office system architecture —
              engineered by the same team that powers our 15-second local business automations.
            </p>

            <ul className="grid sm:grid-cols-2 gap-2 mb-6">
              {BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-light">
                  <svg
                    className="w-4 h-4 text-purple-300 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <CtaButton href="#contact?intent=enterprise" size="md">
                Contact for Enterprise
              </CtaButton>
              <a href={FOUNDER_SMS_HREF} className="btn-outline rounded-full px-6 py-3 text-sm font-semibold text-center">
                Text
              </a>
              <CtaButton href="#booking" variant="outline" size="md">
                Book Call
              </CtaButton>
            </div>

            <p className="text-xs text-muted-light mt-4 text-center sm:text-left">
              Based in Ardmore, OK — serving Southern Oklahoma &amp; North Texas
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
