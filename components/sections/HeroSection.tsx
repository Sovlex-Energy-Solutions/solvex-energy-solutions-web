"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  TrendingUp,
  Sun,
} from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useCinematicReveal } from "@/components/ui/cinematic-load-reveal";
import { useLanguage } from "@/context/LanguageContext";
import FranchiseApplicationDialog from "@/components/forms/FranchiseApplicationDialog";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { trackEvent } from "@/lib/analytics";

import HeroMediaSlider from "@/components/ui/HeroMediaSlider";

// Register GSAP SplitText plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

/* ─── Slide Content Data ─────────────────────────────────────────────── */
interface HeroSlideContent {
  heading: string;
  headingHi: string;
  subheading: string;
  subheadingHi: string;
}

const HERO_SLIDES: HeroSlideContent[] = [
  {
    heading: "Leading with Governance, Transparency & ESG Excellence",
    headingHi: "शासन, पारदर्शिता और ESG उत्कृष्टता में अग्रणी",
    subheading: "Setting gold standards in sustainability, compliance, and corporate ethics.",
    subheadingHi: "पर्यावरण, अनुपालन और कॉर्पोरेट नैतिकता में उच्चतम मानक।",
  },
  {
    heading: "Accelerating India's Clean Energy Future",
    headingHi: "भारत के स्वच्छ ऊर्जा भविष्य में तेज़ी",
    subheading: "Catalyzing India's rapid shift to clean, zero-carbon power.",
    subheadingHi: "शून्य-कार्बन और स्वच्छ ऊर्जा की ओर भारत का तीव्र बदलाव।",
  },
  {
    heading: "End-to-End Solutions for Utility-Scale Power",
    headingHi: "यूटिलिटी-स्केल पावर के लिए संपूर्ण समाधान",
    subheading: "Turnkey engineering, grid sync, and complete lifecycle execution.",
    subheadingHi: "टर्नकी इंजीनियरिंग, ग्रिड सिंक्रोनाइज़ेशन और संपूर्ण क्रियान्वयन।",
  },
  {
    heading: "100% Renewable Energy for C&I Enterprises",
    headingHi: "C&I उद्यमों के लिए 100% नवीकरणीय ऊर्जा",
    subheading: "Onsite solar, open access, and VPPAs for enterprise decarbonization.",
    subheadingHi: "उद्योगों के लिए ऑनसाइट सोलर, ओपन एक्सेस और VPPA समाधान।",
  },
  {
    heading: "Pan-India Reach, Multi-Technology Advantage",
    headingHi: "अखिल भारतीय उपस्थिति, बहु-तकनीक लाभ",
    subheading: "Integrated solar, wind, and battery storage across every terrain.",
    subheadingHi: "हर भूभाग में सौर, पवन और बैटरी स्टोरेज का एकीकृत नेटवर्क।",
  },
];

