"use client";

import React from "react";
import {
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
} from "lucide-react";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export default function ProjectsCtaSection() {
  const { isHindi } = useLanguage();

  const handleConsultation = () => {
    trackEvent("cta_click", {
      cta_name: "projects_cta_schedule_consultation",
      source: "projects_cta_section",
    });
    openProductEnquiryDialog({
      product: "Utility & C&I Clean Power Project Consultation",
    });
  };

  const deliverables = [
    {
      title: isHindi ? "शून्य पूंजीगत व्यय (PPA / BOO)" : "Zero-Capex PPA & BOO Models",
      desc: isHindi ? "बिना अग्रिम निवेश के दीर्घकालिक ऊर्जा लागत बचत" : "Lock in predictable sub-grid power tariffs for 25 years",
    },
    {
      title: isHindi ? "टर्नकी ईपीसी व ट्रांसमिशन" : "Turnkey EPC & Grid Wheeling",
      desc: isHindi ? "भूमि सर्वेक्षण से लेकर ग्रिड सिंक्रनाइज़ेशन तक" : "Full intertie engineering, DISCOM permits & ISTS bays",
    },
    {
      title: isHindi ? "25 वर्ष प्रदर्शन वारंटी" : "25-Year Performance Guarantee",
      desc: isHindi ? "टियर-1 पुनर्बीमा समर्थित लीनियर यील्ड सुरक्षा" : "Re-insurance backed linear yield assurance with <0.45% drift",
    },
    {
      title: isHindi ? "48-घंटे सेवा एसएलए" : "Strict 48-Hour Response SLA",
      desc: isHindi ? "स्थानीय सेवा इंजीनियर व 24/7 टेलीमेट्री" : "Dedicated regional telemetry desk & rapid on-ground fleet",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Master Hero Card with Background Image & Flat Dark Overlay */}
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-[#18181B] text-white p-7 sm:p-12 lg:p-16 border border-zinc-800 shadow-none overflow-hidden">
          {/* Background Solar & Wind Clean Energy Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/optimized/clean_energy_wind_hub.webp"
            alt="Solvex Clean Energy Infrastructure"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
          />

          {/* Flat Dark Overlay Over The Image */}
          <div className="absolute inset-0 bg-black/80 pointer-events-none z-0" />

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-14">
            {/* Left Column: Heading, Value Proposition & Key Highlights */}
            <div className="flex flex-col gap-6 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>
                  {isHindi ? "कॉर्पोरेट व यूटिलिटी पीपीए साझेदारी" : "Corporate & Sovereign PPA Engagements"}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                {isHindi ? (
                  <>
                    अपनी स्वच्छ ऊर्जा यात्रा को{" "}
                    <span className="text-[#10B981]">
                      सॉल्वेक्स के साथ गति दें
                    </span>
                  </>
                ) : (
                  <>
                    Accelerate Your{" "}
                    <span className="text-[#10B981]">
                      Clean Energy Transition
                    </span>{" "}
                    with Solvex
                  </>
                )}
              </h2>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {isHindi
                  ? "चाहे आप यूटिलिटी ट्रांसमिशन हब, ग्रुप कैप्टिव सोलर पार्क या शून्य-पूंजीगत व्यय (Zero Capex) कॉर्पोरेट पीपीए की योजना बना रहे हों, हमारी अनुभवी इंजीनियरिंग टीम भूमि सर्वेक्षण से लेकर ग्रिड सिंक्रनाइज़ेशन तक टर्नकी समाधान प्रदान करती है।"
                  : "From multi-megawatt interstate transmission hubs and off-site group captive parks to zero-capex corporate PPAs, our localized engineering fleet delivers guaranteed yields, optimal tariffs, and turnkey grid execution."}
              </p>

              {/* Key Deliverables Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-black/55 border border-white/10 shadow-none flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Fast-Track Assessment Pod */}
            <div className="w-full lg:max-w-md shrink-0">
              <div className="rounded-2xl sm:rounded-3xl bg-black/65 border border-white/15 p-6 sm:p-8 flex flex-col gap-6 shadow-none">
                {/* Pod Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isHindi ? "त्वरित व्यवहार्यता अध्ययन" : "Fast-Track Feasibility"}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{isHindi ? "इंजीनियर उपलब्ध" : "Engineers Online"}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {isHindi ? "तकनीकी मूल्यांकन व यील्ड मॉडल प्राप्त करें" : "Request Technical & Tariff Feasibility"}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {isHindi
                      ? "अपनी साइट का विवरण साझा करें और सौर विकिरण सिमुलेशन, बचत पूर्वानुमान और 25-वर्षीय वित्तीय मॉडल प्राप्त करें।"
                      : "Submit your capacity requirements for solar shadow analysis, LCOE modeling, and DISCOM open-access savings."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleConsultation}
                    className="w-full h-12 px-6 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold tracking-tight shadow-none transition-colors duration-200 inline-flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
                  >
                    <span>{isHindi ? "तकनीकी परामर्श व प्रस्ताव मांगें" : "Schedule Technical Consultation"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      "Hello Solvex team! I am interested in discussing a utility/C&I clean power project (100 kW to 50+ MW). Please connect me with your senior EPC engineering desk."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("cta_click", {
                        cta_name: "projects_cta_whatsapp_desk",
                        source: "projects_cta_section",
                      });
                    }}
                    className="w-full h-11 px-6 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 text-xs sm:text-sm font-medium tracking-tight shadow-none transition-colors duration-200 inline-flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>{isHindi ? "व्हाट्सएप ईपीसी डेस्क" : "Chat on WhatsApp EPC Desk"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all ml-auto" />
                  </a>
                </div>

                {/* Direct Hotline strip */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Hotline:</span>
                  </span>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Compliance Bar */}
          <div className="relative z-10 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>MNRE ALMM Tier-1 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>6.2+ GWp Operating & Pipeline</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>48-Hour On-Ground SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ISO 9001:2015 Quality Tested</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
