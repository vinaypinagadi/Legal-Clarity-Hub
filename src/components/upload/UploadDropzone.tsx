import { FileText, Loader2, Upload } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { countWords } from "@/utils/documentUtils";
import { ACCEPT_ATTRIBUTE, extractDocumentText } from "@/utils/fileText";

interface UploadDropzoneProps {
  isAnalyzing: boolean;
  onAnalyze: (content: string, filename?: string) => void;
}

export function UploadDropzone({ isAnalyzing, onAnalyze }: UploadDropzoneProps) {
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState<string | undefined>(undefined);
  const [consented, setConsented] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaId = useId();
  const consentId = useId();

  const [reading, setReading] = useState(false);

  const readFile = useCallback(async (file: File) => {
    setFileError(null);
    setReading(true);
    try {
      const { text, filename: name } = await extractDocumentText(file);
      setContent(text);
      setFilename(name);
    } catch (error) {
      setFileError(error instanceof Error ? error.message : "Could not read that file.");
    } finally {
      setReading(false);
    }
  }, []);

  const canAnalyze = consented && content.trim().length > 40 && !isAnalyzing && !reading;
  const words = countWords(content);

  return (
    <div className="frost grain rounded-3xl border border-white/60 p-6">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) void readFile(file);
        }}
        className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
          dragging ? "border-brand bg-brand-soft/70" : "border-ink/15 bg-white/45"
        }`}
      >
        <span
          className="mx-auto grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"
          aria-hidden="true"
        >
          <Upload className="size-5" />
        </span>
        <p className="mt-3 text-[14px] font-semibold text-ink">
          Drop a PDF, .txt, .md or .rtf document here
        </p>
        <p className="mt-1 text-[13px] text-ink/60">
          PDFs are read in your browser — nothing is sent to a server in this build.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4 rounded-xl border-ink/15 bg-white/70 text-[13px] font-semibold text-navy hover:bg-white"
          onClick={() => inputRef.current?.click()}
        >
          Choose a file
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          className="sr-only"
          aria-label="Upload a PDF, text, markdown or rich text document"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void readFile(file);
          }}
        />
        {fileError ? (
          <p role="alert" className="mt-3 text-[12.5px] font-medium text-danger">
            {fileError}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label htmlFor={textareaId} className="text-[13px] font-semibold text-ink">
          Or paste the document text
        </label>
        <textarea
          id={textareaId}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            setFilename(undefined);
          }}
          rows={9}
          placeholder={
            "1. Term. This Agreement is entered into…\n\n4.2 Non-Compete. During the term…"
          }
          className="font-mono mt-2 w-full resize-y rounded-2xl border border-ink/12 bg-white/70 p-4 text-[12.5px] leading-relaxed text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
        />
        <p className="mt-2 flex items-center gap-2 text-[12px] text-ink/55">
          {filename ? (
            <>
              <FileText className="size-3.5" aria-hidden="true" />
              <span>{filename}</span>
              <span aria-hidden="true">·</span>
            </>
          ) : null}
          <span>{words.toLocaleString()} words</span>
        </p>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/10 p-4">
        <Checkbox
          id={consentId}
          checked={consented}
          onCheckedChange={(value) => setConsented(value === true)}
          className="mt-0.5 border-amber/60 data-[state=checked]:border-navy data-[state=checked]:bg-navy"
        />
        <label htmlFor={consentId} className="text-[13px] leading-relaxed font-medium text-ink/80">
          I agree this is not legal advice, and I will confirm anything important with a qualified
          attorney.
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          disabled={!canAnalyze}
          onClick={() => onAnalyze(content, filename)}
          className="rounded-xl bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Analyzing…
            </>
          ) : (
            "Analyze document"
          )}
        </Button>
        <p className="text-[12.5px] text-ink/55" aria-live="polite">
          {consented
            ? content.trim().length > 40
              ? "Ready to analyze."
              : "Add at least a paragraph of document text."
            : "Tick the acknowledgement above to enable analysis."}
        </p>
      </div>
    </div>
  );
}
