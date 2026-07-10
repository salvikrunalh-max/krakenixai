import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-dropdown";
import { TestItLiveButton } from "./test-it-live-button";
import { BrandMark, BrandName } from "./brand-logo";
import { BOOKING_HREF } from "@/lib/brand";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-cyan/20 bg-[rgba(2,8,24,0.97)] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
          aria-label="Krakenix AI home"
        >
          <BrandMark />
          <BrandName className="text-base sm:text-lg" />
        </Link>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-2">
          <TestItLiveButton size="sm" className="hidden sm:inline-flex" />
          <a
            href={BOOKING_HREF}
            className="md:hidden inline-flex btn-gold rounded-full px-3 py-2 text-xs font-semibold shrink-0"
          >
            Book Call
          </a>
          <a
            href={BOOKING_HREF}
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
