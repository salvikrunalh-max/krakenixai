import Link from "next/link";
import { CtaButton } from "./cta-button";
import { BrandMark, BrandName } from "./brand-logo";
import {
  BRAND_NAME,
  BRAND_RELAY,
  BOOKING_HREF,
  FOUNDER_NAME,
  FOUNDER_TITLE,
  FOUNDER_SMS_HREF,
} from "@/lib/brand";

const SOLUTIONS = [
  { href: "#industries", label: "Industries" },
  { href: "#systems", label: "Systems" },
  { href: "#live-test", label: "Live Demo" },
  { href: "#calculator", label: "Calculator" },
];

const COMPANY = [
  { href: "#team", label: "Team" },
  { href: "#enterprise", label: "Enterprise" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-cyan/25 bg-[rgba(2,8,24,0.96)] backdrop-blur-xl py-10 sm:py-14 pb-24 sm:pb-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card-gold card-compact text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            Every minute you wait, a competitor responds.
          </h2>
          <p className="text-muted-light text-base mb-5 max-w-xl mx-auto">
            Lock in your foundational slot before the cohort fills. Text us or book a strategy call.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a href={FOUNDER_SMS_HREF} className="btn-outline rounded-full px-6 py-3 text-sm font-semibold">
              Text
            </a>
            <CtaButton href={BOOKING_HREF} size="md">
              Book Call
            </CtaButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <BrandMark size="sm" />
              <BrandName className="text-base text-foreground" />
            </div>
            <p className="text-sm text-muted-light leading-relaxed">
              Autonomous lead response &amp; custom AI systems for local businesses and enterprise.
            </p>
            <p className="text-sm text-foreground font-medium mt-3">
              {FOUNDER_NAME}
            </p>
            <p className="text-sm text-cyan-bright">{FOUNDER_TITLE}</p>
            <p className="text-sm text-cyan-bright/80 mt-2">Ardmore, OK · Southern OK &amp; North TX</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-2">
              {SOLUTIONS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-light hover:text-cyan-bright transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-light hover:text-cyan-bright transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Get in touch
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#contact" className="text-muted-light hover:text-cyan-bright transition-colors">
                  Contact Form
                </Link>
              </li>
              <li className="pt-1 text-muted-light">Ardmore, Oklahoma</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted-light">
          {[
            "15-second response guarantee",
            "Encrypted relay routing",
            "No lock-in",
            "TCPA compliant",
            `Secured via ${BRAND_RELAY}`,
          ].map((signal) => (
            <span key={signal} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-cyan shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {signal}
            </span>
          ))}
        </div>

        <div className="border-t border-cyan/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-light">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. {FOUNDER_NAME}, {FOUNDER_TITLE}.
          </p>
          <p>Secured via {BRAND_RELAY} · Encrypted routing</p>
        </div>
      </div>
    </footer>
  );
}
