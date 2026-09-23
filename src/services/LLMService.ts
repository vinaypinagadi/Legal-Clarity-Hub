/**
 * LLMService
 * ----------
 * Centralised boundary for every generative-AI call in the app.
 *
 * For this build every method is a MOCK async function that resolves with
 * dummy JSON after a short simulated latency. The signatures model a real
 * prompt/response cycle, so each body can be swapped for a live API call
 * (e.g. a server function hitting a model provider) without touching any
 * component, hook, or type.
 */

import type {
  AnalysisResult,
  ChatMessage,
  DocumentChunk,
  ExtractedRisk,
  PrepSheet,
  PrepSheetQuestion,
  RiskCategory,
  RiskSeverity,
} from "@/types/legal";
import { chunkDocument, inferDocumentTitle } from "@/utils/documentUtils";

const SIMULATED_LATENCY_MS = 900;

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function id(prefix: string, index: number): string {
  return `${prefix}-${index}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Dummy finding templates, cycled over the document's real chunks. */
const FINDING_TEMPLATES: Array<{
  title: string;
  category: RiskCategory;
  severity: RiskSeverity;
  summary: string;
  eli5: string;
  suggestedQuestion: string;
}> = [
  {
    title: "Non-compete — 24 months, nationwide",
    category: "red-flag",
    severity: "high",
    summary:
      "Restricts you from working for any competitor anywhere in the country for two full years after you leave.",
    eli5: "Think of it like this: if you quit, this rule says you can't take a similar job at a rival company — not just near you, but anywhere in the country — for two whole years. That can be really hard to live with, so it's worth asking whether it's even allowed where you live.",
    suggestedQuestion:
      "Is a 24-month nationwide non-compete enforceable in my state, and can the scope be narrowed?",
  },
  {
    title: "Perpetual confidentiality",
    category: "obligation",
    severity: "medium",
    summary:
      "You must keep confidential information secret with no stated time limit — the duty lasts indefinitely.",
    eli5: "You promise to keep the company's secrets forever. There's no end date, so even years later you still have to stay quiet about it.",
    suggestedQuestion:
      "Can the confidentiality duty be capped at a fixed number of years instead of lasting forever?",
  },
  {
    title: "Termination for convenience with notice",
    category: "right",
    severity: "low",
    summary:
      "If the agreement is ended without cause, you are entitled to a written notice period before it takes effect.",
    eli5: "They can end the deal whenever they want, but they have to tell you in writing first and give you a set number of days.",
    suggestedQuestion:
      "During the notice period, do I keep full pay and benefits, and is the notice mutual?",
  },
  {
    title: "Unlimited indemnification",
    category: "red-flag",
    severity: "high",
    summary:
      "You agree to cover claims, damages, and legal fees with no cap on the total amount or duration.",
    eli5: "If something goes wrong and someone sues, you promise to pay for it — the claim, the damages, and their lawyers — and there's no limit on how much.",
    suggestedQuestion:
      "Can indemnification be made mutual and capped at the fees paid in the last 12 months?",
  },
  {
    title: "Payment and reporting duties",
    category: "obligation",
    severity: "medium",
    summary:
      "Sets fixed amounts and deadlines you are responsible for meeting, including any reporting obligations.",
    eli5: "You have to pay or report certain things on time. Miss the date and you may be considered in breach of the agreement.",
    suggestedQuestion:
      "What exactly counts as late, and what happens the first time a deadline slips?",
  },
  {
    title: "Governing law and venue",
    category: "right",
    severity: "low",
    summary: "Fixes which state's law applies and where any dispute must be heard.",
    eli5: "If there's ever an argument about this contract, it gets decided using one particular state's rules, in that state's courts.",
    suggestedQuestion:
      "Does the chosen state's law or venue put me at a practical disadvantage in a dispute?",
  },
];

function buildRisks(chunks: DocumentChunk[]): ExtractedRisk[] {
  const considered = chunks.slice(0, Math.min(chunks.length, 6));
  return considered.map((chunk, index) => {
    const template = FINDING_TEMPLATES[index % FINDING_TEMPLATES.length]!;
    return {
      id: id("risk", index),
      chunkId: chunk.id,
      reference: chunk.reference,
      title: template.title,
      category: template.category,
      severity: template.severity,
      summary: template.summary,
      quote: chunk.text.slice(0, 320),
      eli5: template.eli5,
      suggestedQuestion: template.suggestedQuestion,
    };
  });
}

export const LLMService = {
  /**
   * Prompt: "Segment this agreement and extract obligations, rights and red
   * flags with a plain-language summary for each."
   */
  async analyzeDocument(content: string): Promise<AnalysisResult> {
    const chunks = chunkDocument(content);
    const risks = buildRisks(chunks);

    return delay<AnalysisResult>({
      documentTitle: inferDocumentTitle(content),
      chunks,
      risks,
      overview:
        "This agreement sets a fixed commitment on your side, gives the other party broad discretion to end or change the arrangement, and includes two clauses that are unusually one-sided. Review the red flags before signing.",
      analyzedAt: new Date().toISOString(),
    });
  },

  /**
   * Prompt: "Rewrite this clause for a reader with no legal background."
   * Kept separate so live builds can fetch ELI5 text on demand.
   */
  async explainLikeImFive(risk: ExtractedRisk): Promise<string> {
    return delay(risk.eli5, 500);
  },

  /**
   * Prompt: "Answer the user's question using only the supplied document
   * context. Never give legal advice; suggest attorney questions instead."
   */
  async sendChatMessage(
    question: string,
    _history: ChatMessage[],
    risks: ExtractedRisk[],
  ): Promise<ChatMessage> {
    const topFlag = risks.find((risk) => risk.category === "red-flag");
    const reply = topFlag
      ? `Based on the document, the clause most relevant to that is ${topFlag.reference} — ${topFlag.summary} In plain terms: ${topFlag.eli5} A good question for your attorney: "${topFlag.suggestedQuestion}"`
      : "I couldn't tie that to a specific clause in this document. Try quoting the sentence you're unsure about and I'll break it down, then add it to your attorney checklist.";

    return delay<ChatMessage>({
      id: id("msg", Date.now()),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString(),
    });
  },

  /**
   * Prompt: "Compile the flagged clauses and the review conversation into a
   * structured checklist of questions for a qualified attorney."
   */
  async generatePrepSheet(
    documentTitle: string,
    overview: string,
    flaggedRisks: ExtractedRisk[],
    chat: ChatMessage[],
  ): Promise<PrepSheet> {
    const questions: PrepSheetQuestion[] = flaggedRisks.map((risk, index) => ({
      id: id("question", index),
      reference: risk.reference,
      clauseTitle: risk.title,
      category: risk.category,
      severity: risk.severity,
      question: risk.suggestedQuestion,
      context: risk.summary,
    }));

    const chatHighlights = chat
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .slice(-6);

    return delay<PrepSheet>({
      documentTitle,
      overview,
      generatedAt: new Date().toISOString(),
      questions,
      chatHighlights,
    });
  },
};

export type LLMServiceApi = typeof LLMService;
