import type { DocumentChunk, ExtractedRisk } from "@/types/legal";
import { CATEGORY_LABEL } from "@/utils/documentUtils";

interface DocumentPaneProps {
  chunks: DocumentChunk[];
  risks: ExtractedRisk[];
  fileLabel: string;
}

const HIGHLIGHT_STYLES: Record<string, string> = {
  "red-flag": "rounded-xl bg-danger/10 p-3 outline-1 outline-danger/30",
  obligation: "rounded-xl bg-amber/10 p-3 outline-1 outline-amber/30",
  right: "rounded-xl bg-accent-teal/10 p-3 outline-1 outline-accent-teal/30",
};

const HIGHLIGHT_LABEL_STYLES: Record<string, string> = {
  "red-flag": "text-danger",
  obligation: "text-amber",
  right: "text-accent-teal",
};

export function DocumentPane({ chunks, risks, fileLabel }: DocumentPaneProps) {
  const riskByChunk = new Map(risks.map((risk) => [risk.chunkId, risk]));

  return (
    <section
      className="frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-5"
      aria-label="Uploaded document"
    >
      <div className="flex items-center justify-between border-b border-black/5 px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
          <h2 className="text-[13px] font-semibold text-ink">Source Document</h2>
        </div>
        <span className="font-mono text-[11px] text-ink/55">{fileLabel}</span>
      </div>

      <div
        className="max-h-[560px] space-y-4 overflow-y-auto px-5 py-4"
        role="region"
        aria-label="Document text"
        tabIndex={0}
      >
        {chunks.map((chunk) => {
          const risk = riskByChunk.get(chunk.id);
          const body = (
            <p className="font-mono text-[12.5px] leading-relaxed text-ink/75">
              <span className="font-semibold text-ink">{chunk.reference}</span> {chunk.text}
            </p>
          );

          if (!risk) {
            return <div key={chunk.id}>{body}</div>;
          }

          return (
            <div key={chunk.id} className={HIGHLIGHT_STYLES[risk.category]}>
              {body}
              <p
                className={`mt-2 text-[11px] font-semibold tracking-wide uppercase ${HIGHLIGHT_LABEL_STYLES[risk.category]}`}
              >
                {CATEGORY_LABEL[risk.category]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-black/5 bg-white/40 px-5 py-3 text-[11px] text-ink/55">
        Scroll to review full document · {risks.length} clauses identified
      </div>
    </section>
  );
}
