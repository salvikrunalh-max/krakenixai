import { CtaButton } from "./cta-button";
import { TestItLiveButton } from "./test-it-live-button";
import { OpenChatCta } from "./open-chat-cta";
import { LiveMetrics } from "./live-metrics";
import { HeroIntelPanel } from "./hero-intel-panel";
import { IndustryTicker } from "./industry-ticker";

export function Hero() {
  return (
    <section className="relative min-h-0 md:min-h-[92vh] flex flex-col pt-14 overflow-hidden">
      <div className="hero-bg-shield" aria-hidden />

      <div className="relative z-10 flex-1 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-16 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-start w-full">
          <div className="hero-copy-panel card-compact space-y-3 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-sm text-cyan-bright">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-bright" />
              </span>
              Autonomous systems · live &amp; always on
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.1rem] font-extrabold leading-[1.06] tracking-tight text-foreground">
              Stop Losing Leads to{" "}
              <span className="text-gradient">5-Minute Delays.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-light leading-relaxed max-w-xl">
              We engineer autonomous systems for{" "}
              <span className="text-foreground/90">local businesses</span> across beauty,
              food service, construction, medical, automotive, and more. Krakenix responds,
              books, and closes clients in under{" "}
              <span className="text-cyan-bright font-medium">15 seconds</span>.
            </p>

            <p className="text-sm sm:text-base text-muted-light">
              Ardmore, OK · Southern Oklahoma &amp; North Texas
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
              <TestItLiveButton size="lg" className="w-full sm:w-auto" />
              <CtaButton href="#calculator" size="lg" className="w-full sm:w-auto">
                Build Your Estimate
              </CtaButton>
              <OpenChatCta size="lg" className="w-full sm:w-auto" />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
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

          <div className="w-full space-y-2 sm:space-y-3 sm:col-span-1">
            <HeroIntelPanel />
            <LiveMetrics />
          </div>
        </div>
      </div>

      <IndustryTicker />
    </section>
  );
}
