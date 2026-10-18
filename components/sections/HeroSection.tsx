"use client";

import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { useCinematicReveal } from "@/components/ui/cinematic-load-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { isRevealed } = useCinematicReveal();
  const { isHindi } = useLanguage();

  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const statusChipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isRevealed) {
      hasAnimatedRef.current = false;
      return;
    }
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (bgImageRef.current) gsap.set(bgImageRef.current, { scale: 1 });
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
      // 1. Solar farm background image dramatic cinematic zoom-out deceleration
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.25 },
          {
            scale: 1.0,
            duration: 2.2,
            ease: "power3.out",
            clearProps: "willChange",
          }
        );
      }

      // 2. Typography & action buttons with coordinated stagger
      const leftElements = [
        statusChipRef.current,
        headlineRef.current,
        subheadRef.current,
        actionsRef.current,
        trustRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        leftElements,
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
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden min-h-[720px] lg:min-h-[840px] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-28"
      id="hero"
    >
      {/* Cinematic Solar Power Landscape Background (Non-black, daylight scenic photo) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgImageRef}
          src="/images/solar_hero_landscape.jpg"
          alt="Clean Energy Solar Farm Landscape"
          style={{ transform: "scale(1.25)" }}
          className="w-full h-full object-cover object-center will-change-transform"
        />
        {/* High-Contrast Tint & Subtle Vignette for Exceptional Readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(15, 23, 42, 0.28) 100%)",
          }}
        />
        {/* Soft bottom blend to seamlessly meet page content */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.35) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Editorial Typography & Action */}
        <div className="flex flex-col items-start gap-8 max-w-3xl lg:max-w-4xl">
          {/* Status Chip */}
          <div
            ref={statusChipRef}
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-md text-white text-xs font-normal tracking-[-0.1px] shadow-sm will-change-[transform,opacity]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Solvex" className="w-4 h-4 object-contain" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{isHindi ? "राष्ट्रीय क्लीन एनर्जी अग्रणी // पीएम सूर्य घर प्रमाणित" : "National Clean Energy Pioneer // PM Surya Ghar Certified"}</span>
          </div>

          {/* Editorial Headline Display */}
          <h1
            ref={headlineRef}
            style={{ opacity: 0 }}
            className="headline-display text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-1.2px] text-white leading-[1.08] drop-shadow-md will-change-[transform,opacity]"
          >
            {isHindi ? (
              <>
                भारत के विकेंद्रीकृत <br className="hidden sm:inline" />
                सोलर बदलाव का नेतृत्व
              </>
            ) : (
              <>Powering India’s Next Generation of Solar Enterprises</>
            )}
          </h1>

          {/* Subhead */}
          <p
            ref={subheadRef}
            style={{ opacity: 0 }}
            className="body-lg text-base lg:text-lg max-w-2xl font-normal text-white/95 leading-relaxed tracking-[-0.2px] drop-shadow-sm will-change-[transform,opacity]"
          >
            {isHindi
              ? "टियर-1 बाइफेशियल फोटोवोल्टाइक हार्डवेयर, स्मार्ट एमपीपीटी इन्वर्टर, सुगम डिस्कॉम नेट-मीटरिंग और ₹78,000 त्वरित डीबीटी सब्सिडी के साथ अपने उच्च-मार्जिन सोलर व्यवसाय का विस्तार करें।"
              : "Scale a high-yield clean tech franchise with factory-direct ALMM Tier-1 hardware, precision rooftop EPC engineering, seamless DISCOM net-metering, and expedited ₹78,000 DBT subsidy disbursals."}
          </p>

          {/* Pill Action Buttons */}
          <div
            ref={actionsRef}
            style={{ opacity: 0 }}
            className="flex flex-wrap items-center gap-4 pt-2 will-change-[transform,opacity]"
          >
            <a
              href="#partner-form"
              className="group h-[52px] px-8 bg-primary text-white hover:bg-primary-hover rounded-full text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>{isHindi ? "फ्रैंचाइज़ी प्रोग्राम से जुड़ें" : "Launch Your Franchise"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#about-us"
              className="h-[52px] px-8 bg-black/25 text-white backdrop-blur-md border border-white/30 hover:bg-black/40 rounded-full text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>{isHindi ? "इन्फ्रास्ट्रक्चर देखें" : "Explore Infrastructure"}</span>
            </a>
          </div>

          {/* Trust Highlights Deck */}
          <div
            ref={trustRef}
            style={{ opacity: 0 }}
            className="pt-8 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-8 text-white/90 text-xs font-normal tracking-[-0.1px] will-change-[transform,opacity]"
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
    </section>
  );
}
