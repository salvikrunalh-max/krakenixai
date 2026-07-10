import { CtaButton } from "./cta-button";
import { TestItLiveButton } from "./test-it-live-button";
import { OpenChatCta } from "./open-chat-cta";
import { OperatorImpactMeter } from "./operator-impact-meter";
import { IndustryTicker } from "./industry-ticker";
import { BookCallLink } from "./book-call-link";
import { FOUNDER_BANNER, FOUNDER_SMS_HREF } from "@/lib/brand";

export function Hero() {
  return (
    <section className="relative min-h-0 md:min-h-[92vh] flex flex-col pt-14 overflow-hidden">
      <div className="hero-bg-shield" aria-hidden />

      <div className="relative z-10 flex-1 flex items-center mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 md:py-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8 items-start w-full">
          <div className="hero-copy-panel card-compact space-y-2 md:space-y-5 sm:col-span-2 md:col-span-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm text-gold font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
              </span>
              {FOUNDER_BANNER}
            </div>

            <h1 className="text-2xl md:text-5xl lg:text-[3.1rem] font-extrabold leading-[1.08] tracking-tight text-foreground">
              Stop Losing Leads to{" "}
              <span className="text-gradient">5-Minute Delays.</span>
            </h1>

            <p className="text-sm md:text-lg text-muted-light leading-relaxed max-w-xl line-clamp-4 md:line-clamp-none">
              We engineer autonomous systems for{" "}
              <span className="text-foreground/90">local businesses</span> across beauty,
              food service, construction, medical, automotive, and more. KrakenIX responds,
              books, and closes clients in under{" "}
              <span className="text-cyan-bright font-medium">15 seconds</span>.
            </p>

            <p className="text-xs md:text-base text-muted-light hidden md:block">
              Ardmore, OK · Southern Oklahoma &amp; North Texas
            </p>

            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
              <a
                href={FOUNDER_SMS_HREF}
                className="btn-outline rounded-full px-6 py-3 text-sm md:text-base font-semibold text-center w-full md:w-auto"
              >
                Text
              </a>
              <BookCallLink variant="gold" size="lg" className="w-full md:w-auto text-sm md:text-base">
                Book Call
              </BookCallLink>
              <TestItLiveButton size="lg" className="w-full md:w-auto text-sm md:text-base" />
              <CtaButton href="#calculator" variant="outline" size="lg" className="w-full md:w-auto text-sm md:text-base">
                Build Your Estimate
              </CtaButton>
              <OpenChatCta size="lg" className="w-full md:w-auto hidden md:inline-flex" />
            </div>

            <div className="hidden md:flex flex-wrap gap-1.5 pt-0.5">
              {[
                "No monthly retainer on baseline",
                "15-second response guarantee",
                "Encrypted relay routing",
              ].map((text) => (
                <span key={text} className="trust-pill">
                  <svg className="w-3 h-3 text-cyan shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-1 min-w-0">
            <OperatorImpactMeter />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <IndustryTicker />
      </div>
    </section>
  );
}
