"use client";

import Link from "next/link";
import {
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Users2,
  ArrowRight,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { trackEvent } from "@/lib/analytics";

interface AboutHeroProps {
  onApplyFranchise?: () => void;
}

export default function AboutHero({ onApplyFranchise }: AboutHeroProps) {
  const { isHindi } = useLanguage();

  const metrics = [
    {
      value: "1+ GW",
      label: isHindi ? "वार्षिक फोटोवोल्टाइक क्षमता" : "Annual PV Pipeline",
      sub: isHindi ? "टियर-1 ALMM निर्माण" : "Tier-1 ALMM Scale",
      Icon: Zap,
    },
    {
      value: "15,000+",
      label: isHindi ? "सफल रूफटॉप परियोजनाएं" : "Rooftops Energized",
      sub: isHindi ? "आवासीय व वाणिज्यिक" : "Residential & C&I",
      Icon: Building2,
    },
    {
      value: "₹78,000",
      label: isHindi ? "सीधी डीबीटी सब्सिडी" : "Direct DBT Disbursal",
      sub: isHindi ? "पीएम सूर्य घर सहायता" : "PM Surya Ghar Fast-Track",
      Icon: ShieldCheck,
    },
    {
      value: "500+",
      label: isHindi ? "सत्यापित फ्रेंचाइज पार्टनर्स" : "Franchise Partners",
      sub: isHindi ? "अखिल भारतीय नेटवर्क" : "Pan-India Footprint",
      Icon: Users2,
    },
    {
      value: "150 km/h",
      label: isHindi ? "विंड शीयर सहनशीलता" : "Wind-Shear Tested",
      sub: isHindi ? "संरचनात्मक स्थिरता" : "Structural Engineering",
      Icon: Award,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#070C16] text-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background Corporate Headquarters Image with Calibrated Scrim */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about/about_hero_headquarters.jpg"
          alt="Solvex Energy Corporate Headquarters"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />

        {/* Ambient Dark Scrims for Flawless Readability */}
        <div className="absolute inset-0 bg-black/45 z-[1]" />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(90deg, rgba(7, 12, 22, 0.92) 0%, rgba(7, 12, 22, 0.78) 45%, rgba(7, 12, 22, 0.40) 80%, rgba(7, 12, 22, 0.15) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 z-[3]"
          style={{
            background:
              "linear-gradient(0deg, #070C16 0%, rgba(7, 12, 22, 0.60) 60%, transparent 100%)",
          }}
        />
        {/* Ambient Emerald Radial Glow */}
        <div
          className="absolute top-0 left-0 w-96 h-96 z-[2] opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.28) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Breadcrumb + Status Badge */}
        <MotionReveal>
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-[-0.1px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-300">
              <Link href="/" className="hover:text-white transition-colors">
                {isHindi ? "होम" : "Home"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-emerald-400 font-medium">
                {isHindi ? "हमारे बारे में" : "About Us"}
              </span>
            </nav>

            <span className="text-zinc-500">•</span>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white text-xs font-normal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Solvex" className="w-3.5 h-3.5 object-contain" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {isHindi
                  ? "सूरत, गुजरात संचालन // राष्ट्रीय क्लीन एनर्जी अग्रणी"
                  : "Surat, Gujarat Operations // National Clean Tech Pioneer"}
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* Main Editorial Hero Content */}
        <MotionReveal className="flex flex-col items-start gap-6 max-w-4xl">
          <h1 className="headline-display text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-[-1.2px] text-white leading-[1.08]">
            {isHindi ? (
              <>
                भारत के विकेंद्रीकृत सोलर बदलाव का <br className="hidden sm:inline" />
                विश्वास और इंजीनियरिंग के साथ नेतृत्व
              </>
            ) : (
              <>
                Powering India’s Renewable Future <br className="hidden sm:inline" />
                Through Decentralized Solar Engineering
              </>
            )}
          </h1>

          <p className="body-lg text-base sm:text-lg lg:text-xl font-normal text-white/90 leading-relaxed max-w-3xl tracking-[-0.2px]">
            {isHindi
              ? "सूरत, गुजरात में स्थापित Solvex Energy Solutions विशाल फोटोवोल्टाइक विनिर्माण और स्थानीय व्यावसायिक निष्पादन के बीच की दूरी को पाटती है। हम संस्थागत इंजीनियरिंग मानकों, ALMM टियर-1 हार्डवेयर और त्वरित पीएम सूर्य घर सब्सिडी पाइपलाइन के साथ भारत भर में स्वच्छ ऊर्जा का विस्तार कर रहे हैं।"
              : "Headquartered in Surat, Gujarat, Solvex Energy Solutions bridges the gap between institutional photovoltaic manufacturing and agile on-ground execution. We empower ambitious enterprises, contractors, and regional distributors to deploy utility-grade rooftop solar arrays backed by precision engineering stamps, DISCOM synchronization, and fast-track DBT subsidy disbursals."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
            <button
              type="button"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "apply_franchise_about_hero",
                  source: "about_hero",
                });
                onApplyFranchise?.();
              }}
              className="h-[52px] px-7 sm:px-8 bg-primary text-white hover:bg-primary-hover rounded-full text-sm sm:text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>{isHindi ? "फ्रेंचाइज पार्टनर आवेदन करें" : "Join Franchise Ecosystem"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "get_quote_about_hero",
                  source: "about_hero",
                });
                openProductEnquiryDialog({
                  product: "PM Surya Ghar Rooftop EPC System",
                  capacity: "5",
                });
              }}
              className="h-[52px] px-6 sm:px-7 bg-white text-[#18181B] hover:bg-zinc-100 rounded-full text-sm sm:text-base font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isHindi ? "सोलर कोटेशन प्राप्त करें" : "Request Commercial Allocation"}</span>
            </button>
          </div>
        </MotionReveal>

        {/* Bento Key Metrics Strip */}
        <MotionStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-6 border-t border-white/20">
          {metrics.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <MotionItem
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md flex flex-col gap-1 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                    {item.value}
                  </span>
                  <Icon className="w-4 h-4 text-emerald-400 shrink-0 opacity-80" />
                </div>
                <span className="text-xs font-medium text-white/95 tracking-[-0.1px] pt-1">
                  {item.label}
                </span>
                <span className="text-[11px] text-zinc-400 tracking-[-0.1px]">
                  {item.sub}
                </span>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
