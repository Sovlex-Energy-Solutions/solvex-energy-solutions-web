"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import gsap from "gsap";

interface CinematicRevealContextType {
  isRevealed: boolean;
  isComplete: boolean;
  replay: () => void;
}

const CinematicRevealContext = createContext<CinematicRevealContextType>({
  isRevealed: true,
  isComplete: true,
  replay: () => {},
});

export const useCinematicReveal = () => useContext(CinematicRevealContext);

export function CinematicRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const isAnimatingRef = useRef(false);
  const activeCtxRef = useRef<gsap.Context | null>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const restoreScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const lockScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const playSequence = useCallback(() => {
    // Clean up any existing GSAP context and fallback timer
    if (activeCtxRef.current) {
      activeCtxRef.current.revert();
      activeCtxRef.current = null;
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    // Check reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsRevealed(true);
      setIsComplete(true);
      restoreScroll();
      return;
    }

    if (overlayRef.current) {
      overlayRef.current.style.display = "flex";
      overlayRef.current.style.pointerEvents = "auto";
    }

    lockScroll();
    setIsRevealed(false);
    setIsComplete(false);
    isAnimatingRef.current = true;

    // Safety fallback: ensure page is unblocked after 3.2s under any edge case
    fallbackTimerRef.current = setTimeout(() => {
      setIsRevealed(true);
      setIsComplete(true);
      restoreScroll();
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
      }
      isAnimatingRef.current = false;
    }, 3200);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = null;
          }
          setIsComplete(true);
          restoreScroll();
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
          isAnimatingRef.current = false;
          try {
            sessionStorage.setItem("solvex_intro_seen", "1");
          } catch {}
        },
      });

      // 1. Initial State Setup
      if (overlayRef.current) {
        gsap.set(overlayRef.current, {
          scaleY: 1,
          transformOrigin: "top center",
          autoAlpha: 1,
        });
      }
      if (emblemRef.current) gsap.set(emblemRef.current, { scale: 0.85, opacity: 0 });
      if (wordmarkRef.current) gsap.set(wordmarkRef.current, { yPercent: 110, opacity: 0 });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 12, opacity: 0 });
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0 });
      if (progressBarRef.current) gsap.set(progressBarRef.current, { width: "0%" });
      if (counterTextRef.current) counterTextRef.current.textContent = "000%";

      // 2. Loading Animation (0% -> 100% in 0.85s)
      const progressTracker = { pct: 0 };
      tl.to(
        progressTracker,
        {
          pct: 100,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.round(progressTracker.pct);
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${current}%`;
            }
            if (counterTextRef.current) {
              counterTextRef.current.textContent = `${String(current).padStart(3, "0")}%`;
            }
          },
        },
        0
      );

      // 3. Brand Entrance (Played ONCE seamlessly, no re-triggering)
      if (emblemRef.current) {
        tl.to(
          emblemRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          0.05
        );
      }

      if (wordmarkRef.current) {
        tl.to(
          wordmarkRef.current,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0.12
        );
      }

      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          0.24
        );
      }

      if (taglineRef.current) {
        tl.to(
          taglineRef.current,
          {
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          0.36
        );
      }

      // 4. Brief Hold at 100% (0.85s to 1.05s)
      // Fade out internal telemetry and branding smoothly before curtain sweep
      const fadeOutTargets = [
        centerContentRef.current,
        headerRef.current,
        footerRef.current,
      ].filter(Boolean);

      if (fadeOutTargets.length > 0) {
        tl.to(
          fadeOutTargets,
          {
            opacity: 0,
            y: -24,
            duration: 0.35,
            ease: "power2.in",
          },
          1.05
        );
      }

      // 5. Trigger Hero & Navbar Entrance right as the curtain begins lifting (at 1.25s)
      tl.call(
        () => {
          setIsRevealed(true);
        },
        undefined,
        1.25
      );

      // 6. Cinematic scaleY: 0 Curtain Transformation (Duration 0.7s with power4.inOut easing)
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.7,
            ease: "power4.inOut",
          },
          1.25
        );
      }
    });

    activeCtxRef.current = ctx;
  }, [lockScroll, restoreScroll]);

  // Initial Load Trigger
  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("solvex_intro_seen") === "1";
    } catch {}

    const searchParams =
      typeof window !== "undefined" ? window.location.search : "";
    const forceReplay =
      searchParams.includes("replay") || searchParams.includes("intro");

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || (alreadySeen && !forceReplay)) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        setIsComplete(true);
        restoreScroll();
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      playSequence();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (activeCtxRef.current) {
        activeCtxRef.current.revert();
        activeCtxRef.current = null;
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      restoreScroll();
    };
  }, [playSequence, restoreScroll]);

  const replay = useCallback(() => {
    try {
      sessionStorage.removeItem("solvex_intro_seen");
    } catch {}

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    playSequence();
  }, [playSequence]);

  // Expose global replay hook for developer verification & shortcuts
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __replayCinematic?: () => void }).__replayCinematic = replay;
    }
  }, [replay]);

  // Press 'R' to replay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "r" || e.key === "R") &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        replay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [replay]);

  const contextValue = useMemo(
    () => ({
      isRevealed,
      isComplete,
      replay,
    }),
    [isRevealed, isComplete, replay]
  );

  return (
    <CinematicRevealContext.Provider value={contextValue}>

      {children}

      {/* GSAP Cinematic Overlay */}
      <div
        ref={overlayRef}
        id="solvex-cinematic-preloader"
        style={{
          backgroundColor: "#FFFFFF",
          zIndex: 99999,
          transformOrigin: "top center",
          display: isComplete ? "none" : "flex",
          pointerEvents: isComplete ? "none" : "auto",
        }}
        aria-hidden={isComplete}
        className="fixed inset-0 bg-white text-[#18181B] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden will-change-transform"
      >
        {/* Leading Radiant Hairline Laser Edge at bottom of the rising curtain */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.3)]" />

        {/* Telemetry Header */}
        <div
          ref={headerRef}
          className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#71717A] will-change-[opacity,transform]"
        >
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Solvex"
              className="w-5 h-5 object-contain"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shadow-[0_0_8px_rgba(5,150,105,0.6)]" />
            <span className="text-[#18181B] font-medium">SOLVEX ENERGY // SYSTEM INIT</span>
          </div>
          <div className="flex items-center gap-1.5 tabular-nums text-[#71717A]">
            <span className="text-[#A1A1AA]">[</span>
            <span ref={counterTextRef} className="text-[#18181B] font-semibold">
              000%
            </span>
            <span className="text-[#A1A1AA]">]</span>
          </div>
        </div>

        {/* Centered Brand Choreography */}
        <div
          ref={centerContentRef}
          className="relative z-10 flex flex-col items-center justify-center my-auto gap-6 text-center will-change-[transform,opacity]"
        >
          {/* Solvex Official Brand Emblem */}
          <div
            ref={emblemRef}
            className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center will-change-[transform,opacity]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Solvex Energy Solutions Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(5,150,105,0.12)]"
            />
          </div>

          {/* Masked Solvex Wordmark Reveal */}
          <div className="overflow-hidden py-1">
            <h1
              ref={wordmarkRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] text-[#18181B] uppercase font-sans leading-none will-change-[transform,opacity]"
            >
              Solvex
            </h1>
          </div>

          {/* Subtitle & Letter Tracking Expansion */}
          <div
            ref={subtitleRef}
            className="flex items-center gap-3 sm:gap-4 will-change-[transform,opacity]"
          >
            <span className="h-[1px] w-5 sm:w-8 bg-zinc-300" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.32em] uppercase text-[#71717A] font-sans">
              Energy Solutions
            </span>
            <span className="h-[1px] w-5 sm:w-8 bg-zinc-300" />
          </div>

          {/* Tagline Pill */}
          <div
            ref={taglineRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-600/20 bg-emerald-50 text-[11px] font-medium tracking-wider text-emerald-700 uppercase mt-1 will-change-[opacity]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
            <span>Powering a Sustainable Future</span>
          </div>

          {/* Precision Progress Track */}
          <div className="w-40 sm:w-52 h-[2px] bg-zinc-200 rounded-full overflow-hidden mt-2">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 will-change-[width]"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Telemetry Footer */}
        <div
          ref={footerRef}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#71717A] uppercase will-change-[opacity,transform]"
        >
          <span>PM SURYA GHAR NATIONAL PARTNER</span>
        </div>
      </div>
    </CinematicRevealContext.Provider>
  );
}
