"use client";

import React from "react";
import { MessageSquareQuote, Star } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialList() {
  const { t, isHindi } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <MotionReveal>
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
            <MessageSquareQuote className="w-3.5 h-3.5 text-white" />
            <span>{t("testimonials.badge", "FRANCHISE VERIFICATION")}</span>
          </div>
          <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
            {t("testimonials.title", "Field Reports from Regional Partners")}
          </h2>
          <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
            {t(
              "testimonials.description",
              "Authentic feedback from authorized distributors, project engineers, and corporate channel directors operating across Western & Northern India."
            )}
          </p>
        </div>
      </MotionReveal>

      {/* Review Cards Stack with Stagger */}
      <MotionStagger className="flex flex-col gap-4">
        {TESTIMONIALS.map((item) => (
          <MotionItem key={item.id}>
            <div className="card-superpower p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                ))}
              </div>
              <p className="body-md text-sm leading-relaxed text-[#18181B]">
                &ldquo;{t(item.quoteKey, "")}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-black/10 font-sans">
                <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center font-normal text-xs">
                  {isHindi ? item.avatarHi : item.avatarEn}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-normal text-[#18181B] uppercase tracking-wider">
                    {t(item.nameKey, item.defaultName)}
                  </span>
                  <span className="text-[11px] text-[#71717A] tracking-wider">
                    {t(item.roleKey, item.defaultRole)}
                  </span>
                </div>
              </div>
            </div>
          </MotionItem>
        ))}
      </MotionStagger>
    </div>
  );
}
