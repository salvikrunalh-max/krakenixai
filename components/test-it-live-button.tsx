"use client";

import { OPEN_CHAT_EVENT } from "@/lib/brand";

type TestItLiveButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Open chat panel instead of scrolling to live demo */
  mode?: "demo" | "chat";
};

const SIZES = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function TestItLiveButton({
  className = "",
  size = "md",
  mode = "demo",
}: TestItLiveButtonProps) {
  const href = mode === "demo" ? "#live-test" : "#chat";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (mode === "chat") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`btn-live inline-flex items-center justify-center gap-2 font-semibold rounded-full ${SIZES[size]} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
      </span>
      Test It Live
    </a>
  );
}
