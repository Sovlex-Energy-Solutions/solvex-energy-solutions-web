"use client";

import {
  Leaf,
  Cpu,
  Scale,
  Users,
  ShieldAlert,
  SunMedium,
  CheckCircle,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function PillarsAndValuesSection() {
  const { isHindi } = useLanguage();

  const pillars = [
    {
      num: "01",
      badge: isHindi ? "पर्यावरणीय प्रबंधन" : "Ecological Stewardship",
      title: isHindi
        ? "आने वाली पीढ़ियों के लिए शुद्ध कार्बन शमन"
        : "Uncompromising Carbon Abatement for Decades",
      desc: isHindi
        ? "Solvex के 25+ वर्ष आयु वाले सौर संयंत्र हजारों टन कार्बन डाइऑक्साइड उत्सर्जन को रोकते हैं। हमारे मॉड्यूल पूर्णतः रिसाइक्लेबल हैं और पर्यावरण अनुकूल सामग्री से निर्मित हैं।"
        : "Every megawatt of Solvex photovoltaic hardware offsets thousands of metric tons of greenhouse gas emissions across its 25+ year operational life cycle, supported by cradle-to-cradle material recyclability.",
      Icon: Leaf,
      tags: ["25+ Year Lifespan", "Circular Lifecycle", "Zero Toxic Leaching"],
    },
    {
      num: "02",
      badge: isHindi ? "इंजीनियरिंग परिशुद्धता" : "Engineering Precision",
      title: isHindi
        ? "रोबोटिक असेंबली और चरम मौसम सहनशीलता"
        : "Industry 4.0 Robotics & Extreme Climate Resilience",
      desc: isHindi
        ? "मल्टी-स्टेज इलेक्ट्रो-ल्यूमिनेसेंस स्कैनिंग और रोबोटिक सोल्डरिंग से शून्य माइक्रो-क्रैक सुनिश्चित होता है। हमारे स्ट्रक्चर 150 किमी/घंटा की हवा को आसानी से झेलते हैं।"
        : "Automated optical stringing, vacuum lamination, and multi-stage EL crack scanning eliminate micro-fractures, while anodized aluminum framing withstands 150 km/h wind shear and torrential monsoons.",
      Icon: Cpu,
      tags: ["150 km/h Wind Tested", "Anti-PID Cell Tech", "Robotic Soldering"],
    },
    {
      num: "03",
      badge: isHindi ? "वैधानिक अखंडता" : "Statutory Integrity",
      title: isHindi
        ? "एमएनआरई, बीआईएस और डिस्कॉम के उच्चतम मानक"
        : "Total Statutory Compliance & Seamless Subsidies",
      desc: isHindi
        ? "एमएनआरई की एएलएमएम सूची, बीआईएस प्रमाणीकरण और पीएम सूर्य घर पोर्टल पर सीधी पंजीकरण सहायता के साथ उपभोक्ता को त्वरित ₹78,000 डीबीटी सब्सिडी मिलती है।"
        : "Unflinching adherence to MNRE guidelines, BIS equipment codes, and transparent DISCOM net-metering liaison expedites direct ₹78,000 DBT subsidy disbursements without administrative friction.",
      Icon: Scale,
      tags: ["ALMM Tier-1 Listed", "Direct ₹78k DBT", "DISCOM Certified"],
    },
    {
      num: "04",
      badge: isHindi ? "उद्यमी सशक्तीकरण" : "Franchise Ecosystem",
      title: isHindi
        ? "स्थानीय ऊर्जा उद्यमियों के साथ साझा समृद्धि"
        : "Grassroots Clean Tech Wealth Creation",
      desc: isHindi
        ? "हम भारत भर के ठेकेदारों और क्षेत्रीय वितरकों को सीधी फैक्ट्री कीमत, पूर्ण इन्वेंटरी, डिजिटल लीड्स और प्रमाणित तकनीशियन प्रशिक्षण प्रदान करते हैं।"
        : "We equip regional energy contractors and ambitious entrepreneurs with direct factory allocations, margin security, digital customer routing, and on-ground engineering mentorship.",
      Icon: Users,
      tags: ["Territorial Exclusivity", "Factory Pricing", "Solar Care 360"],
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#F8F9FA] overflow-hidden" id="core-pillars">
      {/* Background Soft Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header */}
        <MotionReveal className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px]">
            <SunMedium className="w-3.5 h-3.5 text-white" />
            <span>{isHindi ? "मौलिक मूल्य एवं स्तंभ" : "Foundational Tenets"}</span>
          </div>
          <h2 className="headline-md text-3xl sm:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
            {isHindi ? "हमारे ऊर्जा परिवर्तन के चार मुख्य आधारस्तंभ" : "The Core Pillars Behind Every Solvex Installation"}
          </h2>
          <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
            {isHindi
              ? "हमारी प्रत्येक परियोजना, हार्डवेयर और साझेदारी इन चार अटूट सिद्धांतों पर टिकी है जो ग्राहकों को दीर्घकालिक विश्वसनीयता प्रदान करते हैं।"
              : "Our engineering operations, manufacturing discipline, and partner engagements are governed by four non-negotiable principles."}
          </p>
        </MotionReveal>

        {/* 4 Pillars Grid */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.Icon;
            return (
              <MotionItem
                key={idx}
                className="p-7 sm:p-9 rounded-2xl border border-black/10 bg-white shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between gap-6 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-semibold tracking-[-0.1px]">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{pillar.badge}</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-zinc-300 group-hover:text-emerald-500 transition-colors">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#18181B] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#71717A] leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                {/* Micro-tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/5">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
