"use client";

import { Sun, ArrowRight } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-2">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <Sun className="w-3.5 h-3.5 text-white" />
                <span>{t("projects.badge", "COMMISSIONED INFRASTRUCTURE")}</span>
              </div>
              <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                {t("projects.title", "Flagship Utility & Commercial Deployments")}
              </h2>
              <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                {t("projects.description", "Representative showcase of megawatt-scale solar parks, institutional microgrids, and captive industrial rooftop arrays engineered and commissioned across regional corridors.")}
              </p>
            </div>
            <a
              className="group btn-secondary h-[46px] px-6 rounded-full text-xs font-normal text-[#18181B] flex items-center gap-2 shadow-xs cursor-pointer"
              href="#partner-form"
            >
              <span>{t("projects.cta", "REQUEST PROJECT DOSSIER")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#18181B] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </MotionReveal>

        {/* 4-Card Desktop Deck - Superpower Cards with Stagger & Image Zoom */}
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, idx) => (
            <MotionItem key={idx} className="h-full">
              <div
                className="card-superpower project-card h-full p-0 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-black/30 shadow-xs"
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
                <div className="p-6 pt-0">
                  <a
                    className="font-sans text-xs uppercase tracking-wider text-[#18181B] hover:text-primary flex items-center gap-1.5 transition-colors font-normal"
                    href="#partner-form"
                  >
                    <span>{t("projects.caseStudy", "REVIEW TECHNICAL DOSSIER")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
