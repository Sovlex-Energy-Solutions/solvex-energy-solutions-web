"use client";

import { useState, useMemo } from "react";
import { Zap, ArrowRight, Sparkles } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";

interface RawComboItem {
  id: string;
  category: "all" | "residential" | "commercial" | "offgrid";
  nameEn: string;
  nameHi: string;
  systemTypeEn: string;
  systemTypeHi: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercent: string;
  subsidyAmount?: string;
  netEffectivePrice?: string;
  dailyGenerationEn: string;
  dailyGenerationHi: string;
  image: string;
  recommendedForEn: string;
  recommendedForHi: string;
  badgeEn?: string;
  badgeHi?: string;
  isPopular?: boolean;
  subsidyTextEn: string;
  subsidyTextHi: string;
}

const rawCombos: RawComboItem[] = [
  {
    id: "combo-3kw",
    category: "residential",
    nameEn: "Solvex Prime 3.2kW Monocrystalline Grid-Tied Suite",
    nameHi: "Solvex Prime 3.2kW मोनोक्रिस्टलाइन ग्रिड-टाइड सुइट",
    systemTypeEn: "Single-Phase Synchronous Array",
    systemTypeHi: "सिंगल-फेज सिंक्रोनस एरे",
    originalPrice: "₹1,77,931",
    discountedPrice: "₹1,19,999",
    discountPercent: "33% OFF",
    subsidyAmount: "₹78,000",
    netEffectivePrice: "₹41,999",
    dailyGenerationEn: "12-14 Units / Day",
    dailyGenerationHi: "12-14 यूनिट / प्रतिदिन",
    image: "/images/combos/combo_3kw.png",
    recommendedForEn: "Urban 2-3 BHK Residences & Independent Floors",
    recommendedForHi: "शहरी 2-3 बीएचके मकान एवं स्वतंत्र आवास",
    badgeEn: "RESIDENTIAL BENCHMARK",
    badgeHi: "आवासीय बेंचमार्क",
    isPopular: true,
    subsidyTextEn: "Effective cost post-₹78,000 Direct Benefit Transfer",
    subsidyTextHi: "₹78,000 प्रत्यक्ष लाभ अंतरण (DBT) के पश्चात प्रभावी लागत",
  },
  {
    id: "combo-5kw",
    category: "residential",
    nameEn: "Solvex Apex 5kW Three-Phase High-Capacity Array",
    nameHi: "Solvex Apex 5kW थ्री-फेज उच्च-क्षमता एरे",
    systemTypeEn: "Three-Phase Synchronous Grid-Tie",
    systemTypeHi: "थ्री-फेज सिंक्रोनस ग्रिड-टाई",
    originalPrice: "₹3,77,000",
    discountedPrice: "₹2,14,000",
    discountPercent: "43% OFF",
    subsidyAmount: "₹78,000",
    netEffectivePrice: "₹1,36,000",
    dailyGenerationEn: "20-22 Units / Day",
    dailyGenerationHi: "20-22 यूनिट / प्रतिदिन",
    image: "/images/combos/combo_5kw.png",
    recommendedForEn: "Bungalows, Duplexes & Multi-Story Villas",
    recommendedForHi: "बड़े बंगले, डुप्लेक्स एवं बहुमंजिला विला",
    badgeEn: "SUPERIOR HARVEST",
    badgeHi: "उत्कृष्ट उत्पादन",
    subsidyTextEn: "Effective cost post-₹78,000 Direct Benefit Transfer",
    subsidyTextHi: "₹78,000 प्रत्यक्ष लाभ अंतरण (DBT) के पश्चात प्रभावी लागत",
  },
  {
    id: "combo-500w",
    category: "offgrid",
    nameEn: "Solvex Nomad 500W Autonomous Micro-Generation Kit",
    nameHi: "Solvex Nomad 500W ऑटोनॉमस माइक्रो-जेनरेशन किट",
    systemTypeEn: "Islanded Off-Grid DC/AC Core",
    systemTypeHi: "आइसलैंडेड ऑफ-ग्रिड DC/AC कोर",
    originalPrice: "₹37,492",
    discountedPrice: "₹29,759",
    discountPercent: "21% OFF",
    dailyGenerationEn: "2-2.5 Units / Day",
    dailyGenerationHi: "2-2.5 यूनिट / प्रतिदिन",
    image: "/images/combos/combo_500w.png",
    recommendedForEn: "Farmhouses, Outposts & Remote Agri-Stations",
    recommendedForHi: "फार्महाउस, रिमोट आउटपोस्ट एवं कृषि स्टेशन",
    badgeEn: "TRUE GRID INDEPENDENCE",
    badgeHi: "पूर्ण ग्रिड स्वतंत्रता",
    subsidyTextEn: "100% Autonomous Storage — Zero Grid Dependency",
    subsidyTextHi: "100% स्वतंत्र स्टोरेज — ग्रिड पर शून्य निर्भरता",
  },
  {
    id: "combo-10kw",
    category: "commercial",
    nameEn: "Solvex Enterprise 10kW Three-Phase Commercial Suite",
    nameHi: "Solvex Enterprise 10kW थ्री-फेज कमर्शियल सुइट",
    systemTypeEn: "High-Yield C&I Synchronous Array",
    systemTypeHi: "उच्च-उत्पादन सीएंडआई सिंक्रोनस एरे",
    originalPrice: "₹4,72,810",
    discountedPrice: "₹3,77,000",
    discountPercent: "20% OFF",
    dailyGenerationEn: "40-45 Units / Day",
    dailyGenerationHi: "40-45 यूनिट / प्रतिदिन",
    image: "/images/combos/combo_10kw.png",
    recommendedForEn: "Corporate Showrooms, Clinics & Light Factories",
    recommendedForHi: "कॉर्पोरेट शोरूम, क्लिनिक एवं लघु कारखाने",
    badgeEn: "COMMERCIAL ASSET",
    badgeHi: "कमर्शियल संपत्ति",
    subsidyTextEn: "Qualifies for Section 32 40% Tax Depreciation",
    subsidyTextHi: "धारा 32 के तहत 40% कर मूल्यह्रास (Depreciation) हेतु मान्य",
  },
];

