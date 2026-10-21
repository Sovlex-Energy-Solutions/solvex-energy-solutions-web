"use client";

import Link from "next/link";
import { Phone, MessageSquare, Mail, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import { openConsentPreferences } from "@/lib/consent/state";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const { t } = useLanguage();

  const services = [
    { label: t("footer.solarPowerSystems"), href: "#solutions" },
    { label: t("footer.windEnergySolutions"), href: "#solutions" },
    { label: t("footer.energyStorage"), href: "#solar-pcu" },
    { label: t("footer.consultationDesign"), href: "#partner-form" },
  ];

  const partnershipLinks = [
    { label: t("footer.distributorPartner"), href: "#partner-form" },
    { label: t("footer.masterDistributor"), href: "#partner-form" },
    { label: t("footer.channelPartner"), href: "#partner-form" },
    { label: t("footer.merchantPartner"), href: "#partner-form" },
  ];

  return (
    <footer className="relative w-full bg-[#FFFFFF] overflow-hidden text-[#18181B] mt-16 sm:mt-20 lg:mt-24 min-h-[500px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between">
      {/* Background Solar Landscape Image with Multi-Stop Gradients */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer/solar_landscape_bg.jpg"
          alt="Solvex Clean Solar Energy Landscape"
          loading="lazy"
          decoding="async"
          width={1920}
          height={800}
          className="w-full h-[82%] sm:h-[88%] lg:h-[92%] absolute bottom-0 left-0 right-0 object-cover object-bottom"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 18%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 85%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 18%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,1) 85%)",
          }}
        />

        {/* Protective Multi-Layer White Scrim across upper and middle areas ensuring 100% text and link legibility */}
        <div className="absolute inset-x-0 top-0 h-[420px] sm:h-[460px] lg:h-[490px] bg-gradient-to-b from-white via-white/95 via-50% to-transparent z-[1]" />

        {/* Soft luminous radial glow under navigation columns for crystal-clear readability */}
        <div className="absolute top-0 right-0 w-full lg:w-4/5 h-[420px] bg-gradient-to-b from-white/90 via-white/70 to-transparent blur-xl z-[1] pointer-events-none" />

        {/* Bottom Mist Gradient for crisp legal bar text visibility */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-32 bg-gradient-to-t from-white via-white/90 via-45% to-transparent z-[3]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 flex flex-col justify-between flex-1 w-full min-h-[500px] sm:min-h-[520px] lg:min-h-[580px]">
        {/* Upper Grid: Brand Column + Navigation Columns */}
        <MotionReveal className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Brand Column (Col Span 2 on mobile, 4 on lg) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col gap-3.5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Solvex Energy Solutions"
                loading="lazy"
                decoding="async"
                width={44}
                height={44}
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-[-0.03em] uppercase leading-none font-sans text-zinc-950">
                  {t("footer.brandName")}
                </span>
                <span className="text-[10px] font-bold tracking-[0.24em] uppercase leading-tight font-sans text-[#059669] mt-0.5">
                  {t("footer.brandSubtitle")}
                </span>
              </div>
            </Link>

            <p className="body-sm text-sm text-zinc-900 max-w-sm leading-relaxed font-semibold">
              {t("footer.description")}
            </p>

            {/* Corporate Identification Card */}
            <div className="flex flex-col gap-1 pt-1.5 pb-1 px-3 rounded-xl bg-white/70 border border-black/5 shadow-xs w-fit backdrop-blur-xs">
              <span className="uppercase font-bold text-zinc-950 text-[11px] tracking-wider">
                {t("footer.companyName")}
              </span>
              <span className="text-zinc-800 font-mono text-[11px] tracking-wider font-semibold">
                {t("footer.cin")}
              </span>
            </div>
          </div>

          {/* Services Column (Col Span 1 on mobile, 2 on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-6 flex flex-col gap-3">
            <span className="font-sans text-[14px] font-bold tracking-tight text-zinc-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              {t("footer.services")}
            </span>
            <div className="flex flex-col gap-1.5">
              {services.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group/item inline-flex items-center justify-between text-[13.5px] font-semibold text-zinc-900 hover:text-emerald-700 hover:bg-white/80 px-2.5 py-1.5 -mx-2.5 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-500/20 shadow-none hover:shadow-xs"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform duration-200">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Partnership Column (Col Span 1 on mobile, 2 on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans text-[14px] font-bold tracking-tight text-zinc-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              {t("footer.partnership")}
            </span>
            <div className="flex flex-col gap-1.5">
              {partnershipLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group/item inline-flex items-center justify-between text-[13.5px] font-semibold text-zinc-900 hover:text-emerald-700 hover:bg-white/80 px-2.5 py-1.5 -mx-2.5 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-500/20 shadow-none hover:shadow-xs"
                >
                  <span className="group-hover/item:translate-x-1 transition-transform duration-200">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column (Col Span 2 on mobile, 3 on lg) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-[14px] font-bold tracking-tight text-zinc-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              {t("footer.contact")}
            </span>
            <div className="flex flex-col gap-2.5">
              {/* Address with Icon */}
              <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-zinc-900 font-semibold leading-relaxed bg-white/70 p-2.5 rounded-xl border border-black/5 shadow-xs">
                <MapPin className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <span>{t("footer.address")}</span>
              </div>

              <div className="flex flex-col gap-2 pt-0.5">
                {/* Phone Link */}
                <a
                  href="tel:+919125127755"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "phone_call",
                      source: "footer",
                    })
                  }
                  className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-zinc-950 font-bold hover:text-[#059669] border border-black/10 hover:border-[#059669]/40 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer w-fit"
                >
                  <div className="w-6 h-6 rounded-full bg-[#059669]/10 text-[#059669] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm tracking-tight">+91 91251 27755</span>
                </a>

                {/* WhatsApp Direct Link */}
                <a
                  href={`https://wa.me/919125127755?text=${encodeURIComponent(
                    "Hello Solvex Energy! I would like to inquire about your solar inverters, PCUs, and rooftop EPC solutions."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "whatsapp_chat",
                      source: "footer",
                    })
                  }
                  className="inline-flex items-center gap-2.5 px-3 py-2 rounded-xl bg-emerald-50/90 hover:bg-emerald-100 text-emerald-950 font-bold border border-emerald-500/25 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer w-fit"
                >
                  <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs sm:text-[13px]">WhatsApp Corporate Desk</span>
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm text-zinc-900 font-semibold hover:text-[#059669] hover:bg-white/80 transition-all duration-200 truncate w-fit border border-transparent hover:border-black/5"
                >
                  <Mail className="w-4 h-4 text-[#059669] shrink-0" />
                  <span className="truncate">{t("footer.email")}</span>
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* Divider & Bottom Bar */}
        <div className="border-t border-black/15 mt-8 sm:mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-950 font-bold">
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-950 font-bold">
            <button
              type="button"
              onClick={() => openConsentPreferences()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 hover:border-emerald-500 transition-all cursor-pointer shadow-2xs"
              aria-label="Manage Privacy and Cookie Preferences"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Privacy & Cookie Settings</span>
            </button>
            <button
              type="button"
              onClick={() => openLegalModal("privacy")}
              className="px-2.5 py-1 rounded-md bg-white/70 hover:bg-white hover:text-[#059669] border border-black/5 hover:border-[#059669]/30 transition-all cursor-pointer shadow-2xs"
            >
              {t("footer.privacyPolicy")}
            </button>
            <button
              type="button"
              onClick={() => openLegalModal("terms")}
              className="px-2.5 py-1 rounded-md bg-white/70 hover:bg-white hover:text-[#059669] border border-black/5 hover:border-[#059669]/30 transition-all cursor-pointer shadow-2xs"
            >
              {t("footer.termsOfService")}
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-white/70 hover:bg-white hover:text-[#059669] border border-black/5 hover:border-[#059669]/30 transition-all shadow-2xs"
            >
              {t("footer.sitemap")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
