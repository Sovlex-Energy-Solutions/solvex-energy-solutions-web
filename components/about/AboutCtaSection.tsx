"use client";

import { ArrowRight, ShieldCheck, Sun, CheckCircle } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { trackEvent } from "@/lib/analytics";

interface AboutCtaSectionProps {
  onApplyFranchise?: () => void;
}

export default function AboutCtaSection({ onApplyFranchise }: AboutCtaSectionProps) {
  const { isHindi } = useLanguage();

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="about-cta">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <MotionReveal className="rounded-3xl bg-gradient-to-br from-[#060B14] via-[#091222] to-[#060B14] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/15">
          {/* Ambient Emerald Glow Elements */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-mono uppercase tracking-wider w-fit">
                <Sun className="w-3.5 h-3.5" />
                <span>{isHindi ? "भारत की क्लीन एनर्जी क्रांति से जुड़ें" : "Join India's Solar Revolution"}</span>
              </div>

              <WordStaggerHeading
                as="h2"
                className="headline-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight"
              >
                {isHindi
                  ? "अपने क्षेत्र में एक लाभदायक क्लीन टेक उद्यम का निर्माण करें"
                  : "Build a High-Yield Clean Tech Enterprise in Your Territory"}
              </WordStaggerHeading>

              <SubheadingReveal
                className="body-lg text-sm sm:text-base text-zinc-300 leading-relaxed font-normal"
                delay={0.16}
              >
                {isHindi
                  ? "सीधे फैक्टरी मूल्य पर ALMM टियर-1 हार्डवेयर, पीएम सूर्य घर सब्सिडी पाइपलाइन और संस्थागत इंजीनियरिंग मार्गदर्शन के साथ Solvex परिवार का हिस्सा बनें।"
                  : "Whether you are a solar contractor, regional distributor, or corporate enterprise seeking 100% renewable power, Solvex delivers certified hardware, turnkey engineering, and margin security."}
              </SubheadingReveal>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-300 font-normal">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Direct Factory Allocation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>ALMM Tier-1 Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>₹78k DBT Assistance</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  trackEvent("cta_click", {
                    cta_name: "apply_franchise_about_bottom",
                    source: "about_cta_section",
                  });
                  onApplyFranchise?.();
                }}
                className="h-[52px] px-8 bg-primary hover:bg-primary-hover text-white rounded-full text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>{isHindi ? "फ्रेंचाइज पार्टनर बनें" : "Apply for Franchise"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  trackEvent("cta_click", {
                    cta_name: "get_quote_about_bottom",
                    source: "about_cta_section",
                  });
                  openProductEnquiryDialog({
                    product: "PM Surya Ghar Commercial & Rooftop System",
                    capacity: "5",
                  });
                }}
                className="h-[52px] px-7 bg-white text-[#18181B] hover:bg-zinc-100 rounded-full text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>{isHindi ? "सोलर कोटेशन मांगें" : "Request Commercial Quote"}</span>
              </button>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
