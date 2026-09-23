import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/ui/Logo";
const NAV_ITEMS = [
  { to: "/", label: "Upload" },
  { to: "/analysis", label: "Analysis" },
  { to: "/prep-sheet", label: "Prep Sheet" },
] as const;

export function AppHeader() {
  return (
    <header className="no-print mx-auto max-w-[1440px] px-5 pt-4 pb-2">
      <div className="frost grain flex items-center gap-4 rounded-2xl border border-white/60 px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg"
          aria-label="Veritas Prep home"
        >
          <Logo className="size-9 shadow-lg shadow-brand/30 rounded-[10px]" aria-hidden="true" />
          <span className="leading-tight">
            <span className="font-display block text-[17px] font-semibold text-ink">
              Veritas Prep
            </span>
            <span className="block text-[11px] font-medium tracking-[0.14em] text-ink/55 uppercase">
              Legal Prep Assistant
            </span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-1" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-ink/65 transition hover:bg-white/60 hover:text-ink"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{
                className:
                  "rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white bg-navy shadow-sm hover:bg-navy hover:text-white",
                "aria-current": "page",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
