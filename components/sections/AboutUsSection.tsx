"use client";

import {
  Building,
  Handshake,
  Rocket,
  Network,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUsSection() {
  const { isHindi } = useLanguage();

  return (
    <section className="relative w-full py-20 lg:py-28 bg-white border-b border-black/[0.08] overflow-hidden" id="about-us">
      {/* Cinematic Background Video & Overlay Gradients */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/optimized/clean_energy_wind_hub.webp"
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        >
          <source src="/media/optimized/solar_panels_architecture_cinematic.mp4" type="video/mp4" />
        </video>
        {/* Multi-stop protective gradient washes with solid seam margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/95 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/35 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Row */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-black/10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white self-start text-xs font-normal tracking-[-0.1px]">
              <Building className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "कॉर्पोरेट प्रोफाइल // गुजरात संचालन" : "Corporate Profile // Gujarat Operations"}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi ? "विकेंद्रीकृत सोलर पावर द्वारा स्वच्छ तकनीक का लोकतंत्रीकरण" : "Democratizing Clean Tech Through Decentralized Solar Power"}
            </h2>
            <p className="body-lg text-base lg:text-lg font-normal text-[#71717A] leading-relaxed tracking-[-0.2px]">
              {isHindi
                ? "सूरत, गुजरात में मुख्यालय वाली Solvex Energy Solutions Pvt Ltd विशाल फोटोवोल्टाइक विनिर्माण और स्थानीय व्यावसायिक निष्पादन के बीच की दूरी को पाटती है। हम महत्वाकांक्षी उद्यमियों, ठेकेदारों और क्षेत्रीय वितरकों को संस्थागत इंजीनियरिंग स्वीकृति, वैधानिक अनुमतियों और सीधी सब्सिडी प्रक्रिया के साथ यूटिलिटी-ग्रेड रूफटॉप सोलर लगाने में सक्षम बनाते हैं।"
                : "Headquartered in Surat, Gujarat, Solvex Energy Solutions Pvt Ltd bridges the gap between massive photovoltaic manufacturing and local commercial execution. We empower ambitious entrepreneurs, contractors, and regional distributors to deploy utility-grade rooftop solar arrays backed by institutional engineering stamps, statutory clearances, and direct subsidy pipelines."}
            </p>
          </div>

          {/* Featured Photo Card */}
          <div className="project-card w-full lg:w-[420px] rounded-lg border border-black/10 bg-white shrink-0 overflow-hidden shadow-sm group">
            <div className="project-card__media w-full h-48 relative overflow-hidden bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Solvex Energy Solutions field engineering team"
                className="project-card__image w-full h-full object-cover"
                src="/images/solar_team_1.jpeg"
                loading="lazy"
                decoding="async"
                width={420}
                height={192}
              />
            </div>
            <div className="p-5 flex flex-col gap-1.5 bg-white border-t border-black/10">
              <div className="flex items-center gap-2 text-[#18181B] text-xs font-normal tracking-[-0.1px]">
                <Handshake className="w-4 h-4 text-[#18181B]" />
                <span>{isHindi ? "टर्नकी इंजीनियरिंग व फील्ड इंस्टॉलेशन" : "Turnkey Engineering & Field Deployment"}</span>
              </div>
              <p className="text-xs font-normal text-[#71717A] leading-relaxed">
                {isHindi
                  ? "सटीक 3D शैडो एनालिसिस, स्ट्रक्चरल लोड सत्यापन और डिस्कॉम द्विदिशी ग्रिड स्वीकृति।"
                  : "Precision shadow analysis, structural validation stamps, and synchronized bi-directional grid clearance."}
              </p>
            </div>
          </div>
        </MotionReveal>

        {/* Bento Grid of Key Credentials */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Mission */}
          <MotionItem className="card-superpower flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-[#18181B] flex items-center justify-center shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "सोलर समृद्धि का प्रसार" : "Democratizing Solar Wealth"}
              </h3>
            </div>
            <p className="body-md text-sm text-[#71717A] leading-relaxed">
              {isHindi
                ? "क्षेत्रीय व्यापार मालिकों को औद्योगिक-ग्रेड तकनीकी क्षमता से लैस करना ताकि हर छत एक स्वायत्त आय और स्वच्छ बिजली उत्पादक बन सके।"
                : "Equipping regional business owners with industrial-grade technical capability so every rooftop becomes an autonomous income and clean power generator."}
            </p>
          </MotionItem>

          {/* Card: What We Do */}
          <MotionItem className="card-superpower flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-[#18181B] flex items-center justify-center shrink-0">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "संपूर्ण सोलर इकोसिस्टम" : "Full-Stack Solar Ecosystem"}
              </h3>
            </div>
            <p className="body-md text-sm text-[#71717A] leading-relaxed">
              {isHindi
                ? "सीधी फैक्ट्री आपूर्ति, सटीक 3D CAD रूफ लेआउट मॉडलिंग, प्रमाणित बैलेंस-ऑफ-सिस्टम और प्रत्यक्ष पीएम सूर्य घर डीबीटी समन्वय।"
                : "Factory supply distribution, precision 3D CAD roof layout modeling, certified safety balance-of-systems, and direct PM Surya Ghar DBT subsidy liasoning."}
            </p>
          </MotionItem>

          {/* Card: Registration */}
          <MotionItem className="card-superpower flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 p-1.5 flex items-center justify-center shrink-0 border border-black/5 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Solvex" loading="lazy" decoding="async" width={28} height={28} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "कॉर्पोरेट प्रशासन" : "Corporate Governance"}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#18181B] font-normal tracking-[-0.1px]">
                SOLVEX ENERGY SOLUTIONS PVT LTD
              </p>
              <p className="text-[11px] text-[#71717A] tracking-[-0.1px]">
                CIN: U35105GJ2024PTC150137 &bull; {isHindi ? "MNRE सूचीबद्ध भागीदार" : "MNRE Enlisted Partner"}
              </p>
            </div>
          </MotionItem>

          {/* Card: Where We Operate */}
          <MotionItem className="card-superpower flex flex-col gap-3 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-[#18181B] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "राष्ट्रीय परिचालन विस्तार" : "Cross-State Deployment Footprint"}
              </h3>
            </div>
            <p className="body-md text-sm text-[#71717A] leading-relaxed">
              {isHindi
                ? "गुजरात, महाराष्ट्र, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश में संचालित उच्च-उत्पादन वाले कमर्शियल, कृषि और आवासीय रूफटॉप एरे।"
                : "High-yield commercial, agricultural, and residential rooftop arrays operational across Gujarat, Maharashtra, Rajasthan, Uttar Pradesh, and Madhya Pradesh, backed by localized technical support cells."}
            </p>
          </MotionItem>

          {/* Card: Partner Model */}
          <MotionItem className="card-superpower flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-[#18181B] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                {isHindi ? "सहज फ्रैंचाइज़ी मॉडल" : "Frictionless Franchise Model"}
              </h3>
            </div>
            <p className="body-md text-sm text-[#71717A] leading-relaxed">
              {isHindi
                ? "पूर्व तकनीकी अनुभव की आवश्यकता नहीं। Solvex संपूर्ण तकनीकी उत्तरदायित्व वहन करता है—सिविल इंजीनियरिंग, डिस्कॉम इंटरकनेक्शन और सरकारी सब्सिडी क्लीयरेंस।"
                : "No previous renewable engineering experience needed. Solvex absorbs the technical liability—civil engineering stamps, DISCOM interconnection, and government subsidy clearance."}
            </p>
          </MotionItem>
        </MotionStagger>
      </div>
    </section>
  );
}
