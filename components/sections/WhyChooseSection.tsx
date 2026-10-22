"use client";

import Image from "next/image";
import {
  Megaphone,
  Award,
  GraduationCap,
  Shield,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseSection() {
  const { t } = useLanguage();

  const items = [
    {
      title: t("whyChoose.i1.title", "Omnichannel Acquisition Engine"),
      desc: t("whyChoose.i1.desc", "Geo-targeted lead generation funnels, branded project brochures, and validated client conversion workflows delivered to your local office."),
      Icon: Megaphone,
    },
    {
      title: t("whyChoose.i2.title", "Direct ALMM & DCR Supply Pipeline"),
      desc: t("whyChoose.i2.desc", "Unrestricted allocation of Tier-1 TOPCon bifacial modules, rMPPT hybrid inverters, and high-cycle storage directly from authorized depots."),
      Icon: Award,
    },
    {
      title: t("whyChoose.i3.title", "Solvex Technical Academy"),
      desc: t("whyChoose.i3.desc", "Intensive hands-on technician accreditation covering structural CAD simulations, high-voltage safety, and bi-directional DISCOM synchronization."),
      Icon: GraduationCap,
    },
    {
      title: t("whyChoose.i4.title", "Turnkey EPC Engineering Oversight"),
      desc: t("whyChoose.i4.desc", "Institutional engineering stamps, certified wind-load structural calculations, and seamless balance-of-systems logistics."),
      Icon: Shield,
    },
    {
      title: t("whyChoose.i5.title", "Institutional BOQ & Tender Desk"),
      desc: t("whyChoose.i5.desc", "Dedicated project estimation division drafting bankable bills of quantities and compliance dockets for large C&I and government bids."),
      Icon: TrendingUp,
    },
    {
      title: t("whyChoose.i6.title", "Solvex Care 360 Field Network"),
      desc: t("whyChoose.i6.desc", "Rapid-response localized service engineering fleet ensuring strict 48-hour SLA resolutions, proactive telemetry, and warranty fulfilment."),
      Icon: Wrench,
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="why-choose">
      {/* Cinematic Background Media & Multi-Stop Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src="/media/optimized/clean_energy_wind_hub.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-50 sm:opacity-60"
        />
        {/* Soft edge blend gradients to dissolve seamlessly into white */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-white/35 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <span>{t("whyChoose.badge", "STRATEGIC COMPETITIVE ADVANTAGE")}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {t("whyChoose.title", "Why Leading Clean Tech Partners Choose Solvex")}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {t("whyChoose.description", "We eliminate regional execution bottlenecks by pairing direct Tier-1 supply lines with precision civil-electrical engineering, statutory subsidy clearance, and dedicated field service infrastructure.")}
            </p>
          </div>
        </MotionReveal>

        {/* 6 Cards Grid - Superpower Cards 8px */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.Icon;
            return (
              <MotionItem key={i}>
                <div
                  className="card-superpower p-6 sm:p-8 flex items-start gap-4 group transition-all duration-300 hover:border-black/30 shadow-xs h-full"
                >
                  <div
                    className="w-11 h-11 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 text-[#18181B]"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">{item.title}</h3>
                    <p className="body-sm text-xs leading-relaxed text-[#71717A]">{item.desc}</p>
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
