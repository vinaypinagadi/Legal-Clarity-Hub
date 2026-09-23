import { ChevronDown, Flag } from "lucide-react";
import { useId, useState } from "react";

import type { ExtractedRisk, RiskCategory } from "@/types/legal";
import { CATEGORY_LABEL } from "@/utils/documentUtils";

const CATEGORY_CHIP: Record<RiskCategory, string> = {
  obligation: "bg-brand/12 text-brand",
  right: "bg-accent-teal/12 text-accent-teal",
  "red-flag": "bg-danger/12 text-danger",
};

interface RiskCardProps {
  risk: ExtractedRisk;
  flagged: boolean;
  onToggleFlag: () => void;
}

export function RiskCard({ risk, flagged, onToggleFlag }: RiskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <article className="rounded-2xl border border-black/5 bg-white/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_CHIP[risk.category]}`}
          >
            {CATEGORY_LABEL[risk.category]}
          </span>
          <h3 className="mt-2 text-[14px] font-semibold text-ink">{risk.title}</h3>
        </div>
        <span className="font-mono shrink-0 text-[11px] text-ink/50">{risk.reference}</span>
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{risk.summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
          className="inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold text-brand transition hover:text-navy"
        >
          <ChevronDown
            className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          Explain Like I&apos;m 5
        </button>

        <button
          type="button"
          aria-pressed={flagged}
          onClick={onToggleFlag}
          className={`inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold transition ${
            flagged ? "text-danger hover:text-navy" : "text-ink/60 hover:text-ink"
          }`}
        >
          <Flag className="size-3.5" aria-hidden="true" />
          {flagged ? "Flagged for attorney" : "Flag for attorney"}
        </button>
      </div>

      {expanded ? (
        <div id={panelId} className="mt-3 rounded-xl border border-brand/15 bg-brand-soft/70 p-3.5">
          <p className="text-[13px] leading-relaxed text-ink/85">{risk.eli5}</p>
          <p className="mt-2 border-t border-brand/15 pt-2 text-[12px] leading-relaxed text-ink/65">
            Ask your attorney: {risk.suggestedQuestion}
          </p>
        </div>
      ) : null}
    </article>
  );
}
