"use client";

import React, { useState } from "react";
import { ShoppingBag, Briefcase } from "lucide-react";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { ContactInfoCard } from "./ContactInfoCard";
import { BuyerEnquiryForm } from "./BuyerEnquiryForm";
import { PartnerEnquiryForm } from "./PartnerEnquiryForm";

export function ContactSection() {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<"buyer" | "partner">("buyer");

  return (
    <section className="w-full pt-20 lg:pt-28 pb-14 lg:pb-20 bg-[#FFFFFF] relative" id="partner-form">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Corporate Desk & Direct CTAs */}
          <div className="lg:col-span-5">
            <ContactInfoCard />
          </div>

          {/* Right Column: Interactive Dual Tab Form */}
          <div className="lg:col-span-7">
            <CardFadeReveal delay={0.15}>
              <div className="card-superpower p-6 sm:p-8 bg-white shadow-sm flex flex-col gap-6">
                {/* Tab Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/10">
                  <SlidingTabs
                    tabs={[
                      {
                        id: "buyer",
                        label: isHindi ? "सोलर कोटेशन व सर्वे" : "Solar Quote & Survey",
                        icon: <ShoppingBag className="w-3.5 h-3.5" />,
                      },
                      {
                        id: "partner",
                        label: isHindi ? "फ्रैंचाइज़ी व डीलरशिप" : "Franchise & Dealership",
                        icon: <Briefcase className="w-3.5 h-3.5" />,
                      },
                    ]}
                    activeId={activeTab}
                    onChange={(id) => setActiveTab(id as "buyer" | "partner")}
                    wrapperClassName="w-fit"
                    className="bg-zinc-100/90 border-0 p-1"
                    pillClassName="bg-[#059669]"
                    buttonClassName="font-semibold text-xs px-4 py-2"
                  />

                  <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium w-fit">
                    {activeTab === "buyer" ? "PM SURYA GHAR ELIGIBLE" : "FY 2026 TERRITORY INTAKE"}
                  </span>
                </div>

                {/* Tab 1: Buyer Enquiry Form */}
                {activeTab === "buyer" && <BuyerEnquiryForm />}

                {/* Tab 2: Partner Enquiry Form */}
                {activeTab === "partner" && <PartnerEnquiryForm />}
              </div>
            </CardFadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
