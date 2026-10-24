"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Phone, MessageSquare } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { trackEvent } from "@/lib/analytics";

export default function FaqSection() {
  const { t, isHindi } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fallbackFaqs = [
    {
      question: "What technical support and technician enablement does Solvex provide to new franchise partners?",
      answer:
        "We provide turnkey engineering enablement: structured hands-on masterclasses covering civil roof load calculations, 3D shadow analysis, high-voltage DC string design, pre-cleared DISCOM documentation packets, and direct access to our central engineering escalation desk.",
    },
    {
      question: "What is the typical operational onboarding timeline for an authorized territory franchise?",
      answer:
        "From formal agreement execution and territorial rights allocation to commercial dispatch typically spans 14 to 21 business days. This window covers initial depot warehousing allocations, ERP terminal onboarding, localized digital lead generation setup, and technician safety certifications.",
    },
    {
      question: "What commercial gross margins and working capital cycles can distribution partners model?",
      answer:
        "Authorized territorial distributors typically structure margins ranging from 18% to 26% across hybrid inverters, industrial PCUs, and turnkey generation kits. Under the PM Surya Ghar scheme, streamlined direct benefit transfers (DBT) ensure 30-day working capital velocity on residential rooftop arrays.",
    },
    {
      question: "Are all Solvex PCU, Inverter, and Photovoltaic packages compliant with ALMM & MNRE mandates?",
      answer:
        "Unconditionally. Every photovoltaic module supplied is ALMM List-I compliant with domestic solar cell content (DCR). Our inverters, PCUs, and balance-of-systems components carry mandatory BIS certifications and are pre-registered on state utility DISCOM portals for direct net-meter sanctioning.",
    },
    {
      question: "How does the Solvex 360 warranty replacement protocol operate in case of hardware anomalies?",
      answer:
        "We operate decentralized regional buffer inventory hubs guaranteeing 48-hour RMA swap-outs. In addition, our smart hybrid inverters and PCUs transmit real-time cloud telemetry, enabling automated predictive diagnostics and remote firmware patches prior to physical field dispatches.",
    },
  ];

  const faqs = [0, 1, 2, 3, 4].map((i) => ({
    question: t(`faq.items.${i}.question`, fallbackFaqs[i].question),
    answer: t(`faq.items.${i}.answer`, fallbackFaqs[i].answer),
  }));

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF] relative" id="faq">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>{t("faq.badge", "OPERATIONAL INTELLIGENCE & FAQ")}</span>
          </div>
          <WordStaggerHeading
            as="h2"
            className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
          >
            {t("faq.title", "Operational Briefings & Partner Inquiries")}
          </WordStaggerHeading>
          <SubheadingReveal
            className="body-md text-base text-[#71717A] max-w-xl leading-relaxed tracking-[-0.2px]"
            delay={0.16}
          >
            {t("faq.description", "Critical answers regarding territory jurisdiction, capital expenditure, DISCOM net-metering approvals, and technical service protocols.")}
          </SubheadingReveal>
        </MotionReveal>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <CardFadeReveal
                key={idx}
                index={idx}
                className={`rounded-lg border p-6 transition-colors duration-200 cursor-pointer shadow-xs ${
                  isOpen ? "border-primary/40 bg-[#FAFAFA]" : "border-black/10 bg-white hover:border-black/20"
                }`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-start justify-between gap-4 select-none">
                  <div className="flex items-start gap-4">
                    <span className="font-sans text-xs text-[#71717A] mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base lg:text-lg font-normal text-[#18181B] leading-snug tracking-[-0.3px]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "border-primary/30 bg-primary/10 text-primary" : "border-black/10 text-[#18181B]"
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-8 pt-4 mt-4 border-t border-black/10">
                      <p className="body-sm text-sm text-[#71717A] leading-[1.65]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardFadeReveal>
            );
          })}
        </div>

        {/* Unresolved Questions Advisory Banner Card */}
        <CardFadeReveal delay={0.2} className="rounded-2xl border border-black/10 bg-[#FAFAFA] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              {isHindi ? "सीधी तकनीकी सहायता" : "Direct Technical & Commercial Desk"}
            </span>
            <h3 className="text-lg lg:text-xl font-normal text-[#18181B] tracking-[-0.3px]">
              {isHindi ? "क्या आपका कोई विशेष सवाल या तकनीकी शंका है?" : "Still have questions about our systems or franchise?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-lg leading-relaxed">
              {isHindi
                ? "हमारे सीनियर सोलर इंजीनियर्स और फ्रैंचाइज़ी कंसल्टेंट्स से सीधे फोन या व्हाट्सएप पर तुरंत समाधान प्राप्त करें।"
                : "Speak directly with our senior application engineers or commercial franchise specialists for immediate answers."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+919125127755"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "call_faq_desk",
                  source: "faq_section",
                });
              }}
              className="h-[46px] px-5 rounded-full border border-black/15 bg-white hover:bg-zinc-100 text-[#18181B] text-xs font-medium inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+91 91251 27755</span>
            </a>
            <a
              href={`https://wa.me/919125127755?text=${encodeURIComponent(
                "Hello Solvex team, I have a specific question regarding your solar products and dealership terms. Please assist."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "whatsapp_faq_desk",
                  source: "faq_section",
                });
              }}
              className="h-[46px] px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-medium inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "व्हाट्सएप पर पूछें" : "Chat on WhatsApp"}</span>
            </a>
          </div>
        </CardFadeReveal>
      </div>
    </section>
  );
}
