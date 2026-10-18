"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useCinematicReveal } from "@/components/ui/cinematic-load-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Navbar() {
  const { isRevealed } = useCinematicReveal();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isRevealed) {
      hasAnimatedRef.current = false;
      return;
    }
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (headerRef.current) gsap.set(headerRef.current, { y: 0, opacity: 1 });
      return;
    }

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "willChange",
        }
      );
    }
  }, [isRevealed]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about-us", label: t("navigation.about") },
    { href: "#products-categories", label: t("navigation.products") },
    { href: "#spgs-combos", label: t("navigation.combos") },
    { href: "#solar-inverters", label: t("navigation.inverters") },
    { href: "#solar-pcu", label: t("navigation.pcu") },
    { href: "#solutions", label: t("navigation.solutions") },
    { href: "#calculator", label: t("navigation.calculator") },
    { href: "#faq", label: t("navigation.faq") },
  ];

  return (
    <header
      ref={headerRef}
      style={{ opacity: 0, transform: "translateY(-24px)" }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-out will-change-[transform,opacity]"
    >
      <div
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "w-[94%] sm:w-[90%] max-w-5xl xl:max-w-6xl mt-3 sm:mt-4 rounded-full border border-black/10 bg-white/80 hover:bg-white/90 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] px-5 sm:px-6 h-[58px] sm:h-[62px]"
            : "w-full max-w-7xl mt-0 rounded-none border-b border-white/15 bg-transparent shadow-none px-6 lg:px-8 h-[72px]"
        } flex items-center justify-between gap-4`}
      >
        {/* Brand Mark with Official Solvex Logo */}
        <Link
          className={`flex items-center group shrink-0 transition-all duration-300 ${
            scrolled ? "gap-0" : "gap-2.5 sm:gap-3"
          }`}
          href="#"
          aria-label="Solvex Energy Solutions"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Solvex Energy Solutions"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm shrink-0"
          />
          <div
            className={`flex flex-col min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
              scrolled
                ? "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
                : "max-w-[200px] opacity-100 translate-x-0"
            }`}
          >
            <span
              className={`text-base sm:text-lg font-bold tracking-[-0.03em] uppercase leading-none font-sans transition-colors duration-300 ${
                scrolled ? "text-[#18181B]" : "text-white"
              }`}
            >
              Solvex
            </span>
            <span
              className={`text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.22em] uppercase leading-tight font-sans mt-0.5 transition-colors duration-300 ${
                scrolled ? "text-[#059669]" : "text-emerald-400"
              }`}
            >
              Energy Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`text-sm font-normal tracking-[-0.2px] whitespace-nowrap transition-colors ${
                scrolled
                  ? "text-[#71717A] hover:text-[#18181B]"
                  : "text-white/80 hover:text-white"
              }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Language Switcher */}
          <LanguageSwitcher scrolled={scrolled} className="hidden sm:inline-flex" />

          <div
            className={`hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal whitespace-nowrap shrink-0 transition-all duration-300 ${
              scrolled
                ? "border border-black/10 bg-zinc-50/80 backdrop-blur-sm text-[#71717A]"
                : "border border-white/20 bg-white/10 backdrop-blur-md text-white/90"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>{t("common.pmSuryaGharPartner")}</span>
          </div>

          {/* Primary Pill Button */}
          <a
            className={`rounded-full h-[38px] sm:h-[42px] px-5 sm:px-6 text-sm font-normal tracking-[-0.2px] whitespace-nowrap transition-all inline-flex items-center justify-center shrink-0 cursor-pointer active:scale-95 ${
              scrolled
                ? "bg-[#059669] text-white hover:bg-[#047857] shadow-xs"
                : "bg-white text-[#18181B] hover:bg-neutral-100 shadow-sm"
            }`}
            href="#partner-form"
          >
            {t("common.partnerLogin")}
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full border transition-colors cursor-pointer shrink-0 ${
              scrolled
                ? "text-[#18181B] border-black/10 hover:bg-black/5"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphic Translucent dropdown) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden pointer-events-auto mx-auto w-[92%] sm:w-[90%] max-w-5xl mt-2 p-5 rounded-2xl border transition-all duration-300 shadow-2xl space-y-4 ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-black/10 text-[#18181B]"
              : "bg-slate-950/85 backdrop-blur-2xl border-white/20 text-white"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Solvex"
                className="h-7 w-7 object-contain"
              />
              <div className="flex flex-col">
                <span
                  className={`text-sm font-bold tracking-tight uppercase leading-none font-sans ${
                    scrolled ? "text-[#18181B]" : "text-white"
                  }`}
                >
                  Solvex
                </span>
                <span
                  className={`text-[8px] font-semibold tracking-wider uppercase leading-tight font-sans ${
                    scrolled ? "text-[#059669]" : "text-emerald-400"
                  }`}
                >
                  Energy Solutions
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal ${
                scrolled
                  ? "border border-black/10 bg-zinc-100 text-[#71717A]"
                  : "border border-white/20 bg-white/10 text-white/90"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t("common.pmSuryaGharPartner")}</span>
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-1">
            <LanguageSwitcher
              scrolled={scrolled}
              isMobile
              onSelect={() => setMobileMenuOpen(false)}
            />
          </div>

          <nav className="flex flex-col gap-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm font-normal tracking-[-0.2px] transition-colors ${
                  scrolled
                    ? "text-[#71717A] hover:text-[#18181B]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#partner-form"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-3 h-[44px] rounded-full flex items-center justify-center text-sm font-normal tracking-[-0.2px] transition-colors ${
                scrolled
                  ? "bg-[#059669] text-white hover:bg-[#047857]"
                  : "bg-white text-[#18181B] hover:bg-neutral-100"
              }`}
            >
              {t("common.partnerLogin")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
