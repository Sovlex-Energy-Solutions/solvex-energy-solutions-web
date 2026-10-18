"use client";

import { Leaf, Lightbulb, Scale, Headphones } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function MissionPillarsSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      title: t("pillars.p1.title", "Ecological Stewardship"),
      desc: t("pillars.p1.desc", "Targeted carbon mitigation via high-yield photovoltaic systems engineered for 25+ years of continuous generation."),
      Icon: Leaf,
    },
    {
      title: t("pillars.p2.title", "Architectural Precision"),
      desc: t("pillars.p2.desc", "Deploying high-efficiency TOPCon cells, rMPPT conversion logic, and structural mounting tested to 150 km/h wind shear."),
      Icon: Lightbulb,
    },
    {
      title: t("pillars.p3.title", "Statutory Integrity"),
      desc: t("pillars.p3.desc", "Rigorous compliance with MNRE guidelines, DISCOM grid-synchronization codes, and fast-track PM Surya Ghar subsidy disbursement."),
      Icon: Scale,
    },
    {
      title: t("pillars.p4.title", "Franchise Partnership"),
      desc: t("pillars.p4.desc", "Empowering regional energy entrepreneurs with turnkey inventory, technician upskilling, and dedicated telemetry support."),
      Icon: Headphones,
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F6F9] to-white overflow-hidden" id="pillars">
      {/* Cinematic Background Media & Multi-Stop Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/optimized/clean_energy_wind_hub.webp"
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        >
          <source src="/media/optimized/renewable_energy_hub_cinematic.mp4" type="video/mp4" />
        </video>
        {/* Soft edge blend gradients to dissolve seamlessly into white */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-[#F4F6F9]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/30 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-[#F4F6F9]/60 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="text-center flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px]">
              <Leaf className="w-3.5 h-3.5 text-white" />
              <span>{t("pillars.badge", "FOUNDATIONAL MANDATE")}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {t("pillars.title", "Core Tenets of Our Energy Transformation")}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {t("pillars.description", "Architecting resilient, commercially-viable solar infrastructure across India's industrial and domestic sectors, accelerating decentralized power sovereignty through local franchise enterprise.")}
            </p>
          </div>
        </MotionReveal>

        {/* 4 Pillars Grid - Superpower Cards 8px */}
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.Icon;
            return (
              <MotionItem key={idx}>
                <div
                  className="card-superpower p-6 sm:p-8 flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:border-black/30 shadow-xs h-full"
                >
                  {/* Circular Monochrome Icon Box */}
                  <div
                    className="w-12 h-12 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 text-[#18181B]"
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">
                      {pillar.title}
                    </h3>
                    <p className="body-sm text-xs leading-relaxed text-[#71717A]">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
