import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-dropdown";
import { TestItLiveButton } from "./test-it-live-button";
import { BrandLogo } from "./brand-logo";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-cyan/15 bg-[rgba(2,8,24,0.96)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <BrandLogo priority />

        <NavLinks />

        <div className="flex shrink-0 items-center gap-2">
          <TestItLiveButton size="sm" className="hidden sm:inline-flex" />
          <a
            href="#booking"
            className="hidden md:inline-flex btn-gold rounded-full px-4 py-2 text-sm"
          >
            Book Call
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
