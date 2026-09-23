import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { s as useLegalSession, t as CATEGORY_LABEL } from "./useLegalSession-D_I0Bgva.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LoaderCircle, f as FileDown, o as RefreshCw, p as Download, s as Printer } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prep-sheet-D_83uZ4R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrepSheetDocument({ sheet, notes = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "frost grain rounded-3xl border border-white/60 p-6 print:border-0 print:bg-white print:shadow-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-black/5 pb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-semibold tracking-[0.16em] text-brand uppercase",
						children: "Lawyer Prep-Sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-[28px] leading-tight font-semibold text-ink",
						children: "Questions for Your Attorney"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5 text-[13px] text-ink/65",
						children: [
							sheet.documentTitle,
							" · prepared ",
							new Date(sheet.generatedAt).toLocaleString()
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				"aria-labelledby": "prep-overview",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "prep-overview",
					className: "text-[13px] font-semibold text-ink",
					children: "Overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13.5px] leading-relaxed text-ink/80",
					children: sheet.overview
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				"aria-labelledby": "prep-clauses",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "prep-clauses",
					className: "text-[13px] font-semibold text-ink",
					children: [
						"Clause checklist (",
						sheet.questions.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-3",
					children: [sheet.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl border border-black/5 bg-white/65 p-4 print:bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 size-4 shrink-0 rounded-[4px] border border-ink/30",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[13.5px] font-semibold text-ink",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[12px] text-ink/60",
											children: question.reference
										}),
										" ",
										question.clauseTitle
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[13px] leading-relaxed text-ink/80",
									children: question.question
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1.5 text-[12px] leading-relaxed text-ink/60",
									children: [
										CATEGORY_LABEL[question.category],
										" · ",
										question.severity,
										" priority ·",
										" ",
										question.context
									]
								})
							] })]
						})
					}, question.id)), sheet.questions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl border border-black/5 bg-white/65 p-4 text-[13px] text-ink/65",
						children: "No clauses flagged yet. Flag clauses in the Risk Breakdown to build this checklist."
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				"aria-labelledby": "prep-chat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "prep-chat",
					className: "text-[13px] font-semibold text-ink",
					children: "From my review conversation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2",
					children: [sheet.chatHighlights.map((highlight, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3 rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] leading-relaxed text-ink/80 print:bg-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 size-4 shrink-0 rounded-[4px] border border-ink/30",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: highlight })]
					}, `${index}-${highlight.slice(0, 12)}`)), sheet.chatHighlights.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] text-ink/65",
						children: "You haven't asked the assistant anything yet."
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				"aria-labelledby": "prep-notes",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "prep-notes",
					className: "text-[13px] font-semibold text-ink",
					children: "My notes"
				}), notes.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 rounded-2xl border border-black/5 bg-white/65 p-3.5 text-[13px] leading-relaxed whitespace-pre-line text-ink/80 print:bg-white",
					children: notes.trim()
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] text-ink/60",
					children: "No notes yet — the PDF export leaves ruled space for handwritten notes."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-6 border-t border-black/5 pt-4 text-[12px] leading-relaxed text-ink/60",
				children: "This checklist provides informational assistance only and does not constitute professional legal advice. Always consult a qualified attorney."
			})
		]
	});
}
/** Renders a prep sheet as a portable markdown checklist. */
function prepSheetToMarkdown(sheet, notes = "") {
	const lines = [];
	lines.push("# Questions for Your Attorney");
	lines.push("");
	lines.push("> This checklist was produced by an informational tool. It does not constitute professional legal advice. Always consult a qualified attorney.");
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
	if (sheet.questions.length === 0) lines.push("_No clauses were flagged for review._");
	else sheet.questions.forEach((question) => {
		lines.push(`- [ ] **${question.reference} — ${question.clauseTitle}** (${CATEGORY_LABEL[question.category]}, ${question.severity} priority)`);
		lines.push(`  - Ask: ${question.question}`);
		lines.push(`  - Context: ${question.context}`);
	});
	lines.push("");
	lines.push("## From my review conversation");
	lines.push("");
	if (sheet.chatHighlights.length === 0) lines.push("_No questions were raised in the assistant chat._");
	else sheet.chatHighlights.forEach((highlight) => {
		lines.push(`- [ ] ${highlight}`);
	});
	lines.push("");
	lines.push("## My notes");
	lines.push("");
	lines.push(notes.trim() || "_No notes yet._");
	lines.push("");
	return lines.join("\n");
}
/** Triggers a client-side download of the given markdown content. */
function downloadMarkdown(filename, markdown) {
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
function slugify(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "prep-sheet";
}
var DISCLAIMER = "This tool provides informational assistance only and does not constitute professional legal advice. Always consult a qualified attorney.";
var PAGE = {
	width: 595.28,
	height: 841.89
};
var MARGIN = 56;
var CONTENT_WIDTH = PAGE.width - 112;
/** Builds a paginated, print-ready PDF of the prep sheet and downloads it. */
async function downloadPrepSheetPdf(sheet, notes) {
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const doc = new jsPDF({
		unit: "pt",
		format: "a4"
	});
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
	const ensure = (needed) => {
		if (y + needed > PAGE.height - MARGIN - 10) newPage();
	};
	const write = (text, options = {}) => {
		const size = options.size ?? 10;
		const leading = options.leading ?? size * 1.42;
		const indent = options.indent ?? 0;
		doc.setFont("helvetica", options.style ?? "normal");
		doc.setFontSize(size);
		doc.setTextColor(...options.color ?? [
			15,
			30,
			46
		]);
		const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent);
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
		doc.setLineWidth(.7);
		doc.line(MARGIN, y, PAGE.width - MARGIN, y);
		y += gap;
	};
	const checkbox = () => {
		ensure(14);
		doc.setDrawColor(90, 105, 125);
		doc.setLineWidth(.8);
		doc.rect(MARGIN, y - 8, 9, 9);
	};
	write("QUESTIONS FOR YOUR ATTORNEY", {
		size: 17,
		style: "bold",
		color: [
			22,
			50,
			74
		],
		gap: 4
	});
	write(sheet.documentTitle, {
		size: 11,
		style: "bold",
		color: [
			47,
			95,
			208
		]
	});
	write(`Prepared ${new Date(sheet.generatedAt).toLocaleString()}`, {
		size: 8.5,
		color: [
			110,
			122,
			138
		],
		gap: 6
	});
	ensure(46);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(8);
	const disclaimerLines = doc.splitTextToSize(DISCLAIMER, CONTENT_WIDTH - 24);
	const boxHeight = disclaimerLines.length * 11 + 16;
	doc.setFillColor(253, 246, 227);
	doc.setDrawColor(226, 202, 140);
	doc.rect(MARGIN, y - 2, CONTENT_WIDTH, boxHeight, "FD");
	doc.setTextColor(138, 85, 4);
	doc.text(disclaimerLines, 68, y + 11);
	y += boxHeight + 16;
	write("Overview", {
		size: 12,
		style: "bold",
		color: [
			22,
			50,
			74
		],
		gap: 2
	});
	write(sheet.overview, {
		size: 9.5,
		color: [
			45,
			60,
			78
		],
		gap: 12
	});
	write(`Flagged clauses (${sheet.questions.length})`, {
		size: 12,
		style: "bold",
		color: [
			22,
			50,
			74
		],
		gap: 4
	});
	rule(12);
	if (sheet.questions.length === 0) write("No clauses were flagged for review.", {
		size: 9.5,
		style: "italic",
		color: [
			110,
			122,
			138
		],
		gap: 12
	});
	else sheet.questions.forEach((question) => {
		ensure(60);
		checkbox();
		write(`${question.reference} — ${question.clauseTitle}`, {
			size: 10.5,
			style: "bold",
			indent: 18
		});
		write(`${CATEGORY_LABEL[question.category]} · ${question.severity} priority`, {
			size: 8,
			color: [
				110,
				122,
				138
			],
			indent: 18,
			gap: 2
		});
		write(`Ask: ${question.question}`, {
			size: 9.5,
			indent: 18,
			gap: 2
		});
		write(`Context: ${question.context}`, {
			size: 8.5,
			style: "italic",
			color: [
				80,
				95,
				112
			],
			indent: 18,
			gap: 12
		});
	});
	write(`Questions from my review conversation (${sheet.chatHighlights.length})`, {
		size: 12,
		style: "bold",
		color: [
			22,
			50,
			74
		],
		gap: 4
	});
	rule(12);
	if (sheet.chatHighlights.length === 0) write("No questions were raised in the assistant chat.", {
		size: 9.5,
		style: "italic",
		color: [
			110,
			122,
			138
		],
		gap: 12
	});
	else {
		sheet.chatHighlights.forEach((highlight) => {
			ensure(24);
			checkbox();
			write(highlight, {
				size: 9.5,
				indent: 18,
				gap: 8
			});
		});
		y += 4;
	}
	write("My notes", {
		size: 12,
		style: "bold",
		color: [
			22,
			50,
			74
		],
		gap: 4
	});
	rule(12);
	const noteText = notes.trim();
	if (noteText) noteText.split(/\n+/).forEach((line) => {
		write(line, {
			size: 9.5,
			color: [
				45,
				60,
				78
			],
			gap: 4
		});
	});
	else for (let index = 0; index < 8; index += 1) {
		ensure(22);
		doc.setDrawColor(216, 224, 236);
		doc.setLineWidth(.6);
		doc.line(MARGIN, y + 6, PAGE.width - MARGIN, y + 6);
		y += 22;
	}
	footer();
	doc.save(`${slugify(sheet.documentTitle)}-attorney-questions.pdf`);
}
function PrepSheetPage() {
	const { analysis, buildPrepSheet, flaggedRisks, chat } = useLegalSession();
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const notesId = (0, import_react.useId)();
	const exportPdf = (0, import_react.useCallback)(async () => {
		if (!sheet) return;
		setExporting(true);
		try {
			await downloadPrepSheetPdf(sheet, notes);
		} finally {
			setExporting(false);
		}
	}, [sheet, notes]);
	const generate = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const result = await buildPrepSheet();
			setSheet(result);
		} finally {
			setLoading(false);
		}
	}, [buildPrepSheet]);
	(0, import_react.useEffect)(() => {
		if (!analysis) return;
		generate();
	}, [
		analysis,
		flaggedRisks,
		chat,
		generate
	]);
	if (!analysis) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[1440px] px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "frost grain rounded-3xl border border-white/60 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[24px] font-semibold text-ink",
					children: "Nothing to prepare yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-[48ch] text-[13.5px] leading-relaxed text-ink/70",
					children: "Analyze a document first — your flagged clauses and questions build this checklist."
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
		className: "mx-auto max-w-[1440px] px-5 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap items-end justify-between gap-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-semibold tracking-[0.16em] text-brand uppercase",
						children: "Step 3 · Consultation prep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-[30px] leading-tight font-semibold text-ink",
						children: "Questions for Your Attorney"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[13px] text-ink/65",
						children: [
							flaggedRisks.length,
							" flagged clause",
							flaggedRisks.length === 1 ? "" : "s",
							" ·",
							" ",
							chat.filter((message) => message.role === "user").length,
							" question",
							chat.filter((message) => message.role === "user").length === 1 ? "" : "s",
							" from chat"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void generate(),
							className: "inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white",
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Rebuild"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => window.print(),
							className: "inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
								className: "size-4",
								"aria-hidden": "true"
							}), " Print"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !sheet,
							onClick: () => {
								if (!sheet) return;
								downloadMarkdown(`${slugify(sheet.documentTitle)}-attorney-questions.md`, prepSheetToMarkdown(sheet, notes));
							},
							className: "inline-flex items-center gap-1.5 rounded-xl border border-ink/12 bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								className: "size-4",
								"aria-hidden": "true"
							}), " Download as Markdown"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !sheet || exporting,
							onClick: () => void exportPdf(),
							className: "inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50",
							children: [exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "size-4 animate-spin",
								"aria-hidden": "true"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Download PDF"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print mb-5 max-w-[900px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: notesId,
						className: "text-[13px] font-semibold text-ink",
						children: "My notes for the consultation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[12.5px] text-ink/60",
						children: "Anything you add here is included in the PDF and markdown exports. Leave it blank and the PDF prints ruled lines to write on."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: notesId,
						value: notes,
						onChange: (event) => setNotes(event.target.value),
						rows: 4,
						placeholder: "e.g. Ask whether the non-compete is enforceable in my state…",
						className: "mt-2 w-full resize-y rounded-2xl border border-ink/12 bg-white/70 p-4 text-[13px] leading-relaxed text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-[900px]",
				"aria-busy": loading,
				children: sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrepSheetDocument, {
					sheet,
					notes
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "frost grain rounded-3xl border border-white/60 p-6 text-[13px] text-ink/70",
					children: "Compiling your checklist…"
				})
			})
		]
	});
}
//#endregion
export { PrepSheetPage as component };
