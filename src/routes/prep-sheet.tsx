import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, FileDown, Loader2, Printer, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";

import { PrepSheetDocument } from "@/components/prep/PrepSheetDocument";
import { useLegalSession } from "@/hooks/useLegalSession";
import type { PrepSheet } from "@/types/legal";
import { downloadMarkdown, prepSheetToMarkdown, slugify } from "@/utils/markdown";
import { downloadPrepSheetPdf } from "@/utils/pdfExport";

export const Route = createFileRoute("/prep-sheet")({
  head: () => ({
    meta: [
      { title: "Questions for Your Attorney — Veritas Prep" },
      {
        name: "description",
        content:
          "A printable checklist compiled from the clauses you flagged and the questions you asked, ready for a consultation with a qualified attorney.",
      },
      { property: "og:title", content: "Questions for Your Attorney — Veritas Prep" },
      {
        property: "og:description",
        content:
          "Download or print a structured checklist of the contract questions worth raising with a lawyer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrepSheetPage,
});

function PrepSheetPage() {
  const { analysis, buildPrepSheet, flaggedRisks, chat } = useLegalSession();
  const [sheet, setSheet] = useState<PrepSheet | null>(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [exporting, setExporting] = useState(false);
  const notesId = useId();

  const exportPdf = useCallback(async () => {
    if (!sheet) return;
    setExporting(true);
    try {
      await downloadPrepSheetPdf(sheet, notes);
    } finally {
      setExporting(false);
    }
  }, [sheet, notes]);

  const generate = useCallback(async () => {
    setLoading(true);
    try {
      const result = await buildPrepSheet();
      setSheet(result);
    } finally {
      setLoading(false);
    }
  }, [buildPrepSheet]);

  useEffect(() => {
    if (!analysis) return;
    void generate();
    // Regenerate whenever the flagged set or conversation changes.
  }, [analysis, flaggedRisks, chat, generate]);

  if (!analysis) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-10">
        <div className="frost grain rounded-3xl border border-white/60 p-8 text-center">
          <h1 className="font-display text-[24px] font-semibold text-ink">
            Nothing to prepare yet
          </h1>
          <p className="mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink/70">
            Analyze a document first — your flagged clauses and questions build this checklist.
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
    <div className="mx-auto max-w-[1440px] px-5 pb-12">
      <div className="no-print flex flex-wrap items-end justify-between gap-4 py-5">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">
            Step 3 · Consultation prep
          </p>
          <h1 className="font-display mt-1 text-[30px] leading-tight font-semibold text-ink">
            Questions for Your Attorney
          </h1>
          <p className="mt-1 text-[13px] text-ink/65">
            {flaggedRisks.length} flagged clause{flaggedRisks.length === 1 ? "" : "s"} ·{" "}
            {chat.filter((message) => message.role === "user").length} question
            {chat.filter((message) => message.role === "user").length === 1 ? "" : "s"} from chat
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void generate()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="size-4" aria-hidden="true" />
            )}
            Rebuild
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white"
          >
            <Printer className="size-4" aria-hidden="true" /> Print
          </button>
          <button
            type="button"
            disabled={!sheet}
            onClick={() => {
              if (!sheet) return;
              downloadMarkdown(
                `${slugify(sheet.documentTitle)}-attorney-questions.md`,
                prepSheetToMarkdown(sheet, notes),
              );
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-4" aria-hidden="true" /> Download as Markdown
          </button>
          <button
            type="button"
            disabled={!sheet || exporting}
            onClick={() => void exportPdf()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <FileDown className="size-4" aria-hidden="true" />
            )}
            Download PDF
          </button>
        </div>
      </div>

      <div className="no-print mb-5 max-w-[900px]">
        <label htmlFor={notesId} className="text-[13px] font-semibold text-ink">
          My notes for the consultation
        </label>
        <p className="mt-1 text-[12.5px] text-ink/60">
          Anything you add here is included in the PDF and markdown exports. Leave it blank and the
          PDF prints ruled lines to write on.
        </p>
        <textarea
          id={notesId}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="e.g. Ask whether the non-compete is enforceable in my state…"
          className="mt-2 w-full resize-y rounded-2xl border border-ink/12 bg-white/70 p-4 text-[13px] leading-relaxed text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="max-w-[900px]" aria-busy={loading}>
        {sheet ? (
          <PrepSheetDocument sheet={sheet} notes={notes} />
        ) : (
          <p className="frost grain rounded-3xl border border-white/60 p-6 text-[13px] text-ink/70">
            Compiling your checklist…
          </p>
        )}
      </div>
    </div>
  );
}
