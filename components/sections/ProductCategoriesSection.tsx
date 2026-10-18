"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Sparkles, Truck, CreditCard, Headphones, ShieldCheck } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";

interface RawCategoryItem {
  id: string;
  category: "all" | "rooftop" | "panels" | "inverters" | "batteries";
  image: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  featuresEn: string[];
  featuresHi: string[];
  badgeEn: string;
  badgeHi: string;
}

const rawCategories: RawCategoryItem[] = [
  {
    id: "rooftop",
    category: "rooftop",
    image: "/images/products/rooftop_solar.png",
    nameEn: "Turnkey Rooftop Solar Systems",
    nameHi: "टर्नकी रूफटॉप सोलर सिस्टम",
    descriptionEn: "Engineered on-grid photovoltaic arrays custom-built for residential, institutional, and commercial rooftops under PM Surya Ghar.",
    descriptionHi: "पीएम सूर्य घर योजना के तहत आवासीय, संस्थागत और वाणिज्यिक छतों हेतु विशेष रूप से निर्मित ऑन-ग्रिड सोलर सिस्टम।",
    featuresEn: ["Direct DBT Subsidy Linked", "Bi-Directional Net Metering", "Turnkey Structural EPC"],
    featuresHi: ["सीधी डीबीटी सब्सिडी से संबद्ध", "द्विदिशी नेट मीटरिंग", "टर्नकी स्ट्रक्चरल ईपीसी"],
    badgeEn: "SUBSIDY VALIDATED",
    badgeHi: "सब्सिडी मान्य",
  },
  {
    id: "panels",
    category: "panels",
    image: "/images/products/solar_panel.png",
    nameEn: "High-Density Bifacial PV Modules",
    nameHi: "हाई-डेंसिटी बाइफेशियल पीवी मॉड्यूल",
    descriptionEn: "N-Type TOPCon and Mono PERC dual-glass panels delivering enhanced low-light absorption and rear-side albedo energy boost.",
    descriptionHi: "N-टाइप TOPCon और मोनो PERC ड्यूल-ग्लास पैनल, जो कम रोशनी में भी अधिक ऊर्जा अवशोषित करते हैं और 30 साल तक विश्वसनीय बिजली देते हैं।",
    featuresEn: ["Up to 22.8% Conversion Efficiency", "30-Year Linear Power Warranty", "ALMM Tier-1 Certified Standard"],
    featuresHi: ["22.8% तक रूपांतरण दक्षता", "30-वर्षीय लीनियर पावर वारंटी", "ALMM टियर-1 प्रमाणित मानक"],
    badgeEn: "TOPCON / MONO PERC",
    badgeHi: "TOPCON / MONO PERC",
  },
  {
    id: "batteries",
    category: "batteries",
    image: "/images/products/inverter_battery.png",
    nameEn: "Heavy-Duty Tall Tubular Solar Batteries",
    nameHi: "हेवी-ड्यूटी टॉल ट्यूबलर सोलर बैटरियां",
    descriptionEn: "Thick-plate antimonial spine lead-acid batteries with enhanced electrolyte reserve, engineered to withstand continuous deep discharges.",
    descriptionHi: "अधिक इलेक्ट्रोलाइट रिज़र्व और मोटी प्लेट वाली लेड-एसिड बैटरियां, जो बार-बार होने वाले डीप डिस्चार्ज को आसानी से संभालती हैं।",
    featuresEn: ["C10 Deep Cycle Endurance", "Micro-Porous Ceramic Vent Plugs", "Ultra-Low Self-Discharge"],
    featuresHi: ["C10 डीप साइकल सहनशीलता", "माइक्रो-पोरस सेरामिक वेंट प्लग", "न्यूनतम सेल्फ-डिस्चार्ज"],
    badgeEn: "EXTREME CYCLIC LIFE",
    badgeHi: "दीर्घकालिक साइकल लाइफ",
  },
  {
    id: "solar-inverters",
    category: "inverters",
    image: "/images/products/solar_inverter.png",
    nameEn: "Intelligent Hybrid & Solar Inverters",
    nameHi: "इंटेलिजेंट हाइब्रिड व सोलर इन्वर्टर",
    descriptionEn: "Transformerless digital power plants with ultra-fast dynamic MPPT algorithms and native cloud telemetry for real-time yield monitoring.",
    descriptionHi: "अल्ट्रा-फास्ट डायनामिक एमपीपीटी एल्गोरिदम और रीयल-टाइम मॉनिटरिंग हेतु क्लाउड टेलीमेट्री से सुसज्जित इन्वर्टर।",
    featuresEn: ["98.6% Euro Peak Efficiency", "Dual Independent MPPT Trackers", "Pure Sine Wave Architecture"],
    featuresHi: ["98.6% यूरो पीक दक्षता", "ड्यूल स्वतंत्र MPPT ट्रैकर्स", "प्योर साइन वेव आर्किटेक्चर"],
    badgeEn: "INTELLIGENT MPPT",
    badgeHi: "इंटेलिजेंट MPPT",
  },
  {
    id: "home-inverters",
    category: "inverters",
    image: "/images/products/home_inverter.png",
    nameEn: "Microcontroller Pure Sine Wave Inverters",
    nameHi: "माइक्रोकंट्रोलर प्योर साइन वेव इन्वर्टर",
    descriptionEn: "Silent domestic uninterruptible power systems engineered to safeguard sensitive electronics and high-surge induction motors.",
    descriptionHi: "संवेदनशील इलेक्ट्रॉनिक्स और भारी मोटरों को बिना रुकावट सुरक्षित बिजली देने वाले शांत घरेलू यूपीएस सिस्टम।",
    featuresEn: ["Microsecond Transfer Time", "Adaptive Multi-Stage Charging", "Intelligent Overload Protection"],
    featuresHi: ["माइक्रोसेकंड स्विचओवर टाइम", "अनुकूली मल्टी-स्टेज चार्जिंग", "इंटेलिजेंट ओवरलोड सुरक्षा"],
    badgeEn: "STUDIO SINE WAVE",
    badgeHi: "प्योर साइन वेव",
  },
  {
    id: "lithium",
    category: "batteries",
    image: "/images/products/lithium_battery.png",
    nameEn: "Modular LiFePO4 Energy Storage Banks",
    nameHi: "मॉड्यूलर LiFePO4 स्टोरेज बैंक",
    descriptionEn: "High-density lithium iron phosphate storage units featuring integrated multi-layer thermal and electrical Battery Management Systems (BMS).",
    descriptionHi: "मल्टी-लेयर थर्मल व इलेक्ट्रिकल बीएमएस (BMS) से सुसज्जित उच्च-ऊर्जा लिथियम आयरन फॉस्फेट बैटरी मॉड्यूल।",
    featuresEn: ["6000+ Deep Charge Cycles", "Active Cell Balancing Architecture", "Compact Wall-Mount Form Factor"],
    featuresHi: ["6000+ डीप चार्ज साइकल", "सक्रिय सेल बैलेंसिंग तकनीक", "कॉम्पैक्ट वॉल-माउंट डिज़ाइन"],
    badgeEn: "SAFE LIFEPO4 TECH",
    badgeHi: "सुरक्षित LiFePO4 तकनीक",
  },
];

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
        ? "तीव्र डायग्नोस्टिक्स और कमीशनिंग सहायता हेतु समर्पित हेल्पलाइन (+91 98790 12345)।"
        : "Direct phone line (+91 98790 12345) and field engineer dispatch for rapid diagnostics.",
      href: "tel:+919879012345",
      cta: isHindi ? "हेल्पलाइन कॉल: +91 98790 12345" : "Call Helpline: +91 98790 12345",
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
    <section className="relative w-full py-20 lg:py-28 bg-[#F4F6F9] border-b border-black/[0.08] overflow-hidden" id="products-categories">
      {/* Background Hardware Showcase Image & Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/optimized/bifacial_hardware_showcase.webp"
          alt="Bifacial solar hardware engineering showcase"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        />
        {/* Multi-stop protective gradient washes with solid seam margins */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#F4F6F9] via-[#F4F6F9]/95 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[#F4F6F9]/40 z-[2]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F4F6F9] via-[#F4F6F9]/95 to-transparent z-[3]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header Row */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 pb-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{isHindi ? "हार्डवेयर आर्किटेक्चर" : "Hardware Architecture"}</span>
            </div>
            <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi ? "इंजीनियर्ड क्लीन पावर एवं स्टोरेज इकोसिस्टम" : "Engineered Clean Power & Storage Ecosystem"}
            </h2>
            <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
              {isHindi
                ? "भारतीय मौसम के अनुकूल निर्मित, कड़े ALMM मानकों से प्रमाणित और अधिकतम किलोवाट-घंटे उत्पादन हेतु तैयार टिकाऊ सोलर हार्डवेयर।"
                : "High-durability solar hardware manufactured for tropical thermal conditions, certified under rigorous ALMM standards, and fine-tuned for optimal kWh generation."}
            </p>
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

        {/* Categories 6-Card Responsive Grid (Staggered entrance per Section 2 & 5) */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item) => (
            <MotionItem
              key={item.id}
              className="card-superpower project-card p-0 rounded-lg flex flex-col justify-between group overflow-hidden bg-white hover:border-black/30 transition-all shadow-xs"
            >
              <div>
                {/* Product Image Frame (Restrained 1.035 zoom per Section 5) */}
                <div className="project-card__media relative w-full h-56 bg-zinc-50 border-b border-black/5 p-6 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={320}
                    height={176}
                    className="project-card__image max-h-44 max-w-full object-contain"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-primary text-white text-[10px] font-normal tracking-[-0.1px] px-2.5 py-1">
                      {item.badge}
                    </span>
                  </div>
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
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Trust Badges Strip (Staggered per Section 2) */}
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
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
              <MotionItem key={idx}>
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
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
