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
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";

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
    tabLabelEn: "Solar Future",
    tabLabelHi: "सौर भविष्य",
    categoryEn: "CLEAN ENERGY VISION",
    categoryHi: "स्वच्छ ऊर्जा संकल्प",
    titleEn: "Advancing India's Solar Future",
    titleHi: "भारत के सौर भविष्य को नई दिशा",
    subtitleEn: "Engineering, advanced manufacturing, and high-efficiency solar solutions for a cleaner, greener nation.",
    subtitleHi: "स्वच्छ और हरित भारत के लिए उन्नत इंजीनियरिंग, विनिर्माण और उच्च दक्षता वाले सौर समाधान।",
    src: "/slider/file_0000000062848210a19efbcfcc5a7cfb.webp",
    alt: "Advancing India's Solar Future - Solvex Energy",
    Icon: Zap,
  },
  {
    id: 2,
    tabLabelEn: "Manufacturing",
    tabLabelHi: "विनिर्माण क्षमता",
    categoryEn: "CAPACITY EXPANSION",
    categoryHi: "क्षमता विस्तार",
    titleEn: "Industrial-Scale Manufacturing Capabilities",
    titleHi: "औद्योगिक-स्तरीय विनिर्माण क्षमताएं",
    subtitleEn: "High-density solar panels, lithium-ion storage, tubular batteries, and smart digital inverters.",
    subtitleHi: "उच्च दक्षता सोलर पैनल, लिथियम-आयन बैटरी, ट्यूबलर बैटरी और डिजिटल सोलर इनवर्टर।",
    src: "/slider/solvex_energy_manufacturing_capabilities_slider_4k.webp",
    alt: "Solvex Energy Manufacturing Capabilities",
    Icon: Factory,
  },
  {
    id: 3,
    tabLabelEn: "Trust & Quality",
    tabLabelHi: "विश्वसनीय गुणवत्ता",
    categoryEn: "ENGINEERED FOR TRUST",
    categoryHi: "विश्वास और अखंडता",
    titleEn: "Powering Confidence: A Name You Can Trust",
    titleHi: "आत्मविश्वास को शक्ति: एक विश्वसनीय नाम",
    subtitleEn: "Commitment to uncompromising quality, built for long-term performance and brighter tomorrows.",
    subtitleHi: "उच्च गुणवत्ता और दीर्घकालिक प्रदर्शन का अटूट संकल्प, जो कल को उज्ज्वल बनाए।",
    src: "/slider/solvex_energy_trust_slider_2560x1016-1.webp",
    alt: "Powering Confidence - A Name You Can Trust - Solvex Energy",
    Icon: ShieldCheck,
  },
  {
    id: 4,
    tabLabelEn: "Complete Solutions",
    tabLabelHi: "सम्पूर्ण समाधान",
    categoryEn: "SYSTEM HARMONY",
    categoryHi: "सिस्टम समन्वय",
    titleEn: "One-Stop Solar Solutions Across India",
    titleHi: "भारत भर में वन-स्टॉप सौर समाधान",
    subtitleEn: "Turnkey on-grid, off-grid, and hybrid solar systems engineered for homes and businesses.",
    subtitleHi: "घरों और व्यवसायों के लिए टर्नकी ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड सौर प्रणालियां।",
    src: "/slider/solvex_energy_one_stop_solar_solutions_2560x1016.webp",
    alt: "One-Stop Solar Solutions - Solvex Energy",
    Icon: Layers,
  },
  {
    id: 5,
    tabLabelEn: "Home Solar",
    tabLabelHi: "घरेलू सोलर",
    categoryEn: "RESIDENTIAL SOLAR",
    categoryHi: "आवासीय सौर ऊर्जा",
    titleEn: "Solarise Your Home Like a Pro",
    titleHi: "अपने घर को बनाएं सौर ऊर्जा से समृद्ध",
    subtitleEn: "Integrated home solar packages designed for lower electricity bills, reliability, and clean power.",
    subtitleHi: "कम बिजली बिल, विश्वसनीयता और स्वच्छ ऊर्जा के लिए संपूर्ण घरेलू सौर समाधान।",
    src: "/slider/solvex_energy_complete_product_portfolio_slider_2560x1016.webp",
    alt: "Solarise Your Home Like a Pro - Complete Product Portfolio",
    Icon: Trophy,
  },
  {
    id: 6,
    tabLabelEn: "Solar Advisory",
    tabLabelHi: "सोलर मार्गदर्शन",
    categoryEn: "PM SURYA GHAR & SUBSIDY",
    categoryHi: "पीएम सूर्य घर एवं सब्सिडी",
    titleEn: "Confused About Solar? We Make It Simple",
    titleHi: "सोलर को लेकर उलझन? हम बनाते हैं इसे आसान",
    subtitleEn: "Overcome high bills, power cuts, and subsidy doubts with expert guidance and seamless execution.",
    subtitleHi: "विशेषज्ञ मार्गदर्शन और पारदर्शी सब्सिडी प्रक्रिया से बिजली बिल और पावर कट से राहत पाएं।",
    src: "/slider/solvex_energy_solar_confusion_slider_2560x1016.webp",
    alt: "Confused About Solar? Let Solvex Energy Make It Simple",
    Icon: Wrench,
  },
  {
    id: 7,
    tabLabelEn: "Applied R&D",
    tabLabelHi: "अनुप्रयुक्त आरएंडडी",
    categoryEn: "CLEANTECH INNOVATION",
    categoryHi: "क्लीनटेक नवाचार",
    titleEn: "Innovative R&D: Engineering Reliable Solutions",
    titleHi: "नवाचारी आरएंडडी: अधिक विश्वसनीय समाधानों का निर्माण",
    subtitleEn: "Rigorous product testing, reliability engineering, continuous refinement, and field validation.",
    subtitleHi: "कठोर उत्पाद परीक्षण, विश्वसनीयता इंजीनियरिंग, निरंतर सुधार और फील्ड प्रदर्शन।",
    src: "/slider/file_0000000061b88210ba864a51e48cb771.webp",
    alt: "Innovative R&D - Engineering More Reliable Solar Solutions",
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
              <WordStaggerHeading
                as="h2"
                className="headline-md text-2xl sm:text-3xl lg:text-[31px] font-normal tracking-[-1.08px] text-[#18181B]"
              >
                {isHindi ? "भारत भर में नए क्लीन एनर्जी मानक स्थापित करना" : "Setting New Clean Energy Benchmarks Across India"}
              </WordStaggerHeading>
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
                    width={2560}
                    height={1016}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
                  />

                  {/* Accessible Screen Reader Information */}
                  <div className="sr-only">
                    <span>{slide.category}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.subtitle}</p>
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
