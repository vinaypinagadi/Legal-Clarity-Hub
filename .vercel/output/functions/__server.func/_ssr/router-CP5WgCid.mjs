import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as LegalSessionProvider } from "./useLegalSession-D_I0Bgva.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Scale, n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CP5WgCid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Ch2qraAk.css";
function Logo({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 100 100",
		className: cn("h-auto w-full", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "brandGradient",
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "100%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#2f5fd0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#1a365d"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "accentGradient",
				x1: "0%",
				y1: "100%",
				x2: "100%",
				y2: "0%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#eaf0fd"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#ffffff"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100",
				height: "100",
				rx: "24",
				fill: "url(#brandGradient)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				strokeWidth: "0",
				transform: "translate(20, 20)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 10 0 L 25 0 L 35 45 L 20 45 Z",
						fill: "url(#accentGradient)",
						className: "animate-in slide-in-from-top-4 duration-700 ease-out fill-mode-both",
						style: { animationDelay: "100ms" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 50 0 L 35 45 L 20 45 L 35 0 Z",
						fill: "#ffffff",
						opacity: "0.9",
						className: "animate-in slide-in-from-top-4 duration-700 ease-out fill-mode-both",
						style: { animationDelay: "200ms" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						points: "27.5,50 35,60 27.5,70 20,60",
						fill: "url(#accentGradient)",
						className: "animate-in zoom-in duration-500 ease-out fill-mode-both",
						style: { animationDelay: "400ms" }
					})
				]
			})
		]
	});
}
var NAV_ITEMS = [
	{
		to: "/",
		label: "Upload"
	},
	{
		to: "/analysis",
		label: "Analysis"
	},
	{
		to: "/prep-sheet",
		label: "Prep Sheet"
	}
];
function AppHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "no-print mx-auto max-w-[1440px] px-5 pt-4 pb-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "frost grain flex items-center gap-4 rounded-2xl border border-white/60 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2.5 rounded-lg",
				"aria-label": "Veritas Prep home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					className: "size-9 shadow-lg shadow-brand/30 rounded-[10px]",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display block text-[17px] font-semibold text-ink",
						children: "Veritas Prep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] font-medium tracking-[0.14em] text-ink/55 uppercase",
						children: "Legal Prep Assistant"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "ml-auto flex items-center gap-1",
				"aria-label": "Primary",
				children: NAV_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					className: "rounded-lg px-3 py-1.5 text-[13px] font-medium text-ink/65 transition hover:bg-white/60 hover:text-ink",
					activeOptions: { exact: item.to === "/" },
					activeProps: {
						className: "rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white bg-navy shadow-sm hover:bg-navy hover:text-white",
						"aria-current": "page"
					},
					children: item.label
				}, item.to))
			})]
		})
	});
}
/**
* Non-dismissible, sticky legal disclaimer. Present on every screen.
*/
function DisclaimerBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "region",
		"aria-label": "Legal disclaimer",
		className: "sticky top-0 z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "frost-strong grain border-b border-white/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[13px] leading-snug font-medium text-ink/80",
					children: [
						"This tool provides",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: "informational assistance only"
						}),
						" and does not constitute professional legal advice. Always consult a qualified attorney."
					]
				})]
			})
		})
	});
}
function Preloader({ onComplete }) {
	const [isFading, setIsFading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fadeTimer = setTimeout(() => {
			setIsFading(true);
		}, 2e3);
		const completeTimer = setTimeout(() => {
			onComplete();
		}, 2500);
		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(completeTimer);
		};
	}, [onComplete]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center animate-in zoom-in-95 duration-1000 ease-out fill-mode-both",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "w-24 h-24 shadow-2xl shadow-brand/20 rounded-3xl mb-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-display font-semibold tracking-tight text-foreground/90",
						children: "Veritas Prep"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-0.5 w-32 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full origin-left bg-brand animate-in slide-in-from-left-full duration-[2000ms] ease-in-out fill-mode-both" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mt-2 opacity-80 animate-pulse",
						children: "Loading Workspace"
					})
				]
			})]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("Root component error:", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Veritas Prep — Legal Prep Assistant" },
			{
				name: "description",
				content: "Informational assistance for understanding contracts and preparing questions for a qualified attorney."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	pendingComponent: PendingComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function PendingComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[100dvh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "h-12 w-12 text-primary animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin",
					style: {
						width: "4rem",
						height: "4rem",
						margin: "-0.5rem"
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold tracking-tight text-foreground animate-pulse",
					children: "Preparing Legal Insights"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Please wait while we load your workspace."
				})]
			})]
		})
	});
}
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	const [showPreloader, setShowPreloader] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSessionProvider, { children: [
			showPreloader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preloader, { onComplete: () => setShowPreloader(false) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisclaimerBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
		] })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-Ibvh1Lf3.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Veritas Prep — Understand your contract before you sign" },
		{
			name: "description",
			content: "Paste a contract in plain text and get obligations, rights and red flags explained in everyday language, plus a checklist of questions for your attorney."
		},
		{
			property: "og:title",
			content: "Veritas Prep — Legal Prep Assistant"
		},
		{
			property: "og:description",
			content: "Simplify complex legal documents, surface risky clauses, and prepare for a consultation with a qualified attorney."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./analysis-D3bhkqgj.mjs");
var Route$1 = createFileRoute("/analysis")({
	head: () => ({ meta: [
		{ title: "Analysis dashboard — Veritas Prep" },
		{
			name: "description",
			content: "Read your agreement side by side with categorised obligations, rights and red flags, plus plain-language explanations and an assistant chat."
		},
		{
			property: "og:title",
			content: "Analysis dashboard — Veritas Prep"
		},
		{
			property: "og:description",
			content: "Clause-level risk breakdown with Explain-Like-I'm-5 translations and an assistant you can question."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./prep-sheet-D_83uZ4R.mjs");
var Route = createFileRoute("/prep-sheet")({
	head: () => ({ meta: [
		{ title: "Questions for Your Attorney — Veritas Prep" },
		{
			name: "description",
			content: "A printable checklist compiled from the clauses you flagged and the questions you asked, ready for a consultation with a qualified attorney."
		},
		{
			property: "og:title",
			content: "Questions for Your Attorney — Veritas Prep"
		},
		{
			property: "og:description",
			content: "Download or print a structured checklist of the contract questions worth raising with a lawyer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AnalysisRoute: Route$1.update({
		id: "/analysis",
		path: "/analysis",
		getParentRoute: () => Route$3
	}),
	PrepSheetRoute: Route.update({
		id: "/prep-sheet",
		path: "/prep-sheet",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
