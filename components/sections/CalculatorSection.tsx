"use client";

import React from "react";
import { Calculator } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { SolarRoiCalculator } from "./calculator/SolarRoiCalculator";

export function CalculatorSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF] relative scroll-mt-24 overflow-hidden" id="calculator">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col gap-10 lg:gap-14">
        {/* Section Header */}
        <MotionReveal className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span>
              {t("calculator.sectionBadge", "SOLAR YIELD & FINANCIAL SIMULATOR")}
            </span>
          </div>
          <WordStaggerHeading
            as="h2"
            className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
          >
            {t("calculator.sectionTitle", "Estimate Your Solar Generation & Financial Returns")}
          </WordStaggerHeading>
          <SubheadingReveal
            className="body-md text-base text-[#71717A] max-w-2xl leading-relaxed tracking-[-0.2px]"
            delay={0.16}
          >
            {t(
              "calculator.sectionDescription",
              "Simulate shadow-free kilowatt capacity, anticipated power bill savings, and environmental offsets calibrated to regional irradiance indices and prevailing DISCOM tariff slabs."
            )}
          </SubheadingReveal>
        </MotionReveal>

        {/* Interactive Solar Simulator Card */}
        <SolarRoiCalculator />
      </div>
    </section>
  );
}

export default CalculatorSection;