export default function TopSellingCombosSection() {
  const { isHindi } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const combos = useMemo(() => {
    return rawCombos.map((c) => ({
      id: c.id,
      category: c.category,
      name: isHindi ? c.nameHi : c.nameEn,
      systemType: isHindi ? c.systemTypeHi : c.systemTypeEn,
      originalPrice: c.originalPrice,
      discountedPrice: c.discountedPrice,
      discountPercent: c.discountPercent,
      subsidyAmount: c.subsidyAmount,
      netEffectivePrice: c.netEffectivePrice,
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
    <section className="w-full py-20 lg:py-28 bg-white" id="spgs-combos">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Section */}
        <MotionReveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-2">
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

        {/* 4 Combo Packages Grid - Staggered per Section 2 & 5 */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredCombos.map((combo) => (
            <MotionItem
              key={combo.id}
              className="card-superpower project-card p-0 rounded-lg flex flex-col justify-between overflow-hidden bg-white hover:border-black/30 transition-all shadow-xs group"
            >
              <div className="flex flex-col">
                {/* Image Area with Section 5 hover scale */}
                <div className="project-card__media relative w-full h-44 bg-zinc-50 border-b border-black/5 flex items-center justify-center p-4 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="project-card__image max-h-32 max-w-[85%] object-contain"
                  />
                  {combo.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-normal tracking-[-0.1px]">
                      {combo.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-xs text-[#18181B] font-normal">
                    {combo.discountPercent}
                  </span>
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

                  {/* Price */}
                  <div className="pt-4 border-t border-black/5 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-normal text-[#18181B] tracking-[-0.5px]">
                        {combo.netEffectivePrice || combo.discountedPrice}
                      </span>
                      <span className="text-xs line-through text-[#71717A]">
                        {combo.originalPrice}
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
                <a
                  href="#partner-form"
                  className="w-full h-[46px] rounded-full bg-primary text-white hover:bg-primary-hover text-xs font-normal tracking-[-0.1px] flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>{isHindi ? "पूर्ण सामग्री सूची (BOQ) मांगें" : "Request Full Bill of Materials"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </a>
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
          <a
            href="#partner-form"
            className="h-[50px] px-7 rounded-full border border-black/15 bg-white text-[#18181B] hover:bg-zinc-100 text-sm font-normal tracking-[-0.2px] inline-flex items-center gap-2 shrink-0 transition-all shadow-xs"
          >
            <span>{isHindi ? "तकनीकी व्यवहार्यता का अनुरोध करें" : "Commission Feasibility Audit"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </MotionReveal>
      </div>
    </section>
  );
}
