import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Industries } from "@/components/industries";
import { HowItWorks } from "@/components/how-it-works";
import { EarlyOperatorWins } from "@/components/early-operator-wins";
import { LiveTestWidget } from "@/components/live-test-widget";
import { Calculator } from "@/components/calculator";
import { SystemsEngines } from "@/components/systems-engines";
import { EnterpriseCta } from "@/components/enterprise-cta";
import { SocialProof } from "@/components/social-proof";
import { Team } from "@/components/team";
import { ScarcityBooking } from "@/components/scarcity-booking";
import { PricingPackages } from "@/components/pricing-packages";
import { FAQ } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";
import { FlowingBackground } from "@/components/flowing-background";
import { LostLeadsCalculator } from "@/components/lost-leads-calculator";
import { ChatWidget } from "@/components/chat-widget";
import { SmoothHashNav } from "@/components/smooth-hash-nav";

export default function Home() {
  return (
    <div className="relative z-0">
      <SmoothHashNav />
      <FlowingBackground />
      <Header />
      <main>
        <Hero />
        <Industries />
        <LostLeadsCalculator />
        <HowItWorks />
        <EarlyOperatorWins />
        <div className="section-divider mx-auto max-w-4xl opacity-50 hidden sm:block" />
        <LiveTestWidget />
        <div className="section-divider mx-auto max-w-4xl opacity-50 hidden sm:block" />
        <Calculator />
        <SystemsEngines />
        <EnterpriseCta />
        <SocialProof />
        <Team />
        <ScarcityBooking />
        <div className="section-divider mx-auto max-w-4xl opacity-40 hidden sm:block" />
        <PricingPackages />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StickyCta />
      <ChatWidget />
    </div>
  );
}
