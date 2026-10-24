"use client";

import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  FileBadge,
  BadgeCheck,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";

export default function CertificationsSection() {
  const { isHindi } = useLanguage();

  const certifications = [
    {
      title: "ALMM Tier-1 Listed",
      authority: "Ministry of New and Renewable Energy (MNRE)",
      desc: isHindi
        ? "एमएनआरई की अनुमोदित मॉड्यूल और निर्माता सूची (ALMM) में सूचीबद्ध, जो सभी सरकारी और सब्सिडी योजनाओं के लिए अनिवार्य है।"
        : "Fully enlisted under MNRE’s Approved List of Models and Manufacturers, satisfying all domestic content requirements (DCR).",
      code: "MNRE/ALMM/DCR-COMPLIANT",
      Icon: Award,
    },
    {
      title: "BIS Certification",
      authority: "Bureau of Indian Standards (Govt of India)",
      desc: isHindi
        ? "IS 14286 और IS/IEC 61730 मानकों के अनुरूप प्रमाणित, जो विद्युत सुरक्षा और विश्वसनीयता सुनिश्चित करते हैं।"
        : "Certified to IS 14286 and IS/IEC 61730 standards for mechanical load, electrical insulation, and high-voltage safety.",
      code: "IS 14286 // IS/IEC 61730",
      Icon: ShieldCheck,
    },
    {
      title: "PM Surya Ghar National Vendor",
      authority: "National Rooftop Solar Portal (MNRE)",
      desc: isHindi
        ? "पीएम सूर्य घर मुफ्त बिजली योजना पोर्टल पर आधिकारिक पंजीकृत वेंडर, जिससे ₹78,000 की सीधी डीबीटी सब्सिडी सुनिश्चित होती है।"
        : "Officially registered vendor on the PM Surya Ghar National Portal, enabling expedited ₹78,000 direct consumer subsidies.",
      code: "PMSGY-VENDOR-DIRECT",
      Icon: CheckCircle2,
    },
    {
      title: "ISO 9001:2015 & 14001:2015",
      authority: "International Quality Management Systems",
      desc: isHindi
        ? "गुणवत्ता प्रबंधन और पर्यावरण संरक्षण के अंतरराष्ट्रीय मानकों के अनुसार प्रमाणित उत्पादन प्रक्रिया।"
        : "Internationally audited quality management and environmental standard compliance across the manufacturing facility.",
      code: "ISO 9001 / ISO 14001",
      Icon: FileBadge,
    },
    {
      title: "IEC 61215 & IEC 61730",
      authority: "International Electrotechnical Commission",
      desc: isHindi
        ? "ओलावृष्टि, आर्द्रता, और -40°C से +85°C तक के गंभीर तापीय चक्र परीक्षणों में अंतरराष्ट्रीय स्तर पर प्रमाणित।"
        : "Globally validated thermal cycling, humidity-freeze resistance, and heavy 5400 Pa snow/wind mechanical load endurance.",
      code: "IEC 61215 / IEC 61730 / IEC 62109",
      Icon: BadgeCheck,
    },
    {
      title: "Multi-State DISCOM Approvals",
      authority: "Gujarat, Rajasthan, Maharashtra & UP Discoms",
      desc: isHindi
        ? "DGVCL, MGVCL, PGVCL, UGVCL, JVVNL, और MSEDCL सहित सभी प्रमुख डिस्कॉम में द्विदिशी ग्रिड-सिंक्रोनाइज़ेशन अनुमतियां।"
        : "Turnkey synchronization approvals across DGVCL, MGVCL, PGVCL, UGVCL, JVVNL, MSEDCL, ensuring effortless net-metering.",
      code: "BI-DIRECTIONAL NET-METERING",
      Icon: FileCheck2,
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#F4F6F9] overflow-hidden" id="certifications">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header */}
        <MotionReveal className="text-center flex flex-col items-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px]">
            <Award className="w-3.5 h-3.5 text-white" />
            <span>{isHindi ? "वैधानिक अनुपालन एवं प्रमाणन" : "Statutory Accreditations"}</span>
          </div>
          <WordStaggerHeading
            as="h2"
            className="headline-md text-3xl sm:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
          >
            {isHindi
              ? "भारत सरकार और अंतरराष्ट्रीय प्रमाणनों द्वारा समर्थित"
              : "Backed by Government of India & Global Engineering Standards"}
          </WordStaggerHeading>
          <SubheadingReveal
            className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
            delay={0.16}
          >
            {isHindi
              ? "हमारा प्रत्येक मॉड्यूल और इन्वर्टर देश के सख्त नियामक मानकों और डिस्कॉम सुरक्षा प्रोटोकॉल का पूर्णतः पालन करता है।"
              : "Every Solvex product meets stringent statutory requirements to guarantee swift grid connectivity and maximum safety."}
          </SubheadingReveal>
        </MotionReveal>

        {/* 6 Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <CardFadeReveal
                key={idx}
                index={idx}
                className="p-6 rounded-2xl border border-black/10 bg-white flex flex-col justify-between gap-5 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium tracking-tight text-[#18181B]">
                      {item.title}
                    </h3>
                    <span className="text-xs font-medium text-emerald-700">
                      {item.authority}
                    </span>
                  </div>

                  <p className="text-xs text-[#71717A] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
                    {item.code}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              </CardFadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
