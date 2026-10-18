"use client";

import React from "react";
import { useLanguage, Locale } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  scrolled?: boolean;
  isMobile?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function LanguageSwitcher({
  scrolled = false,
  isMobile = false,
  onSelect,
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const handleSwitch = (target: Locale) => {
    if (target !== locale) {
      setLocale(target);
    }
    if (onSelect) {
      onSelect();
    }
  };

  if (isMobile) {
    return (
      <div
        role="group"
        aria-label="Language selection"
        className={cn(
          "flex items-center justify-between p-1.5 rounded-xl border transition-colors",
          scrolled
            ? "border-black/10 bg-black/[0.04] text-[#18181B]"
            : "border-white/15 bg-white/10 text-white",
          className
        )}
      >
        <div className="flex items-center gap-2 pl-2 text-xs font-medium">
          <Globe className="w-3.5 h-3.5 opacity-70" />
          <span>भाषा / Language</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwitch("en")}
            aria-pressed={locale === "en"}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              locale === "en"
                ? scrolled
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-[#18181B] shadow-xs"
                : scrolled
                ? "text-zinc-600 hover:text-[#18181B]"
                : "text-white/80 hover:text-white"
            }`}
          >
            EN
          </button>
          <span className="opacity-30 text-xs">|</span>
          <button
            type="button"
            onClick={() => handleSwitch("hi")}
            aria-pressed={locale === "hi"}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              locale === "hi"
                ? scrolled
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white text-[#18181B] shadow-xs"
                : scrolled
                ? "text-zinc-600 hover:text-[#18181B]"
                : "text-white/80 hover:text-white"
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "relative inline-flex items-center p-1 rounded-full border text-xs font-medium transition-all duration-300 select-none",
        scrolled
          ? "border-black/10 bg-zinc-50/90 backdrop-blur-sm text-[#18181B]"
          : "border-white/20 bg-white/10 backdrop-blur-md text-white",
        className
      )}
    >
      <Globe
        className={`w-3.5 h-3.5 ml-2 mr-1 transition-opacity ${
          scrolled ? "text-[#71717A]" : "text-white/80"
        }`}
        aria-hidden="true"
      />
      <div className="inline-flex items-center">
        <button
          type="button"
          onClick={() => handleSwitch("en")}
          aria-pressed={locale === "en"}
          aria-label="Switch to English"
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            locale === "en"
              ? scrolled
                ? "bg-primary text-white shadow-xs"
                : "bg-white text-[#18181B] shadow-xs"
              : scrolled
              ? "text-[#71717A] hover:text-[#18181B]"
              : "text-white/75 hover:text-white"
          }`}
        >
          EN
        </button>
        <span
          className={`mx-0.5 text-[10px] pointer-events-none transition-opacity ${
            scrolled ? "text-zinc-400" : "text-white/40"
          }`}
          aria-hidden="true"
        >
          |
        </span>
        <button
          type="button"
          onClick={() => handleSwitch("hi")}
          aria-pressed={locale === "hi"}
          aria-label="हिंदी भाषा चुनें"
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            locale === "hi"
              ? scrolled
                ? "bg-primary text-white shadow-xs"
                : "bg-white text-[#18181B] shadow-xs"
              : scrolled
              ? "text-[#71717A] hover:text-[#18181B]"
              : "text-white/75 hover:text-white"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
}
