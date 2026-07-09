"use client";

import dynamic from "next/dynamic";

const DesktopFlowingBackground = dynamic(
  () => import("./flowing-background-desktop").then((m) => m.DesktopFlowingBackground),
  { ssr: false }
);

/** Desktop only (md+). Mobile uses CSS static bg in layout. */
export function FlowingBackground() {
  return (
    <div className="hidden md:block">
      <DesktopFlowingBackground />
    </div>
  );
}
