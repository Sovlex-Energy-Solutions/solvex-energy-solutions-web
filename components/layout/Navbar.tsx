"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useCinematicReveal } from "@/components/ui/cinematic-load-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { trackEvent } from "@/lib/analytics";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isRevealed } = useCinematicReveal();
  const { t } = useLanguage();
  const pathname = usePathname();
  const isSubPage = pathname !== "/";

  const [scrolled, setScrolled] = useState(false);
  const isLightNavbar = isSubPage || scrolled;
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
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1 });
        headerRef.current.style.transform = "";
      }
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
          clearProps: "all",
          onComplete: () => {
            if (headerRef.current) {
              headerRef.current.style.transform = "";
              headerRef.current.style.opacity = "";
              headerRef.current.style.willChange = "";
            }
          },
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
  }, [pathname]);

  // Handle cross-page or direct hash link navigation (e.g., coming from /projects to /#about-us)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: isSubPage ? "/#about-us" : "#about-us", label: t("navigation.about") },
    { href: isSubPage ? "/#products-categories" : "#products-categories", label: t("navigation.products") },
    { href: isSubPage ? "/#spgs-combos" : "#spgs-combos", label: t("navigation.combos") },
    { href: isSubPage ? "/#solar-inverters" : "#solar-inverters", label: t("navigation.inverters") },
    { href: isSubPage ? "/#solar-pcu" : "#solar-pcu", label: t("navigation.pcu") },
    { href: "/projects", label: t("navigation.projects", "Projects"), isRoute: true },
    { href: isSubPage ? "/#calculator" : "#calculator", label: t("navigation.calculator") },
    { href: isSubPage ? "/#faq" : "#faq", label: t("navigation.faq") },
  ];

  return (
    <header
      ref={headerRef}
      style={!isRevealed ? { opacity: 0, transform: "translateY(-24px)" } : undefined}
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-out ${
        isSubPage && !scrolled
          ? "bg-white/80 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-black/10 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "w-[94%] sm:w-[90%] max-w-5xl xl:max-w-6xl mt-3 sm:mt-4 rounded-full border border-black/10 bg-white/80 hover:bg-white/90 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] px-5 sm:px-6 h-[58px] sm:h-[62px]"
            : "w-full max-w-7xl mt-0 rounded-none border-none bg-transparent shadow-none px-6 lg:px-8 h-[72px]"
        } flex items-center justify-between gap-4`}
      >
        {/* Brand Mark with Official Solvex Logo */}
        <Link
          className={`flex items-center group shrink-0 transition-all duration-300 ${
            scrolled ? "gap-0" : "gap-2.5 sm:gap-3"
          }`}
          href="/"
          aria-label="Solvex Energy Solutions"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Solvex Energy Solutions"
            width={40}
            height={40}
            decoding="async"
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
                isLightNavbar ? "text-[#18181B]" : "text-white"
              }`}
            >
              Solvex
            </span>
            <span
              className={`text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.22em] uppercase leading-tight font-sans mt-0.5 transition-colors duration-300 ${
                isLightNavbar ? "text-[#059669]" : "text-emerald-400"
              }`}
            >
              Energy Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
          {navLinks.map((link) => {
            const isActive = link.isRoute && pathname === link.href;
            return (
              <Link
                key={link.href}
                className={`text-sm tracking-[-0.2px] whitespace-nowrap transition-all duration-200 relative ${
                  isActive
                    ? isLightNavbar
                      ? "text-[#059669] font-medium"
                      : "text-emerald-300 font-medium"
                    : isLightNavbar
                    ? "text-[#71717A] hover:text-[#18181B] font-normal"
                    : "text-white/80 hover:text-white font-normal"
                }`}
                href={link.href}
                onClick={(e) => {
                  if (!link.isRoute && !isSubPage && link.href.startsWith("#")) {
                    e.preventDefault();
                    const targetId = link.href.slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", link.href);
                    }
                  }
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      isLightNavbar ? "bg-[#059669]" : "bg-emerald-400"
                    } animate-fadeIn`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Language Switcher */}
          <div className="hidden lg:flex items-center shrink-0">
            <LanguageSwitcher scrolled={isLightNavbar} />
          </div>

          <div
            className={`hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-normal whitespace-nowrap shrink-0 transition-all duration-300 ${
              isLightNavbar
                ? "border border-black/10 bg-zinc-50/80 backdrop-blur-sm text-[#71717A]"
                : "border border-white/20 bg-white/10 backdrop-blur-md text-white/90"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>{t("common.pmSuryaGharPartner")}</span>
          </div>

          {/* Primary Pill Button */}
          <a
            className={`rounded-full h-[36px] sm:h-[40px] px-4 sm:px-5 text-xs sm:text-sm font-normal tracking-[-0.2px] whitespace-nowrap transition-all inline-flex items-center justify-center shrink-0 cursor-pointer active:scale-95 ${
              isLightNavbar
                ? "bg-[#059669] text-white hover:bg-[#047857] shadow-xs"
                : "bg-white text-[#18181B] hover:bg-neutral-100 shadow-sm"
            }`}
            href={isSubPage ? "/#partner-form" : "#partner-form"}
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "navbar_partner_button",
                source: "navbar_desktop",
              })
            }
          >
            {t("common.partnerLogin")}
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full border transition-all duration-300 cursor-pointer shrink-0 ${
              isLightNavbar
                ? "text-[#18181B] border-black/10 bg-white/60 hover:bg-white/90 backdrop-blur-md shadow-xs active:scale-95"
                : "text-white border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-xs active:scale-95"
            }`}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Translucent Backdrop Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 lg:hidden pointer-events-auto transition-opacity duration-300 ${
            isLightNavbar ? "bg-black/25" : "bg-black/40"
          }`}
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Glassmorphic Translucent dropdown) */}
      {mobileMenuOpen && (
        <div
          style={{
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
          className={`relative z-10 lg:hidden pointer-events-auto mx-auto w-[94%] sm:w-[90%] max-w-5xl mt-2 p-5 rounded-2xl border transition-all duration-300 shadow-2xl space-y-4 max-h-[calc(100dvh-88px)] overflow-y-auto ${
            isLightNavbar
              ? "bg-white/85 hover:bg-white/90 border-black/10 text-[#18181B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)]"
              : "bg-slate-950/45 sm:bg-slate-950/50 border-white/20 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]"
          }`}
        >
          {/* Drawer Header */}
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              isLightNavbar ? "border-black/10" : "border-white/15"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Solvex"
                width={28}
                height={28}
                decoding="async"
                className="h-7 w-7 object-contain"
              />
              <div className="flex flex-col">
                <span
                  className={`text-sm font-bold tracking-tight uppercase leading-none font-sans ${
                    isLightNavbar ? "text-[#18181B]" : "text-white"
                  }`}
                >
                  Solvex
                </span>
                <span
                  className={`text-[8px] font-semibold tracking-wider uppercase leading-tight font-sans ${
                    isLightNavbar ? "text-[#059669]" : "text-emerald-400"
                  }`}
                >
                  Energy Solutions
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal ${
                isLightNavbar
                  ? "border border-black/10 bg-zinc-100/90 text-[#18181B]"
                  : "border border-white/20 bg-white/10 text-white/90"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t("common.pmSuryaGharPartner")}</span>
            </div>
          </div>

          {/* Mobile Language Switcher (shown only inside hamburger menu on smaller screens) */}
          <div className="pt-0.5">
            <LanguageSwitcher
              scrolled={isLightNavbar}
              isMobile
              onSelect={() => setMobileMenuOpen(false)}
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 pt-1">
            {navLinks.map((link) => {
              const isActive = link.isRoute && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (!link.isRoute && !isSubPage && link.href.startsWith("#")) {
                      e.preventDefault();
                      const targetId = link.href.slice(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", link.href);
                      }
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium tracking-[-0.2px] transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? isLightNavbar
                        ? "text-[#059669] bg-emerald-50 font-semibold"
                        : "text-emerald-300 bg-white/10 font-semibold"
                      : isLightNavbar
                      ? "text-[#18181B] hover:text-[#059669] hover:bg-black/5 active:bg-black/10"
                      : "text-white hover:text-emerald-300 hover:bg-white/10 active:bg-white/15"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`text-xs transition-transform duration-200 group-hover:translate-x-1 ${
                      isActive
                        ? "text-[#059669]"
                        : isLightNavbar
                        ? "text-zinc-400 group-hover:text-[#059669]"
                        : "text-white/40 group-hover:text-emerald-300"
                    }`}
                  >
                    →
                  </span>
                </Link>
              );
            })}
            <a
              href={isSubPage ? "/#partner-form" : "#partner-form"}
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent("cta_click", {
                  cta_name: "navbar_partner_button_mobile",
                  source: "navbar_mobile_menu",
                });
              }}
              className={`mt-2 h-[44px] rounded-full flex items-center justify-center text-sm font-medium tracking-[-0.2px] transition-all active:scale-[0.98] cursor-pointer ${
                isLightNavbar
                  ? "bg-[#059669] text-white hover:bg-[#047857] shadow-sm"
                  : "bg-white text-[#18181B] hover:bg-neutral-100 shadow-md"
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
