import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/utils/documentUtils.ts
function countWords(text) {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).length;
}
/** Derives a readable title from the first heading or sentence. */
var DOCUMENT_TYPE_PATTERN = /\b([A-Z][A-Za-z]*(?:\s+(?:of|and|for|[A-Z][A-Za-z]*)){0,4}\s+(?:Agreement|Contract|Lease|Policy|Terms|Waiver|Release|Notice|Addendum|Amendment|Deed))\b/;
/** Derives a readable title: a markdown heading, a named document type, or a clipped first line. */
function inferDocumentTitle(content) {
	const lines = content.split(/\n+/).map((line) => line.trim()).filter(Boolean);
	const heading = lines.find((line) => line.startsWith("#"));
	if (heading) return heading.replace(/^#+\s*/, "").trim();
	const named = DOCUMENT_TYPE_PATTERN.exec(content.slice(0, 1200));
	if (named?.[1]) return named[1].replace(/\s+/g, " ").replace(/^(?:This|That|The|These|Those|Any|Such)\s+/i, "").trim();
	const firstLine = lines.find((line) => line.length > 3);
	if (!firstLine) return "Untitled document";
	return firstLine.length > 64 ? `${firstLine.slice(0, 61)}…` : firstLine;
}
var CLAUSE_PATTERN = /^(?:§\s*)?(\d+(?:\.\d+)*)[.)]?\s+(.*)$/;
/**
* Splits a document into addressable chunks. Numbered clauses become their own
* chunk with a "§x" reference; unnumbered paragraphs fall back to positional
* references so every part of the document stays citable.
*/
function chunkDocument(content) {
	return content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph, index) => {
		const singleLine = paragraph.replace(/\s+/g, " ");
		const match = CLAUSE_PATTERN.exec(singleLine);
		const reference = match ? `§${match[1]}` : `¶${index + 1}`;
		const remainder = match ? match[2] ?? "" : singleLine;
		const headingMatch = /^([A-Z][A-Za-z '/&-]{2,48})[.:—-]/.exec(remainder);
		return {
			id: `chunk-${index}`,
			reference,
			heading: headingMatch?.[1]?.trim() ?? "",
			text: singleLine,
			order: index
		};
	});
}
function countByCategory(risks) {
	return risks.reduce((counts, risk) => {
		counts[risk.category] += 1;
		return counts;
	}, {
		obligation: 0,
		right: 0,
		"red-flag": 0
	});
}
var CATEGORY_LABEL = {
	obligation: "Obligation",
	right: "Right",
	"red-flag": "Red Flag"
};
var CATEGORY_PLURAL = {
	obligation: "Obligations",
	right: "Rights",
	"red-flag": "Red Flags"
};
function formatRelativeTime(isoDate) {
	const seconds = Math.max(0, Math.round((Date.now() - new Date(isoDate).getTime()) / 1e3));
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.round(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	return `${Math.round(minutes / 60)}h ago`;
}
//#endregion
//#region src/services/LLMService.ts
var SIMULATED_LATENCY_MS = 900;
function delay(value, ms = SIMULATED_LATENCY_MS) {
	return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
function id(prefix, index) {
	return `${prefix}-${index}-${Math.random().toString(36).slice(2, 8)}`;
}
/** Dummy finding templates, cycled over the document's real chunks. */
var FINDING_TEMPLATES = [
	{
		title: "Non-compete — 24 months, nationwide",
		category: "red-flag",
		severity: "high",
		summary: "Restricts you from working for any competitor anywhere in the country for two full years after you leave.",
		eli5: "Think of it like this: if you quit, this rule says you can't take a similar job at a rival company — not just near you, but anywhere in the country — for two whole years. That can be really hard to live with, so it's worth asking whether it's even allowed where you live.",
		suggestedQuestion: "Is a 24-month nationwide non-compete enforceable in my state, and can the scope be narrowed?"
	},
	{
		title: "Perpetual confidentiality",
		category: "obligation",
		severity: "medium",
		summary: "You must keep confidential information secret with no stated time limit — the duty lasts indefinitely.",
		eli5: "You promise to keep the company's secrets forever. There's no end date, so even years later you still have to stay quiet about it.",
		suggestedQuestion: "Can the confidentiality duty be capped at a fixed number of years instead of lasting forever?"
	},
	{
		title: "Termination for convenience with notice",
		category: "right",
		severity: "low",
		summary: "If the agreement is ended without cause, you are entitled to a written notice period before it takes effect.",
		eli5: "They can end the deal whenever they want, but they have to tell you in writing first and give you a set number of days.",
		suggestedQuestion: "During the notice period, do I keep full pay and benefits, and is the notice mutual?"
	},
	{
		title: "Unlimited indemnification",
		category: "red-flag",
		severity: "high",
		summary: "You agree to cover claims, damages, and legal fees with no cap on the total amount or duration.",
		eli5: "If something goes wrong and someone sues, you promise to pay for it — the claim, the damages, and their lawyers — and there's no limit on how much.",
		suggestedQuestion: "Can indemnification be made mutual and capped at the fees paid in the last 12 months?"
	},
	{
		title: "Payment and reporting duties",
		category: "obligation",
		severity: "medium",
		summary: "Sets fixed amounts and deadlines you are responsible for meeting, including any reporting obligations.",
		eli5: "You have to pay or report certain things on time. Miss the date and you may be considered in breach of the agreement.",
		suggestedQuestion: "What exactly counts as late, and what happens the first time a deadline slips?"
	},
	{
		title: "Governing law and venue",
		category: "right",
		severity: "low",
		summary: "Fixes which state's law applies and where any dispute must be heard.",
		eli5: "If there's ever an argument about this contract, it gets decided using one particular state's rules, in that state's courts.",
		suggestedQuestion: "Does the chosen state's law or venue put me at a practical disadvantage in a dispute?"
	}
];
function buildRisks(chunks) {
	return chunks.slice(0, Math.min(chunks.length, 6)).map((chunk, index) => {
		const template = FINDING_TEMPLATES[index % FINDING_TEMPLATES.length];
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
			suggestedQuestion: template.suggestedQuestion
		};
	});
}
var LLMService = {
	/**
	* Prompt: "Segment this agreement and extract obligations, rights and red
	* flags with a plain-language summary for each."
	*/
	async analyzeDocument(content) {
		const chunks = chunkDocument(content);
		const risks = buildRisks(chunks);
		return delay({
			documentTitle: inferDocumentTitle(content),
			chunks,
			risks,
			overview: "This agreement sets a fixed commitment on your side, gives the other party broad discretion to end or change the arrangement, and includes two clauses that are unusually one-sided. Review the red flags before signing.",
			analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	},
	/**
	* Prompt: "Rewrite this clause for a reader with no legal background."
	* Kept separate so live builds can fetch ELI5 text on demand.
	*/
	async explainLikeImFive(risk) {
		return delay(risk.eli5, 500);
	},
	/**
	* Prompt: "Answer the user's question using only the supplied document
	* context. Never give legal advice; suggest attorney questions instead."
	*/
	async sendChatMessage(question, _history, risks) {
		const topFlag = risks.find((risk) => risk.category === "red-flag");
		const reply = topFlag ? `Based on the document, the clause most relevant to that is ${topFlag.reference} — ${topFlag.summary} In plain terms: ${topFlag.eli5} A good question for your attorney: "${topFlag.suggestedQuestion}"` : "I couldn't tie that to a specific clause in this document. Try quoting the sentence you're unsure about and I'll break it down, then add it to your attorney checklist.";
		return delay({
			id: id("msg", Date.now()),
			role: "assistant",
			content: reply,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	},
	/**
	* Prompt: "Compile the flagged clauses and the review conversation into a
	* structured checklist of questions for a qualified attorney."
	*/
	async generatePrepSheet(documentTitle, overview, flaggedRisks, chat) {
		const questions = flaggedRisks.map((risk, index) => ({
			id: id("question", index),
			reference: risk.reference,
			clauseTitle: risk.title,
			category: risk.category,
			severity: risk.severity,
			question: risk.suggestedQuestion,
			context: risk.summary
		}));
		const chatHighlights = chat.filter((message) => message.role === "user").map((message) => message.content).slice(-6);
		return delay({
			documentTitle,
			overview,
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			questions,
			chatHighlights
		});
	}
};
//#endregion
//#region src/hooks/useLegalSession.tsx
var LegalSessionContext = createContext(null);
function LegalSessionProvider({ children }) {
	const [document, setDocument] = useState(null);
	const [analysis, setAnalysis] = useState(null);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	const [chat, setChat] = useState([]);
	const [chatPending, setChatPending] = useState(false);
	const [flaggedIds, setFlaggedIds] = useState([]);
	const analyze = useCallback(async (content, filename) => {
		setStatus("analyzing");
		setError(null);
		try {
			const result = await LLMService.analyzeDocument(content);
			const title = filename?.replace(/\.[a-z0-9]{2,8}$/i, "").trim() || inferDocumentTitle(content);
			setDocument({
				id: `doc-${Date.now()}`,
				title,
				content,
				wordCount: countWords(content),
				chunks: result.chunks,
				uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			setAnalysis({
				...result,
				documentTitle: title
			});
			setFlaggedIds(result.risks.filter((risk) => risk.category === "red-flag").map((r) => r.id));
			setChat([{
				id: "msg-intro",
				role: "assistant",
				content: `I've reviewed "${title}". ${result.overview} Ask me about any clause and I'll translate it into plain language.`,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
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
	const toggleFlag = useCallback((riskId) => {
		setFlaggedIds((current) => current.includes(riskId) ? current.filter((value) => value !== riskId) : [...current, riskId]);
	}, []);
	const isFlagged = useCallback((riskId) => flaggedIds.includes(riskId), [flaggedIds]);
	const askQuestion = useCallback(async (question) => {
		const trimmed = question.trim();
		if (!trimmed) return;
		const userMessage = {
			id: `msg-${Date.now()}`,
			role: "user",
			content: trimmed,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		setChat((current) => [...current, userMessage]);
		setChatPending(true);
		try {
			const reply = await LLMService.sendChatMessage(trimmed, [...chat, userMessage], analysis?.risks ?? []);
			setChat((current) => [...current, reply]);
		} finally {
			setChatPending(false);
		}
	}, [analysis, chat]);
	const flaggedRisks = useMemo(() => (analysis?.risks ?? []).filter((risk) => flaggedIds.includes(risk.id)), [analysis, flaggedIds]);
	const buildPrepSheet = useCallback(async () => {
		if (!analysis) return null;
		return LLMService.generatePrepSheet(analysis.documentTitle, analysis.overview, flaggedRisks, chat);
	}, [
		analysis,
		chat,
		flaggedRisks
	]);
	const value = useMemo(() => ({
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
		buildPrepSheet
	}), [
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
		buildPrepSheet
	]);
	return /* @__PURE__ */ jsx(LegalSessionContext.Provider, {
		value,
		children
	});
}
function useLegalSession() {
	const context = useContext(LegalSessionContext);
	if (!context) throw new Error("useLegalSession must be used inside a LegalSessionProvider");
	return context;
}
//#endregion
export { countByCategory as a, CATEGORY_PLURAL as i, useLegalSession as n, countWords as o, CATEGORY_LABEL as r, formatRelativeTime as s, LegalSessionProvider as t };
