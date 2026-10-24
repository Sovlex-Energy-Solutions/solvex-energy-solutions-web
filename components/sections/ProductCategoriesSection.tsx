"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Truck, CreditCard, Headphones, ShieldCheck } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import { trackEvent } from "@/lib/analytics";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { rawCategories, type RawCategoryItem } from "@/data/products/categories";

export type { RawCategoryItem };

export default function ProductCategoriesSection() {
  const { isHindi } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    return rawCategories.map((c) => ({
      id: c.id,
      category: c.category,
      image: c.image,
      name: isHindi ? c.nameHi : c.nameEn,
      description: isHindi ? c.descriptionHi : c.descriptionEn,
      features: isHindi ? c.featuresHi : c.featuresEn,
      badge: isHindi ? c.badgeHi : c.badgeEn,
    }));
  }, [isHindi]);

  const trustBadges = useMemo(() => [
    {
      icon: Truck,
      title: isHindi ? "सुरक्षित अखिल भारतीय लॉजिस्टिक्स" : "Secure Pan-India Logistics",
      subtitle: isHindi
        ? "सूरत हब से सुरक्षित इन-ट्रांजिट पैकिंग के साथ सीधे आपकी साइट पर डिस्पैच।"
        : "Direct-to-site dispatched from our Surat fulfillment hub with tamper-evident transit protection.",
    },
    {
      icon: CreditCard,
      title: isHindi ? "सोलर फाइनेंस सुविधा" : "Solar Finance Enablement",
      subtitle: isHindi
        ? "बिना गारंटी कम-ईएमआई ग्रीन लोन एवं सरकारी पोर्टल सब्सिडी प्रलेखन में सीधी सहायता।"
        : "Direct assistance with collateral-free low-EMI green loans and portal subsidy paperwork.",
    },
    {
      icon: Headphones,
      title: isHindi ? "समर्पित तकनीकी सहायता" : "Dedicated Technical Dispatch",
      subtitle: isHindi
        ? "तीव्र डायग्नोस्टिक्स और कमीशनिंग सहायता हेतु समर्पित हेल्पलाइन (+91 91251 27755)।"
        : "Direct phone line (+91 91251 27755) and field engineer dispatch for rapid diagnostics.",
      href: "tel:+919125127755",
      cta: isHindi ? "हेल्पलाइन कॉल: +91 91251 27755" : "Call Helpline: +91 91251 27755",
    },
    {
      icon: ShieldCheck,
      title: isHindi ? "वैधानिक ALMM एवं BIS प्रमाणन" : "Statutory ALMM & BIS Certification",
      subtitle: isHindi
        ? "MNRE ALMM दिशानिर्देशों, IEC मानकों और बहु-वर्षीय फैक्ट्री वारंटी का पूर्ण अनुपालन।"
        : "Rigorous compliance with MNRE ALMM guidelines, IEC standards, and multi-year warranties.",
    },
  ], [isHindi]);

  const filteredCategories =
    filter === "all"
      ? categories
      : categories.filter((c) => c.category === filter);

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#F4F6F9] to-white overflow-hidden" id="products-categories">
      {/* Background Hardware Showcase Image & Gradient Overlays */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <Image
          src="/media/optimized/bifacial_hardware_showcase.webp"
          alt="Bifacial solar hardware engineering showcase"
          loading="lazy"
          fill
          className="object-cover opacity-50 sm:opacity-60"
        />
        {/* Soft edge blend gradients with feathered margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-[#F4F6F9]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/30 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-[#F4F6F9]/60 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Row */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "हार्डवेयर आर्किटेक्चर" : "Hardware Architecture"}</span>
            </div>
            <WordStaggerHeading
              as="h2"
              className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]"
            >
              {isHindi ? "इंजीनियर्ड क्लीन पावर एवं स्टोरेज इकोसिस्टम" : "Engineered Clean Power & Storage Ecosystem"}
            </WordStaggerHeading>
            <SubheadingReveal
              className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]"
              delay={0.16}
            >
              {isHindi
                ? "भारतीय मौसम के अनुकूल निर्मित, कड़े ALMM मानकों से प्रमाणित और अधिकतम किलोवाट-घंटे उत्पादन हेतु तैयार टिकाऊ सोलर हार्डवेयर।"
                : "High-durability solar hardware manufactured for tropical thermal conditions, certified under rigorous ALMM standards, and fine-tuned for optimal kWh generation."}
            </SubheadingReveal>
          </div>

          {/* Filter Tabs with Smooth Sliding Active Pill Indicator */}
          <SlidingTabs
            tabs={[
              { id: "all", label: isHindi ? "सभी हार्डवेयर" : "All Hardware" },
              { id: "rooftop", label: isHindi ? "रूफटॉप ईपीसी" : "Rooftop EPC" },
              { id: "panels", label: isHindi ? "सोलर पैनल" : "Solar Panels" },
              { id: "inverters", label: isHindi ? "इन्वर्टर" : "Inverters" },
              { id: "batteries", label: isHindi ? "एनर्जी स्टोरेज" : "Storage" },
            ]}
            activeId={filter}
            onChange={setFilter}
          />
        </MotionReveal>

        {/* Categories 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item, idx) => (
            <CardFadeReveal
              key={item.id}
              index={idx}
              className="card-superpower project-card p-0 rounded-lg flex flex-col justify-between group overflow-hidden bg-white hover:border-black/30 transition-all shadow-xs"
            >
              <div>
                {/* Product Image Frame */}
                <div className="project-card__media relative w-full h-60 bg-white border-b border-black/5 p-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="project-card__image max-h-52 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {(isHindi || !["solar-inverters", "home-inverters", "batteries", "lithium"].includes(item.id)) && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="rounded-full bg-primary text-white text-[10px] font-normal tracking-[-0.1px] px-2.5 py-1 shadow-xs">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-normal text-[#18181B] tracking-[-0.2px]">
                    {item.name}
                  </h3>
                  <p className="body-md text-xs sm:text-sm text-[#71717A] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full border border-black/10 bg-zinc-50 text-[#71717A] text-[11px] font-normal tracking-[-0.1px]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("cta_click", {
                      cta_name: "category_hardware_enquiry",
                      source: "product_categories",
                      category: item.name,
                    });
                    openProductEnquiryDialog({
                      product: item.name,
                    });
                  }}
                  className="w-full h-[46px] rounded-full border border-black/15 bg-transparent hover:bg-primary hover:text-white hover:border-primary text-[#18181B] text-xs font-normal tracking-[-0.1px] flex items-center justify-between px-5 transition-all cursor-pointer shadow-2xs hover:shadow-sm active:scale-95"
                >
                  <span>{isHindi ? "हार्डवेयर पूछताछ" : "Enquire Hardware"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
              </div>
            </CardFadeReveal>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const content = (
              <>
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-[#18181B] group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                    {badge.title}
                  </span>
                  <span className="text-xs font-normal text-[#71717A] mt-1 leading-relaxed">
                    {badge.subtitle}
                  </span>
                  {badge.cta && (
                    <span className="text-[11px] font-medium text-primary mt-2 flex items-center gap-1 group-hover:underline">
                      {badge.cta} →
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <CardFadeReveal key={idx} index={idx} className="h-full">
                {badge.href ? (
                  <a
                    href={badge.href}
                    onClick={() => {
                      trackEvent("cta_click", {
                        cta_name: "trust_badge_call",
                        source: "product_categories_trust",
                      });
                    }}
                    className="group p-6 rounded-lg border border-black/10 bg-white flex items-start gap-4 shadow-xs hover:border-primary/40 hover:bg-zinc-50/50 transition-all cursor-pointer h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="p-6 rounded-lg border border-black/10 bg-white flex items-start gap-4 shadow-xs hover:border-black/25 transition-all h-full">
                    {content}
                  </div>
                )}
              </CardFadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
