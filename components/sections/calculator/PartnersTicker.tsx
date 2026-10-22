"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CALCULATOR_TICKER_ITEMS } from "@/data/calculator-ticker";

export function PartnersTicker() {
  const { isHindi } = useLanguage();

  const items = CALCULATOR_TICKER_ITEMS.map((item) =>
    isHindi ? item.textHi : item.textEn
  );

  return (
    <div className="w-full overflow-hidden border-b border-black/10 pb-8 mb-14">
      <div className="marquee">
        <div className="marquee__track gap-10 items-center text-xs uppercase tracking-widest text-[#71717A] font-sans">
          {/* Set 1 */}
          {items.map((text, idx) => (
            <span key={`set1-${idx}`} className="flex items-center gap-4">
              {text} <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
            </span>
          ))}

          {/* Set 2 (Exact visual duplicate for seamless infinite loop) */}
          {items.map((text, idx) => (
            <span key={`set2-${idx}`} className="flex items-center gap-4">
              {text} <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
