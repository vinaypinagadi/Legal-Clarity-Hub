/**
 * Core domain types for the Legal Prep Assistant.
 * These interfaces are the contract between the LLM service layer,
 * the session state, and the presentation components.
 */

export type RiskCategory = "obligation" | "right" | "red-flag";

export type RiskSeverity = "low" | "medium" | "high";

/** A contiguous, addressable slice of the source document. */
export interface DocumentChunk {
  id: string;
  /** Human readable reference, e.g. "§4.2". */
  reference: string;
  /** Short heading for the chunk, e.g. "Non-Compete". */
  heading: string;
  /** Raw text of the chunk, exactly as it appears in the document. */
  text: string;
  /** Zero-based order of the chunk within the document. */
  order: number;
}

/** A clause the model considers notable, with its plain-language reading. */
export interface ExtractedRisk {
  id: string;
  chunkId: string;
  reference: string;
  title: string;
  category: RiskCategory;
  severity: RiskSeverity;
  /** One or two sentence professional summary. */
  summary: string;
  /** Verbatim clause text the finding is based on. */
  quote: string;
  /** Jargon-free "Explain Like I'm 5" translation. */
  eli5: string;
  /** Suggested question to raise with an attorney. */
  suggestedQuestion: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  /** Full plain text / markdown of the document. */
  content: string;
  wordCount: number;
  chunks: DocumentChunk[];
  uploadedAt: string;
}

export interface AnalysisResult {
  documentTitle: string;
  chunks: DocumentChunk[];
  risks: ExtractedRisk[];
  /** Short overview of the agreement in plain language. */
  overview: string;
  analyzedAt: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface PrepSheetQuestion {
  id: string;
  reference: string;
  clauseTitle: string;
  category: RiskCategory;
  severity: RiskSeverity;
  question: string;
  context: string;
}

export interface PrepSheet {
  documentTitle: string;
  generatedAt: string;
  overview: string;
  questions: PrepSheetQuestion[];
  /** Notable things the user asked the assistant during review. */
  chatHighlights: string[];
}

export interface RiskCounts {
  obligation: number;
  right: number;
  "red-flag": number;
}
