"use client";

import React from "react";
import { MapPin, ArrowRight, Zap, Globe2 } from "lucide-react";
import { REGIONAL_METRICS, ProjectRegion } from "@/data/projects-data";
import { useLanguage } from "@/context/LanguageContext";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";

interface ProjectsRegionalBreakdownProps {
  onSelectRegion: (region: ProjectRegion) => void;
}

export default function ProjectsRegionalBreakdown({
  onSelectRegion,
}: ProjectsRegionalBreakdownProps) {
  const { isHindi } = useLanguage();

  return (
    <section className="w-full py-14 sm:py-20 bg-zinc-50/70 border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#059669] mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{isHindi ? "राष्ट्रीय पदचिह्न एवं क्षेत्रीय क्षमता" : "Pan-India Grid Hubs & Installed Fleet"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-zinc-900 tracking-tight">
              {isHindi ? "चार प्रमुख भारतीय ग्रिड क्षेत्रों में उपस्थित" : "Operational Presence Across 4 Regional Grids"}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 font-normal leading-relaxed">
              {isHindi
                ? "प्रत्येक क्षेत्र में समर्पित ट्रांसमिशन कनेक्टिविटी, स्थानीय इंजीनियरिंग टीम और त्वरित सेवा समर्थन के साथ उच्च क्षमता वाली संपत्तियां।"
                : "Decentralized regional engineering hubs ensuring high-capacity grid synchronisation, rapid telemetry monitoring, and guaranteed 99.4% plant availability."}
            </p>
          </div>
          <span className="text-xs text-zinc-500 font-medium hidden md:inline">
            Click any regional hub to filter projects
          </span>
        </div>

        {/* 4 Regional Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REGIONAL_METRICS.map((item, idx) => (
            <CardFadeReveal
              key={item.region}
              index={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#059669]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div
                onClick={() => {
                  onSelectRegion(item.region);
                  const el = document.getElementById("projects-catalog");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {/* Region Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#059669] border border-emerald-200/60 uppercase tracking-wider">
                    {item.region} Region
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {item.projectCount} {isHindi ? "परियोजनाएं" : "Projects"}
                  </span>
                </div>

                {/* Capacity */}
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-1.5 mb-1 font-sans">
                  <Zap className="w-5 h-5 text-[#059669]" />
                  <span>{item.capacityMW}</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#059669] transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>

                {/* Key States Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
                  {item.primaryStates.map((state) => (
                    <span
                      key={state}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-600 px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200/60"
                    >
                      <MapPin className="w-2.5 h-2.5 text-zinc-400" />
                      <span>{state}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectRegion(item.region);
                    const el = document.getElementById("projects-catalog");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-xs font-semibold text-[#059669] group-hover:text-[#047857] flex items-center justify-between transition-colors pt-2 border-t border-zinc-100 cursor-pointer"
                >
                  <span>{isHindi ? "क्षेत्रीय परियोजनाएं देखें" : "View Regional Assets"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </CardFadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
