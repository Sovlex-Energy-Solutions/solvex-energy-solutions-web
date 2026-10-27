"use client";

import React from "react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";

export function ContactInfoCard() {
  const { isHindi } = useLanguage();

  const steps = [
    {
      step: "01",
      title: isHindi ? "अपनी आवश्यकताएं दर्ज करें" : "Submit Your Requirements",
      desc: isHindi
        ? "सोलर कोटेशन या डीलरशिप मॉडल चुनकर बुनियादी जानकारी साझा करें।"
        : "Select residential solar quote or commercial dealership and share basic project details.",
    },
    {
      step: "02",
      title: isHindi ? "24 घंटे में तकनीकी समीक्षा" : "24h Engineering Review",
      desc: isHindi
        ? "हमारे इंजीनियर्स रूफटॉप लोड, सोलर यील्ड व रीजनल वायबिलिटी का विश्लेषण करते हैं।"
        : "Our central desk evaluates rooftop load sizing, DISCOM feasibility, or territory allocation.",
    },
    {
      step: "03",
      title: isHindi ? "विस्तृत कोटेशन व सब्सिडी रिपोर्ट" : "Itemized Proposal & Subsidy",
      desc: isHindi
        ? "पीएम सूर्य घर सब्सिडी और पारदर्शी बिल ऑफ मैटेरियल्स (BOM) सीधे प्राप्त करें।"
        : "Receive an itemized Bill of Materials with pre-calculated PM Surya Ghar subsidy benefits.",
    },
  ];

  return (
    <div className="flex flex-col gap-7 lg:pr-4">
      {/* Editorial Header */}
      <MotionReveal className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#059669] text-xs font-medium tracking-tight w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span>{isHindi ? "त्वरित पूछताछ व ऑनबोर्डिंग" : "QUICK ENQUIRY & ONBOARDING"}</span>
        </div>

        <WordStaggerHeading
          as="h2"
          className="headline-md text-3xl sm:text-4xl lg:text-[38px] font-normal tracking-[-1.2px] text-[#18181B] leading-[1.18]"
        >
          {isHindi ? "सोलर कोटेशन व पार्टनरशिप पूछताछ" : "Request a Quote or Partner with Us."}
        </WordStaggerHeading>

        <SubheadingReveal
          className="body-md text-sm sm:text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
          delay={0.16}
        >
          {isHindi
            ? "मुफ़्त रूफटॉप सोलर सर्वे बुक करने या अपने ज़िले में आधिकारिक डीलरशिप अधिकार प्राप्त करने के लिए यह फ़ॉर्म भरें।"
            : "Complete the form to schedule a complimentary rooftop solar feasibility survey or explore district franchise territory rights."}
        </SubheadingReveal>
      </MotionReveal>

      {/* 3-Step Simple Process (Minimalist, No Cards) */}
      <MotionReveal delay={0.2} className="flex flex-col gap-4 pt-1">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#71717A]">
          {isHindi ? "यह कैसे कार्य करता है" : "What Happens Next"}
        </span>

        <div className="flex flex-col gap-4">
          {steps.map((item) => (
            <div key={item.step} className="flex items-start gap-3.5 group">
              <span className="font-mono text-xs font-semibold text-[#059669] bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                {item.step}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#18181B] tracking-tight">
                  {item.title}
                </span>
                <span className="text-xs text-[#71717A] leading-relaxed">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </MotionReveal>

    </div>
  );
}
