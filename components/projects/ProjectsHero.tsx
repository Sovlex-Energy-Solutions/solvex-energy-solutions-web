"use client";

import React from "react";
import { ArrowDown, Sun, ShieldCheck, Zap, Globe2, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { PROJECTS_METRICS } from "@/data/projects-data";

export default function ProjectsHero() {
  const { isHindi } = useLanguage();

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden bg-white text-zinc-900 border-b border-zinc-100">
      {/* Background Cinematic Video & Multi-Stop Ambient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/optimized/india_solar_grid.webp"
          className="w-full h-full object-cover opacity-40 sm:opacity-50"
        >
          <source src="/media/optimized/renewable_energy_hub_cinematic.mp4" type="video/mp4" />
        </video>
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/45 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge & Titles */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200/80 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
            <Sun className="w-3.5 h-3.5 text-[#059669]" />
            <span>
              {isHindi
                ? "अखिल भारतीय स्वच्छ ऊर्जा इन्फ्रास्ट्रक्चर"
                : "Pan-India Clean Energy Infrastructure"}
            </span>
          </div>

          <WordStaggerHeading
            as="h1"
            className="text-3xl sm:text-5xl lg:text-6xl font-normal text-zinc-900 tracking-[-0.03em] leading-[1.1] mb-6"
          >
            {isHindi ? "विशाल स्तर पर प्रमाणित:" : "Engineered at Scale:"}
            <br />
            <span className="font-semibold text-[#059669]">
              {isHindi ? "राष्ट्रीय और औद्योगिक सौर संपत्तियां" : "National & Industrial Solar Assets"}
            </span>
          </WordStaggerHeading>

          <SubheadingReveal
            className="text-sm sm:text-base lg:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl"
            delay={0.18}
          >
            {isHindi
              ? "गीगावाट-स्तरीय यूटिलिटी पार्क, फ्लोटिंग सोलर, पवन-सौर हाइब्रिड और वाणिज्यिक ओपन एक्सेस रूफटॉप इंस्टॉलेशन — भारत के सबसे भरोसेमंद ऊर्जा ऑफ-टेकर्स को स्वच्छ शक्ति प्रदान करते हुए।"
              : "A verified national footprint spanning gigawatt-scale utility solar, wind-solar hybrids, battery storage (BESS), and captive C&I rooftop arrays powering India's leading industrial enterprises."}
          </SubheadingReveal>
        </div>

        {/* 4 Key Metric Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-10">
          <CardFadeReveal index={0} className="p-4 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md border border-zinc-200/80 hover:border-[#059669]/40 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 font-sans">
              {PROJECTS_METRICS.totalCapacity}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mt-1">
              {isHindi ? "कुल क्षमता पोर्टफोलियो" : "Aggregate Fleet Portfolio"}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
              {isHindi ? "सक्रिय और पाइपलाइन परिसंपत्तियां" : PROJECTS_METRICS.totalCapacitySub}
            </div>
          </CardFadeReveal>

          <CardFadeReveal index={1} className="p-4 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md border border-zinc-200/80 hover:border-[#059669]/40 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 font-sans">
              {PROJECTS_METRICS.statesCovered}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mt-1">
              {isHindi ? "भारतीय राज्य" : "Pan-India Presence"}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
              {isHindi ? "क्षेत्रीय व केंद्रीय ग्रिड इंटरकनेक्शन" : PROJECTS_METRICS.statesCoveredSub}
            </div>
          </CardFadeReveal>

          <CardFadeReveal index={2} className="p-4 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md border border-zinc-200/80 hover:border-[#059669]/40 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 font-sans">
              {PROJECTS_METRICS.projectsCompleted}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mt-1">
              {isHindi ? "प्रमुख परियोजनाएं" : "Commissioned Deployments"}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
              {isHindi ? "यूटिलिटी और औद्योगिक प्रतिष्ठान" : PROJECTS_METRICS.projectsCompletedSub}
            </div>
          </CardFadeReveal>

          <CardFadeReveal index={3} className="p-4 sm:p-6 rounded-2xl bg-white/85 hover:bg-white backdrop-blur-md border border-zinc-200/80 hover:border-[#059669]/40 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 font-sans">
              {PROJECTS_METRICS.carbonOffset}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mt-1">
              {isHindi ? "वार्षिक कार्बन कटौती" : "Annual CO₂ Abatement"}
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
              {isHindi ? "सत्यापित स्वच्छ उत्सर्जन लाभ" : PROJECTS_METRICS.carbonOffsetSub}
            </div>
          </CardFadeReveal>
        </div>

        {/* Quick Anchor Link to Showcase */}
        <div className="flex justify-center pt-2">
          <a
            href="#projects-catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-[#059669] transition-colors py-2 px-4 rounded-full border border-zinc-200 bg-white/70 backdrop-blur-sm shadow-2xs hover:shadow-xs"
          >
            <span>{isHindi ? "सभी परियोजनाओं की सूची देखें" : "Explore Project Portfolio & Case Studies"}</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#059669] animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
