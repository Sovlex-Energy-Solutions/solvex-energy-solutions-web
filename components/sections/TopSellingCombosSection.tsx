"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Zap, ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
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
      {/* Cinematic Background Media & Multi-Stop Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/optimized/rooftop_solar_engineering.webp"
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        >
          <source src="/media/optimized/rooftop_solar_generation_cinematic.mp4" type="video/mp4" />
        </video>
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/40 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Section */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "एकीकृत जेनरेशन किट्स" : "Integrated Generation Kits"}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi ? "उच्च उत्पादन वाले सोलर फोटोवोल्टाइक जेनरेशन पैकेज" : "High-Yield Solar Photovoltaic Generating Packages"}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {isHindi
                ? "गारंटीड डिस्कॉम अनुपालन, पीएम सूर्य घर डीबीटी के त्वरित निपटान और अधिकतम किलोवाट-घंटे उत्पादन हेतु तैयार प्री-कमीशन्ड रूफटॉप किट्स।"
                : "Pre-commissioned rooftop generation suites engineered for guaranteed DISCOM compliance, rapid PM Surya Ghar DBT settlement, and maximum kilowatt-hour yield per square meter."}
            </p>
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
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredCombos.map((combo) => (
            <MotionItem
              key={combo.id}
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
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Custom Capacity Banner */}
        <MotionReveal className="rounded-lg border border-black/10 bg-[#FAFAFA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 text-[#18181B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "15 kW से 500 kW+ तक की इंजीनियर्ड क्षमता की आवश्यकता है?" : "Require Engineered Capacities from 15 kW to 500 kW+?"}
              </p>
              <p className="text-xs sm:text-sm font-normal text-[#71717A] mt-1 leading-relaxed">
                {isHindi
                  ? "Solvex के तकनीकी विशेषज्ञ 3D शैडो सिमुलेशन, स्ट्रक्चरल लोड लोड-टेस्ट और संपूर्ण डिस्कॉम सिंक्रोनाइज़ेशन रिपोर्ट तैयार करते हैं।"
                  : "Solvex technical auditors conduct 3D shading simulations, structural load stress tests, and end-to-end DISCOM synchronization reports."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/919125127755?text=${encodeURIComponent(
                "Hello Solvex team, I am planning a commercial/industrial solar project (15kW to 500kW+). Please share feasibility parameters and connect me with your EPC desk."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "whatsapp_commercial_combos",
                  source: "combos_custom_banner",
                  capacity: "15-500kW",
                });
              }}
              className="h-[50px] px-5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-emerald-800 hover:bg-[#25D366]/20 text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{isHindi ? "EPC व्हाट्सएप डेस्क" : "EPC WhatsApp Desk"}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "commission_feasibility_audit",
                  source: "combos_custom_banner",
                  capacity: "15-500kW",
                });
                openProductEnquiryDialog({
                  product: "Commercial 15kW - 500kW+ Engineered Array & Feasibility",
                  capacity: "25",
                });
              }}
              className="h-[50px] px-6 rounded-full border border-black/15 bg-white text-[#18181B] hover:bg-zinc-100 text-xs sm:text-sm font-normal tracking-[-0.2px] inline-flex items-center gap-2 shrink-0 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>{isHindi ? "तकनीकी व्यवहार्यता ऑडिट" : "Commission Feasibility Audit"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
