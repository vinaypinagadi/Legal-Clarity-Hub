import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { LLMService } from "@/services/LLMService";
import type {
  AnalysisResult,
  ChatMessage,
  ExtractedRisk,
  LegalDocument,
  PrepSheet,
} from "@/types/legal";
import { countWords, inferDocumentTitle } from "@/utils/documentUtils";

export type AnalysisStatus = "idle" | "analyzing" | "ready" | "error";

interface LegalSessionValue {
  document: LegalDocument | null;
  analysis: AnalysisResult | null;
  status: AnalysisStatus;
  error: string | null;
  chat: ChatMessage[];
  chatPending: boolean;
  flaggedIds: string[];
  flaggedRisks: ExtractedRisk[];
  analyze: (content: string, filename?: string) => Promise<void>;
  reset: () => void;
  toggleFlag: (riskId: string) => void;
  isFlagged: (riskId: string) => boolean;
  askQuestion: (question: string) => Promise<void>;
  buildPrepSheet: () => Promise<PrepSheet | null>;
}

const LegalSessionContext = createContext<LegalSessionValue | null>(null);

export function LegalSessionProvider({ children }: { children: ReactNode }) {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatPending, setChatPending] = useState(false);
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);

  const analyze = useCallback(async (content: string, filename?: string) => {
    setStatus("analyzing");
    setError(null);
    try {
      const result = await LLMService.analyzeDocument(content);
      const title =
        filename?.replace(/\.[a-z0-9]{2,8}$/i, "").trim() || inferDocumentTitle(content);

      setDocument({
        id: `doc-${Date.now()}`,
        title,
        content,
        wordCount: countWords(content),
        chunks: result.chunks,
        uploadedAt: new Date().toISOString(),
      });
      setAnalysis({ ...result, documentTitle: title });
      setFlaggedIds(result.risks.filter((risk) => risk.category === "red-flag").map((r) => r.id));
      setChat([
        {
          id: "msg-intro",
          role: "assistant",
          content: `I've reviewed "${title}". ${result.overview} Ask me about any clause and I'll translate it into plain language.`,
          createdAt: new Date().toISOString(),
        },
      ]);
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("The analysis could not be completed. Please try again.");
    }
  }, []);

  const reset = useCallback(() => {
    setDocument(null);
    setAnalysis(null);
    setStatus("idle");
    setError(null);
    setChat([]);
    setFlaggedIds([]);
  }, []);

  const toggleFlag = useCallback((riskId: string) => {
    setFlaggedIds((current) =>
      current.includes(riskId) ? current.filter((value) => value !== riskId) : [...current, riskId],
    );
  }, []);

  const isFlagged = useCallback((riskId: string) => flaggedIds.includes(riskId), [flaggedIds]);

  const askQuestion = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed) return;

      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      setChat((current) => [...current, userMessage]);
      setChatPending(true);
      try {
        const reply = await LLMService.sendChatMessage(
          trimmed,
          [...chat, userMessage],
          analysis?.risks ?? [],
        );
        setChat((current) => [...current, reply]);
      } finally {
        setChatPending(false);
      }
    },
    [analysis, chat],
  );

  const flaggedRisks = useMemo(
    () => (analysis?.risks ?? []).filter((risk) => flaggedIds.includes(risk.id)),
    [analysis, flaggedIds],
  );

  const buildPrepSheet = useCallback(async () => {
    if (!analysis) return null;
    return LLMService.generatePrepSheet(
      analysis.documentTitle,
      analysis.overview,
      flaggedRisks,
      chat,
    );
  }, [analysis, chat, flaggedRisks]);

  const value = useMemo<LegalSessionValue>(
    () => ({
      document,
      analysis,
      status,
      error,
      chat,
      chatPending,
      flaggedIds,
      flaggedRisks,
      analyze,
      reset,
      toggleFlag,
      isFlagged,
      askQuestion,
      buildPrepSheet,
    }),
    [
      document,
      analysis,
      status,
      error,
      chat,
      chatPending,
      flaggedIds,
      flaggedRisks,
      analyze,
      reset,
      toggleFlag,
      isFlagged,
      askQuestion,
      buildPrepSheet,
    ],
  );

  return <LegalSessionContext.Provider value={value}>{children}</LegalSessionContext.Provider>;
}

export function useLegalSession(): LegalSessionValue {
  const context = useContext(LegalSessionContext);
  if (!context) {
    throw new Error("useLegalSession must be used inside a LegalSessionProvider");
  }
  return context;
}
