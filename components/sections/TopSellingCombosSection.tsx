"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Zap, ArrowRight } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { trackEvent } from "@/lib/analytics";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { rawCombos, type RawComboItem } from "@/data/products/combos";

export type { RawComboItem };

export default function TopSellingCombosSection() {
  const { isHindi } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const combos = useMemo(() => {
    return rawCombos.map((c) => ({
      id: c.id,
      category: c.category,
      name: isHindi ? c.nameHi : c.nameEn,
      systemType: isHindi ? c.systemTypeHi : c.systemTypeEn,
      dailyGeneration: isHindi ? c.dailyGenerationHi : c.dailyGenerationEn,
      image: c.image,
      recommendedFor: isHindi ? c.recommendedForHi : c.recommendedForEn,
      badge: isHindi ? c.badgeHi : c.badgeEn,
      isPopular: c.isPopular,
      subsidyText: isHindi ? c.subsidyTextHi : c.subsidyTextEn,
    }));
  }, [isHindi]);

  const filteredCombos =
    activeFilter === "all"
      ? combos
      : combos.filter((c) => c.category === activeFilter);

  return (
    <section className="relative w-full py-20 lg:py-28 bg-white overflow-hidden" id="spgs-combos">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Section */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "एकीकृत जेनरेशन किट्स" : "Integrated Generation Kits"}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {isHindi ? "उच्च उत्पादन वाले सोलर फोटोवोल्टाइक जेनरेशन पैकेज" : "High-Yield Solar Photovoltaic Generating Packages"}
            </WordStaggerHeading>
            <SubheadingReveal
              className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
              delay={0.16}
            >
              {isHindi
                ? "गारंटीड डिस्कॉम अनुपालन, पीएम सूर्य घर डीबीटी के त्वरित निपटान और अधिकतम किलोवाट-घंटे उत्पादन हेतु तैयार प्री-कमीशन्ड रूफटॉप किट्स।"
                : "Pre-commissioned rooftop generation suites engineered for guaranteed DISCOM compliance, rapid PM Surya Ghar DBT settlement, and maximum kilowatt-hour yield per square meter."}
            </SubheadingReveal>
          </div>

          {/* Filter Tabs with Smooth Sliding Active Pill Indicator */}
          <SlidingTabs
            tabs={[
              { id: "all", label: isHindi ? "सभी कॉन्फ़िगरेशन" : "All Configurations" },
              { id: "residential", label: isHindi ? "आवासीय ग्रिड-टाइड" : "Residential Grid-Tied" },
              { id: "commercial", label: isHindi ? "कमर्शियल व C&I" : "Commercial & C&I" },
              { id: "offgrid", label: isHindi ? "ऑटोनॉमस ऑफ-ग्रिड" : "Autonomous Off-Grid" },
            ]}
            activeId={activeFilter}
            onChange={setActiveFilter}
            className="bg-zinc-100"
          />
        </MotionReveal>

        {/* 4 Combo Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredCombos.map((combo, idx) => (
            <CardFadeReveal
              key={combo.id}
              index={idx}
              className="card-superpower project-card p-0 rounded-lg flex flex-col justify-between overflow-hidden bg-white hover:border-black/30 transition-all shadow-xs group"
            >
              <div className="flex flex-col">
                {/* Image Area with hover scale */}
                <div className="project-card__media relative w-full h-44 bg-white border-b border-black/5 flex items-center justify-center p-4 overflow-hidden">
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    loading="lazy"
                    width={280}
                    height={128}
                    className="project-card__image max-h-32 max-w-[85%] object-contain"
                  />
                  {combo.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-normal tracking-[-0.1px]">
                      {combo.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-[#71717A] tracking-[-0.1px]">
                      {combo.systemType}
                    </span>
                    <h3 className="text-base font-normal text-[#18181B] leading-snug line-clamp-2 min-h-[44px]">
                      {combo.name}
                    </h3>
                  </div>

                  {/* Clean Metric */}
                  <div className="flex items-center gap-2 text-xs text-[#71717A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{combo.dailyGeneration}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="truncate">{combo.recommendedFor}</span>
                  </div>

                  {/* Pricing & Benefit Status */}
                  <div className="pt-4 border-t border-black/5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#18181B]">
                        {isHindi ? "मूल्य: अनुरोध पर उपलब्ध" : "Price: On Request"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium">
                        {isHindi ? "कोटेशन मांगें" : "Get Quote"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#71717A] leading-tight">
                      {combo.subsidyText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("cta_click", {
                      cta_name: "combo_boq_request",
                      source: "combos_section",
                      combo_title: combo.name,
                      system_type: combo.systemType,
                    });
                    openProductEnquiryDialog({
                      product: `${combo.name} (${combo.systemType})`,
                    });
                  }}
                  className="w-full h-[46px] rounded-full bg-primary text-white hover:bg-primary-hover text-xs font-normal tracking-[-0.1px] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>{isHindi ? "पूर्ण सामग्री सूची (BOQ) मांगें" : "Request Full Bill of Materials"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </CardFadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
