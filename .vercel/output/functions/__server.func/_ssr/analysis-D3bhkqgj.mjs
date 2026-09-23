import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { i as countByCategory, n as CATEGORY_PLURAL, o as formatRelativeTime, s as useLegalSession, t as CATEGORY_LABEL } from "./useLegalSession-D_I0Bgva.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LoaderCircle, h as ChevronDown, i as Send, m as CircleCheck, u as Flag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis-D3bhkqgj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChatPanel({ messages, pending, onSend }) {
	const [draft, setDraft] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const endRef = (0, import_react.useRef)(null);
	const inputId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
		if (!pending) inputRef.current?.focus();
	}, [messages, pending]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[460px] flex-1 space-y-3 overflow-y-auto pr-1",
			role: "log",
			"aria-label": "Assistant conversation",
			"aria-live": "polite",
			tabIndex: 0,
			children: [
				messages.map((message) => message.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[92%]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.14em] text-ink/50 uppercase",
						children: "Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] leading-relaxed text-ink/85",
						children: message.content
					})]
				}, message.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-navy px-3.5 py-2.5 text-[13px] leading-relaxed text-white",
					children: message.content
				}, message.id)),
				pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-[12.5px] font-medium text-ink/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-3.5 animate-spin",
						"aria-hidden": "true"
					}), " Thinking…"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-3 flex items-center gap-2 border-t border-black/5 pt-3",
			onSubmit: (event) => {
				event.preventDefault();
				if (!draft.trim() || pending) return;
				onSend(draft);
				setDraft("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: inputId,
					className: "sr-only",
					children: "Ask a question about this document"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: inputId,
					ref: inputRef,
					value: draft,
					onChange: (event) => setDraft(event.target.value),
					placeholder: "Ask about a clause…",
					className: "h-10 min-w-0 flex-1 rounded-xl border border-ink/12 bg-white/75 px-3 text-[13px] text-ink placeholder:text-ink/45 focus:border-brand focus:outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending || !draft.trim(),
					"aria-label": "Send question",
					className: "grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/25 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						className: "size-4",
						"aria-hidden": "true"
					})
				})
			]
		})]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-5",
		"aria-label": "Uploaded document",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-black/5 px-5 pt-4 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full bg-brand",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[13px] font-semibold text-ink",
						children: "Source Document"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] text-ink/55",
					children: fileLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[560px] space-y-4 overflow-y-auto px-5 py-4",
				role: "region",
				"aria-label": "Document text",
				tabIndex: 0,
				children: chunks.map((chunk) => {
					const risk = riskByChunk.get(chunk.id);
					const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[12.5px] leading-relaxed text-ink/75",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-ink",
								children: chunk.reference
							}),
							" ",
							chunk.text
						]
					});
					if (!risk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: body }, chunk.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: HIGHLIGHT_STYLES[risk.category],
						children: [body, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-2 text-[11px] font-semibold tracking-wide uppercase ${HIGHLIGHT_LABEL_STYLES[risk.category]}`,
							children: CATEGORY_LABEL[risk.category]
						})]
					}, chunk.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
var CATEGORY_CHIP = {
	obligation: "bg-brand/12 text-brand",
	right: "bg-accent-teal/12 text-accent-teal",
	"red-flag": "bg-danger/12 text-danger"
};
function RiskCard({ risk, flagged, onToggleFlag }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const panelId = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl border border-black/5 bg-white/60 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_CHIP[risk.category]}`,
					children: CATEGORY_LABEL[risk.category]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 text-[14px] font-semibold text-ink",
					children: risk.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono shrink-0 text-[11px] text-ink/50",
					children: risk.reference
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[13px] leading-relaxed text-ink/75",
				children: risk.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-expanded": expanded,
					"aria-controls": panelId,
					onClick: () => setExpanded((value) => !value),
					className: "inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold text-brand transition hover:text-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: `size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`,
						"aria-hidden": "true"
					}), "Explain Like I'm 5"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": flagged,
					onClick: onToggleFlag,
					className: `inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold transition ${flagged ? "text-danger hover:text-navy" : "text-ink/60 hover:text-ink"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), flagged ? "Flagged for attorney" : "Flag for attorney"]
				})]
			}),
			expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: panelId,
				className: "mt-3 rounded-xl border border-brand/15 bg-brand-soft/70 p-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] leading-relaxed text-ink/85",
					children: risk.eli5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 border-t border-brand/15 pt-2 text-[12px] leading-relaxed text-ink/65",
					children: ["Ask your attorney: ", risk.suggestedQuestion]
				})]
			}) : null
		]
	});
}
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
	const [filter, setFilter] = (0, import_react.useState)("all");
	const counts = (0, import_react.useMemo)(() => countByCategory(risks), [risks]);
	const visible = filter === "all" ? risks : risks.filter((risk) => risk.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
						value: counts.obligation,
						label: CATEGORY_PLURAL.obligation,
						className: "border-brand/15 bg-brand-soft/80 text-brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
						value: counts.right,
						label: CATEGORY_PLURAL.right,
						className: "border-accent-teal/20 bg-accent-teal/10 text-accent-teal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
						value: counts["red-flag"],
						label: CATEGORY_PLURAL["red-flag"],
						className: "border-danger/20 bg-danger/10 text-danger"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				role: "group",
				"aria-label": "Filter clauses by category",
				children: FILTERS.map((option) => {
					const active = filter === option.value;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => setFilter(option.value),
						className: `rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${active ? "bg-navy text-white" : "text-ink/65 hover:bg-white/70 hover:text-ink"}`,
						children: option.label
					}, option.value);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-separate border-spacing-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "sr-only",
						children: "Extracted clauses grouped by obligations, rights and red flags"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "sr-only",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: "Clause"
						}) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visible.map((risk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
							risk,
							flagged: isFlagged(risk.id),
							onToggleFlag: () => onToggleFlag(risk.id)
						})
					}) }, risk.id)) })
				]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-black/5 bg-white/60 p-4 text-[13px] text-ink/65",
				children: "No clauses in this category."
			}) : null
		]
	});
}
function SummaryTile({ value, label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border px-3 py-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[22px] leading-none font-semibold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] font-medium text-ink/65",
			children: label
		})]
	});
}
function AnalysisPage() {
	const { document, analysis, status, chat, chatPending, askQuestion, isFlagged, toggleFlag } = useLegalSession();
	const [tab, setTab] = (0, import_react.useState)("risks");
	if (!document || !analysis) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[1440px] px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "frost grain rounded-3xl border border-white/60 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[24px] font-semibold text-ink",
					children: "No document loaded"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink/70",
					children: status === "analyzing" ? "Your document is being analyzed…" : "Add a contract on the upload screen to see the analysis dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy",
					children: "Go to upload"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1440px] px-5 pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] font-semibold tracking-[0.16em] text-brand uppercase",
					children: "Analysis Dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-[30px] leading-tight font-semibold text-ink",
					children: analysis.documentTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[13px] text-ink/65",
					children: [
						document.wordCount.toLocaleString(),
						" words · analyzed",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-ink/75",
							children: formatRelativeTime(analysis.analyzedAt)
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "frost inline-flex items-center gap-1.5 rounded-full border border-white/50 px-3 py-1.5 text-[12px] font-semibold text-accent-teal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), " Analysis complete"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/prep-sheet",
					className: "rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy",
					children: "View Prep Sheet"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentPane, {
				chunks: document.chunks,
				risks: analysis.risks,
				fileLabel: document.title.endsWith(".md") ? ".md" : ".txt"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "frost grain flex flex-col overflow-hidden rounded-3xl border border-white/60 lg:col-span-7",
				"aria-label": "Analysis results",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-black/5 px-4 pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							role: "tablist",
							"aria-label": "Analysis tabs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: "risks",
								active: tab === "risks",
								onSelect: () => setTab("risks"),
								label: "Risk Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								id: "chat",
								active: tab === "chat",
								onSelect: () => setTab("chat"),
								label: "AI Chat"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "panel-risks",
						role: "tabpanel",
						"aria-labelledby": "tab-risks",
						hidden: tab !== "risks",
						className: "max-h-[600px] overflow-y-auto p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBreakdown, {
							risks: analysis.risks,
							isFlagged,
							onToggleFlag: toggleFlag
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "panel-chat",
						role: "tabpanel",
						"aria-labelledby": "tab-chat",
						hidden: tab !== "chat",
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
