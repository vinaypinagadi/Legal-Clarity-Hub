/**
 * Client-side text extraction for uploaded documents.
 * Plain text formats are read directly; PDFs are parsed lazily so the parser
 * is only downloaded when a user actually drops a PDF.
 */

export const ACCEPTED_EXTENSIONS = [
  ".txt",
  ".md",
  ".markdown",
  ".rtf",
  ".csv",
  ".json",
  ".log",
  ".pdf",
] as const;

export const ACCEPT_ATTRIBUTE =
  ".txt,.md,.markdown,.rtf,.csv,.json,.log,.pdf,text/plain,text/markdown,application/pdf";

export function isAcceptedDocument(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function isPdf(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

/** Strips RTF control words so pasted/exported rich text stays readable. */
function stripRtf(input: string): string {
  return input
    .replace(/\\'[0-9a-f]{2}/gi, "")
    .replace(/\\[a-z]+-?\d* ?/gi, "")
    .replace(/[{}]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    let line = "";
    const lines: string[] = [];

    for (const item of textContent.items) {
      if (!("str" in item)) continue;
      line += item.str;
      if (item.hasEOL) {
        lines.push(line.trim());
        line = "";
      }
    }
    if (line.trim()) lines.push(line.trim());

    // Re-join wrapped lines into paragraphs so clause chunking works.
    pages.push(
      lines
        .join("\n")
        .replace(/\n{2,}/g, "\n\n")
        .trim(),
    );
  }

  await pdf.cleanup();
  return pages.filter(Boolean).join("\n\n");
}

export interface ExtractedFile {
  text: string;
  filename: string;
}

export async function extractDocumentText(file: File): Promise<ExtractedFile> {
  if (!isAcceptedDocument(file)) {
    throw new Error(
      `Unsupported file. Try ${ACCEPTED_EXTENSIONS.join(", ")} — or paste the text below.`,
    );
  }

  if (isPdf(file)) {
    const text = await extractPdfText(file);
    if (text.trim().length < 40) {
      throw new Error(
        "That PDF has no selectable text (it may be a scan). Paste the text below instead.",
      );
    }
    return { text, filename: file.name };
  }

  const raw = await file.text();
  const text = file.name.toLowerCase().endsWith(".rtf") ? stripRtf(raw) : raw;
  return { text, filename: file.name };
}
