"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface MediaSlide {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  tag: string;
  tagHi: string;
  caption: string;
  captionHi: string;
  duration: number; // in milliseconds
}

export const HERO_MEDIA_SLIDES: MediaSlide[] = [
  {
    id: "india-grid-video",
    type: "video",
    src: "/media/optimized/india_solar_network_cinematic.mp4",
    poster: "/media/optimized/india_solar_grid.webp",
    tag: "National Grid",
    tagHi: "राष्ट्रीय ग्रिड",
    caption: "Pan-India Decentralized Solar Network",
    captionHi: "अखिल भारतीय विकेंद्रीकृत सोलर नेटवर्क",
    duration: 8000,
  },
  {
    id: "bifacial-hardware-image",
    type: "image",
    src: "/media/optimized/bifacial_hardware_showcase.webp",
    poster: "/media/optimized/bifacial_hardware_showcase.webp",
    tag: "Tier-1 ALMM",
    tagHi: "टियर-1 ALMM",
    caption: "High-Efficiency Bifacial PV Modules",
    captionHi: "उच्च-दक्षता बाइफेशियल पीवी मॉड्यूल",
    duration: 7500,
  },
  {
    id: "renewable-hub-video",
    type: "video",
    src: "/media/optimized/renewable_energy_hub_cinematic.mp4",
    poster: "/media/optimized/clean_energy_wind_hub.webp",
    tag: "Hybrid Infrastructure",
    tagHi: "हाइब्रिड इन्फ्रास्ट्रक्चर",
    caption: "Integrated Solar & Clean Tech Ecosystem",
    captionHi: "एकीकृत सोलर व क्लीन टेक तंत्र",
    duration: 8000,
  },
  {
    id: "rooftop-engineering-image",
    type: "image",
    src: "/media/optimized/rooftop_solar_engineering.webp",
    poster: "/media/optimized/rooftop_solar_engineering.webp",
    tag: "PM Surya Ghar",
    tagHi: "पीएम सूर्य घर",
    caption: "Precision Rooftop EPC Engineering",
    captionHi: "सटीक रूफटॉप ईपीसी इंजीनियरिंग",
    duration: 7500,
  },
  {
    id: "rooftop-generation-video",
    type: "video",
    src: "/media/optimized/rooftop_solar_generation_cinematic.mp4",
    poster: "/media/optimized/rooftop_solar_engineering.webp",
    tag: "Turnkey EPC",
    tagHi: "टर्नकी ईपीसी",
    caption: "Residential & Commercial Net Metering",
    captionHi: "आवासीय व वाणिज्यिक नेट-मीटरिंग",
    duration: 8000,
  },
  {
    id: "wind-solar-hub-image",
    type: "image",
    src: "/media/optimized/clean_energy_wind_hub.webp",
    poster: "/media/optimized/clean_energy_wind_hub.webp",
    tag: "Clean Energy",
    tagHi: "स्वच्छ ऊर्जा",
    caption: "Sustainable Zero-Emission Horizon",
    captionHi: "शून्य-उत्सर्जन स्वच्छ भविष्य",
    duration: 7500,
  },
  {
    id: "solar-architecture-video",
    type: "video",
    src: "/media/optimized/solar_panels_architecture_cinematic.mp4",
    poster: "/media/optimized/bifacial_hardware_showcase.webp",
    tag: "PV Architecture",
    tagHi: "पीवी वास्तुकला",
    caption: "Next-Gen Photovoltaic Module Engineering",
    captionHi: "अगली पीढ़ी के फोटोवोल्टाइक मॉड्यूल",
    duration: 8000,
  },
  {
    id: "india-solar-map-image",
    type: "image",
    src: "/media/optimized/india_solar_grid.webp",
    poster: "/media/optimized/india_solar_grid.webp",
    tag: "Subsidies & Scale",
    tagHi: "सब्सिडी व विस्तार",
    caption: "Empowering Solar Entrepreneurs Across India",
    captionHi: "देशभर के सोलर उद्यमियों का सशक्तिकरण",
    duration: 7500,
  },
  {
    id: "energy-sparks-video",
    type: "video",
    src: "/media/optimized/energy_activation_sparks_16x9.mp4",
    poster: "/media/optimized/energy_activation_sparks.webp",
    tag: "Instant Energization",
    tagHi: "त्वरित ऊर्जाकरण",
    caption: "Seamless DISCOM Synchronization & DBT Disbursal",
    captionHi: "सुगम डिस्कॉम नेट-मीटरिंग व डीबीटी अंतरण",
    duration: 7500,
  },
];

