"use client";

import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
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
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 52%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 52%)",
          }}
        />

        {/* Protective White Gradient Wash across upper area ensuring 100% text legibility */}
        <div className="absolute inset-x-0 top-0 h-44 sm:h-52 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/90 via-40% to-transparent z-[1]" />

        {/* Soft ambient tint across mid-tones for high-contrast link readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent z-[2]" />

        {/* Bottom Mist Gradient for crisp legal bar text visibility */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-white/90 via-white/60 to-transparent z-[3]" />
      </div>

      {/* Main Content Container with Balanced Medium Height */}
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

            <p className="body-sm text-sm text-zinc-900 max-w-sm leading-relaxed font-medium">
              {t("footer.description")}
            </p>

            {/* Corporate Identification */}
            <div className="flex flex-col gap-1 pt-1 text-[11px] font-medium tracking-wide">
              <span className="uppercase font-bold text-zinc-950 tracking-wider">
                {t("footer.companyName")}
              </span>
              <span className="text-zinc-800 font-mono text-[11px] tracking-wider font-semibold">
                {t("footer.cin")}
              </span>
            </div>
          </div>

          {/* Services Column (Col Span 1 on mobile, 2 on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-6 flex flex-col gap-3">
            <span className="font-sans text-[15px] font-bold tracking-tight text-zinc-950">
              {t("footer.services")}
            </span>
            <div className="flex flex-col gap-2">
              {services.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="body-sm text-sm text-zinc-900 hover:text-[#059669] transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Partnership Column (Col Span 1 on mobile, 2 on lg) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-3">
            <span className="font-sans text-[15px] font-bold tracking-tight text-zinc-950">
              {t("footer.partnership")}
            </span>
            <div className="flex flex-col gap-2">
              {partnershipLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="body-sm text-sm text-zinc-900 hover:text-[#059669] transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column (Col Span 2 on mobile, 3 on lg) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-[15px] font-bold tracking-tight text-zinc-950">
              {t("footer.contact")}
            </span>
            <div className="flex flex-col gap-2">
              <p className="body-sm text-sm text-zinc-900 leading-relaxed font-medium">
                {t("footer.address")}
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href="tel:+919879012345"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "phone_call",
                      source: "footer",
                    })
                  }
                  className="inline-flex items-center gap-2 text-sm text-zinc-950 font-bold hover:text-[#059669] transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>+91 98790 12345</span>
                </a>

                <a
                  href={`https://wa.me/919879012345?text=${encodeURIComponent(
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
                  className="inline-flex items-center gap-2 text-sm text-emerald-800 font-semibold hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp Corporate Desk</span>
                </a>

                <a
                  href={`mailto:${t("footer.email")}`}
                  className="body-sm text-sm text-zinc-900 hover:text-[#059669] transition-colors font-medium truncate"
                >
                  {t("footer.email")}
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* Divider & Bottom Bar matching the reference layout */}
        <div className="border-t border-black/15 mt-8 sm:mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-950 font-semibold">
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-950 font-semibold">
            <button
              type="button"
              onClick={() => openLegalModal("privacy")}
              className="hover:text-[#059669] transition-colors cursor-pointer"
            >
              {t("footer.privacyPolicy")}
            </button>
            <button
              type="button"
              onClick={() => openLegalModal("terms")}
              className="hover:text-[#059669] transition-colors cursor-pointer"
            >
              {t("footer.termsOfService")}
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#059669] transition-colors"
            >
              {t("footer.sitemap")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
