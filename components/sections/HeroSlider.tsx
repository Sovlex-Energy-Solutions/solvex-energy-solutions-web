"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Factory,
  Trophy,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Wrench,
  FlaskConical,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";

interface SlideItem {
  id: number;
  tabLabel: string;
  category: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  Icon: React.ElementType;
}

const rawSlides = [
  {
    id: 1,
    tabLabelEn: "GW Capacity",
    tabLabelHi: "GW क्षमता",
    categoryEn: "CAPACITY EXPANSION",
    categoryHi: "क्षमता विस्तार",
    titleEn: "Industrial-Grade Photovoltaic Production Lines",
    titleHi: "औद्योगिक-ग्रेड फोटोवोल्टाइक उत्पादन लाइनें",
    subtitleEn: "Scaling domestic clean energy capacity to supply high-efficiency ALMM modules across western India.",
    subtitleHi: "उच्च दक्षता वाले ALMM मॉड्यूल की आपूर्ति हेतु स्वच्छ ऊर्जा विनिर्माण क्षमता का विस्तार।",
    src: "/images/slider/slide1_1gw_inauguration.jpeg",
    alt: "Industrial Solar Cell & Module Manufacturing Plant",
    Icon: Factory,
  },
  {
    id: 2,
    tabLabelEn: "Thermal Endurance",
    tabLabelHi: "थर्मल सहनशीलता",
    categoryEn: "CLIMATE RESILIENCE",
    categoryHi: "जलवायु लचीलापन",
    titleEn: "Tested for Extreme Heat & Continuous High-Yield Output",
    titleHi: "अत्यधिक गर्मी में निरंतर उच्च-उत्पादन हेतु परीक्षित",
    subtitleEn: "Proprietary anti-PID coatings and low thermal coefficients sustaining maximum output through 48°C+ peaks.",
    subtitleHi: "एंटी-PID कोटिंग्स और कम तापीय गुणांक 48°C+ में भी अधिकतम बिजली उत्पादन बनाए रखते हैं।",
    src: "/images/slider/slide2_player_banner.jpg",
    alt: "High-Efficiency Solar Performance Campaign",
    Icon: Trophy,
  },
  {
    id: 3,
    tabLabelEn: "Rooftop Standard",
    tabLabelHi: "रूफटॉप मानक",
    categoryEn: "ENGINEERING RIGOR",
    categoryHi: "इंजीनियरिंग उत्कृष्टता",
    titleEn: "Turnkey Grid-Synchronized Rooftop Solar Architecture",
    titleHi: "टर्नकी ग्रिड-सिंक्रोनाइज़्ड रूफटॉप सोलर आर्किटेक्चर",
    subtitleEn: "Delivering engineered on-grid and hybrid installations with verified DISCOM net-metering synchronization.",
    subtitleHi: "प्रमाणित डिस्कॉम नेट-मीटरिंग के साथ ऑन-ग्रिड और हाइब्रिड रूफटॉप इंस्टॉलेशन।",
    src: "/images/slider/slide3_trusted_brand.jpg",
    alt: "Trusted Rooftop Solar Architecture",
    Icon: ShieldCheck,
  },
  {
    id: 4,
    tabLabelEn: "PM Surya Ghar",
    tabLabelHi: "पीएम सूर्य घर",
    categoryEn: "DIRECT SUBSIDY PIPELINE",
    categoryHi: "प्रत्यक्ष सब्सिडी पाइपलाइन",
    titleEn: "Direct Central Subsidy Clearance Without Administrative Delay",
    titleHi: "बिना किसी प्रशासनिक देरी के सीधी केंद्रीय सब्सिडी",
    subtitleEn: "Streamlined documentation and DISCOM liaison securing up to ₹78,000 direct bank transfers for consumer rooftops.",
    subtitleHi: "पारदर्शी प्रलेखन और डिस्कॉम समन्वय से ₹78,000 तक का सीधा बैंक ट्रांसफर।",
    src: "/images/slider/slide4_anil_kapoor_subsidy.jpg",
    alt: "PM Surya Ghar Subsidy Fast-Track Execution",
    Icon: Zap,
  },
  {
    id: 5,
    tabLabelEn: "Unified Hardware",
    tabLabelHi: "एकीकृत हार्डवेयर",
    categoryEn: "SYSTEM HARMONY",
    categoryHi: "सिस्टम समन्वय",
    titleEn: "A Fully Harmonized Solar Ecosystem Under One Roof",
    titleHi: "एक ही छत के नीचे पूर्ण सौर ऊर्जा समाधान",
    subtitleEn: "From high-density TOPCon PV panels to hybrid digital MPPT inverters and heavy-duty tubular battery banks.",
    subtitleHi: "हाई-डेंसिटी TOPCon सोलर पैनल से लेकर स्मार्ट हाइब्रिड इन्वर्टर और बैटरियों तक।",
    src: "/images/slider/slide5_solar_solutions.jpg",
    alt: "Complete Clean Energy Equipment Portfolio",
    Icon: Layers,
  },
  {
    id: 6,
    tabLabelEn: "Solar Care 360",
    tabLabelHi: "सोलर केयर 360",
    categoryEn: "ON-GROUND DISPATCH",
    categoryHi: "ऑन-ग्राउंड फील्ड सहायता",
    titleEn: "Dedicated Regional Engineers & Rapid Field Support",
    titleHi: "समर्पित क्षेत्रीय इंजीनियर्स एवं त्वरित फील्ड सहायता",
    subtitleEn: "Field-deployed service units guaranteeing rapid on-site troubleshooting and continuous yield monitoring.",
    subtitleHi: "त्वरित ऑन-साइट समस्या समाधान और निरंतर उत्पादन निगरानी सुनिश्चित करने वाला नेटवर्क।",
    src: "/images/slider/slide6_solar_care.jpg",
    alt: "Solar Care 360 Regional Technical Network",
    Icon: Wrench,
  },
  {
    id: 7,
    tabLabelEn: "Robotic Assembly",
    tabLabelHi: "रोबोटिक असेंबली",
    categoryEn: "INDUSTRY 4.0 PRECISION",
    categoryHi: "इंडस्ट्री 4.0 परिशुद्धता",
    titleEn: "Automated Stringing, Soldering & Multi-Stage EL Diagnostics",
    titleHi: "स्वचालित स्ट्रिंगिंग, सोल्डरिंग व मल्टी-स्टेज ईएल परीक्षण",
    subtitleEn: "Zero micro-crack tolerance achieved through robotic assembly and rigorous multi-stage electroluminescence scanning.",
    subtitleHi: "रोबोटिक असेंबली और बहु-स्तरीय स्कैनिंग द्वारा शून्य माइक्रो-क्रैक सहनशीलता।",
    src: "/images/slider/slide7_manufacturing.jpg",
    alt: "Precision Solar Module Manufacturing Facility",
    Icon: Cpu,
  },
  {
    id: 8,
    tabLabelEn: "Applied R&D",
    tabLabelHi: "अनुप्रयुक्त आरएंडडी",
    categoryEn: "CLEANTECH INNOVATION",
    categoryHi: "क्लीनटेक नवाचार",
    titleEn: "Pioneering Next-Generation Photovoltaic & Inverter Tech",
    titleHi: "आधुनिक फोटोवोल्टाइक व इन्वर्टर तकनीक का विकास",
    subtitleEn: "Dedicated solar technologists advancing cell conversion rates, thermal dissipation, and MPPT response times.",
    subtitleHi: "सेल रूपांतरण दर, हीट डिसिपेशन और एमपीपीटी रिस्पॉन्स में निरंतर तकनीकी प्रगति।",
    src: "/images/slider/slide8_rd.jpg",
    alt: "Solar Technology Research and Development Lab",
    Icon: FlaskConical,
  },
];

