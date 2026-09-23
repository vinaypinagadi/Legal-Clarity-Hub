import type { PrepSheet } from "@/types/legal";
import { CATEGORY_LABEL } from "@/utils/documentUtils";
import { slugify } from "@/utils/markdown";

const DISCLAIMER =
  "This tool provides informational assistance only and does not constitute professional legal advice. Always consult a qualified attorney.";

const PAGE = { width: 595.28, height: 841.89 }; // A4 points
const MARGIN = 56;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;

/** Builds a paginated, print-ready PDF of the prep sheet and downloads it. */
export async function downloadPrepSheetPdf(sheet: PrepSheet, notes: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  let y = MARGIN;
  let page = 1;

  const footer = () => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(120);
    const lines = doc.splitTextToSize(DISCLAIMER, CONTENT_WIDTH - 40);
    doc.text(lines, MARGIN, PAGE.height - MARGIN + 14);
    doc.text(String(page), PAGE.width - MARGIN, PAGE.height - MARGIN + 14, { align: "right" });
  };

  const newPage = () => {
    footer();
    doc.addPage();
    page += 1;
    y = MARGIN;
  };

  const ensure = (needed: number) => {
    if (y + needed > PAGE.height - MARGIN - 10) newPage();
  };

  const write = (
    text: string,
    options: {
      size?: number;
      style?: "normal" | "bold" | "italic";
      color?: [number, number, number];
      indent?: number;
      gap?: number;
      leading?: number;
    } = {},
  ) => {
    const size = options.size ?? 10;
    const leading = options.leading ?? size * 1.42;
    const indent = options.indent ?? 0;
    doc.setFont("helvetica", options.style ?? "normal");
    doc.setFontSize(size);
    doc.setTextColor(...(options.color ?? [15, 30, 46]));
    const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH - indent);
    for (const line of lines) {
      ensure(leading);
      doc.text(line, MARGIN + indent, y);
      y += leading;
    }
    y += options.gap ?? 0;
  };

  const rule = (gap = 10) => {
    ensure(gap + 4);
    doc.setDrawColor(210, 218, 232);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, y, PAGE.width - MARGIN, y);
    y += gap;
  };

  const checkbox = () => {
    ensure(14);
    doc.setDrawColor(90, 105, 125);
    doc.setLineWidth(0.8);
    doc.rect(MARGIN, y - 8, 9, 9);
  };

  // Header
  write("QUESTIONS FOR YOUR ATTORNEY", {
    size: 17,
    style: "bold",
    color: [22, 50, 74],
    gap: 4,
  });
  write(sheet.documentTitle, { size: 11, style: "bold", color: [47, 95, 208] });
  write(`Prepared ${new Date(sheet.generatedAt).toLocaleString()}`, {
    size: 8.5,
    color: [110, 122, 138],
    gap: 6,
  });

  // Disclaimer block
  ensure(46);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  const disclaimerLines: string[] = doc.splitTextToSize(DISCLAIMER, CONTENT_WIDTH - 24);
  const boxHeight = disclaimerLines.length * 11 + 16;
  doc.setFillColor(253, 246, 227);
  doc.setDrawColor(226, 202, 140);
  doc.rect(MARGIN, y - 2, CONTENT_WIDTH, boxHeight, "FD");
  doc.setTextColor(138, 85, 4);
  doc.text(disclaimerLines, MARGIN + 12, y + 11);
  y += boxHeight + 16;

  write("Overview", { size: 12, style: "bold", color: [22, 50, 74], gap: 2 });
  write(sheet.overview, { size: 9.5, color: [45, 60, 78], gap: 12 });

  // Flagged clauses
  write(`Flagged clauses (${sheet.questions.length})`, {
    size: 12,
    style: "bold",
    color: [22, 50, 74],
    gap: 4,
  });
  rule(12);

  if (sheet.questions.length === 0) {
    write("No clauses were flagged for review.", {
      size: 9.5,
      style: "italic",
      color: [110, 122, 138],
      gap: 12,
    });
  } else {
    sheet.questions.forEach((question) => {
      ensure(60);
      checkbox();
      write(`${question.reference} — ${question.clauseTitle}`, {
        size: 10.5,
        style: "bold",
        indent: 18,
      });
      write(`${CATEGORY_LABEL[question.category]} · ${question.severity} priority`, {
        size: 8,
        color: [110, 122, 138],
        indent: 18,
        gap: 2,
      });
      write(`Ask: ${question.question}`, { size: 9.5, indent: 18, gap: 2 });
      write(`Context: ${question.context}`, {
        size: 8.5,
        style: "italic",
        color: [80, 95, 112],
        indent: 18,
        gap: 12,
      });
    });
  }

  // Chat-derived questions
  write(`Questions from my review conversation (${sheet.chatHighlights.length})`, {
    size: 12,
    style: "bold",
    color: [22, 50, 74],
    gap: 4,
  });
  rule(12);

  if (sheet.chatHighlights.length === 0) {
    write("No questions were raised in the assistant chat.", {
      size: 9.5,
      style: "italic",
      color: [110, 122, 138],
      gap: 12,
    });
  } else {
    sheet.chatHighlights.forEach((highlight) => {
      ensure(24);
      checkbox();
      write(highlight, { size: 9.5, indent: 18, gap: 8 });
    });
    y += 4;
  }

  // Notes
  write("My notes", { size: 12, style: "bold", color: [22, 50, 74], gap: 4 });
  rule(12);
  const noteText = notes.trim();
  if (noteText) {
    noteText.split(/\n+/).forEach((line) => {
      write(line, { size: 9.5, color: [45, 60, 78], gap: 4 });
    });
  } else {
    // Ruled space to write on during the consultation.
    for (let index = 0; index < 8; index += 1) {
      ensure(22);
      doc.setDrawColor(216, 224, 236);
      doc.setLineWidth(0.6);
      doc.line(MARGIN, y + 6, PAGE.width - MARGIN, y + 6);
      y += 22;
    }
  }

  footer();
  doc.save(`${slugify(sheet.documentTitle)}-attorney-questions.pdf`);
}
