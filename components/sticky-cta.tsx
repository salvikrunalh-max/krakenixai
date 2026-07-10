import { TestItLiveButton } from "./test-it-live-button";

export function StickyCta() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-cyan/15 bg-background/95 backdrop-blur-xl px-4 py-3 safe-area-pb">
      <div className="flex gap-2 max-w-lg mx-auto">
        <TestItLiveButton size="sm" className="flex-1 justify-center" />
      </div>
    </div>
  );
}
