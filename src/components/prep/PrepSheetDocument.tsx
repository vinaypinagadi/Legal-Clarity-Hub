import type { PrepSheet } from "@/types/legal";
import { CATEGORY_LABEL } from "@/utils/documentUtils";

export function PrepSheetDocument({ sheet, notes = "" }: { sheet: PrepSheet; notes?: string }) {
  return (
    <article className="frost grain rounded-3xl border border-white/60 p-6 print:border-0 print:bg-white print:shadow-none">
      <header className="border-b border-black/5 pb-5">
        <p className="text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">
          Lawyer Prep-Sheet
        </p>
        <h1 className="font-display mt-1 text-[28px] leading-tight font-semibold text-ink">
          Questions for Your Attorney
        </h1>
        <p className="mt-1.5 text-[13px] text-ink/65">
          {sheet.documentTitle} · prepared {new Date(sheet.generatedAt).toLocaleString()}
        </p>
      </header>

      <section className="mt-5" aria-labelledby="prep-overview">
        <h2 id="prep-overview" className="text-[13px] font-semibold text-ink">
          Overview
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink/80">{sheet.overview}</p>
      </section>

      <section className="mt-6" aria-labelledby="prep-clauses">
        <h2 id="prep-clauses" className="text-[13px] font-semibold text-ink">
          Clause checklist ({sheet.questions.length})
        </h2>
        <ul className="mt-3 space-y-3">
          {sheet.questions.map((question) => (
            <li
              key={question.id}
              className="rounded-2xl border border-black/5 bg-white/65 p-4 print:bg-white"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 size-4 shrink-0 rounded-[4px] border border-ink/30"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    <span className="font-mono text-[12px] text-ink/60">{question.reference}</span>{" "}
                    {question.clauseTitle}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/80">
                    {question.question}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink/60">
                    {CATEGORY_LABEL[question.category]} · {question.severity} priority ·{" "}
                    {question.context}
                  </p>
                </div>
              </div>
            </li>
          ))}
          {sheet.questions.length === 0 ? (
            <li className="rounded-2xl border border-black/5 bg-white/65 p-4 text-[13px] text-ink/65">
              No clauses flagged yet. Flag clauses in the Risk Breakdown to build this checklist.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="mt-6" aria-labelledby="prep-chat">
        <h2 id="prep-chat" className="text-[13px] font-semibold text-ink">
          From my review conversation
        </h2>
        <ul className="mt-3 space-y-2">
          {sheet.chatHighlights.map((highlight, index) => (
            <li
              key={`${index}-${highlight.slice(0, 12)}`}
              className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] leading-relaxed text-ink/80 print:bg-white"
            >
              <span
                className="mt-0.5 size-4 shrink-0 rounded-[4px] border border-ink/30"
                aria-hidden="true"
              />
              <span>{highlight}</span>
            </li>
          ))}
          {sheet.chatHighlights.length === 0 ? (
            <li className="rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] text-ink/65">
              You haven&apos;t asked the assistant anything yet.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="mt-6" aria-labelledby="prep-notes">
        <h2 id="prep-notes" className="text-[13px] font-semibold text-ink">
          My notes
        </h2>
        {notes.trim() ? (
          <p className="mt-2 rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] leading-relaxed whitespace-pre-line text-ink/80 print:bg-white">
            {notes.trim()}
          </p>
        ) : (
          <p className="mt-2 text-[13px] text-ink/60">
            No notes yet — the PDF export leaves ruled space for handwritten notes.
          </p>
        )}
      </section>

      <footer className="mt-6 border-t border-black/5 pt-4 text-[12px] leading-relaxed text-ink/60">
        This checklist provides informational assistance only and does not constitute professional
        legal advice. Always consult a qualified attorney.
      </footer>
    </article>
  );
}
