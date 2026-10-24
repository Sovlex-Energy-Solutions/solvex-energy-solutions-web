"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import type { PCUProduct } from "@/data/products/pcus";

interface PCUCardProps {
  pcu: PCUProduct;
  onOpenModal: () => void;
  isHindi?: boolean;
}

export function PCUCard({ pcu, onOpenModal, isHindi = false }: PCUCardProps) {
  return (
    <CardFadeReveal
      onClick={onOpenModal}
      className={`card-superpower project-card bg-white h-full flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 hover:border-black/30 p-0 shadow-xs ${
        pcu.isPopular ? "border-primary/40 ring-1 ring-primary/20" : ""
      }`}
    >
      <div className="flex flex-col">
        {/* Clean Showcase Frame with Clipped Overflow */}
        <div className="project-card__media relative w-full h-44 bg-white border-b border-black/10 flex items-center justify-center p-6 overflow-hidden">
          <Image
            src={pcu.image}
            alt={pcu.name}
            loading="lazy"
            width={280}
            height={128}
            className="project-card__image max-h-32 max-w-[85%] object-contain"
          />
        </div>

        {/* Minimal Card Content */}
        <div className="p-6 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
              {pcu.capacity} {isHindi ? "हैवी PCU" : "Heavy PCU"}
            </span>
            <h3 className="text-base font-normal text-[#18181B] group-hover:text-black transition-colors line-clamp-1 tracking-[-0.3px]">
              {pcu.name}
            </h3>
          </div>

          <p className="font-sans text-xs text-[#71717A] line-clamp-1">
            {pcu.voltage} · {isHindi ? `बैंक: ${pcu.batteryCount}` : `Bank: ${pcu.batteryCount}`}
          </p>

          {/* Pricing */}
          <div className="pt-3 border-t border-black/10 flex items-center justify-between">
            <span className="font-sans text-sm font-medium text-[#18181B]">
              {isHindi ? "मूल्य: अनुरोध पर उपलब्ध" : "Price: On Request"}
            </span>
            <span className="font-sans text-[11px] text-primary font-medium">
              {isHindi ? "कोटेशन मांगें" : "Request Quote"}
            </span>
          </div>
        </div>
      </div>

      {/* Sleek CTA Button */}
      <div className="p-6 pt-0">
        <div className="w-full h-[42px] rounded-full border border-black/10 bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary text-[#18181B] font-sans text-xs font-normal flex items-center justify-center gap-1.5 transition-all">
          <span>{isHindi ? "औद्योगिक विवरण देखें" : "Inspect Industrial Specs"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </CardFadeReveal>
  );
}
