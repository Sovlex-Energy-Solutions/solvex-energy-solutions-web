"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  LayoutGrid,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { inverters, type InverterProduct } from "@/data/products/inverters";
import { InverterCard } from "./inverters/InverterCard";
import { InverterModal } from "./inverters/InverterModal";

export type { InverterProduct };

export default function TopSellingInvertersSection() {
  const { isHindi } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [activeModalProduct, setActiveModalProduct] = useState<InverterProduct | null>(null);

  // Embla Carousel Hook
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
        "(min-width: 1280px)": { slidesToScroll: 4 },
      },
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(() => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    });
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const filteredInverters =
    selectedFilter === "all"
      ? inverters
      : inverters.filter((inv) => inv.category === selectedFilter);

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F6F9] to-white overflow-hidden" id="solar-inverters">
      {/* Background Engineering Image & Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src="/media/optimized/rooftop_solar_engineering.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-50 sm:opacity-60"
        />
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-[#F4F6F9]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/30 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-[#F4F6F9]/60 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 lg:gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Cpu className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "उन्नत इन्वर्जन आर्किटेक्चर" : "Advanced Inversion Architecture"}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {isHindi ? "उच्च प्रदर्शन वाले सोलर हाइब्रिड एवं ग्रिड इन्वर्टर" : "High-Performance Solar Hybrid & Grid Inverters"}
            </WordStaggerHeading>
            <SubheadingReveal
              className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
              delay={0.16}
            >
              {isHindi
                ? "माइक्रोप्रोसेसर-नियंत्रित प्योर साइन वेव इन्वर्टर, जिसमें तीव्र एमपीपीटी ट्रैकिंग, स्मार्ट मल्टी-केमिस्ट्री बैटरी कंडीशनिंग और इंडस्ट्रियल-ग्रेड सर्ज सुरक्षा शामिल है।"
                : "Microprocessor-governed pure sine wave inverters featuring rapid MPPT tracking, smart multi-chemistry battery conditioning, and industrial-grade surge protection."}
            </SubheadingReveal>
          </div>

          {/* Action Row: Filters + View Mode Toggle + Carousel Controls */}
          <div className="flex flex-wrap items-center gap-3 max-w-full">
            {/* Category Filter Tabs with Smooth Sliding Active Pill Indicator */}
            <SlidingTabs
              tabs={[
                { id: "all", label: isHindi ? "संपूर्ण पोर्टफोलियो (7)" : "Entire Portfolio (7)" },
                { id: "rmppt", label: isHindi ? "रैपिड-MPPT सीरीज़" : "Rapid-MPPT Series" },
                { id: "lithium", label: isHindi ? "लिथियम BMS तैयार" : "Lithium BMS Ready" },
                { id: "heavy-duty", label: isHindi ? "इंडस्ट्रियल हाई-kVA" : "Industrial High-kVA" },
              ]}
              activeId={selectedFilter}
              onChange={setSelectedFilter}
            />

            {/* View Mode Switcher with Smooth Sliding Active Pill Indicator */}
            <SlidingTabs
              className="hidden sm:flex"
              buttonClassName="p-1.5 px-2"
              tabs={[
                {
                  id: "carousel",
                  label: <SlidersHorizontal className="w-3.5 h-3.5" />,
                  title: "Slider View",
                },
                {
                  id: "grid",
                  label: <LayoutGrid className="w-3.5 h-3.5" />,
                  title: "Grid View",
                },
              ]}
              activeId={viewMode}
              onChange={(val) => setViewMode(val as "carousel" | "grid")}
            />

            {/* Carousel Navigation Buttons */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={scrollPrev}
                  disabled={!prevBtnEnabled}
                  aria-label="Previous slide"
                  className={`w-9 h-9 rounded-full border border-black/10 flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    prevBtnEnabled
                      ? "bg-white text-[#18181B] hover:bg-zinc-100 active:scale-95"
                      : "bg-zinc-100 text-zinc-400 cursor-not-allowed border-black/5"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!nextBtnEnabled}
                  aria-label="Next slide"
                  className={`w-9 h-9 rounded-full border border-black/10 flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    nextBtnEnabled
                      ? "bg-white text-[#18181B] hover:bg-zinc-100 active:scale-95"
                      : "bg-zinc-100 text-zinc-400 cursor-not-allowed border-black/5"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </MotionReveal>

        {/* Content Area: Carousel or Grid */}
        {viewMode === "carousel" ? (
          <MotionReveal className="w-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 -ml-2 py-2">
                {filteredInverters.map((item) => (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-2"
                  >
                    <InverterCard
                      item={item}
                      onOpenModal={() => setActiveModalProduct(item)}
                      isHindi={isHindi}
                    />
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        ) : (
          <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInverters.map((item) => (
              <MotionItem key={item.id}>
                <InverterCard
                  item={item}
                  onOpenModal={() => setActiveModalProduct(item)}
                  isHindi={isHindi}
                />
              </MotionItem>
            ))}
          </MotionStagger>
        )}

        {/* Carousel Pagination Indicator */}
        {viewMode === "carousel" && scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? "w-8 bg-primary"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Tech Highlights Footer Bar */}
        <MotionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg border border-black/10 bg-white shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {isHindi ? "डायनामिक rMPPT निष्कर्षण" : "DYNAMIC rMPPT EXTRACTION"}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {isHindi
                  ? "सुबह, शाम और बादलों के मौसम में 30% तक अतिरिक्त सौर ऊर्जा उत्पादन"
                  : "Recovers up to 30% additional harvest under diffuse dawn, dusk, and overcast skies"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {isHindi ? "सार्वभौमिक स्टोरेज अनुकूलता" : "UNIVERSAL STORAGE COMPATIBILITY"}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {isHindi
                  ? "C10 टॉल ट्यूबलर, VRLA/SMF और मॉड्यूलर LiFePO4 सभी के लिए पूरी तरह अनुकूल"
                  : "Fully certified for C10 Tall Tubular, VRLA/SMF, and modular LiFePO4 packs"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {isHindi ? "प्रत्यक्ष फील्ड सुरक्षा" : "DIRECT FIELD ASSURANCE"}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {isHindi
                  ? "क्षेत्रीय सर्विस डिपो द्वारा समर्थित त्वरित 48-घंटे का एसएलए समाधान"
                  : "Rapid SLA doorstep technical resolution backed by regional service depots"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {isHindi ? "परिशुद्ध साइन वेव आउटपुट" : "PRECISION SINE WAVE PURITY"}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {isHindi
                  ? "संवेदनशील रेफ्रिजरेटर, चिकित्सा उपकरण और कंप्यूटरों की पूर्ण सुरक्षा"
                  : "Shields sensitive refrigeration compressors, audio gear, and mission-critical computers"}
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>

      {/* Quick Specs Interactive Modal */}
      <InverterModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        isHindi={isHindi}
      />
    </section>
  );
}