export default function HeroSection() {
  const { isRevealed } = useCinematicReveal();
  const { isHindi } = useLanguage();
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const sliderMediaRef = useRef<HTMLDivElement>(null);
  const statusChipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const headlineSplitRef = useRef<SplitText | null>(null);
  const subheadSplitRef = useRef<SplitText | null>(null);
  const textAnimTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstSlideRef = useRef(true);
  const prevSlideRef = useRef(0);

  // Callback for slide changes from the media slider
  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  // Clean up any active SplitText instances and timeline
  const cleanupSplitText = useCallback(() => {
    if (textAnimTimelineRef.current) {
      textAnimTimelineRef.current.kill();
      textAnimTimelineRef.current = null;
    }
    if (headlineSplitRef.current) {
      try {
        headlineSplitRef.current.revert();
      } catch {
        // Ignore revert error if DOM was already updated
      }
      headlineSplitRef.current = null;
    }
    if (subheadSplitRef.current) {
      try {
        subheadSplitRef.current.revert();
      } catch {
        // Ignore revert error
      }
      subheadSplitRef.current = null;
    }
  }, []);

  /** Update the DOM text content of headline and subhead to match current slide */
  const updateTextContent = useCallback(() => {
    const slide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];
    const headlineEl = headlineRef.current;
    const subheadEl = subheadRef.current;
    if (headlineEl) {
      headlineEl.textContent = isHindi ? slide.headingHi : slide.heading;
      gsap.set(headlineEl, { opacity: 1, y: 0 });
    }
    if (subheadEl) {
      subheadEl.textContent = isHindi ? slide.subheadingHi : slide.subheading;
      gsap.set(subheadEl, { opacity: 1, y: 0 });
    }
  }, [activeSlide, isHindi]);

  /** Animate existing text out (upward fade) before swapping content */
  const animateTextOut = useCallback((onComplete: () => void) => {
    cleanupSplitText();

    const headlineEl = headlineRef.current;
    const subheadEl = subheadRef.current;
    if (!headlineEl || !subheadEl) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to([headlineEl, subheadEl], {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.04,
    });

    textAnimTimelineRef.current = tl;
  }, [cleanupSplitText]);

  /**
   * GSAP SplitText animation
   * Uses word-splitting for Hindi (to keep ligatures and matras intact) and char/word for English
   */
  const animateTextIn = useCallback((isInitial: boolean) => {
    cleanupSplitText();

    const headlineEl = headlineRef.current;
    const subheadEl = subheadRef.current;
    if (!headlineEl || !subheadEl) return;

    // Ensure the DOM has the latest text content before splitting
    const slide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];
    headlineEl.textContent = isHindi ? slide.headingHi : slide.heading;
    subheadEl.textContent = isHindi ? slide.subheadingHi : slide.subheading;

    // Reset position and make visible so SplitText can measure accurately
    gsap.set([headlineEl, subheadEl], { opacity: 1, y: 0 });

    try {
      if (isHindi) {
        // For Hindi: split by words ONLY so Devanagari ligatures and combining marks are preserved
        headlineSplitRef.current = new SplitText(headlineEl, {
          type: "words",
        });
        subheadSplitRef.current = new SplitText(subheadEl, {
          type: "words",
        });

        const headlineWords = headlineSplitRef.current.words || [];
        const subheadWords = subheadSplitRef.current.words || [];

        gsap.set(headlineWords, {
          opacity: 0,
          y: 28,
        });
        gsap.set(subheadWords, {
          opacity: 0,
          y: 18,
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          onComplete: () => {
            gsap.set([headlineWords, subheadWords], { opacity: 1, y: 0 });
          },
        });

        tl.to(headlineWords, {
          opacity: 1,
          y: 0,
          duration: isInitial ? 0.6 : 0.5,
          stagger: 0.035,
        });

        tl.to(
          subheadWords,
          {
            opacity: 1,
            y: 0,
            duration: isInitial ? 0.5 : 0.4,
            stagger: 0.015,
          },
          "-=0.25"
        );

        textAnimTimelineRef.current = tl;
      } else {
        // For English: character-by-character split
        headlineSplitRef.current = new SplitText(headlineEl, {
          type: "chars,words",
        });
        subheadSplitRef.current = new SplitText(subheadEl, {
          type: "chars,words",
        });

        const headlineChars = headlineSplitRef.current.chars || [];
        const subheadChars = subheadSplitRef.current.chars || [];

        gsap.set(headlineChars, {
          opacity: 0,
          y: 40,
          rotateX: -20,
          transformOrigin: "center bottom",
        });
        gsap.set(subheadChars, {
          opacity: 0,
          y: 25,
          rotateX: -15,
          transformOrigin: "center bottom",
        });

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          onComplete: () => {
            gsap.set([headlineChars, subheadChars], { opacity: 1, y: 0, rotateX: 0 });
          },
        });

        tl.to(headlineChars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: isInitial ? 0.65 : 0.55,
          stagger: {
            each: 0.018,
            from: "start",
          },
        });

        tl.to(
          subheadChars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: isInitial ? 0.5 : 0.4,
            stagger: {
              each: 0.008,
              from: "start",
            },
          },
          isInitial ? "-=0.35" : "-=0.3"
        );

        textAnimTimelineRef.current = tl;
      }
    } catch (err) {
      console.warn("SplitText fallback applied:", err);
      gsap.fromTo(
        [headlineEl, subheadEl],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeSlide, isHindi, cleanupSplitText]);

  // Initial reveal animation (runs once when cinematic reveal completes)
  useEffect(() => {
    if (!isRevealed) {
      hasAnimatedRef.current = false;
      if (sliderMediaRef.current) {
        gsap.set(sliderMediaRef.current, { scale: 1.15, opacity: 0.9 });
      }
      return;
    }
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (sliderMediaRef.current) {
        gsap.set(sliderMediaRef.current, { scale: 1, opacity: 1 });
      }
      const allEls = [
        statusChipRef.current,
        headlineRef.current,
        subheadRef.current,
        actionsRef.current,
        trustRef.current,
      ].filter(Boolean);
      gsap.set(allEls, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Solar video & media background dramatic cinematic deceleration (scale down)
      if (sliderMediaRef.current) {
        gsap.fromTo(
          sliderMediaRef.current,
          { scale: 1.15, opacity: 0.9 },
          {
            scale: 1.0,
            opacity: 1,
            duration: 2.2,
            ease: "power3.out",
            clearProps: "willChange",
          }
        );
      }

      // 2. Static elements stagger in
      const staticElements = [
        statusChipRef.current,
        actionsRef.current,
        trustRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        staticElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "willChange",
        }
      );

      // 3. First slide text: character-by-character reveal animation
      animateTextIn(true);
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed, animateTextIn]);

  // Animate text on slide change (after first reveal)
  useEffect(() => {
    if (!isRevealed || !hasAnimatedRef.current) return;
    // Skip re-animation on the initial mount (handled by reveal animation)
    if (isFirstSlideRef.current) {
      isFirstSlideRef.current = false;
      prevSlideRef.current = activeSlide;
      return;
    }

    // Don't re-animate if same slide
    if (prevSlideRef.current === activeSlide) return;
    prevSlideRef.current = activeSlide;

    // Reduced motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cleanupSplitText();
      updateTextContent();
      return;
    }

    animateTextOut(() => {
      cleanupSplitText();
      updateTextContent();
      animateTextIn(false);
    });
  }, [activeSlide, isRevealed, cleanupSplitText, updateTextContent, animateTextOut, animateTextIn]);

  // Handle language change — update text + re-animate cleanly
  useEffect(() => {
    if (!isRevealed || !hasAnimatedRef.current) return;

    // Clean up previous SplitText and animation FIRST
    cleanupSplitText();
    updateTextContent();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      if (subheadRef.current) gsap.set(subheadRef.current, { opacity: 1, y: 0 });
      return;
    }

    animateTextIn(false);
  }, [isHindi, isRevealed, cleanupSplitText, updateTextContent, animateTextIn]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupSplitText();
    };
  }, [cleanupSplitText]);

  // Get current slide content for initial render
  const currentSlide = HERO_SLIDES[activeSlide] || HERO_SLIDES[0];
  const heading = isHindi ? currentSlide.headingHi : currentSlide.heading;
  const subheading = isHindi ? currentSlide.subheadingHi : currentSlide.subheading;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden min-h-[740px] lg:min-h-[860px] flex items-center pt-28 pb-24 lg:pt-36 lg:pb-32"
      id="hero"
    >
      {/* Dynamic Background Media Slider with Cross-Fade & Calibrated Scrim */}
      <HeroMediaSlider
        mediaContainerRef={sliderMediaRef}
        onSlideChange={handleSlideChange}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Editorial Typography & Action */}
        <div className="flex flex-col items-start gap-8 max-w-3xl lg:max-w-4xl">
          {/* Status Chip */}
          <div
            ref={statusChipRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/35 bg-black/40 backdrop-blur-md text-white text-xs font-normal tracking-[-0.1px] shadow-sm will-change-[transform,opacity]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Solvex" className="w-4 h-4 object-contain" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{isHindi ? "राष्ट्रीय क्लीन एनर्जी अग्रणी // पीएम सूर्य घर प्रमाणित" : "National Clean Energy Pioneer // PM Surya Ghar Certified"}</span>
          </div>

          {/* Dynamic Headline Display — animated by GSAP SplitText */}
          <h1
            ref={headlineRef}
            className="headline-display text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-1.2px] text-white leading-[1.08] will-change-[transform,opacity]"
            style={{ perspective: "600px" }}
            suppressHydrationWarning
          >
            {heading}
          </h1>

          {/* Dynamic Subhead — animated by GSAP SplitText */}
          <p
            ref={subheadRef}
            className="body-lg text-base lg:text-lg max-w-2xl font-normal text-white/95 leading-relaxed tracking-[-0.2px] will-change-[transform,opacity]"
            style={{ perspective: "400px" }}
            suppressHydrationWarning
          >
            {subheading}
          </p>

          {/* Pill Action Buttons — static across all slides */}
          <div
            ref={actionsRef}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 will-change-[transform,opacity]"
          >
            <button
              type="button"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "apply_franchise_hero",
                  source: "hero",
                });
                setIsFranchiseOpen(true);
              }}
              className="group h-[52px] px-7 sm:px-8 bg-primary text-white hover:bg-primary-hover rounded-full text-sm sm:text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#059669] focus:ring-offset-2"
            >
              <span>{isHindi ? "पार्टनर आवेदन करें" : "Apply for Franchise"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "get_solar_quote_hero",
                  source: "hero",
                });
                openProductEnquiryDialog({
                  product: "PM Surya Ghar Rooftop EPC System",
                  capacity: "3",
                });
              }}
              className="h-[52px] px-6 sm:px-7 bg-white text-[#18181B] hover:bg-zinc-100 rounded-full text-sm sm:text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <Sun className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{isHindi ? "सोलर कोटेशन व सब्सिडी" : "Get Solar Quote"}</span>
            </button>

            <a
              href="#about-us"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "explore_infra",
                  source: "hero",
                })
              }
              className="h-[52px] px-6 sm:px-7 bg-black/40 text-white backdrop-blur-md border border-white/35 hover:bg-black/60 rounded-full text-sm sm:text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md"
            >
              <span>{isHindi ? "इन्फ्रास्ट्रक्चर" : "Explore"}</span>
            </a>
          </div>

          {/* Trust Highlights Deck — static across all slides */}
          <div
            ref={trustRef}
            className="pt-8 border-t border-white/25 flex flex-wrap items-center gap-6 sm:gap-8 text-white text-xs font-normal tracking-[-0.1px] will-change-[transform,opacity]"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isHindi ? "प्रत्यक्ष ₹78,000 केंद्रीय डीबीटी अंतरण" : "Direct ₹78,000 Central DBT Disbursal"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{isHindi ? "ALMM टियर-1 प्रमाणित बाइफेशियल हार्डवेयर" : "ALMM Tier-1 Certified Bifacial Hardware"}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>{isHindi ? "टर्नकी ईपीसी इंजीनियरिंग व मार्गदर्शन" : "Complete Turnkey Engineering & Mentorship"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Franchise Partner Application Dialog (shadcn + react-hook-form + zod) */}
      <FranchiseApplicationDialog
        open={isFranchiseOpen}
        onOpenChange={setIsFranchiseOpen}
      />
    </section>
  );
}
