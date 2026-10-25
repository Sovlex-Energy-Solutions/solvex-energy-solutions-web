"use client";

import React from "react";
import { ShieldCheck, Cpu, Layers, CheckCircle2, Wrench, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";

export default function ProjectsEngineeringStandards() {
  const { isHindi } = useLanguage();

  const standards = [
    {
      icon: <Layers className="w-5 h-5 text-[#059669]" />,
      title: isHindi ? "टियर-1 एएलएमएम प्रमाणित हार्डवेयर" : "ALMM Tier-1 Bifacial Hardware",
      subtitle: isHindi ? "उच्च तापमान में भी अधिकतम उत्पादन" : "High-Yield Glass-Glass Architecture",
      desc: isHindi
        ? "एमएनआरई प्रमाणित बाइफेशियल सोलर पैनल जो भारत की उच्च सौर विकिरण और विषम जलवायु परिस्थितियों में भी 25 से अधिक वर्षों तक न्यूनतम क्षरण सुनिश्चित करते हैं।"
        : "MNRE-listed high-efficiency glass-glass bifacial modules delivering superior dual-sided photon harvesting, optimized temperature coefficients, and sub-0.45% annual degradation.",
      points: [
        isHindi ? "550W+ एन-टाइप टॉपकॉन व मोनो पर्क तकनीक" : "550W+ N-Type TOPCon & Mono PERC topology",
        isHindi ? "30 वर्ष की रैखिक प्रदर्शन वारंटी" : "30-year linear performance warranty backed by tier-1 re-insurance",
        isHindi ? "एंटी-पीआईडी और नमक-कोहरा क्लास-VI प्रमाणित" : "Anti-PID, anti-lepidic, and marine salt-spray Class VI certified",
      ],
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#059669]" />,
      title: isHindi ? "स्मार्ट आरएमपीपीटी व इनवर्टर ग्रिड तकनीक" : "Smart rMPPT & High-Uptime Inverters",
      subtitle: isHindi ? "99.4% ग्रिड सिंक्रनाइज़ेशन दक्षता" : "Real-Time SCADA Cloud Telemetry",
      desc: isHindi
        ? "सॉल्वेक्स स्मार्ट इनवर्टर और औद्योगिक पीसीयू जो मिलीसेकंड एमपीपीटी प्रतिक्रिया और स्वचालित सुरक्षा तंत्र के साथ निर्बाध ग्रिड सिंक्रोनाइज़ेशन प्रदान करते हैं।"
        : "Proprietary high-efficiency grid-tied inverters and industrial PCUs engineered with sub-cycle MPPT tracking, automated arc-fault protection, and bi-directional net-metering compliance.",
      points: [
        isHindi ? "सक्रिय हार्मोनिक विरूपण फिल्टर (<3% THD)" : "Ultra-low harmonic distortion (<3% THD) meeting grid IEEE-519 norms",
        isHindi ? "क्लाउड टेलीमेट्री और 48-घंटे एसएलए समाधान" : "Real-time string-level SCADA with 48-hour on-site service SLA",
        isHindi ? "शून्य-निर्यात सुरक्षा और स्वचालित आइलैंडिंग" : "Zero-export safety interlocks and islanding protection failovers",
      ],
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#059669]" />,
      title: isHindi ? "टर्नकी ईपीसी व संरचनात्मक उत्कृष्टता" : "Turnkey EPC & Heavy Structural Rigidity",
      subtitle: isHindi ? "180 किमी/घंटा वायु गति प्रतिरोध" : "Galvanized Steel & Seismic Compliance",
      desc: isHindi
        ? "कस्टम हॉट-डिप गैल्वेनाइज्ड स्ट्रक्चर और गैर-घुसपैठ रूफटॉप क्लैंप जो छत की वॉटरप्रूफिंग और संपत्ति की दीर्घायु की रक्षा करते हैं।"
        : "Custom hot-dip galvanized structural purlins, single-axis trackers, and non-penetrative standing-seam clamps that protect building roof warranties across cyclone-prone belts.",
      points: [
        isHindi ? "आईएस 875 भाग 3 के तहत 180 किमी/घंटा हवा परीक्षण" : "Wind-tunnel verified up to 180 km/h wind gusts (IS 875 Part 3)",
        isHindi ? "80 माइक्रोन शुद्ध जिंक गैल्वनीकरण कोटिंग" : "80+ micron pure zinc galvanization preventing galvanic corrosion",
        isHindi ? "शून्य सिविल क्षति और त्वरित निष्पादन" : "Zero civil roof penetration on pre-engineered industrial buildings",
      ],
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#059669] bg-emerald-50 border border-emerald-200/60 mb-3 shadow-2xs">
            <Activity className="w-3.5 h-3.5" />
            <span>{isHindi ? "इंजीनियरिंग विश्वसनीयता मानक" : "Engineering Rigor & Quality Benchmark"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
            {isHindi ? "परियोजना निष्पादन में सॉल्वेक्स विशिष्टता" : "The Solvex Engineering Distinction"}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 mt-3 font-normal leading-relaxed">
            {isHindi
              ? "प्रत्येक मेगावाट-स्तरीय परियोजना को वैश्विक टियर-1 मानकों, कठोर सुरक्षा प्रोटोकॉल और 25 वर्षों के प्रदर्शन आश्वासन के साथ डिजाइन और चालू किया जाता है।"
              : "Every megawatt-scale project is designed, procured, and synchronized to deliver optimal levelized cost of energy (LCOE) with guaranteed long-term yield assurance."}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {standards.map((std, idx) => (
            <CardFadeReveal
              key={idx}
              index={idx}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50/80 border border-zinc-200/90 hover:border-[#059669]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white text-[#059669] border border-zinc-200/80 shadow-2xs flex items-center justify-center mb-5">
                  {std.icon}
                </div>
                <div className="text-xs font-semibold text-[#059669] uppercase tracking-wider mb-1">
                  {std.subtitle}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight mb-3">
                  {std.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-6">
                  {std.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/80 space-y-2.5">
                {std.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </CardFadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
