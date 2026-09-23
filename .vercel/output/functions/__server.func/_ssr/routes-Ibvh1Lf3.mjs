import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as CheckboxIndicator, o as require_react, r as Slot, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as countWords, s as useLegalSession } from "./useLegalSession-D_I0Bgva.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LoaderCircle, d as FileText, g as Check, l as ListChecks, r as ShieldCheck, t as Upload } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ibvh1Lf3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
/**
* Client-side text extraction for uploaded documents.
* Plain text formats are read directly; PDFs are parsed lazily so the parser
* is only downloaded when a user actually drops a PDF.
*/
var ACCEPTED_EXTENSIONS = [
	".txt",
	".md",
	".markdown",
	".rtf",
	".csv",
	".json",
	".log",
	".pdf"
];
var ACCEPT_ATTRIBUTE = ".txt,.md,.markdown,.rtf,.csv,.json,.log,.pdf,text/plain,text/markdown,application/pdf";
function isAcceptedDocument(file) {
	const name = file.name.toLowerCase();
	return ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension));
}
function isPdf(file) {
	return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}
/** Strips RTF control words so pasted/exported rich text stays readable. */
function stripRtf(input) {
	return input.replace(/\\'[0-9a-f]{2}/gi, "").replace(/\\[a-z]+-?\d* ?/gi, "").replace(/[{}]/g, "").replace(/\n{3,}/g, "\n\n").trim();
}
async function extractPdfText(file) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	const workerUrl = (await import("./pdf.worker.min-CA4SejP6.mjs")).default;
	pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
	const data = new Uint8Array(await file.arrayBuffer());
	const pdf = await pdfjs.getDocument({ data }).promise;
	const pages = [];
	for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
		const textContent = await (await pdf.getPage(pageNumber)).getTextContent();
		let line = "";
		const lines = [];
		for (const item of textContent.items) {
			if (!("str" in item)) continue;
			line += item.str;
			if (item.hasEOL) {
				lines.push(line.trim());
				line = "";
			}
		}
		if (line.trim()) lines.push(line.trim());
		pages.push(lines.join("\n").replace(/\n{2,}/g, "\n\n").trim());
	}
	await pdf.cleanup();
	return pages.filter(Boolean).join("\n\n");
}
async function extractDocumentText(file) {
	if (!isAcceptedDocument(file)) throw new Error(`Unsupported file. Try ${ACCEPTED_EXTENSIONS.join(", ")} — or paste the text below.`);
	if (isPdf(file)) {
		const text = await extractPdfText(file);
		if (text.trim().length < 40) throw new Error("That PDF has no selectable text (it may be a scan). Paste the text below instead.");
		return {
			text,
			filename: file.name
		};
	}
	const raw = await file.text();
	return {
		text: file.name.toLowerCase().endsWith(".rtf") ? stripRtf(raw) : raw,
		filename: file.name
	};
}
function UploadDropzone({ isAnalyzing, onAnalyze }) {
	const [content, setContent] = (0, import_react.useState)("");
	const [filename, setFilename] = (0, import_react.useState)(void 0);
	const [consented, setConsented] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [fileError, setFileError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const textareaId = (0, import_react.useId)();
	const consentId = (0, import_react.useId)();
	const [reading, setReading] = (0, import_react.useState)(false);
	const readFile = (0, import_react.useCallback)(async (file) => {
		setFileError(null);
		setReading(true);
		try {
			const { text, filename: name } = await extractDocumentText(file);
			setContent(text);
			setFilename(name);
		} catch (error) {
			setFileError(error instanceof Error ? error.message : "Could not read that file.");
		} finally {
			setReading(false);
		}
	}, []);
	const canAnalyze = consented && content.trim().length > 40 && !isAnalyzing && !reading;
	const words = countWords(content);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "frost grain rounded-3xl border border-white/60 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (event) => {
					event.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (event) => {
					event.preventDefault();
					setDragging(false);
					const file = event.dataTransfer.files?.[0];
					if (file) readFile(file);
				},
				className: `rounded-2xl border-2 border-dashed p-6 text-center transition ${dragging ? "border-brand bg-brand-soft/70" : "border-ink/15 bg-white/45"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto grid size-11 place-items-center rounded-xl bg-brand-soft text-brand",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14px] font-semibold text-ink",
						children: "Drop a PDF, .txt, .md or .rtf document here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] text-ink/60",
						children: "PDFs are read in your browser — nothing is sent to a server in this build."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "mt-4 rounded-xl border-ink/15 bg-white/70 text-[13px] font-semibold text-navy hover:bg-white",
						onClick: () => inputRef.current?.click(),
						children: "Choose a file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: ACCEPT_ATTRIBUTE,
						className: "sr-only",
						"aria-label": "Upload a PDF, text, markdown or rich text document",
						onChange: (event) => {
							const file = event.target.files?.[0];
							if (file) readFile(file);
						}
					}),
					fileError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-3 text-[12.5px] font-medium text-danger",
						children: fileError
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: textareaId,
						className: "text-[13px] font-semibold text-ink",
						children: "Or paste the document text"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: textareaId,
						value: content,
						onChange: (event) => {
							setContent(event.target.value);
							setFilename(void 0);
						},
						rows: 9,
						placeholder: "1. Term. This Agreement is entered into…\n\n4.2 Non-Compete. During the term…",
						className: "font-mono mt-2 w-full resize-y rounded-2xl border border-ink/12 bg-white/70 p-4 text-[12.5px] leading-relaxed text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-2 text-[12px] text-ink/55",
						children: [filename ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								className: "size-3.5",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: filename }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "·"
							})
						] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [words.toLocaleString(), " words"] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					id: consentId,
					checked: consented,
					onCheckedChange: (value) => setConsented(value === true),
					className: "mt-0.5 border-amber/60 data-[state=checked]:border-navy data-[state=checked]:bg-navy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: consentId,
					className: "text-[13px] leading-relaxed font-medium text-ink/80",
					children: "I agree this is not legal advice, and I will confirm anything important with a qualified attorney."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					disabled: !canAnalyze,
					onClick: () => onAnalyze(content, filename),
					className: "rounded-xl bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-brand/25 hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50",
					children: isAnalyzing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
						className: "size-4 animate-spin",
						"aria-hidden": "true"
					}), " Analyzing…"] }) : "Analyze document"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12.5px] text-ink/55",
					"aria-live": "polite",
					children: consented ? content.trim().length > 40 ? "Ready to analyze." : "Add at least a paragraph of document text." : "Tick the acknowledgement above to enable analysis."
				})]
			})
		]
	});
}
function UploadPage() {
	const { analyze, status, error } = useLegalSession();
	const navigate = useNavigate();
	const handleAnalyze = async (content, filename) => {
		await analyze(content, filename);
		navigate({ to: "/analysis" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1440px] px-5 pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] font-semibold tracking-[0.16em] text-brand uppercase",
					children: "Step 1 · Add your document"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-[30px] leading-tight font-semibold text-ink",
					children: "Understand the contract before you sign it"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-[62ch] text-[14px] leading-relaxed text-ink/70",
					children: "Paste or drop the text of an agreement. Veritas Prep separates what you must do, what you're entitled to, and what deserves a closer look — then builds a checklist you can take to a qualified attorney."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadDropzone, {
					isAnalyzing: status === "analyzing",
					onAnalyze: handleAnalyze
				}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-3 rounded-2xl border border-danger/25 bg-danger/10 p-3.5 text-[13px] font-medium text-danger",
					children: error
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "frost grain space-y-4 rounded-3xl border border-white/60 p-6 lg:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[13px] font-semibold text-ink",
						children: "What happens next"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						title: "Clause-by-clause reading",
						body: "Your document is split into numbered clauses so every finding points back to exact wording."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						title: "Obligations, rights, red flags",
						body: "Each clause is categorised, with an Explain-Like-I'm-5 translation on demand."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {
							className: "size-4",
							"aria-hidden": "true"
						}),
						title: "A prep sheet for your lawyer",
						body: "Flagged clauses and your questions compile into a printable checklist you can download."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-t border-black/5 pt-4 text-[12px] leading-relaxed text-ink/60",
						children: "Text and markdown only. Nothing leaves your browser in this build."
					})
				]
			})]
		})]
	});
}
function Step({ icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand",
			"aria-hidden": "true",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] font-semibold text-ink",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-[12.5px] leading-relaxed text-ink/70",
			children: body
		})] })]
	});
}
//#endregion
export { UploadPage as component };
