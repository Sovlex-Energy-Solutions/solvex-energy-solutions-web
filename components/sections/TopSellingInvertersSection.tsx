"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  LayoutGrid,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";

export interface InverterProduct {
  id: string;
  name: string;
  category: "rmppt" | "lithium" | "heavy-duty";
  categoryLabel: string;
  capacity: string;
  voltage: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  saveAmount: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  specs: string[];
  techDetails: {
    controller: string;
    waveform: string;
    display: string;
    maxPvInput: string;
    batterySupport: string;
    warranty: string;
  };
}

const inverters: InverterProduct[] = [
  {
    id: "gamma-1kva",
    name: "Solvex Gamma+ 1kVA Pure Sine Wave Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "800W Load",
    voltage: "12V Single Battery",
    originalPrice: "₹16,189",
    salePrice: "₹11,199",
    discount: "31% OFF",
    saveAmount: "₹4,990",
    image: "/images/inverters/gamma_1kva.png",
    badge: "RESIDENTIAL FLAGSHIP",
    isPopular: true,
    idealFor: "Modern Apartments, POS Terminal Hubs & Home Workstations",
    specs: [
      "40A Dynamic rMPPT Extraction Delivering 30% Greater Solar Capture",
      "Backlit Multi-Parameter Screen with Live Watt-Hour Telemetry",
      "Universal Chemistry Selector: C10 Tall Tubular, SMF & Gel",
    ],
    techDetails: {
      controller: "40A Inbuilt Ultra-Fast rMPPT Tracking Core",
      waveform: "Precision Pure Sine Wave (THD < 3%, Zero Harmonic Buzz)",
      display: "High-Resolution Multi-Color Informational LCD",
      maxPvInput: "Up to 1000W Photovoltaic Input String",
      batterySupport: "12V Single Battery Configuration",
      warranty: "2 Years Express On-Site Replacement Warranty",
    },
  },
  {
    id: "sunplus-920",
    name: "Solvex SunPlus Pro 920 Hybrid Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "560W Load",
    voltage: "12V Single Battery",
    originalPrice: "₹7,808",
    salePrice: "₹5,350",
    discount: "31% OFF",
    saveAmount: "₹2,458",
    image: "/images/inverters/sunplus_pro_920.png",
    badge: "HIGH VALUE COMPACT",
    idealFor: "Compact Dwellings, Micro-Retail & Rural Power Backups",
    specs: [
      "25A Rapid-Tracking Solar Maximum Power Point Extraction",
      "Diesel Generator Auxiliary Frequency Auto-Synchronizer",
      "Active Dual-Stage Short-Circuit and Thermal Overload Safeguard",
    ],
    techDetails: {
      controller: "25A Integrated Solid-State rMPPT Regulator",
      waveform: "Filtered Pure Sine Wave for Sensitive Electronics",
      display: "LED Diagnostic Cluster with Audible Alert Cues",
      maxPvInput: "Up to 600W Solar PV Module String",
      batterySupport: "12V Deep-Cycle Solar Battery Bank",
      warranty: "2 Years Standard Factory Backed Guarantee",
    },
  },
  {
    id: "gamma-2600",
    name: "Solvex Gamma+ 2600 Heavy-Duty 24V Core",
    category: "heavy-duty",
    categoryLabel: "Industrial High-kVA",
    capacity: "1600W Load (2kVA)",
    voltage: "24V Dual Battery",
    originalPrice: "₹25,063",
    salePrice: "₹17,620",
    discount: "30% OFF",
    saveAmount: "₹7,443",
    image: "/images/inverters/gamma_2600.png",
    badge: "DUAL-BATTERY ASSET",
    isPopular: true,
    idealFor: "Spacious Residences, Medical Diagnostic Centers & Retail Floors",
    specs: [
      "50A / 24V Rapid MPPT Architecture Operating at 98.2% Peak Efficiency",
      "Real-Time Digital Status Panel Indicating Load Reserve & Battery DoD",
      "Surge Overhead Designed for High Inductive Compressor Startups",
    ],
    techDetails: {
      controller: "50A / 24V Dual-Phase rMPPT Microprocessor",
      waveform: "Laboratory-Grade Pure Sine Wave (< 2% Distortion)",
      display: "Interactive Alphanumeric LCD with Power Gauge",
      maxPvInput: "Up to 2000W PV String Array",
      batterySupport: "24V Dual-Bank (2x 12V High-Amperage Tubular)",
      warranty: "2 Years Doorstep Engineer Service Guarantee",
    },
  },
  {
    id: "sunplus-1020",
    name: "Solvex SunPlus Pro 1020 Acoustic-Silent Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "720W Load (900 VA)",
    voltage: "12V Single Battery",
    originalPrice: "₹8,923",
    salePrice: "₹6,110",
    discount: "32% OFF",
    saveAmount: "₹2,813",
    image: "/images/inverters/sunplus_pro_1020.png",
    badge: "WHISPER QUIET",
    idealFor: "Multi-Room Urban Residences, Consultancies & Office Suites",
    specs: [
      "30A Synchronous rMPPT Intelligent Power Routing",
      "Three-Stage Priority Logic: Solar First > Battery > Grid Feed",
      "Sub-28dB Natural Convection Cooling for Noise-Sensitive Interiors",
    ],
    techDetails: {
      controller: "30A Intelligent Synchronous rMPPT Optimizer",
      waveform: "True Pure Sine Wave Output",
      display: "Solid-State Multi-Status LED Matrix",
      maxPvInput: "Up to 800W Solar Collector Array",
      batterySupport: "12V Compatible with All Deep-Discharge Chemistries",
      warranty: "2 Years Solvex Pan-Regional Warranty Shield",
    },
  },
  {
    id: "gamma-lion-1200",
    name: "Solvex Gamma+ LiON 1200 Lithium Integrated Inverter",
    category: "lithium",
    categoryLabel: "Lithium BMS Ready",
    capacity: "1000W Load (1.2kVA)",
    voltage: "Lithium LiFePO4",
    originalPrice: "₹62,990",
    salePrice: "₹33,250",
    discount: "47% OFF",
    saveAmount: "₹29,740",
    image: "/images/inverters/gamma_lion_1200.png",
    badge: "NEXT-GEN LITHIUM",
    idealFor: "Luxury Condos, Enterprise Server Nodes & Modern Smart Homes",
    specs: [
      "Dedicated CAN/RS485 LiFePO4 Smart BMS Data Sync",
      "0-80% Ultra-Rapid 120-Minute Fast-Charge Cycle",
      "Rated for 6,000+ Deep Cycles for a Decade of Continuous Life",
    ],
    techDetails: {
      controller: "High-Bandwidth Digital rMPPT Lithium Modulator",
      waveform: "Precision Laboratory Sine Wave (Zero Voltage Ripple)",
      display: "OLED-Grade Telemetry Panel Indicating State-of-Health",
      maxPvInput: "Up to 1200W High-Efficiency Monocrystalline Input",
      batterySupport: "Native LiFePO4 Lithium Iron Phosphate Storage",
      warranty: "3 Years Comprehensive Full-System Warranty",
    },
  },
  {
    id: "gamma-3400",
    name: "Solvex Gamma+ 3400 Commercial Power Center",
    category: "heavy-duty",
    categoryLabel: "Industrial High-kVA",
    capacity: "2800W Load (3.4kVA)",
    voltage: "24V Dual Battery",
    originalPrice: "₹30,300",
    salePrice: "₹21,270",
    discount: "30% OFF",
    saveAmount: "₹9,030",
    image: "/images/inverters/gamma_3400.png",
    badge: "HIGH-DUTY CYCLE",
    idealFor: "Light Industrial Units, Educational Campuses & Departmental Outlets",
    specs: [
      "65A Heavy-Duty High-Voltage rMPPT Continuous Charge Controller",
      "Twin Variable-Speed Ball-Bearing Exhausts for 50°C Ambient Operation",
      "300% Peak Inrush Endurance for Cold Storage and Air Conditioning Loads",
    ],
    techDetails: {
      controller: "65A Multi-Stage Heavy Industrial rMPPT Controller",
      waveform: "High-Stability Industrial Pure Sine Wave",
      display: "Multi-Tiered Diagnostic Control Console",
      maxPvInput: "Up to 2800W High-Wattage Module Array",
      batterySupport: "24V Heavy Commercial Battery Bank",
      warranty: "2 Years Commercial Heavy-Duty Warranty",
    },
  },
  {
    id: "sunlion-1000",
    name: "Solvex SunLion 1000 Architectural Wall-Mount Inverter",
    category: "lithium",
    categoryLabel: "Lithium BMS Ready",
    capacity: "1 kVA All-in-One",
    voltage: "Built-In LiFePO4",
    originalPrice: "₹22,499",
    salePrice: "₹21,520",
    discount: "4% OFF",
    saveAmount: "₹979",
    image: "/images/inverters/sunlion_1000.png",
    badge: "ARCHITECTURAL MONOLITH",
    idealFor: "Designer Villas, Penthouse Lounges & Minimalist Studio Offices",
    specs: [
      "All-in-One Enclosed LiFePO4 Cell: Zero Exposed Cabling or Acid Fumes",
      "Slim Profile Chassis Engineered for Flush Wall Installation",
      "Sub-5ms Seamless Transfer Switching Ensuring Zero Computer Resets",
    ],
    techDetails: {
      controller: "Compact Integrated Solid-State MPPT & Battery Management Core",
      waveform: "Distortion-Free Pure Sine Wave Generation",
      display: "Edge-Illuminated Minimalist Capacitive Indicators",
      maxPvInput: "Up to 1000W Rooftop Solar Array",
      batterySupport: "Factory Sealed Internal Grade-A LiFePO4 Storage Module",
      warranty: "3 Years All-Inclusive Monolithic Enclosure Warranty",
    },
  },
];

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
    <section className="w-full py-20 lg:py-28 bg-[#FAFAFA]" id="solar-inverters">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Cpu className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "उन्नत इन्वर्जन आर्किटेक्चर" : "Advanced Inversion Architecture"}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi ? "उच्च प्रदर्शन वाले सोलर हाइब्रिड एवं ग्रिड इन्वर्टर" : "High-Performance Solar Hybrid & Grid Inverters"}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {isHindi
                ? "माइक्रोप्रोसेसर-नियंत्रित प्योर साइन वेव इन्वर्टर, जिसमें तीव्र एमपीपीटी ट्रैकिंग, स्मार्ट मल्टी-केमिस्ट्री बैटरी कंडीशनिंग और इंडस्ट्रियल-ग्रेड सर्ज सुरक्षा शामिल है।"
                : "Microprocessor-governed pure sine wave inverters featuring rapid MPPT tracking, smart multi-chemistry battery conditioning, and industrial-grade surge protection."}
            </p>
          </div>

          {/* Action Row: Filters + View Mode Toggle + Carousel Controls */}
          <div className="flex flex-wrap items-center gap-3">
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
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] rounded-lg bg-white border border-black/10 shadow-2xl overflow-y-auto flex flex-col text-[#18181B]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-black/10 flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-normal text-white bg-primary px-3 py-1 rounded-full">
                  {activeModalProduct.categoryLabel}
                </span>
                <span className="font-sans text-xs text-[#71717A]">{activeModalProduct.capacity}</span>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6">
              {/* Top Summary Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-40 h-40 shrink-0 rounded-lg border border-black/10 bg-[#FAFAFA] p-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    loading="lazy"
                    decoding="async"
                    width={160}
                    height={160}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-normal text-[#18181B] leading-snug tracking-[-0.4px]">
                    {activeModalProduct.name}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {isHindi ? "उपयुक्त:" : "Recommended for:"} {activeModalProduct.idealFor}
                  </p>
                  <div className="flex items-baseline gap-2 pt-1 font-sans">
                    <span className="text-2xl font-normal text-[#18181B] tracking-[-0.5px]">
                      {activeModalProduct.salePrice}
                    </span>
                    <span className="text-xs line-through text-[#71717A]">
                      {activeModalProduct.originalPrice}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-black/10 bg-black/5 text-[#18181B] text-xs font-normal">
                      {activeModalProduct.discount}
                    </span>
                  </div>
                  <span className="font-sans text-[11px] text-[#71717A]">
                    {isHindi
                      ? `${activeModalProduct.saveAmount} की तत्काल बचत (सभी कर सहित)`
                      : `Instant Savings of ${activeModalProduct.saveAmount} (Inclusive of all taxes)`}
                  </span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
                  {isHindi ? "तकनीकी विवरण" : "Technical Specifications"}
                </h4>
                <div className="rounded-lg overflow-hidden border border-black/10 font-sans text-xs">
                  {[
                    { label: isHindi ? "सोलर चार्जर" : "Solar Charger", val: activeModalProduct.techDetails.controller },
                    { label: isHindi ? "आउटपुट वेवफॉर्म" : "Output Waveform", val: activeModalProduct.techDetails.waveform },
                    { label: isHindi ? "डिस्प्ले डैशबोर्ड" : "Display Dashboard", val: activeModalProduct.techDetails.display },
                    { label: isHindi ? "अधिकतम PV पैनल इनपुट" : "Max PV Panel Input", val: activeModalProduct.techDetails.maxPvInput },
                    { label: isHindi ? "बैटरी अनुकूलता" : "Battery Compatibility", val: activeModalProduct.techDetails.batterySupport },
                    { label: isHindi ? "निर्माता वारंटी" : "Manufacturer Warranty", val: activeModalProduct.techDetails.warranty },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-2 p-3 ${
                        idx % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      } border-b border-black/10 last:border-b-0`}
                    >
                      <span className="text-[#71717A]">{row.label}</span>
                      <span className="text-[#18181B] font-normal">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
                  {isHindi ? "इंजीनियरिंग विशेषताएं" : "Engineering Highlights"}
                </h4>
                <ul className="flex flex-col gap-2 body-sm text-xs text-[#18181B]">
                  {activeModalProduct.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="sticky bottom-0 p-6 bg-white border-t border-black/10 rounded-b-lg flex items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[11px] text-[#71717A]">
                  {isHindi ? "मानक टैरिफ:" : "BENCHMARK TARIFF:"}
                </span>
                <p className="font-sans text-lg font-normal text-[#18181B]">{activeModalProduct.salePrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="btn-secondary h-[46px] px-5 text-xs rounded-full cursor-pointer"
                >
                  {isHindi ? "बंद करें" : "DISMISS"}
                </button>
                <a
                  href="#partner-form"
                  onClick={() => setActiveModalProduct(null)}
                  className="btn-primary h-[46px] px-6 text-xs rounded-full flex items-center gap-2 cursor-pointer"
                >
                  <span>{isHindi ? "विशिष्टता पत्रक व आवंटन प्राप्त करें" : "REQUEST SPEC SHEET & ALLOCATION"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Subcomponent: Inverter Card (Superpower Rounded Card 8px)
function InverterCard({
  item,
  onOpenModal,
  isHindi = false,
}: {
  item: InverterProduct;
  onOpenModal: () => void;
  isHindi?: boolean;
}) {
  return (
    <div
      onClick={onOpenModal}
      className={`card-superpower project-card flex flex-col justify-between overflow-hidden h-full group cursor-pointer transition-all duration-300 hover:border-black/30 p-0 shadow-xs ${
        item.isPopular ? "border-primary/40 ring-1 ring-primary/20" : ""
      }`}
    >
      <div className="flex flex-col">
        {/* Clean Showcase Frame (Restrained 1.035 zoom per Section 5) */}
        <div className="project-card__media relative w-full h-44 bg-[#FAFAFA] border-b border-black/10 flex items-center justify-center p-6 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            width={280}
            height={128}
            className="project-card__image max-h-32 max-w-[85%] object-contain"
          />
          {item.discount && (
            <span className="absolute top-3 right-3 font-sans text-[11px] text-white bg-primary px-2.5 py-0.5 rounded-full font-normal tracking-[-0.1px]">
              {item.discount}
            </span>
          )}
        </div>

        {/* Minimal Body */}
        <div className="p-6 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
              {item.categoryLabel}
            </span>
            <h3 className="text-base font-normal text-[#18181B] group-hover:text-black transition-colors line-clamp-1 tracking-[-0.3px]">
              {item.name}
            </h3>
          </div>

          <p className="font-sans text-xs text-[#71717A] line-clamp-1">
            {item.voltage} · {item.capacity}
          </p>

          {/* Pricing */}
          <div className="pt-3 border-t border-black/10 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-2xl font-normal text-[#18181B] tracking-tight">
                {item.salePrice}
              </span>
              <span className="font-sans text-xs line-through text-[#71717A]">
                {item.originalPrice}
              </span>
            </div>
            <span className="font-sans text-[11px] text-[#18181B] font-normal">
              {isHindi ? `बचत ${item.saveAmount}` : `Save ${item.saveAmount}`}
            </span>
          </div>
        </div>
      </div>

      {/* Sleek CTA Button */}
      <div className="p-6 pt-0">
        <div className="w-full h-[42px] rounded-full border border-black/10 bg-[#FAFAFA] group-hover:bg-primary group-hover:text-white group-hover:border-primary text-[#18181B] font-sans text-xs font-normal flex items-center justify-center gap-1.5 transition-all">
          <span>{isHindi ? "आर्किटेक्चर व विशिष्टताएं" : "Inspect Architecture & Specs"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
}
