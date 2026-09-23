import type { PrepSheet } from "@/types/legal";
import { CATEGORY_LABEL } from "@/utils/documentUtils";

/** Renders a prep sheet as a portable markdown checklist. */
export function prepSheetToMarkdown(sheet: PrepSheet, notes = ""): string {
  const lines: string[] = [];

  lines.push("# Questions for Your Attorney");
  lines.push("");
  lines.push(
    "> This checklist was produced by an informational tool. It does not constitute professional legal advice. Always consult a qualified attorney.",
  );
  lines.push("");
  lines.push(`**Document:** ${sheet.documentTitle}`);
  lines.push(`**Prepared:** ${new Date(sheet.generatedAt).toLocaleString()}`);
  lines.push("");
  lines.push("## Overview");
  lines.push("");
  lines.push(sheet.overview);
  lines.push("");
  lines.push("## Clause checklist");
  lines.push("");

  if (sheet.questions.length === 0) {
    lines.push("_No clauses were flagged for review._");
  } else {
    sheet.questions.forEach((question) => {
      lines.push(
        `- [ ] **${question.reference} — ${question.clauseTitle}** (${CATEGORY_LABEL[question.category]}, ${question.severity} priority)`,
      );
      lines.push(`  - Ask: ${question.question}`);
      lines.push(`  - Context: ${question.context}`);
    });
  }

  lines.push("");
  lines.push("## From my review conversation");
  lines.push("");

  if (sheet.chatHighlights.length === 0) {
    lines.push("_No questions were raised in the assistant chat._");
  } else {
    sheet.chatHighlights.forEach((highlight) => {
      lines.push(`- [ ] ${highlight}`);
    });
  }

  lines.push("");
  lines.push("## My notes");
  lines.push("");
  lines.push(notes.trim() || "_No notes yet._");

  lines.push("");
  return lines.join("\n");
}

/** Triggers a client-side download of the given markdown content. */
export function downloadMarkdown(filename: string, markdown: string): void {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename.endsWith(".md") ? filename : `${filename}.md`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "prep-sheet"
  );
}
