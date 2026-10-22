"use client";

import Image from "next/image";
import { Users, Store, Building2, Share2, CreditCard, Check } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function PartnershipSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F6F9] to-white overflow-hidden" id="partnerships">
      {/* Cinematic Background Media & Multi-Stop Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src="/media/optimized/india_solar_grid.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-50 sm:opacity-60"
        />
        {/* Soft edge blend gradients to dissolve seamlessly into white */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-[#F4F6F9]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/30 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-[#F4F6F9]/60 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        <MotionReveal>
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px]">
              <Users className="w-3.5 h-3.5 text-white" />
              <span>{t("partnership.badge", "COMMERCIAL ALLIANCE MATRIX")}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {t("partnership.title", "Establish Your Regional Energy Franchise")}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {t("partnership.description", "Select an operational tier structured for high equity yield: from exclusive district distribution to channel consultancy and storefront merchant monetization.")}
            </p>
          </div>
        </MotionReveal>

        {/* 4 Tiers Desktop Grid - Superpower Cards 8px */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Tier 1: Distributor Partner */}
          <MotionItem className="h-full">
            <div className="card-superpower h-full p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-black/30 shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-normal text-[#71717A] uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/10 bg-[#FAFAFA]">
                    {t("partnership.tier1.tag", "DISTRICT MONOPOLY")}
                  </span>
                  <Store className="w-4 h-4 text-[#18181B]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">
                    {t("partnership.tier1.title", "Authorized District Distributor")}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {t("partnership.tier1.desc", "Exclusive territory jurisdiction for wholesale hardware distribution and regional EPC fulfillment.")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-black/10 body-sm text-xs text-[#18181B]">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{t(`partnership.tier1.bullets.${i}`, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="mt-6 w-full h-[46px] rounded-full btn-secondary text-xs font-normal flex items-center justify-center transition-all cursor-pointer"
                href="#partner-form"
              >
                {t("partnership.tier1.cta", "EXPLORE DISTRICT MODEL")}
              </a>
            </div>
          </MotionItem>

          {/* Tier 2: Master Distributor (Featured Highlight) */}
          <MotionItem className="h-full">
            <div className="card-superpower h-full p-6 sm:p-8 flex flex-col justify-between border-primary/40 ring-1 ring-primary/20 relative group transition-all duration-300 hover:border-primary shadow-xs">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white font-sans text-[10px] font-normal uppercase tracking-wider shadow-xs">
                {t("partnership.tier2.badge", "FLAGSHIP ALLIANCE")}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-normal text-white uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary">
                    {t("partnership.tier2.tag", "ZONAL CONSORTIUM")}
                  </span>
                  <Building2 className="w-4 h-4 text-[#18181B]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">
                    {t("partnership.tier2.title", "Zonal Master Distributor")}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {t("partnership.tier2.desc", "Multi-district governance orchestrating regional dealer networks and mega-watt industrial pipelines.")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-black/10 body-sm text-xs text-[#18181B]">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{t(`partnership.tier2.bullets.${i}`, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="mt-6 w-full h-[46px] rounded-full btn-primary text-xs font-normal flex items-center justify-center transition-all cursor-pointer"
                href="#partner-form"
              >
                {t("partnership.tier2.cta", "SUBMIT ZONAL CREDENTIALS")}
              </a>
            </div>
          </MotionItem>

          {/* Tier 3: Channel Partner */}
          <MotionItem className="h-full">
            <div className="card-superpower h-full p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-black/30 shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-normal text-[#71717A] uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/10 bg-[#FAFAFA]">
                    {t("partnership.tier3.tag", "CONSULTANCY CORE")}
                  </span>
                  <Share2 className="w-4 h-4 text-[#18181B]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">
                    {t("partnership.tier3.title", "Corporate Channel Consultant")}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {t("partnership.tier3.desc", "Commercial project originators and engineering consultants driving institutional solar transitions.")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-black/10 body-sm text-xs text-[#18181B]">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{t(`partnership.tier3.bullets.${i}`, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="mt-6 w-full h-[46px] rounded-full btn-secondary text-xs font-normal flex items-center justify-center transition-all cursor-pointer"
                href="#partner-form"
              >
                {t("partnership.tier3.cta", "ENROLL AS CONSULTANT")}
              </a>
            </div>
          </MotionItem>

          {/* Tier 4: Merchant Partner */}
          <MotionItem className="h-full">
            <div className="card-superpower h-full p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-black/30 shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-normal text-[#71717A] uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/10 bg-[#FAFAFA]">
                    {t("partnership.tier4.tag", "STOREFRONT SYNERGY")}
                  </span>
                  <CreditCard className="w-4 h-4 text-[#18181B]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-normal text-[#18181B] tracking-[-0.3px]">
                    {t("partnership.tier4.title", "Retail Merchant Affiliate")}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {t("partnership.tier4.desc", "Hardware merchants, electrical suppliers, and sanitaryware showrooms expanding into solar commerce.")}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 pt-4 border-t border-black/10 body-sm text-xs text-[#18181B]">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{t(`partnership.tier4.bullets.${i}`, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="mt-6 w-full h-[46px] rounded-full btn-secondary text-xs font-normal flex items-center justify-center transition-all cursor-pointer"
                href="#partner-form"
              >
                {t("partnership.tier4.cta", "ACTIVATE STOREFRONT")}
              </a>
            </div>
          </MotionItem>
        </MotionStagger>
      </div>
    </section>
  );
}
