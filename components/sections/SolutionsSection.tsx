"use client";

import { Sun, Wind, BatteryCharging, Layers, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

export default function SolutionsSection() {
  const { t } = useLanguage();

  const solutions = [
    {
      title: t("solutions.s1.title", "Grid-Tied Photovoltaic Arrays"),
      desc: t("solutions.s1.desc", "ALMM-compliant Monocrystalline TOPCon rooftop and elevated installations built to withstand industrial wind shear and coastal corrosion."),
      Icon: Sun,
    },
    {
      title: t("solutions.s2.title", "Synchronous Microgrid Hybrid Systems"),
      desc: t("solutions.s2.desc", "Dynamic integration of solar generation, battery banks, and existing diesel generator assets for uninterrupted facility operation."),
      Icon: Wind,
    },
    {
      title: t("solutions.s3.title", "BESS Electrochemical Storage"),
      desc: t("solutions.s3.desc", "Modular LiFePO4 battery energy storage architectures engineered for peak-tariff shaving, critical load buffering, and zero downtime."),
      Icon: BatteryCharging,
    },
    {
      title: t("solutions.s4.title", "Full-Cycle EPC Project Execution"),
      desc: t("solutions.s4.desc", "Complete civil and electrical drafting, high-voltage transformer stepping, earthing pit testing, and DISCOM net-meter commissioning."),
      Icon: Layers,
    },
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF]" id="solutions">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-2">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <span>{t("solutions.badge", "TURNKEY GENERATION ECOSYSTEM")}</span>
              </div>
              <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                {t("solutions.title", "Integrated Clean Energy Architectures")}
              </h2>
              <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                {t("solutions.description", "From shadow simulation and DISCOM bi-directional approval to precision EPC commissioning and continuous cloud generation telemetry.")}
              </p>
            </div>
            <a
              className="group btn-secondary h-[46px] px-6 rounded-full text-xs font-normal text-[#18181B] flex items-center gap-2 shadow-xs cursor-pointer"
              href="#partner-form"
            >
              <span>{t("solutions.cta", "VIEW TECHNICAL PORTFOLIO")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#18181B] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </MotionReveal>

        {/* 4 Solutions Desktop Grid - Superpower Cards 8px */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((sol, i) => {
            const Icon = sol.Icon;
            return (
              <MotionItem key={i}>
                <div
                  className="card-superpower p-6 sm:p-8 flex flex-col gap-6 group transition-all duration-300 hover:border-black/30 shadow-xs h-full"
                >
                  <div
                    className="w-12 h-12 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 text-[#18181B]"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">{sol.title}</h3>
                    <p className="body-sm text-xs leading-relaxed text-[#71717A]">{sol.desc}</p>
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>

        {/* EPC Technical Consultation Bar */}
        <MotionReveal className="rounded-2xl border border-black/10 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              {t("solutions.banner_badge", "Commercial & Industrial EPC Advisory")}
            </span>
            <h3 className="text-lg lg:text-xl font-normal text-[#18181B] tracking-[-0.3px]">
              {t("solutions.banner_title", "Planning a Factory, Warehouse, or Institutional Solar Array?")}
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-xl">
              {t("solutions.banner_sub", "Connect directly with our Chief Projects Engineer for HT/LT connectivity assessment, 25-year LCOE financial models, and DISCOM sanctions.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+919879012345"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "call_epc_solutions",
                  source: "solutions_section",
                });
              }}
              className="h-[46px] px-5 rounded-full border border-black/15 bg-white hover:bg-zinc-100 text-[#18181B] text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+91 98790 12345</span>
            </a>
            <a
              href={`https://wa.me/919879012345?text=${encodeURIComponent(
                "Hello Solvex team, I need an EPC consultation for our commercial/industrial facility. Please connect me with your chief solar engineer."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "whatsapp_epc_solutions",
                  source: "solutions_section",
                });
              }}
              className="h-[46px] px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>{t("solutions.chat_whatsapp", "WhatsApp EPC Desk")}</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
