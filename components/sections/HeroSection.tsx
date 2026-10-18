"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  TrendingUp,
  Sun,
  Phone,
  MessageSquare,
} from "lucide-react";
import gsap from "gsap";
import { useCinematicReveal } from "@/components/ui/cinematic-load-reveal";
import { useLanguage } from "@/context/LanguageContext";
import FranchiseApplicationDialog from "@/components/forms/FranchiseApplicationDialog";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { trackEvent } from "@/lib/analytics";

import HeroMediaSlider from "@/components/ui/HeroMediaSlider";

export default function HeroSection() {
  const { isRevealed } = useCinematicReveal();
  const { isHindi } = useLanguage();
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const sliderMediaRef = useRef<HTMLDivElement>(null);
  const statusChipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

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
      className="relative w-full overflow-hidden min-h-[740px] lg:min-h-[860px] flex items-center pt-28 pb-24 lg:pt-36 lg:pb-32"
      id="hero"
    >
      {/* Dynamic Background Media Slider with Cross-Fade & Calibrated Scrim */}
      <HeroMediaSlider mediaContainerRef={sliderMediaRef} />

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

          {/* Editorial Headline Display */}
          <h1
            ref={headlineRef}
            className="headline-display text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-1.2px] text-white leading-[1.08] will-change-[transform,opacity]"
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
            className="body-lg text-base lg:text-lg max-w-2xl font-normal text-white/95 leading-relaxed tracking-[-0.2px] will-change-[transform,opacity]"
          >
            {isHindi
              ? "टियर-1 बाइफेशियल फोटोवोल्टाइक हार्डवेयर, स्मार्ट एमपीपीटी इन्वर्टर, सुगम डिस्कॉम नेट-मीटरिंग और ₹78,000 त्वरित डीबीटी सब्सिडी के साथ अपने उच्च-मार्जिन सोलर व्यवसाय का विस्तार करें।"
              : "Scale a high-yield clean tech franchise with factory-direct ALMM Tier-1 hardware, precision rooftop EPC engineering, seamless DISCOM net-metering, and expedited ₹78,000 DBT subsidy disbursals."}
          </p>

          {/* Pill Action Buttons */}
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

          {/* Working Immediate Phone & WhatsApp Helpline */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-white/90 pt-1 will-change-[transform,opacity]">
            <span className="text-white/65 font-light">
              {isHindi ? "त्वरित सहायता:" : "Need Immediate Consultation?"}
            </span>
            <a
              href="tel:+919879012345"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "hero_direct_call",
                  source: "hero_support_bar",
                })
              }
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-emerald-300 transition-colors underline underline-offset-4 decoration-emerald-400/60 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 98790 12345</span>
            </a>
            <span className="text-white/40 hidden sm:inline">•</span>
            <a
              href={`https://wa.me/919879012345?text=${encodeURIComponent(
                "Hello Solvex Energy! I would like immediate consultation regarding rooftop solar installation and subsidy."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "hero_direct_whatsapp",
                  source: "hero_support_bar",
                })
              }
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 hover:text-emerald-200 transition-colors underline underline-offset-4 decoration-emerald-400/60 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isHindi ? "व्हाट्सएप चैट (<15 मिनट)" : "WhatsApp Chat (<15 mins)"}</span>
            </a>
          </div>

          {/* Trust Highlights Deck */}
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
