"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  TableProperties,
  Building2,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { pcuProducts, type PCUProduct } from "@/data/products/pcus";
import { PCUCard } from "./pcu/PCUCard";
import { PCUComparisonMatrix } from "./pcu/PCUComparisonMatrix";
import { PCUModal } from "./pcu/PCUModal";

export type { PCUProduct };

export default function TopSellingPCUSection() {
  const { t, isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showComparison, setShowComparison] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<PCUProduct | null>(null);

  const filteredProducts =
    activeTab === "all"
      ? pcuProducts
      : pcuProducts.filter((p) => p.category === activeTab);

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] border-t border-black/10 overflow-hidden" id="solar-pcu">
      {/* Cinematic Background Media & Multi-Stop Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src="/media/optimized/bifacial_hardware_showcase.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-50 sm:opacity-60"
        />
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/40 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal>
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 lg:gap-8 pb-2">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <Cpu className="w-3.5 h-3.5 text-white" />
                <span>{t("pcu.badge", "INDUSTRIAL & INSTITUTIONAL CORES")}</span>
              </div>
              <WordStaggerHeading
                as="h2"
                className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
              >
                {t("pcu.title", "Commercial Power Conditioning Units (PCU)")}
              </WordStaggerHeading>
              <SubheadingReveal
                className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
                delay={0.16}
              >
                {t("pcu.description", "Galvanically-isolated, heavy-copper MPPT power conditioning architectures engineered for medical campuses, data nodes, and three-phase commercial estates.")}
              </SubheadingReveal>
            </div>

            {/* Action Row: Filters + Compare Button */}
            <div className="flex flex-wrap items-center gap-3 max-w-full">
              {/* Filter Tabs */}
              <SlidingTabs
                tabs={[
                  { id: "all", label: t("pcu.tabs.all", "All Capacities (4)") },
                  { id: "48v", label: t("pcu.tabs.fortyEight", "48V Commercial Banks") },
                  { id: "high-voltage", label: t("pcu.tabs.highVoltage", "High-Voltage Bus (96V–180V)") },
                ]}
                activeId={activeTab}
                onChange={setActiveTab}
                className="bg-[#FAFAFA]"
              />

              {/* Side-by-Side Compare Toggle */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="h-[42px] px-4 rounded-full border border-black/10 bg-white hover:bg-primary hover:text-white hover:border-primary text-[#18181B] font-sans text-xs font-normal flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>
                  {showComparison
                    ? t("pcu.hideCompare", "COLLAPSE MATRIX")
                    : t("pcu.compare", "COMPARE ALL 4 CAPACITIES")}
                </span>
              </button>
            </div>
          </div>
        </MotionReveal>

        {/* 4 PCU Cards Grid */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredProducts.map((pcu) => (
            <MotionItem key={pcu.id} className="h-full">
              <PCUCard
                pcu={pcu}
                onOpenModal={() => setActiveModalProduct(pcu)}
                isHindi={isHindi}
              />
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Side-by-Side Comparison Matrix */}
        {showComparison && (
          <PCUComparisonMatrix
            onCollapse={() => setShowComparison(false)}
            isHindi={isHindi}
            t={t}
          />
        )}

        {/* Institutional Application Trust Badges Card */}
        <CardFadeReveal delay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg border border-black/10 bg-[#FAFAFA] shadow-xs">
          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.medical", "HEALTHCARE & CRITICAL LABS")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.medicalDesc", "Zero-break transfer protecting diagnostic machinery, cold storage, and surgical lighting")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.dsp", "DUAL-PROCESSOR BRAIN")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.dspDesc", "Samples PV irradiance, battery health, and utility fluctuations at microsecond fidelity")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.galvanic", "COPPER GALVANIC BARRIER")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.galvanicDesc", "Heavy pure copper transformer safeguards sensitive electronics from surges and lightning spikes")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.inrush", "300% INRUSH OVERHEAD")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.inrushDesc", "Effortlessly fires up inductive chiller compressors, vacuum pumps, and heavy motors")}
              </p>
            </div>
          </MotionItem>
        </CardFadeReveal>
      </div>

      {/* Quick Specs Interactive Modal */}
      <PCUModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        isHindi={isHindi}
      />
    </section>
  );
}
