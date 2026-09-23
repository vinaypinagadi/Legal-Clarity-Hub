import { AlertTriangle } from "lucide-react";

/**
 * Non-dismissible, sticky legal disclaimer. Present on every screen.
 */
export function DisclaimerBanner() {
  return (
    <div role="region" aria-label="Legal disclaimer" className="sticky top-0 z-50">
      <div className="frost-strong grain border-b border-white/60">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-2.5">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber"
            aria-hidden="true"
          >
            <AlertTriangle className="size-3.5" />
          </span>
          <p className="text-[13px] leading-snug font-medium text-ink/80">
            This tool provides{" "}
            <span className="font-semibold text-ink">informational assistance only</span> and does
            not constitute professional legal advice. Always consult a qualified attorney.
          </p>
        </div>
      </div>
    </div>
  );
}
