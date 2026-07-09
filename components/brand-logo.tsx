import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/lib/brand";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const text = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`flex ${box} items-center justify-center rounded-lg bg-cyan/10 border border-cyan/30 shrink-0`}
    >
      <span className={`text-cyan-bright font-bold ${text}`}>KX</span>
    </div>
  );
}

export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      Kraken<span className="text-cyan-bright">ix</span> AI
    </span>
  );
}

/** Full K-circuit lockup — prominent header logo (dark-background version). */
export function BrandLogo({ priority = false }: { priority?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50"
      aria-label={`${BRAND_NAME} home`}
    >
      <span className="relative block h-12 w-44 sm:h-14 sm:w-52 md:h-[3.75rem] md:w-60 overflow-hidden rounded-sm shadow-[0_0_24px_rgba(0,180,255,0.3)] transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_0_32px_rgba(0,180,255,0.4)]">
        <Image
          src={BRAND_LOGO_SRC}
          alt={BRAND_NAME}
          fill
          priority={priority}
          sizes="(max-width: 640px) 176px, 240px"
          className="object-cover object-[center_42%] scale-[1.32]"
        />
      </span>
    </Link>
  );
}
