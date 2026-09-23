import { a as countByCategory, i as CATEGORY_PLURAL, n as useLegalSession, r as CATEGORY_LABEL, s as formatRelativeTime } from "./useLegalSession-D_I0Bgva.js";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, ChevronDown, Flag, Loader2, Send } from "lucide-react";
//#region src/components/analysis/ChatPanel.tsx
function ChatPanel({ messages, pending, onSend }) {
	const [draft, setDraft] = useState("");
	const inputRef = useRef(null);
	const endRef = useRef(null);
	const inputId = useId();
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	useEffect(() => {
		endRef.current?.scrollIntoView({ block: "end" });
		if (!pending) inputRef.current?.focus();
	}, [messages, pending]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-h-[460px] flex-1 space-y-3 overflow-y-auto pr-1",
			role: "log",
			"aria-label": "Assistant conversation",
			"aria-live": "polite",
			tabIndex: 0,
			children: [
				messages.map((message) => message.role === "assistant" ? /* @__PURE__ */ jsxs("div", {
					className: "max-w-[92%]",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-[11px] font-semibold tracking-[0.14em] text-ink/50 uppercase",
						children: "Assistant"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-[13px] leading-relaxed text-ink/85",
						children: message.content
					})]
				}, message.id) : /* @__PURE__ */ jsx("div", {
					className: "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-navy px-3.5 py-2.5 text-[13px] leading-relaxed text-white",
					children: message.content
				}, message.id)),
				pending ? /* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-2 text-[12.5px] font-medium text-ink/60",
					children: [/* @__PURE__ */ jsx(Loader2, {
						className: "size-3.5 animate-spin",
						"aria-hidden": "true"
					}), " Thinking…"]
				}) : null,
				/* @__PURE__ */ jsx("div", { ref: endRef })
			]
		}), /* @__PURE__ */ jsxs("form", {
			className: "mt-3 flex items-center gap-2 border-t border-black/5 pt-3",
			onSubmit: (event) => {
				event.preventDefault();
				if (!draft.trim() || pending) return;
				onSend(draft);
				setDraft("");
			},
			children: [
				/* @__PURE__ */ jsx("label", {
					htmlFor: inputId,
					className: "sr-only",
					children: "Ask a question about this document"
				}),
				/* @__PURE__ */ jsx("input", {
					id: inputId,
					ref: inputRef,
					value: draft,
					onChange: (event) => setDraft(event.target.value),
					placeholder: "Ask about a clause…",
					className: "h-10 min-w-0 flex-1 rounded-xl border border-ink/12 bg-white/75 px-3 text-[13px] text-ink placeholder:text-ink/45 focus:border-brand focus:outline-none"
				}),
				/* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: pending || !draft.trim(),
					"aria-label": "Send question",
					className: "grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50",
					children: /* @__PURE__ */ jsx(Send, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/components/analysis/DocumentPane.tsx
var HIGHLIGHT_STYLES = {
	"red-flag": "rounded-xl bg-danger/10 p-3 outline-1 outline-danger/30",
	obligation: "rounded-xl bg-amber/10 p-3 outline-1 outline-amber/30",
	right: "rounded-xl bg-accent-teal/10 p-3 outline-1 outline-accent-teal/30"
};
var HIGHLIGHT_LABEL_STYLES = {
	"red-flag": "text-danger",
	obligation: "text-amber",
	right: "text-accent-teal"
};
function DocumentPane({ chunks, risks, fileLabel }) {
	const riskByChunk = new Map(risks.map((risk) => [risk.chunkId, risk]));
	return /* @__PURE__ */ jsxs("section", {
		className: "frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-5",
		"aria-label": "Uploaded document",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-black/5 px-5 pt-4 pb-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "size-2 rounded-full bg-brand",
						"aria-hidden": "true"
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-[13px] font-semibold text-ink",
						children: "Source Document"
					})]
				}), /* @__PURE__ */ jsx("span", {
					className: "font-mono text-[11px] text-ink/55",
					children: fileLabel
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "max-h-[560px] space-y-4 overflow-y-auto px-5 py-4",
				role: "region",
				"aria-label": "Document text",
				tabIndex: 0,
				children: chunks.map((chunk) => {
					const risk = riskByChunk.get(chunk.id);
					const body = /* @__PURE__ */ jsxs("p", {
						className: "font-mono text-[12.5px] leading-relaxed text-ink/75",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-ink",
								children: chunk.reference
							}),
							" ",
							chunk.text
						]
					});
					if (!risk) return /* @__PURE__ */ jsx("div", { children: body }, chunk.id);
					return /* @__PURE__ */ jsxs("div", {
						className: HIGHLIGHT_STYLES[risk.category],
						children: [body, /* @__PURE__ */ jsx("p", {
							className: `mt-2 text-[11px] font-semibold tracking-wide uppercase ${HIGHLIGHT_LABEL_STYLES[risk.category]}`,
							children: CATEGORY_LABEL[risk.category]
						})]
					}, chunk.id);
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "border-t border-black/5 bg-white/40 px-5 py-3 text-[11px] text-ink/55",
				children: [
					"Scroll to review full document · ",
					risks.length,
					" clauses identified"
				]
			})
		]
	});
}
//#endregion
//#region src/components/analysis/RiskCard.tsx
var CATEGORY_CHIP = {
	obligation: "bg-brand/12 text-brand",
	right: "bg-accent-teal/12 text-accent-teal",
	"red-flag": "bg-danger/12 text-danger"
};
function RiskCard({ risk, flagged, onToggleFlag }) {
	const [expanded, setExpanded] = useState(false);
	const panelId = useId();
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-2xl border border-black/5 bg-white/60 p-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_CHIP[risk.category]}`,
					children: CATEGORY_LABEL[risk.category]
				}), /* @__PURE__ */ jsx("h3", {
					className: "mt-2 text-[14px] font-semibold text-ink",
					children: risk.title
				})] }), /* @__PURE__ */ jsx("span", {
					className: "font-mono shrink-0 text-[11px] text-ink/50",
					children: risk.reference
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-[13px] leading-relaxed text-ink/75",
				children: risk.summary
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					"aria-expanded": expanded,
					"aria-controls": panelId,
					onClick: () => setExpanded((value) => !value),
					className: "inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold text-brand transition hover:text-navy",
					children: [/* @__PURE__ */ jsx(ChevronDown, {
						className: `size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`,
						"aria-hidden": "true"
					}), "Explain Like I'm 5"]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					"aria-pressed": flagged,
					onClick: onToggleFlag,
					className: `inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold transition ${flagged ? "text-danger hover:text-navy" : "text-ink/60 hover:text-ink"}`,
					children: [/* @__PURE__ */ jsx(Flag, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), flagged ? "Flagged for attorney" : "Flag for attorney"]
				})]
			}),
			expanded ? /* @__PURE__ */ jsxs("div", {
				id: panelId,
				className: "mt-3 rounded-xl border border-brand/15 bg-brand-soft/70 p-3.5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-[13px] leading-relaxed text-ink/85",
					children: risk.eli5
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-2 border-t border-brand/15 pt-2 text-[12px] leading-relaxed text-ink/65",
					children: ["Ask your attorney: ", risk.suggestedQuestion]
				})]
			}) : null
		]
	});
}
//#endregion
//#region src/components/analysis/RiskBreakdown.tsx
var FILTERS = [
	{
		value: "all",
		label: "All clauses"
	},
	{
		value: "obligation",
		label: "Obligations"
	},
	{
		value: "right",
		label: "Rights"
	},
	{
		value: "red-flag",
		label: "Red Flags"
	}
];
function RiskBreakdown({ risks, isFlagged, onToggleFlag }) {
	const [filter, setFilter] = useState("all");
	const counts = useMemo(() => countByCategory(risks), [risks]);
	const visible = filter === "all" ? risks : risks.filter((risk) => risk.category === filter);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ jsx(SummaryTile, {
						value: counts.obligation,
						label: CATEGORY_PLURAL.obligation,
						className: "border-brand/15 bg-brand-soft/80 text-brand"
					}),
					/* @__PURE__ */ jsx(SummaryTile, {
						value: counts.right,
						label: CATEGORY_PLURAL.right,
						className: "border-accent-teal/20 bg-accent-teal/10 text-accent-teal"
					}),
					/* @__PURE__ */ jsx(SummaryTile, {
						value: counts["red-flag"],
						label: CATEGORY_PLURAL["red-flag"],
						className: "border-danger/20 bg-danger/10 text-danger"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-1",
				role: "group",
				"aria-label": "Filter clauses by category",
				children: FILTERS.map((option) => {
					const active = filter === option.value;
					return /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => setFilter(option.value),
						className: `rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${active ? "bg-navy text-white" : "text-ink/65 hover:bg-white/70 hover:text-ink"}`,
						children: option.label
					}, option.value);
				})
			}),
			/* @__PURE__ */ jsxs("table", {
				className: "w-full border-separate border-spacing-y-3",
				children: [
					/* @__PURE__ */ jsx("caption", {
						className: "sr-only",
						children: "Extracted clauses grouped by obligations, rights and red flags"
					}),
					/* @__PURE__ */ jsx("thead", {
						className: "sr-only",
						children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("th", {
							scope: "col",
							children: "Clause"
						}) })
					}),
					/* @__PURE__ */ jsx("tbody", { children: visible.map((risk) => /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						className: "p-0",
						children: /* @__PURE__ */ jsx(RiskCard, {
							risk,
							flagged: isFlagged(risk.id),
							onToggleFlag: () => onToggleFlag(risk.id)
						})
					}) }, risk.id)) })
				]
			}),
			visible.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "rounded-2xl border border-black/5 bg-white/60 p-4 text-[13px] text-ink/65",
				children: "No clauses in this category."
			}) : null
		]
	});
}
function SummaryTile({ value, label, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `rounded-xl border px-3 py-2.5 ${className}`,
		children: [/* @__PURE__ */ jsx("p", {
			className: "font-display text-[22px] leading-none font-semibold",
			children: value
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[11px] font-medium text-ink/65",
			children: label
		})]
	});
}
//#endregion
//#region src/routes/analysis.tsx?tsr-split=component
function AnalysisPage() {
	const { document, analysis, status, chat, chatPending, askQuestion, isFlagged, toggleFlag } = useLegalSession();
	const [tab, setTab] = useState("risks");
	if (!document || !analysis) return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-[1440px] px-5 py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "frost grain rounded-3xl border border-white/60 p-8 text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-[24px] font-semibold text-ink",
					children: "No document loaded"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink/70",
					children: status === "analyzing" ? "Your document is being analyzed…" : "Add a contract on the upload screen to see the analysis dashboard."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy",
					children: "Go to upload"
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-[1440px] px-5 pb-10",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-end justify-between gap-4 py-5",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[12px] font-semibold tracking-[0.16em] text-brand uppercase",
					children: "Analysis Dashboard"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display mt-1 text-[30px] leading-tight font-semibold text-ink",
					children: analysis.documentTitle
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-[13px] text-ink/65",
					children: [
						document.wordCount.toLocaleString(),
						" words · analyzed",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-mono text-ink/75",
							children: formatRelativeTime(analysis.analyzedAt)
						})
					]
				})
			] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "frost inline-flex items-center gap-1.5 rounded-full border border-white/50 px-3 py-1.5 text-[12px] font-semibold text-accent-teal",
					children: [/* @__PURE__ */ jsx(CheckCircle2, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), " Analysis complete"]
				}), /* @__PURE__ */ jsx(Link, {
					to: "/prep-sheet",
					className: "rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy",
					children: "View Prep Sheet"
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
			children: [/* @__PURE__ */ jsx(DocumentPane, {
				chunks: document.chunks,
				risks: analysis.risks,
				fileLabel: document.title.endsWith(".md") ? ".md" : ".txt"
			}), /* @__PURE__ */ jsxs("section", {
				className: "frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-7",
				"aria-label": "Analysis results",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "border-b border-black/5 px-4 pt-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1",
							role: "tablist",
							"aria-label": "Analysis tabs",
							children: [/* @__PURE__ */ jsx(TabButton, {
								id: "risks",
								active: tab === "risks",
								onSelect: () => setTab("risks"),
								label: "Risk Breakdown"
							}), /* @__PURE__ */ jsx(TabButton, {
								id: "chat",
								active: tab === "chat",
								onSelect: () => setTab("chat"),
								label: "AI Chat"
							})]
						})
					}),
					/* @__PURE__ */ jsx("div", {
						id: "panel-risks",
						role: "tabpanel",
						"aria-labelledby": "tab-risks",
						hidden: tab !== "risks",
						className: "max-h-[600px] overflow-y-auto p-4",
						children: /* @__PURE__ */ jsx(RiskBreakdown, {
							risks: analysis.risks,
							isFlagged,
							onToggleFlag: toggleFlag
						})
					}),
					/* @__PURE__ */ jsx("div", {
						id: "panel-chat",
						role: "tabpanel",
						"aria-labelledby": "tab-chat",
						hidden: tab !== "chat",
						className: "p-4",
						children: /* @__PURE__ */ jsx(ChatPanel, {
							messages: chat,
							pending: chatPending,
							onSend: (question) => void askQuestion(question)
						})
					})
				]
			})]
		})]
	});
}
function TabButton({ id, label, active, onSelect }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		role: "tab",
		id: `tab-${id}`,
		"aria-selected": active,
		"aria-controls": `panel-${id}`,
		onClick: onSelect,
		className: `rounded-lg px-4 py-2.5 text-[13px] transition ${active ? "bg-navy/8 font-semibold text-ink" : "font-medium text-ink/60 hover:text-ink"}`,
		children: label
	});
}
//#endregion
export { AnalysisPage as component };
