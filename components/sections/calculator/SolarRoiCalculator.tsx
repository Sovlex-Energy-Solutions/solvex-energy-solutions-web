"use client";

import React, { useState } from "react";
import { Calculator, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";

export function SolarRoiCalculator() {
  const { t, isHindi } = useLanguage();
  const [areaInput, setAreaInput] = useState<string>("");
  const [systemSize, setSystemSize] = useState<string>("");
  const [annualSavings, setAnnualSavings] = useState<string>("");
  const [co2Reduction, setCo2Reduction] = useState<string>("");

  const displaySystemSize = systemSize || t("calculator.defaultSystemSize", "5.0 kW System");
  const displayAnnualSavings = annualSavings || t("calculator.defaultSavings", "₹54,000 / year");
  const displayCo2Reduction = co2Reduction || t("calculator.defaultCo2", "6.1 Metric Tons");

  const handleCalculate = (customArea?: number) => {
    const rawVal = customArea !== undefined ? customArea : parseFloat(areaInput);
    if (isNaN(rawVal) || rawVal <= 0) {
      setSystemSize(t("calculator.defaultSystemSize", "5.0 kW System"));
      setAnnualSavings(t("calculator.defaultSavings", "₹54,000 / year"));
      setCo2Reduction(t("calculator.defaultCo2", "6.1 Metric Tons"));
      return;
    }

    const kw = (rawVal / 100).toFixed(1);
    const savings = Math.round(Number(kw) * 10800);
    const co2 = (Number(kw) * 1.22).toFixed(1);

    setSystemSize(t("calculator.kwSystem", "{kw} kW System", { kw }));
    setAnnualSavings(
      t("calculator.savingsPerYear", `₹${savings.toLocaleString("en-IN")} / year`, {
        savings: savings.toLocaleString("en-IN"),
      })
    );
    setCo2Reduction(t("calculator.tonsCo2", "{co2} Metric Tons", { co2 }));
  };

  return (
    <CardFadeReveal delay={0.15} className="card-superpower rounded-2xl p-8 sm:p-10 flex flex-col gap-6 relative shadow-xs border border-black/10 bg-[#FAFAFA]">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669] text-white text-xs font-normal tracking-[-0.1px] w-fit">
          <Calculator className="w-3.5 h-3.5 text-white" />
          <span>{t("calculator.badge", "PHOTOVOLTAIC AUDIT CORE")}</span>
        </div>
        <h3 className="headline-sm text-2xl sm:text-[26px] font-normal tracking-[-0.8px] text-[#18181B] leading-tight">
          {t("calculator.title", "Rooftop Generation & Financial Simulator")}
        </h3>
        <p className="body-sm text-sm text-[#71717A] leading-relaxed">
          {t(
            "calculator.description",
            "Calculate shadow-free kilowatt capacity, anticipated tariff savings, and lifecycle carbon offset tailored to regional irradiance indices."
          )}
        </p>
      </div>

      {/* Input form */}
      <div className="flex flex-col gap-2.5 pt-2">
        <Label htmlFor="solar-area" className="text-xs font-normal text-[#18181B] tracking-[-0.1px] uppercase">
          {t("calculator.label", "UNOBSTRUCTED ROOFTOP AREA (SQ. FT.)")}
        </Label>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Input
              id="solar-area"
              className="input-superpower w-full h-[52px] rounded-full px-5 font-sans text-xs placeholder:text-[#71717A] pr-16 bg-white border border-black/10 text-[#18181B] focus:outline-none focus:border-[#059669]"
              placeholder={t("calculator.placeholder", "e.g. 500")}
              type="number"
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 font-sans text-xs text-[#71717A] pointer-events-none">
              {t("calculator.unit", "SQ.FT")}
            </span>
          </div>
          <Button
            onClick={() => handleCalculate()}
            className="btn-primary w-full sm:w-auto h-[52px] px-8 rounded-full text-xs font-medium tracking-wider uppercase bg-[#059669] hover:bg-[#047857] text-white shadow-xs transition-colors shrink-0"
            id="calc-btn"
          >
            {t("calculator.calculateBtn", "SIMULATE YIELD")}
          </Button>
        </div>
      </div>

      {/* Live Calculation Result Display */}
      <div
        className="p-6 rounded-xl border border-black/10 bg-white flex flex-col gap-4 font-sans text-xs shadow-xs"
        id="calc-result"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-black/10">
          <span className="text-[#71717A] uppercase tracking-wider">{t("calculator.capacity", "SUGGESTED ARRAY CAPACITY")}</span>
          <span className="font-semibold text-[#059669] text-sm sm:text-base" id="capacity-val">
            {displaySystemSize}
          </span>
        </div>
        <div className="flex items-center justify-between pb-3.5 border-b border-black/10">
          <span className="text-[#71717A] uppercase tracking-wider">{t("calculator.savings", "PROJECTED ANNUAL POWER VALUE")}</span>
          <span className="font-semibold text-[#059669] text-sm sm:text-base" id="savings-val">
            {displayAnnualSavings}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#71717A] uppercase tracking-wider">{t("calculator.co2", "LIFECYCLE CO₂ AVOIDED")}</span>
          <span className="font-semibold text-[#059669] text-sm sm:text-base" id="co2-val">
            {displayCo2Reduction}
          </span>
        </div>
      </div>

      {/* Calculation Info Note */}
      <div className="p-4 sm:p-5 rounded-xl border border-black/10 bg-white flex items-center gap-3.5 font-sans text-xs text-[#71717A] shadow-xs leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-[#18181B]" />
        <span>
          {t(
            "calculator.info",
            "Calculations calibrated to 4.8 peak sun hours/day, 22% module efficiency, and prevailing DISCOM industrial/domestic tariff bands."
          )}
        </span>
      </div>
    </CardFadeReveal>
  );
}
