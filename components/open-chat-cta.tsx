"use client";

import { CtaButton } from "./cta-button";
import { OPEN_CHAT_EVENT } from "@/lib/brand";

type OpenChatCtaProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
};

export function OpenChatCta({
  size = "lg",
  className = "",
  children = "Ask the Bot",
}: OpenChatCtaProps) {
  return (
    <CtaButton
      href="#chat"
      variant="outline"
      size={size}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
      }}
    >
      {children}
    </CtaButton>
  );
}
