import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-auto w-full", className)}
      {...props}
    >
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2f5fd0" />
          <stop offset="100%" stopColor="#1a365d" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eaf0fd" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* Background shape */}
      <rect width="100" height="100" rx="24" fill="url(#brandGradient)" />

      {/* Abstract Scales / Pillars forming a V */}
      <g strokeWidth="0" transform="translate(20, 20)">
        {/* Left pillar (part of V) */}
        <path
          d="M 10 0 L 25 0 L 35 45 L 20 45 Z"
          fill="url(#accentGradient)"
          className="animate-in slide-in-from-top-4 duration-700 ease-out fill-mode-both"
          style={{ animationDelay: "100ms" }}
        />
        
        {/* Right pillar (part of V) */}
        <path
          d="M 50 0 L 35 45 L 20 45 L 35 0 Z"
          fill="#ffffff"
          opacity="0.9"
          className="animate-in slide-in-from-top-4 duration-700 ease-out fill-mode-both"
          style={{ animationDelay: "200ms" }}
        />

        {/* Center Balance point / Diamond */}
        <polygon
          points="27.5,50 35,60 27.5,70 20,60"
          fill="url(#accentGradient)"
          className="animate-in zoom-in duration-500 ease-out fill-mode-both"
          style={{ animationDelay: "400ms" }}
        />
      </g>
    </svg>
  );
}
