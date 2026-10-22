"use client";

import React from "react";
import { PartnersTicker } from "./calculator/PartnersTicker";
import { TestimonialList } from "./calculator/TestimonialList";
import { SolarRoiCalculator } from "./calculator/SolarRoiCalculator";

export default function PartnersAndCalculatorSection() {
  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="calculator">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Seamless Continuous Marquee / Ticker */}
        <PartnersTicker />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Testimonials Column (Left 6 Cols) */}
          <div className="lg:col-span-6">
            <TestimonialList />
          </div>

          {/* Solar Calculator Column (Right 6 Cols) */}
          <div className="lg:col-span-6 sticky top-24">
            <SolarRoiCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
