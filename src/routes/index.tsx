import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, ListChecks, ShieldCheck } from "lucide-react";

import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { useLegalSession } from "@/hooks/useLegalSession";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veritas Prep — Understand your contract before you sign" },
      {
        name: "description",
        content:
          "Paste a contract in plain text and get obligations, rights and red flags explained in everyday language, plus a checklist of questions for your attorney.",
      },
      { property: "og:title", content: "Veritas Prep — Legal Prep Assistant" },
      {
        property: "og:description",
        content:
          "Simplify complex legal documents, surface risky clauses, and prepare for a consultation with a qualified attorney.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const { analyze, status, error } = useLegalSession();
  const navigate = useNavigate();

  const handleAnalyze = async (content: string, filename?: string) => {
    await analyze(content, filename);
    void navigate({ to: "/analysis" });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-12">
      <div className="py-6">
        <p className="text-[12px] font-semibold tracking-[0.16em] text-brand uppercase">
          Step 1 · Add your document
        </p>
        <h1 className="font-display mt-1 text-[30px] leading-tight font-semibold text-ink">
          Understand the contract before you sign it
        </h1>
        <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-ink/70">
          Paste or drop the text of an agreement. Veritas Prep separates what you must do, what
          you&apos;re entitled to, and what deserves a closer look — then builds a checklist you can
          take to a qualified attorney.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <UploadDropzone isAnalyzing={status === "analyzing"} onAnalyze={handleAnalyze} />
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-2xl border border-danger/25 bg-danger/10 p-3.5 text-[13px] font-medium text-danger"
            >
              {error}
            </p>
          ) : null}
        </div>

        <aside className="frost grain space-y-4 rounded-3xl border border-white/60 p-6 lg:col-span-5">
          <h2 className="text-[13px] font-semibold text-ink">What happens next</h2>
          <Step
            icon={<FileText className="size-4" aria-hidden="true" />}
            title="Clause-by-clause reading"
            body="Your document is split into numbered clauses so every finding points back to exact wording."
          />
          <Step
            icon={<ShieldCheck className="size-4" aria-hidden="true" />}
            title="Obligations, rights, red flags"
            body="Each clause is categorised, with an Explain-Like-I'm-5 translation on demand."
          />
          <Step
            icon={<ListChecks className="size-4" aria-hidden="true" />}
            title="A prep sheet for your lawyer"
            body="Flagged clauses and your questions compile into a printable checklist you can download."
          />
          <p className="border-t border-black/5 pt-4 text-[12px] leading-relaxed text-ink/60">
            Text and markdown only. Nothing leaves your browser in this build.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Step({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div>
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink/70">{body}</p>
      </div>
    </div>
  );
}
