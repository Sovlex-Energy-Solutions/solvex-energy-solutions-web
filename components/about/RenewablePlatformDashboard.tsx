"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flag,
  Landmark,
  Building2,
  Network,
  HardHat,
  Globe2,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";

interface RenewablePlatformDashboardProps {
  className?: string;
}

export default function RenewablePlatformDashboard({
  className = "",
}: RenewablePlatformDashboardProps) {
  const { isHindi } = useLanguage();

  return (
    <section
      id="about-us"
      aria-label="About Solvex Energy"
      className={`py-12 sm:py-16 bg-white text-zinc-900 relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 ${className}`}
    >
      <span id="about" className="sr-only" />
      <span id="scale-and-impact" className="sr-only" />
      {/* Background Cinematic Video & Multi-Stop Gradient Overlays */}
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
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        >
          <source src="/media/optimized/india_solar_network_cinematic.mp4" type="video/mp4" />
        </video>
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/40 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Container */}
        <div className="relative">
          {/* Top Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 sm:pb-10 border-b border-zinc-100">
            {/* Left Header: Main Title */}
            <div className="max-w-2xl">
              {/* Title with word-by-word bottom-to-top staggered reveal */}
              <WordStaggerHeading
                as="h2"
                className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-zinc-900 tracking-tight leading-[1.12]"
              >
                {isHindi ? "सॉल्वेक्स के बारे में: भारत के" : "About Solvex: Powering India's"}
                <br />
                {isHindi ? "स्वच्छ ऊर्जा परिवर्तन को गति" : "Clean Energy Vanguard"}
              </WordStaggerHeading>
            </div>

            {/* Right Header: Subtitle & CTA Button */}
            <div className="lg:max-w-md flex flex-col lg:items-start">
              <SubheadingReveal
                className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal mb-6"
                delay={0.2}
              >
                {isHindi
                  ? "राष्ट्रीय ग्रिड और प्रमुख कॉर्पोरेट अग्रणियों के लिए विशेष रूप से तैयार किए गए गीगावाट-स्तरीय शून्य-कार्बन ऊर्जा समाधान।"
                  : "Delivering gigawatt-scale zero-carbon power architectures exclusively engineered for sovereign national grids and tier-1 corporate leaders."}
              </SubheadingReveal>

              {/* Action Button */}
              <div>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#059669] text-white text-sm font-medium hover:bg-[#047857] shadow-sm hover:shadow transition-all duration-200 group"
                >
                  <span>{isHindi ? "पोर्टफोलियो देखें" : "Explore Portfolio"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Unified 6-Metric Telemetry Bar */}
          <CardFadeReveal delay={0.1} className="mt-8 sm:mt-10 bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
              {/* 1. ACTIVE FLEET */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    {isHindi ? "सक्रिय क्षमता" : "ACTIVE FLEET"}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    6.3
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-[#059669] ml-1.5">
                    GWp
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  COMMISSIONED
                  <br />
                  ASSETS
                </div>
              </div>

              {/* 2. PIPELINE */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    {isHindi ? "पाइपलाइन" : "PIPELINE"}
                  </span>
                  <HardHat className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    2
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    GW
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  SHOVEL-READY
                  <br />
                  PORTFOLIO
                </div>
              </div>

              {/* 3. HORIZON 2030 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    HORIZON 2030
                  </span>
                  <Flag className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    20
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-[#059669] ml-1.5">
                    GW
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  DECARBONIZATION
                  <br />
                  GOAL
                </div>
              </div>

              {/* 4. EQUITY */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    {isHindi ? "पूंजी" : "EQUITY"}
                  </span>
                  <Landmark className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    ~$1
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    Billion
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  INSTITUTIONAL
                  <br />
                  EQUITY
                </div>
              </div>

              {/* 5. OFF-TAKERS */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    {isHindi ? "ग्राहक" : "OFF-TAKERS"}
                  </span>
                  <Building2 className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    200+
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  ENTERPRISE
                  <br />
                  CLIENTS
                </div>
              </div>

              {/* 6. NETWORK */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    {isHindi ? "नेटवर्क" : "NETWORK"}
                  </span>
                  <Network className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    23
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    States
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  INTERCONNECTED
                  <br />
                  GRID
                </div>
              </div>
            </div>
          </CardFadeReveal>

          {/* Integrated 4-Quadrant Clean Energy Transition Platform Matrix */}
          <div className="mt-8 sm:mt-10">
            {/* 4-Quadrant Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {/* 1. TOP-LEFT CARD: India's Leading Renewable Energy Transition Platform */}
                <CardFadeReveal
                  index={0}
                  className="bg-white rounded-lg border border-black/10 hover:border-[#059669]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#059669] font-medium">
                        {isHindi ? "राष्ट्रीय पदचिह्न" : "Pan-India Scale"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                        <Globe2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <WordStaggerHeading
                      as="h4"
                      className="text-lg sm:text-xl font-normal text-[#18181B] tracking-tight leading-snug"
                    >
                      {isHindi
                        ? "भारत का अग्रणी नवीकरणीय ऊर्जा परिवर्तन मंच"
                        : "India's Leading Renewable Energy Transition Platform"}
                    </WordStaggerHeading>

                    <SubheadingReveal
                      className="text-xs sm:text-[13px] text-zinc-500 mt-2 font-normal leading-relaxed"
                      delay={0.15}
                    >
                      {isHindi
                        ? "C&I और यूटिलिटी दोनों क्षेत्रों में अखिल भारतीय उपस्थिति के साथ उच्च-दक्षता उत्पादन।"
                        : "Multi-gigawatt footprint delivering dispatchable clean power for sovereign grids and private enterprises."}
                    </SubheadingReveal>

                    {/* Compact Pills */}
                    <div className="mt-4 pt-3.5 border-t border-zinc-100 flex flex-col gap-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {["Solar", "Wind", "Hybrid", "Storage", "Trading"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/70 text-[#18181B] text-[11px] font-normal"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {["On-site Captive", "Off-site", "Intrastate", "ISTS", "VPPA"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-emerald-50/70 border border-emerald-200/60 text-[#059669] text-[11px] font-normal"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardFadeReveal>

                {/* 2. TOP-RIGHT CARD: Complete Solution Provider for C&I & Utility Customers */}
                <CardFadeReveal
                  index={1}
                  className="bg-white rounded-lg border border-black/10 hover:border-[#059669]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#059669] font-medium">
                        {isHindi ? "विभाजित समाधान" : "Tailored Solutions"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <WordStaggerHeading
                      as="h4"
                      className="text-lg sm:text-xl font-normal text-[#18181B] tracking-tight leading-snug"
                    >
                      {isHindi ? "सम्पूर्ण समाधान प्रदाता" : "Complete Solution Provider"}
                    </WordStaggerHeading>

                    <SubheadingReveal
                      className="text-xs sm:text-[13px] text-zinc-500 mt-2 font-normal leading-relaxed"
                      delay={0.15}
                    >
                      {isHindi
                        ? "उद्यमों और उपयोगिता ग्रिड के लिए अनुकूलित शून्य-कार्बन समाधान।"
                        : "Turnkey clean energy architectures optimized for enterprise balance sheets and utility grids."}
                    </SubheadingReveal>

                    {/* Dual Column Layout: C&I vs Utility */}
                    <div className="mt-4 pt-3.5 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left Column: C&I Customers */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#059669] font-medium">
                            {isHindi ? "C&I उपभोक्ता" : "C&I Customers"}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1.5 text-xs text-zinc-600 font-normal">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            <span>{isHindi ? "वितरित उत्पादन (कैप्टिव)" : "Distributed generation"}</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            <span>{isHindi ? "ओपन एक्सेस VPPA" : "Open Access VPPA"}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Right Column: Utility Customers */}
                      <div className="flex flex-col gap-1.5 sm:border-l sm:border-zinc-100 sm:pl-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#18181B] font-medium">
                            {isHindi ? "यूटिलिटी उपभोक्ता" : "Utility Customers"}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-1.5 text-xs text-zinc-600 font-normal">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            <span>{isHindi ? "सोलर | विंड | हाइब्रिड" : "Solar | Wind | Hybrid"}</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                            <span>{isHindi ? "स्टोरेज RTC (राउंड-द-क्लॉक)" : "Storage RTC (Round-the-Clock)"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardFadeReveal>

                {/* 3. BOTTOM-LEFT CARD: High ESG and Corporate Governance Standards */}
                <CardFadeReveal
                  index={2}
                  className="bg-white rounded-lg border border-black/10 hover:border-[#059669]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#059669] font-medium">
                        {isHindi ? "संस्थागत विश्वसनीयता" : "Governance"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <WordStaggerHeading
                      as="h4"
                      className="text-lg sm:text-xl font-normal text-[#18181B] tracking-tight leading-snug"
                    >
                      {isHindi
                        ? "उच्च ESG एवं कॉर्पोरेट गवर्नेंस मानक"
                        : "High ESG & Corporate Governance Standards"}
                    </WordStaggerHeading>

                    {/* IFC Standards Highlight Badge */}
                    <div className="mt-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{isHindi ? "IFC मानकों के अनुरूप प्रमाणित" : "Compliant with IFC Standards"}</span>
                      </div>
                    </div>

                    <SubheadingReveal
                      className="text-xs sm:text-[13px] text-zinc-500 mt-2 font-normal leading-relaxed"
                      delay={0.15}
                    >
                      {isHindi
                        ? "अंतर्राष्ट्रीय वित्त निगम (IFC) के प्रदर्शन मानकों के तहत संचालित, उच्चतम पारदर्शिता व अखंडता।"
                        : "Operating under International Finance Corporation (IFC) Performance Standards with audited fiduciary mandates."}
                    </SubheadingReveal>

                    <div className="mt-4 pt-3.5 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs text-zinc-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{isHindi ? "शून्य-हानि EHS" : "Zero-Harm EHS Standard"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{isHindi ? "स्वतंत्र बोर्ड" : "Independent Board Oversight"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{isHindi ? "नैतिक आपूर्ति श्रृंखला" : "Ethical Supply Chain"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{isHindi ? "ऑडिटेड रिपोर्टिंग" : "Audited ESG Reporting"}</span>
                      </div>
                    </div>
                  </div>
                </CardFadeReveal>

                {/* 4. BOTTOM-RIGHT CARD: One Stop Shop for Energy */}
                <CardFadeReveal
                  index={3}
                  className="bg-white rounded-lg border border-black/10 hover:border-[#059669]/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#059669] font-medium">
                        {isHindi ? "टर्नकी निष्पादन" : "Turnkey Execution"}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <WordStaggerHeading
                      as="h4"
                      className="text-lg sm:text-xl font-normal text-[#18181B] tracking-tight leading-snug"
                    >
                      {isHindi ? "ऊर्जा का वन-स्टॉप समाधान" : "One Stop Shop for Energy"}
                    </WordStaggerHeading>

                    <SubheadingReveal
                      className="text-xs sm:text-[13px] text-zinc-500 mt-2 font-normal leading-relaxed"
                      delay={0.15}
                    >
                      {isHindi
                        ? "डिस्पैचेबल स्वच्छ ऊर्जा के लिए एकीकृत ट्रांज़िशन प्लेटफॉर्म — भूमि अधिग्रहण से लेकर पावर ट्रेडिंग तक।"
                        : "Transition platform for dispatchable clean energy. End-to-end lifecycle orchestration from land to power trading."}
                    </SubheadingReveal>

                    <div className="mt-4 pt-3.5 border-t border-zinc-100 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {["Solar", "Wind", "Hybrid", "Rooftop", "Storage", "Trading"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/70 text-[#18181B] text-[11px] font-normal"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                        {isHindi
                          ? "टैरिफ अनुकूलन, निर्बाध ग्रिड डिस्पैच और 25 वर्षों की उपज सुरक्षा।"
                          : "Levelized tariff optimization, uncurtailed grid dispatch, and 25-year lifecycle performance."}
                      </p>
                    </div>
                  </div>
                </CardFadeReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
