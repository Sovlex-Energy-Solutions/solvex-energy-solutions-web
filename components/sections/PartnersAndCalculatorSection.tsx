"use client";

import { useState } from "react";
import { MessageSquareQuote, Star, Calculator, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function PartnersAndCalculatorSection() {
  const { t, isHindi } = useLanguage();
  const [areaInput, setAreaInput] = useState<string>("");
  const [systemSize, setSystemSize] = useState<string>("");
  const [annualSavings, setAnnualSavings] = useState<string>("");
  const [co2Reduction, setCo2Reduction] = useState<string>("");

  const displaySystemSize = systemSize || t("calculator.defaultSystemSize", "5.0 kW System");
  const displayAnnualSavings = annualSavings || t("calculator.defaultSavings", "₹54,000 / year");
  const displayCo2Reduction = co2Reduction || t("calculator.defaultCo2", "6.1 Metric Tons");

  const handleCalculate = () => {
    const area = parseFloat(areaInput);
    if (isNaN(area) || area <= 0) {
      setSystemSize(t("calculator.defaultSystemSize", "5.0 kW System"));
      setAnnualSavings(t("calculator.defaultSavings", "₹54,000 / year"));
      setCo2Reduction(t("calculator.defaultCo2", "6.1 Metric Tons"));
      return;
    }

    const kw = (area / 100).toFixed(1);
    const savings = Math.round(Number(kw) * 10800);
    const co2 = (Number(kw) * 1.22).toFixed(1);

    setSystemSize(t("calculator.kwSystem", "{kw} kW System", { kw }));
    setAnnualSavings(t("calculator.savingsPerYear", `₹${savings.toLocaleString("en-IN")} / year`, { savings: savings.toLocaleString("en-IN") }));
    setCo2Reduction(t("calculator.tonsCo2", "{co2} Metric Tons", { co2 }));
  };

  const tickerItems = [
    isHindi ? "MNRE मानक अनुमोदित" : "MNRE BENCHMARKED",
    isHindi ? "BIS IS-16170 प्रमाणित" : "BIS IS-16170 CERTIFIED",
    isHindi ? "राष्ट्रीय पोर्टल सूचीबद्ध" : "NATIONAL PORTAL EMPANELLED",
    isHindi ? "ALMM DCR अनुरूप" : "ALMM DCR COMPLIANT",
    isHindi ? "ISO 9001:2015 गुणवत्ता प्रमाणित" : "ISO 9001:2015 QUALITY CERTIFIED",
    isHindi ? "क्षेत्रीय फील्ड इंजीनियरिंग डिपो" : "REGIONAL FIELD ENGINEERING DEPOTS",
    isHindi ? "डिस्कॉम ग्रिड सिंक्रोनाइज़्ड" : "DISCOM GRID SYNCHRONIZED",
    isHindi ? "टियर-1 TOPCon आर्किटेक्चर" : "TIER-1 TOPCON ARCHITECTURE",
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="calculator">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Seamless Continuous Marquee / Ticker per ANIMATIONS.md Section 6 */}
        <div className="w-full overflow-hidden border-b border-black/10 pb-8 mb-14">
          <div className="marquee">
            <div className="marquee__track gap-10 items-center text-xs uppercase tracking-widest text-[#71717A] font-sans">
              {/* Set 1 */}
              {tickerItems.map((item, idx) => (
                <span key={`set1-${idx}`} className="flex items-center gap-4">
                  {item} <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                </span>
              ))}

              {/* Set 2 (Exact visual duplicate for seamless infinite loop) */}
              {tickerItems.map((item, idx) => (
                <span key={`set2-${idx}`} className="flex items-center gap-4">
                  {item} <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Testimonials Column (Left 6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <MotionReveal>
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-white" />
                  <span>{t("testimonials.badge", "FRANCHISE VERIFICATION")}</span>
                </div>
                <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                  {t("testimonials.title", "Field Reports from Regional Partners")}
                </h2>
                <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                  {t("testimonials.description", "Authentic feedback from authorized distributors, project engineers, and corporate channel directors operating across Western & Northern India.")}
                </p>
              </div>
            </MotionReveal>

            {/* Review Cards Stack with Stagger */}
            <MotionStagger className="flex flex-col gap-4">
              {/* Review 1 */}
              <MotionItem>
                <div className="card-superpower p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                    ))}
                  </div>
                  <p className="body-md text-sm leading-relaxed text-[#18181B]">
                    &ldquo;{t("testimonials.r1.quote", "")}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-black/10 font-sans">
                    <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center font-normal text-xs">
                      {isHindi ? "मो" : "M"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-normal text-[#18181B] uppercase tracking-wider">
                        {t("testimonials.r1.name", "MOHAN SHARMA")}
                      </span>
                      <span className="text-[11px] text-[#71717A] tracking-wider">
                        {t("testimonials.r1.role", "MASTER DISTRIBUTOR • UP WEST")}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionItem>

              {/* Review 2 */}
              <MotionItem>
                <div className="card-superpower p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                    ))}
                  </div>
                  <p className="body-md text-sm leading-relaxed text-[#18181B]">
                    &ldquo;{t("testimonials.r2.quote", "")}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-black/10 font-sans">
                    <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center font-normal text-xs">
                      {isHindi ? "सू" : "S"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-normal text-[#18181B] uppercase tracking-wider">
                        {t("testimonials.r2.name", "SURAJ PATEL")}
                      </span>
                      <span className="text-[11px] text-[#71717A] tracking-wider">
                        {t("testimonials.r2.role", "CHANNEL PARTNER • GUJARAT")}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionItem>

              {/* Review 3 */}
              <MotionItem>
                <div className="card-superpower p-6 sm:p-8 flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#18181B] text-[#18181B]" />
                    ))}
                  </div>
                  <p className="body-md text-sm leading-relaxed text-[#18181B]">
                    &ldquo;{t("testimonials.r3.quote", "")}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-black/10 font-sans">
                    <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center font-normal text-xs">
                      {isHindi ? "रा" : "R"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-normal text-[#18181B] uppercase tracking-wider">
                        {t("testimonials.r3.name", "RAM CHOUDHARY")}
                      </span>
                      <span className="text-[11px] text-[#71717A] tracking-wider">
                        {t("testimonials.r3.role", "REGIONAL EPC DIRECTOR • RAJASTHAN")}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionItem>
            </MotionStagger>
          </div>

          {/* Solar Calculator Column (Right 6 Cols) */}
          <div className="lg:col-span-6 sticky top-24">
            <MotionReveal>
            <div className="card-superpower rounded-lg p-8 lg:p-10 flex flex-col gap-6 relative shadow-xs border-black/10 bg-[#FAFAFA]">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                  <Calculator className="w-3.5 h-3.5 text-white" />
                  <span>{t("calculator.badge", "PHOTOVOLTAIC AUDIT CORE")}</span>
                </div>
                <h2 className="headline-sm text-2xl font-normal tracking-[-0.8px] text-[#18181B]">
                  {t("calculator.title", "Rooftop Generation & Financial Simulator")}
                </h2>
                <p className="body-sm text-sm text-[#71717A]">
                  {t("calculator.description", "Calculate shadow-free kilowatt capacity, anticipated tariff savings, and lifecycle carbon offset tailored to regional irradiance indices.")}
                </p>
              </div>

              {/* Input form */}
              <div className="flex flex-col gap-2.5 pt-2">
                <Label htmlFor="solar-area" className="text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                  {t("calculator.label", "UNOBSTRUCTED ROOFTOP AREA (SQ. FT.)")}
                </Label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Input
                      id="solar-area"
                      className="input-superpower w-full h-[50px] rounded-full px-5 font-sans text-xs placeholder:text-[#71717A] pr-16 bg-white border border-black/10 text-[#18181B]"
                      placeholder={t("calculator.placeholder", "e.g. 500")}
                      type="number"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                    />
                    <span className="absolute right-4 top-4 font-sans text-xs text-[#71717A] pointer-events-none">
                      {t("calculator.unit", "SQ.FT")}
                    </span>
                  </div>
                  <Button
                    onClick={handleCalculate}
                    className="btn-primary w-full sm:w-auto h-[50px] px-8 rounded-full text-xs font-normal tracking-[-0.1px]"
                    id="calc-btn"
                  >
                    {t("calculator.calculateBtn", "SIMULATE YIELD")}
                  </Button>
                </div>
              </div>

              {/* Live Calculation Result Display (Subtle 8px Radius) */}
              <div
                className="p-5 rounded-lg border border-black/10 bg-white flex flex-col gap-3 font-sans text-xs mt-2 shadow-xs"
                id="calc-result"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-black/10">
                  <span className="text-[#71717A]">{t("calculator.capacity", "SUGGESTED ARRAY CAPACITY")}</span>
                  <span className="font-medium text-primary text-sm" id="capacity-val">
                    {displaySystemSize}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-black/10">
                  <span className="text-[#71717A]">{t("calculator.savings", "PROJECTED ANNUAL POWER VALUE")}</span>
                  <span className="font-medium text-primary text-sm" id="savings-val">
                    {displayAnnualSavings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A]">{t("calculator.co2", "LIFECYCLE CO₂ AVOIDED")}</span>
                  <span className="font-medium text-primary text-sm" id="co2-val">
                    {displayCo2Reduction}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-black/10 bg-white flex items-center gap-3 font-sans text-xs text-[#71717A] shadow-xs">
                <Info className="w-4 h-4 shrink-0 text-[#18181B]" />
                <span>
                  {t("calculator.info", "Calculations calibrated to 4.8 peak sun hours/day, 22% module efficiency, and prevailing DISCOM industrial/domestic tariff bands.")}
                </span>
              </div>
            </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
