import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out slightly before the 2.5s mark for a smooth transition
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Completely remove the preloader at 2.5s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-in zoom-in-95 duration-1000 ease-out fill-mode-both">
        <Logo className="w-24 h-24 shadow-2xl shadow-brand/20 rounded-3xl mb-8" />
        
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-2xl font-display font-semibold tracking-tight text-foreground/90">
            Veritas Prep
          </h2>
          <div className="flex items-center gap-2">
            {/* Elegant thin progress line */}
            <div className="h-0.5 w-32 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-full origin-left bg-brand animate-in slide-in-from-left-full duration-[2000ms] ease-in-out fill-mode-both" />
            </div>
          </div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mt-2 opacity-80 animate-pulse">
            Loading Workspace
          </p>
        </div>
      </div>
    </div>
  );
}
