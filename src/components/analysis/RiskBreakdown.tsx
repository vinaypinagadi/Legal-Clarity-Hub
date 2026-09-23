import { useMemo, useState } from "react";

import { RiskCard } from "@/components/analysis/RiskCard";
import type { ExtractedRisk, RiskCategory } from "@/types/legal";
import { CATEGORY_PLURAL, countByCategory } from "@/utils/documentUtils";

interface RiskBreakdownProps {
  risks: ExtractedRisk[];
  isFlagged: (riskId: string) => boolean;
  onToggleFlag: (riskId: string) => void;
}

type Filter = "all" | RiskCategory;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All clauses" },
  { value: "obligation", label: "Obligations" },
  { value: "right", label: "Rights" },
  { value: "red-flag", label: "Red Flags" },
];

export function RiskBreakdown({ risks, isFlagged, onToggleFlag }: RiskBreakdownProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = useMemo(() => countByCategory(risks), [risks]);
  const visible = filter === "all" ? risks : risks.filter((risk) => risk.category === filter);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <SummaryTile
          value={counts.obligation}
          label={CATEGORY_PLURAL.obligation}
          className="border-brand/15 bg-brand-soft/80 text-brand"
        />
        <SummaryTile
          value={counts.right}
          label={CATEGORY_PLURAL.right}
          className="border-accent-teal/20 bg-accent-teal/10 text-accent-teal"
        />
        <SummaryTile
          value={counts["red-flag"]}
          label={CATEGORY_PLURAL["red-flag"]}
          className="border-danger/20 bg-danger/10 text-danger"
        />
      </div>

      <div className="flex flex-wrap gap-1" role="group" aria-label="Filter clauses by category">
        {FILTERS.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.value)}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
                active ? "bg-navy text-white" : "text-ink/65 hover:bg-white/70 hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <table className="w-full border-separate border-spacing-y-3">
        <caption className="sr-only">
          Extracted clauses grouped by obligations, rights and red flags
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Clause</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((risk) => (
            <tr key={risk.id}>
              <td className="p-0">
                <RiskCard
                  risk={risk}
                  flagged={isFlagged(risk.id)}
                  onToggleFlag={() => onToggleFlag(risk.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-black/5 bg-white/60 p-4 text-[13px] text-ink/65">
          No clauses in this category.
        </p>
      ) : null}
    </div>
  );
}

function SummaryTile({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className: string;
}) {
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${className}`}>
      <p className="font-display text-[22px] leading-none font-semibold">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-ink/65">{label}</p>
    </div>
  );
}