export default function HeroMediaSlider() {
  const { isHindi } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);

  const totalSlides = HERO_MEDIA_SLIDES.length;
  const currentSlide = HERO_MEDIA_SLIDES[currentIndex];

  // Helper to go to next slide
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
    pausedProgressRef.current = 0;
    if (typeof window !== "undefined") {
      startTimeRef.current = performance.now();
    }
  }, [totalSlides]);

  // Helper to go to previous slide
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
    pausedProgressRef.current = 0;
    if (typeof window !== "undefined") {
      startTimeRef.current = performance.now();
    }
  }, [totalSlides]);

  // Helper to jump to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    pausedProgressRef.current = 0;
    if (typeof window !== "undefined") {
      startTimeRef.current = performance.now();
    }
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Video playback management on slide change
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentIndex) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        // Delay pausing inactive videos slightly to ensure buttery-smooth cross-fade
        const pauseTimeout = setTimeout(() => {
          if (video && idx !== currentIndex) {
            video.pause();
          }
        }, 1100);
        return () => clearTimeout(pauseTimeout);
      }
    });
  }, [currentIndex]);

  // Handle auto-advancing timer & progress bar
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const duration = currentSlide.duration;
    const remainingTime = duration * (1 - pausedProgressRef.current / 100);
    startTimeRef.current = performance.now() - (duration * pausedProgressRef.current) / 100;

    // Smooth progress bar update (every 50ms)
    progressIntervalRef.current = setInterval(() => {
      const elapsed = performance.now() - startTimeRef.current;
      const currentPct = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentPct);
      pausedProgressRef.current = currentPct;
    }, 50);

    // Slide advance timer
    timerRef.current = setTimeout(() => {
      goToNext();
    }, remainingTime);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying, currentSlide.duration, goToNext]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none" aria-label="Hero background slider">
      {/* 1. Media Layers Stack (Cross-Fading) */}
      <div className="absolute inset-0 z-0">
        {HERO_MEDIA_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isNext = idx === (currentIndex + 1) % totalSlides;
          const isPrev = idx === (currentIndex - 1 + totalSlides) % totalSlides;
          // Keep active, next, and previous rendered for instantaneous, seamless cross-fade
          const shouldMount = isActive || isNext || isPrev;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={shouldMount ? "auto" : "metadata"}
                  poster={slide.poster}
                  className="w-full h-full object-cover object-center"
                >
                  <source src={slide.src} type="video/mp4" />
                  {/* Fallback image */}
                  {slide.poster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.poster}
                      alt={slide.caption}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.caption}
                  className={`w-full h-full object-cover object-center transition-transform duration-[8500ms] ease-out will-change-transform ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Calibrated Overlay Gradients (Protects text contrast on left, keeps right vivid) */}
      {/* Horizontal Scrim: Dark on left for text legibility, transparent on right for media vibrancy */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(7, 12, 22, 0.74) 0%, rgba(7, 12, 22, 0.52) 38%, rgba(7, 12, 22, 0.20) 70%, rgba(7, 12, 22, 0.04) 100%)",
        }}
      />

      {/* Top Header Grounding Scrim */}
      <div
        className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6, 11, 20, 0.55) 0%, rgba(6, 11, 20, 0.15) 60%, transparent 100%)",
        }}
      />

      {/* Bottom Grounding Blend into page content */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(7, 12, 22, 0.40) 0%, transparent 100%)",
        }}
      />

      {/* Subtle Ambient Emerald Accent in top-left brand corner */}
      <div
        className="absolute top-0 left-0 w-96 h-96 z-10 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 70%)",
        }}
      />

      {/* 3. Luxury Floating Slider HUD Controls */}
      <div className="absolute right-6 lg:right-10 bottom-6 lg:bottom-10 z-20 flex items-center gap-3">
        {/* Glassmorphic Control Pill */}
        <div className="flex items-center gap-3 sm:gap-4 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/40 hover:bg-black/55 backdrop-blur-md border border-white/20 text-white transition-all duration-200 shadow-2xl">
          {/* Active scene badge & index */}
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-white/90">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="text-white/40">/{String(totalSlides).padStart(2, "0")}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 border-l border-white/20 pl-3">
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-xs font-normal text-white/90 truncate max-w-[170px]">
              {isHindi ? currentSlide.tagHi : currentSlide.tag}
            </span>
          </div>

          {/* Segmented Linear Progress Bar */}
          <div
            className="w-14 sm:w-20 h-1 bg-white/20 rounded-full overflow-hidden relative"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Slide timer progress"
          >
            <div
              className="h-full bg-emerald-400 rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Prev / Play / Next Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goToPrev}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95 focus:outline-none"
              aria-label={isPlaying ? "Pause slider" : "Play slider"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 text-white/80 hover:text-white transition-all active:scale-95 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick jump dot indicators (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
          {HERO_MEDIA_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${isHindi ? slide.tagHi : slide.tag}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-5 h-1.5 bg-emerald-400"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
