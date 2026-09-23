import type { DocumentChunk, ExtractedRisk, RiskCategory, RiskCounts } from "@/types/legal";

export const ACCEPTED_FILE_TYPES = [".txt", ".md", ".markdown"] as const;

export function isAcceptedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_FILE_TYPES.some((extension) => name.endsWith(extension));
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Derives a readable title from the first heading or sentence. */
const DOCUMENT_TYPE_PATTERN =
  /\b([A-Z][A-Za-z]*(?:\s+(?:of|and|for|[A-Z][A-Za-z]*)){0,4}\s+(?:Agreement|Contract|Lease|Policy|Terms|Waiver|Release|Notice|Addendum|Amendment|Deed))\b/;

/** Derives a readable title: a markdown heading, a named document type, or a clipped first line. */
export function inferDocumentTitle(content: string): string {
  const lines = content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const heading = lines.find((line) => line.startsWith("#"));
  if (heading) return heading.replace(/^#+\s*/, "").trim();

  const named = DOCUMENT_TYPE_PATTERN.exec(content.slice(0, 1200));
  if (named?.[1]) {
    return named[1]
      .replace(/\s+/g, " ")
      .replace(/^(?:This|That|The|These|Those|Any|Such)\s+/i, "")
      .trim();
  }

  const firstLine = lines.find((line) => line.length > 3);
  if (!firstLine) return "Untitled document";
  return firstLine.length > 64 ? `${firstLine.slice(0, 61)}…` : firstLine;
}

const CLAUSE_PATTERN = /^(?:§\s*)?(\d+(?:\.\d+)*)[.)]?\s+(.*)$/;

/**
 * Splits a document into addressable chunks. Numbered clauses become their own
 * chunk with a "§x" reference; unnumbered paragraphs fall back to positional
 * references so every part of the document stays citable.
 */
export function chunkDocument(content: string): DocumentChunk[] {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph, index) => {
    const singleLine = paragraph.replace(/\s+/g, " ");
    const match = CLAUSE_PATTERN.exec(singleLine);
    const reference = match ? `§${match[1]}` : `¶${index + 1}`;
    const remainder = match ? (match[2] ?? "") : singleLine;
    const headingMatch = /^([A-Z][A-Za-z '/&-]{2,48})[.:—-]/.exec(remainder);

    return {
      id: `chunk-${index}`,
      reference,
      heading: headingMatch?.[1]?.trim() ?? "",
      text: singleLine,
      order: index,
    };
  });
}

export function countByCategory(risks: ExtractedRisk[]): RiskCounts {
  return risks.reduce<RiskCounts>(
    (counts, risk) => {
      counts[risk.category] += 1;
      return counts;
    },
    { obligation: 0, right: 0, "red-flag": 0 },
  );
}

export const CATEGORY_LABEL: Record<RiskCategory, string> = {
  obligation: "Obligation",
  right: "Right",
  "red-flag": "Red Flag",
};

export const CATEGORY_PLURAL: Record<RiskCategory, string> = {
  obligation: "Obligations",
  right: "Rights",
  "red-flag": "Red Flags",
};

export function formatRelativeTime(isoDate: string): string {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(isoDate).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}