export default function HeroSlider() {
  const { isHindi } = useLanguage();

  const slides: SlideItem[] = useMemo(() => {
    return rawSlides.map((s) => ({
      id: s.id,
      tabLabel: isHindi ? s.tabLabelHi : s.tabLabelEn,
      category: isHindi ? s.categoryHi : s.categoryEn,
      title: isHindi ? s.titleHi : s.titleEn,
      subtitle: isHindi ? s.subtitleHi : s.subtitleEn,
      src: s.src,
      alt: s.alt,
      Icon: s.Icon,
    }));
  }, [isHindi]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const [plugins] = useState(() => [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 35,
    },
    plugins
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!isPlaying) return;
    const raf = requestAnimationFrame(() => setProgress(0));
    const intervalTime = 50;
    const step = (intervalTime / 5000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + step;
      });
    }, intervalTime);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [selectedIndex, isPlaying]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [emblaApi, isPlaying]);

  return (
    <section
      aria-label="Clean Energy Infrastructure & Innovation Showcase"
      className="relative w-full bg-gradient-to-b from-white via-[#FAFAFA] to-white py-14 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-8">
        {/* Showcase Header */}
        <MotionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white w-fit text-xs font-normal tracking-[-0.1px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{isHindi ? "राष्ट्रीय इन्फ्रास्ट्रक्चर एवं क्षमता" : "National Infrastructure & Scale"}</span>
              </div>
              <h2 className="headline-md text-2xl sm:text-3xl lg:text-[31px] font-normal tracking-[-1.08px] text-[#18181B]">
                {isHindi ? "भारत भर में नए क्लीन एनर्जी मानक स्थापित करना" : "Setting New Clean Energy Benchmarks Across India"}
              </h2>
            </div>

            {/* Quick Controls Bar: Counter, Play/Pause, Prev/Next */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="px-3.5 py-1.5 rounded-full border border-black/10 bg-white text-[#18181B] text-xs font-normal tabular-nums shadow-xs">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>

              <button
                onClick={toggleAutoplay}
                aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                className="w-9 h-9 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title={isPlaying ? "Pause slider" : "Play slider"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>

              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </MotionReveal>

        {/* Main Stage Carousel */}
        <div className="relative group">
          {/* Carousel Viewport (Rounded 8px per DESIGN.md card spec) */}
          <div
            className="overflow-hidden rounded-lg border border-black/10 bg-black relative shadow-lg"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="flex-[0_0_100%] min-w-0 relative aspect-[2.35/1] sm:aspect-[2.5/1] md:aspect-[2.65/1] min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[460px] overflow-hidden select-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    width={1600}
                    height={680}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                  />

                  {/* Atmospheric Vignette Overlay per DESIGN.md */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%)",
                    }}
                  />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/80 backdrop-blur-md text-white text-xs font-normal tracking-[-0.1px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      <span>{slide.category}</span>
                    </div>
                  </div>

                  {/* Bottom Text Pill (8px radius per DESIGN.md card spec) */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
                    <div className="max-w-2xl p-5 sm:p-6 rounded-lg border border-white/20 bg-black/80 backdrop-blur-md text-white flex flex-col gap-2 shadow-lg">
                      <h3 className="text-xl sm:text-2xl font-normal text-white line-clamp-1 tracking-[-0.5px]">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed text-zinc-300 tracking-[-0.1px]">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left / Right Navigation Arrows */}
            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Top Auto-Play Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20 overflow-hidden">
              <div
                className="h-full bg-primary transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Interactive Quick-Jump Tabs (Pill rounded per DESIGN.md) */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <SlidingTabs
            className="min-w-max"
            tabs={slides.map((slide, index) => {
              const Icon = slide.Icon;
              return {
                id: String(index),
                label: slide.tabLabel,
                icon: <Icon className="w-3.5 h-3.5 shrink-0" />,
              };
            })}
            activeId={String(selectedIndex)}
            onChange={(id) => scrollTo(Number(id))}
          />
        </div>
      </div>
    </section>
  );
}
