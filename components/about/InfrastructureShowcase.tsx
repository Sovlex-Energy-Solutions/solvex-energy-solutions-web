"use client";

import {
  Factory,
  Cpu,
  FlaskConical,
  Wrench,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";

export default function InfrastructureShowcase() {
  const { isHindi } = useLanguage();

  const capabilities = [
    {
      title: isHindi ? "रोबोटिक स्ट्रिंगिंग और सोल्डरिंग" : "Automated Robotic Stringing",
      desc: isHindi
        ? "अत्यधिक सटीक सोल्डरिंग रोबोट जो सेल-टू-सेल प्रतिरोध को न्यूनतम करते हैं और तापीय प्रसार को संतुलित रखते हैं।"
        : "Industry 4.0 automated stringing stations ensuring zero physical micro-stresses and ultra-low internal resistance.",
      image: "/slider/solvex_energy_manufacturing_capabilities_slider_4k.webp",
      badge: "Industry 4.0 Precision",
      Icon: Cpu,
    },
    {
      title: isHindi ? "मल्टी-स्टेज ईएल डायग्नोस्टिक्स" : "Multi-Stage EL Crack Diagnostics",
      desc: isHindi
        ? "वैक्यूम लेमिनेशन से पहले और बाद में विद्युत-दीप्ति (EL) स्कैनिंग, जो मानव आंख से अदृश्य दोषों को भी पकड़ती है।"
        : "Automated electroluminescence imaging before and after vacuum encapsulation flags any sub-surface hairline fractures.",
      image: "/slider/file_0000000061b88210ba864a51e48cb771.webp",
      badge: "Zero-Defect Quality Gate",
      Icon: FlaskConical,
    },
    {
      title: isHindi ? "थर्मल और मौसम सहनशीलता परीक्षण" : "Extreme Heat & PID Endurance",
      desc: isHindi
        ? "48°C+ के चरम ग्रीष्म तापमान और कठोर औद्योगिक धूल भरे वातावरण में निरंतर अधिकतम आउटपुट का सत्यापन।"
        : "Proprietary anti-PID coatings and low thermal coefficient silicon engineered to withstand 48°C+ western India peaks.",
      image: "/slider/solvex_energy_trust_slider_2560x1016-1.webp",
      badge: "Climate Resilience",
      Icon: ShieldCheck,
    },
    {
      title: isHindi ? "सोलर केयर 360 - फील्ड नेटवर्क" : "Solar Care 360 Field Fleet",
      desc: isHindi
        ? "समर्पित क्षेत्रीय इंजीनियर्स और 24-घंटे फील्ड रिस्पॉन्स वैन जो ऑन-साइट तकनीकी सहायता सुनिश्चित करती हैं।"
        : "Field-deployed technical service units and rapid on-ground diagnostic engineers ensuring continuous lifetime yield.",
      image: "/slider/solvex_energy_one_stop_solar_solutions_2560x1016.webp",
      badge: "On-Ground Dispatch",
      Icon: Wrench,
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="manufacturing-infrastructure">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary w-fit text-xs font-medium tracking-[-0.1px]">
              <Factory className="w-3.5 h-3.5" />
              <span>{isHindi ? "औद्योगिक अवसंरचना" : "Industrial Infrastructure"}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl sm:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {isHindi
                ? "विश्वस्तरीय विनिर्माण, परीक्षण और ऑन-ग्राउंड इंजीनियरिंग"
                : "World-Class Manufacturing, Rigorous Testing & Rapid Field Engineering"}
            </WordStaggerHeading>
          </div>
          <SubheadingReveal
            className="body-md text-base text-[#71717A] max-w-md font-normal leading-relaxed tracking-[-0.2px]"
            delay={0.16}
          >
            {isHindi
              ? "हमारे संयंत्र में प्रत्येक मॉड्यूल अंतरराष्ट्रीय आईईसी और भारतीय बीआईएस मानकों से कहीं अधिक कड़े परीक्षणों से गुजरता है।"
              : "Every Solvex module and inverter undergoes rigorous stress testing that exceeds conventional IEC and BIS benchmark thresholds."}
          </SubheadingReveal>
        </MotionReveal>

        {/* 4 Infrastructure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <CardFadeReveal
                key={idx}
                index={idx}
                className="group rounded-2xl border border-black/10 bg-[#FAFAFA] overflow-hidden flex flex-col hover:border-emerald-500/40 hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden bg-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {item.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-medium tracking-wide">Stage 0{idx + 1}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2 flex-1 justify-between bg-white">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold tracking-tight text-[#18181B] group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#71717A] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </CardFadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
