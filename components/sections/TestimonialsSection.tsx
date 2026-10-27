"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { TESTIMONIALS } from "@/data/testimonials";
import { PartnersTicker } from "./calculator/PartnersTicker";

export function TestimonialsSection() {
  const { t, isHindi } = useLanguage();

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Seamless Continuous Marquee / Accreditation Ticker */}
        <PartnersTicker />

        {/* Section Header */}
        <MotionReveal>
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <MessageSquareQuote className="w-3.5 h-3.5 text-white" />
              <span>{t("testimonials.badge", "FRANCHISE VERIFICATION")}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {t("testimonials.title", "Field Reports from Regional Partners")}
            </WordStaggerHeading>
            <SubheadingReveal
              className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
              delay={0.16}
            >
              {t(
                "testimonials.description",
                "Authentic feedback from authorized distributors, project engineers, and corporate channel directors operating across Western & Northern India."
              )}
            </SubheadingReveal>
          </div>
        </MotionReveal>

        {/* 3 Review Cards in Responsive 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((item, idx) => (
            <CardFadeReveal
              key={item.id}
              index={idx}
              className="card-superpower p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xs bg-white rounded-lg border border-black/10 hover:border-black/25 transition-all duration-300 h-full"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                  ))}
                </div>
                <p className="body-md text-sm leading-relaxed text-[#18181B]">
                  &ldquo;{t(item.quoteKey, "")}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-black/10 font-sans">
                <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center font-medium text-xs shrink-0">
                  {isHindi ? item.avatarHi : item.avatarEn}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#18181B] uppercase tracking-wider truncate">
                    {t(item.nameKey, item.defaultName)}
                  </span>
                  <span className="text-[11px] text-[#71717A] tracking-wider truncate">
                    {t(item.roleKey, item.defaultRole)}
                  </span>
                </div>
              </div>
            </CardFadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
