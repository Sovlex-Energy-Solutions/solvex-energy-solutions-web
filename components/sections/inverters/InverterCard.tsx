"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { InverterProduct } from "@/data/products/inverters";

interface InverterCardProps {
  item: InverterProduct;
  onOpenModal: () => void;
  isHindi?: boolean;
}

export function InverterCard({
  item,
  onOpenModal,
  isHindi = false,
}: InverterCardProps) {
  return (
    <div
      onClick={onOpenModal}
      className={`card-superpower project-card bg-white flex flex-col justify-between overflow-hidden h-full group cursor-pointer transition-all duration-300 hover:border-black/30 p-0 shadow-xs ${
        item.isPopular ? "border-primary/40 ring-1 ring-primary/20" : ""
      }`}
    >
      <div className="flex flex-col">
        {/* Clean Showcase Frame (Restrained 1.035 zoom per Section 5) */}
        <div className="project-card__media relative w-full h-44 bg-white border-b border-black/10 flex items-center justify-center p-6 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={280}
            height={128}
            className="project-card__image max-h-32 max-w-[85%] object-contain"
          />
        </div>

        {/* Minimal Body */}
        <div className="p-6 flex flex-col gap-2.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
              {item.categoryLabel}
            </span>
            <h3 className="text-base font-normal text-[#18181B] group-hover:text-black transition-colors line-clamp-1 tracking-[-0.3px]">
              {item.name}
            </h3>
          </div>

          <p className="font-sans text-xs text-[#71717A] line-clamp-1">
            {item.voltage} · {item.capacity}
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
          <span>{isHindi ? "आर्किटेक्चर व विशिष्टताएं" : "Inspect Architecture & Specs"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
}
