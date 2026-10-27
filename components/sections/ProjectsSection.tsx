"use client";

import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { useLanguage } from "@/context/LanguageContext";
import { Sun } from "lucide-react";

export default function ProjectsSection() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects.p1.title", "Indore Agro-Industrial Corridor"),
      desc: t("projects.p1.desc", "1.2 MW high-yield ground-mount solar generation facility powering automated food processing clusters."),
      location: t("projects.p1.location", "MADHYA PRADESH"),
      img: "/images/solar_plant_1.jpeg",
      alt: "Solar plant installation in Madhya Pradesh",
    },
    {
      title: t("projects.p2.title", "Surat Textile Manufacturing Hub"),
      desc: t("projects.p2.desc", "5.4 MW combined rooftop captive array delivering 35% grid power offset with bi-directional net metering."),
      location: t("projects.p2.location", "GUJARAT"),
      img: "/images/solar_plant_2.jpeg",
      alt: "5MW solar installation in Surat Gujarat",
    },
    {
      title: t("projects.p3.title", "Thar High-Irradiance Utility Park"),
      desc: t("projects.p3.desc", "12.8 MW high-capacity solar park featuring single-axis astronomical tracking and automated robotic dry-cleaning."),
      location: t("projects.p3.location", "RAJASTHAN"),
      img: "/images/solar_plant_3.png",
      alt: "Adani solar park installation in Rajasthan desert",
    },
    {
      title: t("projects.p4.title", "Patna Heavy Engineering Complex"),
      desc: t("projects.p4.desc", "850 kW high-tilt industrial rooftop array built on custom hot-dip galvanized structural steel frames."),
      location: t("projects.p4.location", "BIHAR"),
      img: "/images/solar_rooftop_2.jpeg",
      alt: "Commercial solar rooftop power installation in Bihar state",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F6F9] to-white overflow-hidden" id="projects">
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
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-[#F4F6F9]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/30 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-[#F4F6F9]/60 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="flex flex-col gap-4 max-w-3xl pb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Sun className="w-3.5 h-3.5 text-white" />
              <span>{t("projects.badge", "COMMISSIONED INFRASTRUCTURE")}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {t("projects.title", "Flagship Utility & Commercial Deployments")}
            </WordStaggerHeading>
            <SubheadingReveal
              className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
              delay={0.16}
            >
              {t("projects.description", "Representative showcase of megawatt-scale solar parks, institutional microgrids, and captive industrial rooftop arrays engineered and commissioned across regional corridors.")}
            </SubheadingReveal>
          </div>
        </MotionReveal>

        {/* 4-Card Desktop Deck - Superpower Cards with Stagger & Image Zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, idx) => (
            <CardFadeReveal
              key={idx}
              index={idx}
              className="card-superpower project-card h-full p-0 overflow-hidden flex flex-col group transition-all duration-300 hover:border-black/30 shadow-xs"
            >
              <div>
                <div className="project-card__media w-full h-52 relative overflow-hidden bg-[#FAFAFA] border-b border-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={proj.alt}
                    className="project-card__image w-full h-full object-cover"
                    src={proj.img}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={208}
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white font-sans text-[10px] tracking-wider uppercase font-normal shadow-xs">
                    {proj.location}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">{proj.title}</h3>
                  <p className="body-sm text-xs text-[#71717A] leading-relaxed">{proj.desc}</p>
                </div>
              </div>
            </CardFadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
