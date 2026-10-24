"use client";

import React from "react";
import {
  Send,
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { trackEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/config/site";

export function ContactInfoCard() {
  const { t, isHindi } = useLanguage();

  return (
    <div className="lg:col-span-5">
      <div className="flex flex-col gap-6">
        <MotionReveal className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
            <Send className="w-3.5 h-3.5 text-white" />
            <span>{t("contact.badge", "[ 11 // CORPORATE DESK & ALLOCATION ]")}</span>
          </div>
          <WordStaggerHeading
            as="h2"
            className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
          >
            {isHindi ? "सीधे हमारे एक्सपर्ट्स से संपर्क करें" : "Connect with Solvex Energy Desk"}
          </WordStaggerHeading>
          <SubheadingReveal
            className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
            delay={0.16}
          >
            {isHindi
              ? "चाहे आप सोलर सिस्टम उत्पाद खरीद रहे हों या अपने जिले में फ्रैंचाइज़ी डीलरशिप ले रहे हों, हमारे विशेषज्ञ तुरंत सहायता के लिए उपलब्ध हैं।"
              : "Whether you require Tier-1 solar equipment and turnkey PM Surya Ghar installation or district franchise territory allocation, our corporate desk is at your disposal."}
          </SubheadingReveal>
        </MotionReveal>

        {/* Working Direct Phone Call Card */}
        <CardFadeReveal
          as="a"
          index={0}
          href={`tel:${SITE_CONFIG.phone}`}
          onClick={() =>
            trackEvent("cta_click", {
              cta_name: "phone_call",
              source: "contact_section_left_card",
            })
          }
          className="group p-5 rounded-2xl border border-black/10 bg-white hover:border-[#059669] hover:bg-emerald-50/40 transition-all duration-300 shadow-xs flex items-center justify-between cursor-pointer"
          aria-label={`Direct Phone Consultation ${SITE_CONFIG.phoneDisplay}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#059669]/10 text-[#059669] group-hover:bg-[#059669] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
              <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#71717A]">
                  {isHindi ? "सीधी फोन कंसल्टेशन" : "Direct Phone Consultation"}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-base font-bold text-[#18181B] group-hover:text-[#059669] transition-colors mt-0.5">
                {SITE_CONFIG.phoneDisplay}
              </span>
              <span className="text-[11px] text-[#71717A] mt-0.5">
                {isHindi ? "सोम—शनि: 09:30 - 18:30 IST" : "Mon—Sat: 09:30 - 18:30 IST"}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-all shrink-0">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardFadeReveal>

        {/* Working Direct WhatsApp Card */}
        <CardFadeReveal
          as="a"
          index={1}
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            "Hello Solvex Energy! I would like to inquire about solar systems, subsidy assistance, and equipment allocation."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("cta_click", {
              cta_name: "whatsapp_chat",
              source: "contact_section_left_card",
            })
          }
          className="group p-5 rounded-2xl border border-black/10 bg-white hover:border-[#25D366] hover:bg-emerald-50/30 transition-all duration-300 shadow-xs flex items-center justify-between cursor-pointer"
          aria-label="Official WhatsApp Help Desk"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
              <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#71717A]">
                  {isHindi ? "आधिकारिक व्हाट्सएप डेस्क" : "Official WhatsApp Desk"}
                </span>
                <span className="text-[10px] font-semibold text-[#059669] bg-emerald-100 px-2 py-0.5 rounded-full">
                  ⚡ Quick Response
                </span>
              </div>
              <span className="text-base font-bold text-[#18181B] group-hover:text-[#059669] transition-colors mt-0.5">
                {SITE_CONFIG.phoneDisplay}
              </span>
              <span className="text-[11px] text-[#71717A] mt-0.5">
                {isHindi ? "औसतन प्रतिक्रिया समय: < 15 मिनट" : "Average response: <15 mins"}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardFadeReveal>

        {/* Corporate Desk Info Card */}
        <CardFadeReveal index={2} className="card-superpower p-6 flex flex-col gap-5 bg-white shadow-xs">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#18181B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                {t("contact.hqLabel", "Corporate Headquarters")}
              </span>
              <span className="text-sm font-normal text-[#18181B] mt-1 leading-relaxed">
                {t(
                  "contact.hqAddress",
                  `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city} ${SITE_CONFIG.address.postalCode}, ${SITE_CONFIG.address.state}, India`
                )}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 pt-4 border-t border-black/10">
            <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#18181B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                {t("contact.deskLabel", "Institutional Desk")}
              </span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm font-normal text-[#18181B] hover:text-[#059669] mt-1 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="flex items-start gap-4 pt-4 border-t border-black/10">
            <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#18181B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                {t("contact.hoursLabel", "Operations & Dispatch")}
              </span>
              <span className="text-sm font-normal text-[#18181B] mt-1">
                {t("contact.hoursTime", "Monday — Saturday: 09:30 - 18:30 IST")}
              </span>
            </div>
          </div>
        </CardFadeReveal>
      </div>
    </div>
  );
}
