import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { ChatPanel } from "@/components/analysis/ChatPanel";
import { DocumentPane } from "@/components/analysis/DocumentPane";
import { RiskBreakdown } from "@/components/analysis/RiskBreakdown";
import { useLegalSession } from "@/hooks/useLegalSession";
import { formatRelativeTime } from "@/utils/documentUtils";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Analysis dashboard — Veritas Prep" },
      {
        name: "description",
        content:
          "Read your agreement side by side with categorised obligations, rights and red flags, plus plain-language explanations and an assistant chat.",
      },
      { property: "og:title", content: "Analysis dashboard — Veritas Prep" },
      {
        property: "og:description",
        content:
          "Clause-level risk breakdown with Explain-Like-I'm-5 translations and an assistant you can question.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalysisPage,
});

type Tab = "risks" | "chat";

function AnalysisPage() {
  const { document, analysis, status, chat, chatPending, askQuestion, isFlagged, toggleFlag } =
    useLegalSession();
  const [tab, setTab] = useState<Tab>("risks");

  if (!document || !analysis) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        <div className="frost grain rounded-3xl border border-white/60 p-8 text-center">
          <h1 className="font-display text-[24px] font-semibold text-ink">No document loaded</h1>
          <p className="mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink/70">
            {status === "analyzing"
              ? "Your document is being analyzed…"
              : "Add a contract on the upload screen to see the analysis dashboard."}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy"
          >
            Go to upload
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4 py-5">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">
            Analysis Dashboard
          </p>
          <h1 className="font-display mt-1 text-[30px] leading-tight font-semibold text-ink">
            {analysis.documentTitle}
          </h1>
          <p className="mt-1 text-[13px] text-ink/65">
            {document.wordCount.toLocaleString()} words · analyzed{" "}
            <span className="font-mono text-ink/75">{formatRelativeTime(analysis.analyzedAt)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="frost inline-flex items-center gap-1.5 rounded-full border border-white/50 px-3 py-1.5 text-[12px] font-semibold text-accent-teal">
            <CheckCircle2 className="size-3.5" aria-hidden="true" /> Analysis complete
          </span>
          <Link
            to="/prep-sheet"
            className="rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy"
          >
            View Prep Sheet
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <DocumentPane
          chunks={document.chunks}
          risks={analysis.risks}
          fileLabel={document.title.endsWith(".md") ? ".md" : ".txt"}
        />

        <section
          className="frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-7"
          aria-label="Analysis results"
        >
          <div className="border-b border-black/5 px-4 pt-3">
            <div className="flex gap-1" role="tablist" aria-label="Analysis tabs">
              <TabButton
                id="risks"
                active={tab === "risks"}
                onSelect={() => setTab("risks")}
                label="Risk Breakdown"
              />
              <TabButton
                id="chat"
                active={tab === "chat"}
                onSelect={() => setTab("chat")}
                label="AI Chat"
              />
            </div>
          </div>

          <div
            id="panel-risks"
            role="tabpanel"
            aria-labelledby="tab-risks"
            hidden={tab !== "risks"}
            className="max-h-[600px] overflow-y-auto p-4"
          >
            <RiskBreakdown risks={analysis.risks} isFlagged={isFlagged} onToggleFlag={toggleFlag} />
          </div>

          <div
            id="panel-chat"
            role="tabpanel"
            aria-labelledby="tab-chat"
            hidden={tab !== "chat"}
            className="p-4"
          >
            <ChatPanel
              messages={chat}
              pending={chatPending}
              onSend={(question) => void askQuestion(question)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function TabButton({
  id,
  label,
  active,
  onSelect,
}: {
  id: Tab;
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      onClick={onSelect}
      className={`rounded-lg px-4 py-2.5 text-[13px] transition ${
        active ? "bg-navy/8 font-semibold text-ink" : "font-medium text-ink/60 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
