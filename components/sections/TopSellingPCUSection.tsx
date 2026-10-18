"use client";

import { useState } from "react";
import {
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  Cpu,
  Layers,
  X,
  TableProperties,
  Building2,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { useLanguage } from "@/context/LanguageContext";

export interface PCUProduct {
  id: string;
  name: string;
  capacity: string;
  loadPower: string;
  voltage: string;
  batteryCount: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  saveAmount: string;
  image: string;
  badge?: string;
  badgeHi?: string;
  isPopular?: boolean;
  category: "48v" | "high-voltage";
  idealFor: string;
  idealForHi?: string;
  loadCapacityText: string;
  loadCapacityTextHi?: string;
  specs: string[];
  specsHi?: string[];
  techDetails: {
    mpptController: string;
    transformerType: string;
    pvInputCapacity: string;
    displayType: string;
    batteryBank: string;
    enclosure: string;
    warranty: string;
  };
  techDetailsHi?: {
    mpptController: string;
    transformerType: string;
    pvInputCapacity: string;
    displayType: string;
    batteryBank: string;
    enclosure: string;
    warranty: string;
  };
}

const pcuProducts: PCUProduct[] = [
  {
    id: "alfa-3kva",
    name: "Solvex Alfa+ Pro 3kVA/48V Industrial PCU",
    capacity: "3 kVA",
    loadPower: "2400W True Continuous Capacity",
    voltage: "48V DC Bus",
    batteryCount: "4 Batteries (4x 12V)",
    originalPrice: "₹51,397",
    salePrice: "₹42,465",
    discount: "17% OFF",
    saveAmount: "₹8,932",
    image: "/images/pcu/alfa_pro_pcu.png",
    badge: "COMPACT COMMERCIAL",
    badgeHi: "कॉम्पैक्ट कमर्शियल",
    category: "48v",
    idealFor: "Executive Bungalows, Dialysis Suites & Bank Branches",
    idealForHi: "कार्यकारी बंगले, डायलिसिस सुइट्स और बैंक शाखाएं",
    loadCapacityText: "Sustains 1x 1.5-Ton Inverter AC + Cold Storage + Critical Circuitry",
    loadCapacityTextHi: "1x 1.5-टन इन्वर्टर AC + कोल्ड स्टोरेज + आवश्यक सर्किट चलाता है",
    specs: [
      "Industrial DSP-Supervised Fast MPPT Solar Harvesting",
      "Autonomous Solar Priority Routing with Grid Auto-Bypass",
      "Galvanic Copper Core Built for Severe Inductive Motor Surges",
    ],
    specsHi: [
      "औद्योगिक DSP-नियंत्रित फास्ट MPPT सोलर उत्पादन",
      "ग्रिड ऑटो-बाईपास के साथ स्वायत्त सोलर प्राथमिकता रूटिंग",
      "कठिन इंडक्टिव मोटर सर्ज के लिए निर्मित गैल्वेनिक कॉपर कोर",
    ],
    techDetails: {
      mpptController: "50A / 48V Microprocessor MPPT Tracker",
      transformerType: "100% Electrolytic Copper Galvanic Transformer",
      pvInputCapacity: "Accepts up to 3000W Photovoltaic Array",
      displayType: "Graphic Backlit Diagnostic LCD Terminal",
      batteryBank: "48V DC Bank (4x 12V Tall Tubular or Gel Units)",
      enclosure: "Heavy-Gauge Powder-Coated Steel on Lockable Swivel Wheels",
      warranty: "2 Years Direct Field Engineering Warranty",
    },
    techDetailsHi: {
      mpptController: "50A / 48V माइक्रोप्रोसेसर MPPT ट्रैकर",
      transformerType: "100% इलेक्ट्रोलाइटिक कॉपर गैल्वेनिक ट्रांसफॉर्मर",
      pvInputCapacity: "3000W तक फोटोवोल्टिक ऐरे समर्थित",
      displayType: "ग्राफिक बैकलिट डायग्नोस्टिक LCD टर्मिनल",
      batteryBank: "48V DC बैंक (4x 12V टॉल ट्यूबलर या जेल यूनिट)",
      enclosure: "लॉक करने योग्य पहियों पर हेवी-गेज पाउडर-कोटेड स्टील",
      warranty: "2 साल की डायरेक्ट फील्ड इंजीनियरिंग वारंटी",
    },
  },
  {
    id: "alfa-5kva",
    name: "Solvex Alfa+ Pro 5kVA/48V High-Duty PCU",
    capacity: "5 kVA",
    loadPower: "4000W True Continuous Capacity",
    voltage: "48V DC Bus",
    batteryCount: "4 Batteries (4x 12V)",
    originalPrice: "₹74,077",
    salePrice: "₹52,429",
    discount: "29% OFF",
    saveAmount: "₹21,648",
    image: "/images/pcu/alfa_pro_pcu.png",
    badge: "BEST SELLER",
    badgeHi: "बेस्ट सेलर",
    isPopular: true,
    category: "48v",
    idealFor: "Multi-Storey Mansions, Fuel Outlets & Regional Showrooms",
    idealForHi: "बहुमंजिला कोठियां, पेट्रोल पंप और क्षेत्रीय शोरूम",
    loadCapacityText: "Sustains 2x 1.5-Ton Inverter ACs + Submersible Pump + Operations Floor",
    loadCapacityTextHi: "2x 1.5-टन इन्वर्टर AC + सबमर्सिबल पंप + संपूर्ण कमर्शियल फ्लोर चलाता है",
    specs: [
      "Dual DSP Architecture Yielding 30% Greater Solar Energy Extraction",
      "Sub-Microsecond Zero-Break Transfer Protecting Server Infrastructures",
      "300% Peak Overload Endurance for Heavy Industrial Startup Currents",
    ],
    specsHi: [
      "30% अधिक सोलर ऊर्जा निकालने वाला डुअल DSP आर्किटेक्चर",
      "सर्वर इंफ्रास्ट्रक्चर की सुरक्षा करने वाला सब-माइक्रोसेकंड जीरो-ब्रेक ट्रांसफर",
      "भारी औद्योगिक स्टार्टअप करंट के लिए 300% पीक ओवरलोड सहनशीलता",
    ],
    techDetails: {
      mpptController: "80A / 48V High-Bandwidth MPPT Engine",
      transformerType: "Galvanically-Isolated Heavy Toroidal Copper Transformer",
      pvInputCapacity: "Accepts up to 5000W PV Solar String",
      displayType: "Live Kilowatt-Hour Yield & Telemetry Digital Screen",
      batteryBank: "48V DC Bank (4x 12V High-Ah Solar Batteries)",
      enclosure: "IP21 Industrial Mobile Tower Chassis",
      warranty: "2 Years Rapid On-Site Factory Support",
    },
    techDetailsHi: {
      mpptController: "80A / 48V हाई-बैंडविड्थ MPPT इंजन",
      transformerType: "गैल्वेनिक-आइसोलेटेड भारी टोरोइडल कॉपर ट्रांसफॉर्मर",
      pvInputCapacity: "5000W तक PV सोलर स्ट्रिंग समर्थित",
      displayType: "लाइव kWh उत्पादन और टेलीमेट्री डिजिटल स्क्रीन",
      batteryBank: "48V DC बैंक (4x 12V हाई-Ah सोलर बैटरी)",
      enclosure: "IP21 इंडस्ट्रियल मोबाइल टॉवर चेसिस",
      warranty: "2 साल का त्वरित ऑन-साइट फैक्ट्री सपोर्ट",
    },
  },
  {
    id: "alfa-7-5kva",
    name: "Solvex Alfa+ Pro 7.5kVA/96V High-Voltage PCU",
    capacity: "7.5 kVA",
    loadPower: "6000W True Continuous Capacity",
    voltage: "96V High Voltage",
    batteryCount: "8 Batteries (8x 12V)",
    originalPrice: "₹101,304",
    salePrice: "₹82,816",
    discount: "18% OFF",
    saveAmount: "₹18,488",
    image: "/images/pcu/alfa_pro_pcu.png",
    badge: "INSTITUTIONAL CORE",
    badgeHi: "संस्थागत कोर",
    category: "high-voltage",
    idealFor: "Speciality Hospitals, Surgical Centers & Hospitality Complexes",
    idealForHi: "सुपर-स्पेशियलिटी अस्पताल, सर्जिकल केंद्र और होटल कॉम्प्लेक्स",
    loadCapacityText: "Sustains 3x Inverter ACs + Pathology Lab Instruments + Lighting",
    loadCapacityTextHi: "3x इन्वर्टर AC + पैथोलॉजी लैब उपकरण + संपूर्ण लाइटिंग चलाता है",
    specs: [
      "96V High-Voltage DC Bus Slashing Transmission Line Losses",
      "Generator Frequency Synchronizer with Smart Load Peak-Shaving",
      "Automated 4-Stage Temperature-Compensated Battery Algorithm",
    ],
    specsHi: [
      "लाइन नुकसान कम करने वाला 96V हाई-वोल्टेज DC बस",
      "स्मार्ट लोड पीक-शेविंग के साथ जनरेटर फ़्रीक्वेंसी सिंक्रोनाइज़र",
      "स्वचालित 4-चरणीय तापमान-नियंत्रित बैटरी एल्गोरिदम",
    ],
    techDetails: {
      mpptController: "75A / 96V Industrial-Class MPPT Charge Modulator",
      transformerType: "Ultra-Low-Loss Class-H Insulated Copper Isolation Core",
      pvInputCapacity: "Accepts up to 7500W Photovoltaic String",
      displayType: "Industrial Diagnostic Console with Historical Fault Log",
      batteryBank: "96V Serial Bank (8x 12V Industrial Monoblocks)",
      enclosure: "Reinforced Metal Enclosure with Dual Temperature Fans",
      warranty: "2 Years Enterprise On-Site Support Contract",
    },
    techDetailsHi: {
      mpptController: "75A / 96V इंडस्ट्रियल-क्लास MPPT चार्ज मॉड्यूलेटर",
      transformerType: "अल्ट्रा-लो-लॉस क्लास-H इंसुलेटेड कॉपर कोर",
      pvInputCapacity: "7500W तक फोटोवोल्टिक स्ट्रिंग समर्थित",
      displayType: "ऐतिहासिक फॉल्ट लॉग सहित इंडस्ट्रियल कंसोल",
      batteryBank: "96V सीरियल बैंक (8x 12V इंडस्ट्रियल मोनोब्लॉक)",
      enclosure: "डुअल टेम्परेचर पंखों के साथ प्रबलित मेटल कैबिनेट",
      warranty: "2 साल का एंटरप्राइज ऑन-साइट सपोर्ट अनुबंध",
    },
  },
  {
    id: "alfa-10kva",
    name: "Solvex Alfa+ Pro 10kVA/180V Enterprise PCU",
    capacity: "10 kVA",
    loadPower: "8000W True Continuous Capacity",
    voltage: "180V High Voltage",
    batteryCount: "15 Batteries (15x 12V)",
    originalPrice: "₹151,200",
    salePrice: "₹129,906",
    discount: "14% OFF",
    saveAmount: "₹21,294",
    image: "/images/pcu/alfa_pro_pcu.png",
    badge: "ENTERPRISE MONOLITH",
    badgeHi: "एंटरप्राइज कोर",
    category: "high-voltage",
    idealFor: "Manufacturing Plants, Academic Campuses & Central Warehouses",
    idealForHi: "विनिर्माण संयंत्र, शैक्षणिक परिसर और केंद्रीय गोदाम",
    loadCapacityText: "Powers Full Industrial Shop Floor & Heavy 3-Phase Machinery",
    loadCapacityTextHi: "पूरे औद्योगिक शॉप फ्लोर और भारी 3-फेज मशीनरी को पावर देता है",
    specs: [
      "180V Ultra-High DC Bus Maximizing Overall End-to-End Efficiency",
      "Designed to Regulate 10,000W Commercial Solar Generation",
      "Military-Grade Galvanic Isolation Eliminating Common-Mode Transients",
    ],
    specsHi: [
      "अधिकतम दक्षता सुनिश्चित करने वाला 180V अल्ट्रा-हाई DC बस",
      "10,000W (10kW) कमर्शियल सोलर जनरेशन नियंत्रित करने के लिए डिजाइन",
      "ट्रांजिएंट्स खत्म करने वाला मिलिट्री-ग्रेड गैल्वेनिक आइसोलेशन",
    ],
    techDetails: {
      mpptController: "65A / 180V High-Voltage Multi-Stage MPPT Engine",
      transformerType: "Heavy-Gauge Industrial Galvanic Copper Core",
      pvInputCapacity: "Accepts up to 10,000W (10kW) Commercial Solar Modules",
      displayType: "Multi-Zone LCD Command & Monitoring Panel",
      batteryBank: "180V Bank (15x 12V Industrial Battery Array)",
      enclosure: "Heavy-Duty Heavy Castor Chassis with Forced Dual Ventilation",
      warranty: "2 Years Enterprise Direct SLA Guarantee",
    },
    techDetailsHi: {
      mpptController: "65A / 180V हाई-वोल्टेज मल्टी-स्टेज MPPT इंजन",
      transformerType: "हेवी-गेज इंडस्ट्रियल गैल्वेनिक कॉपर कोर",
      pvInputCapacity: "10,000W (10kW) तक कमर्शियल सोलर पैनल समर्थित",
      displayType: "मल्टी-ज़ोन LCD कमांड व मॉनिटरिंग पैनल",
      batteryBank: "180V बैंक (15x 12V इंडस्ट्रियल बैटरी ऐरे)",
      enclosure: "जबरन डुअल वेंटिलेशन युक्त हेवी-ड्यूटी कैस्टर चेसिस",
      warranty: "2 साल की एंटरप्राइज डायरेक्ट SLA गारंटी",
    },
  },
];

export default function TopSellingPCUSection() {
  const { t, isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeModalProduct, setActiveModalProduct] = useState<PCUProduct | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const filteredProducts =
    activeTab === "all"
      ? pcuProducts
      : pcuProducts.filter((p) => p.category === activeTab);

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FFFFFF]" id="solar-pcu">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-2">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <Cpu className="w-3.5 h-3.5 text-white" />
                <span>{t("pcu.badge", "INDUSTRIAL & INSTITUTIONAL CORES")}</span>
              </div>
              <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                {t("pcu.title", "Commercial Power Conditioning Units (PCU)")}
              </h2>
              <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                {t("pcu.description", "Galvanically-isolated, heavy-copper MPPT power conditioning architectures engineered for medical campuses, data nodes, and three-phase commercial estates.")}
              </p>
            </div>

            {/* Action Row: Filters + Compare Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Tabs */}
              <SlidingTabs
                tabs={[
                  { id: "all", label: t("pcu.tabs.all", "All Capacities (4)") },
                  { id: "48v", label: t("pcu.tabs.fortyEight", "48V Commercial Banks") },
                  { id: "high-voltage", label: t("pcu.tabs.highVoltage", "High-Voltage Bus (96V–180V)") },
                ]}
                activeId={activeTab}
                onChange={setActiveTab}
                className="bg-[#FAFAFA]"
              />

              {/* Side-by-Side Compare Toggle */}
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="h-[42px] px-4 rounded-full border border-black/10 bg-white hover:bg-primary hover:text-white hover:border-primary text-[#18181B] font-sans text-xs font-normal flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>
                  {showComparison
                    ? t("pcu.hideCompare", "COLLAPSE MATRIX")
                    : t("pcu.compare", "COMPARE ALL 4 CAPACITIES")}
                </span>
              </button>
            </div>
          </div>
        </MotionReveal>

        {/* 4 PCU Cards Grid - Superpower Rounded 8px Cards with Stagger & Image Zoom */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredProducts.map((pcu) => (
            <MotionItem key={pcu.id} className="h-full">
              <div
                onClick={() => setActiveModalProduct(pcu)}
                className={`card-superpower project-card h-full flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 hover:border-black/30 p-0 shadow-xs ${
                  pcu.isPopular ? "border-primary/40 ring-1 ring-primary/20" : ""
                }`}
              >
                <div className="flex flex-col">
                  {/* Clean Showcase Frame with Clipped Overflow */}
                  <div className="project-card__media relative w-full h-44 bg-[#FAFAFA] border-b border-black/10 flex items-center justify-center p-6 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pcu.image}
                      alt={pcu.name}
                      loading="lazy"
                      decoding="async"
                      width={280}
                      height={128}
                      className="project-card__image max-h-32 max-w-[85%] object-contain"
                    />
                    {pcu.discount && (
                      <span className="absolute top-3 right-3 font-sans text-[11px] text-white bg-primary px-2.5 py-0.5 rounded-full font-normal tracking-[-0.1px]">
                        {pcu.discount}
                      </span>
                    )}
                  </div>

                  {/* Minimal Card Content */}
                  <div className="p-6 flex flex-col gap-2.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                        {pcu.capacity} {isHindi ? "हैवी PCU" : "Heavy PCU"}
                      </span>
                      <h3 className="text-base font-normal text-[#18181B] group-hover:text-black transition-colors line-clamp-1 tracking-[-0.3px]">
                        {pcu.name}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-[#71717A] line-clamp-1">
                      {pcu.voltage} · {isHindi ? `बैंक: ${pcu.batteryCount}` : `Bank: ${pcu.batteryCount}`}
                    </p>

                    {/* Pricing */}
                    <div className="pt-3 border-t border-black/10 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-sans text-2xl font-normal text-[#18181B] tracking-tight">
                          {pcu.salePrice}
                        </span>
                        <span className="font-sans text-xs line-through text-[#71717A]">
                          {pcu.originalPrice}
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-[#18181B] font-normal">
                        {isHindi ? `बचत ${pcu.saveAmount}` : `Save ${pcu.saveAmount}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sleek CTA Button */}
                <div className="p-6 pt-0">
                  <div className="w-full h-[42px] rounded-full border border-black/10 bg-[#FAFAFA] group-hover:bg-primary group-hover:text-white group-hover:border-primary text-[#18181B] font-sans text-xs font-normal flex items-center justify-center gap-1.5 transition-all">
                    <span>{isHindi ? "औद्योगिक विवरण देखें" : "Inspect Industrial Specs"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Side-by-Side Comparison Matrix */}
        {showComparison && (
          <div className="rounded-lg border border-black/10 bg-[#FAFAFA] p-6 flex flex-col gap-4 animate-in fade-in duration-300 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-[#18181B]" />
                <h3 className="font-sans text-sm font-normal text-[#18181B] uppercase tracking-wider">
                  {t("pcu.matrixTitle", "Solvex Alfa+ Pro Industrial PCU Matrix")}
                </h3>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="font-sans text-xs text-[#71717A] hover:text-[#18181B] hover:underline cursor-pointer uppercase"
              >
                {t("pcu.hideCompare", "COLLAPSE MATRIX")}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full font-sans text-xs text-left">
                <thead>
                  <tr className="border-b border-black/10 bg-white">
                    <th className="p-3 font-normal text-[#71717A]">{t("pcu.matrixHeaders.spec", "SPECIFICATION")}</th>
                    <th className="p-3 font-normal text-[#18181B]">ALFA+ 3kVA</th>
                    <th className="p-3 font-normal text-[#18181B] bg-black/5">ALFA+ 5kVA ({isHindi ? "उच्च उत्पादन" : "HIGH YIELD"})</th>
                    <th className="p-3 font-normal text-[#18181B]">ALFA+ 7.5kVA</th>
                    <th className="p-3 font-normal text-[#18181B]">ALFA+ 10kVA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  <tr className="bg-white">
                    <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.output", "Continuous Output")}</td>
                    <td className="p-3 font-normal text-[#18181B]">2400 Watts</td>
                    <td className="p-3 font-normal text-[#18181B] bg-black/5">4000 Watts</td>
                    <td className="p-3 font-normal text-[#18181B]">6000 Watts</td>
                    <td className="p-3 font-normal text-[#18181B]">8000 Watts</td>
                  </tr>
                  <tr className="bg-[#FAFAFA]">
                    <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.battery", "Battery Voltage")}</td>
                    <td className="p-3 text-[#18181B]">48V (4 {isHindi ? "बैटरी" : "Batts"})</td>
                    <td className="p-3 text-[#18181B] bg-black/5">48V (4 {isHindi ? "बैटरी" : "Batts"})</td>
                    <td className="p-3 text-[#18181B]">96V (8 {isHindi ? "बैटरी" : "Batts"})</td>
                    <td className="p-3 text-[#18181B]">180V (15 {isHindi ? "बैटरी" : "Batts"})</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.maxPv", "Max PV Input")}</td>
                    <td className="p-3 text-[#18181B]">3000 Watts</td>
                    <td className="p-3 text-[#18181B] bg-black/5">5000 Watts</td>
                    <td className="p-3 text-[#18181B]">7500 Watts</td>
                    <td className="p-3 text-[#18181B]">10,000 Watts</td>
                  </tr>
                  <tr className="bg-[#FAFAFA]">
                    <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.controller", "MPPT Controller")}</td>
                    <td className="p-3 text-[#18181B]">50A / 48V</td>
                    <td className="p-3 text-[#18181B] bg-black/5">80A / 48V</td>
                    <td className="p-3 text-[#18181B]">75A / 96V</td>
                    <td className="p-3 text-[#18181B]">65A / 180V</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.tariff", "Direct Tariff")}</td>
                    <td className="p-3 font-normal text-[#18181B]">₹42,465</td>
                    <td className="p-3 font-normal text-[#18181B] bg-black/5">₹52,429</td>
                    <td className="p-3 font-normal text-[#18181B]">₹82,816</td>
                    <td className="p-3 font-normal text-[#18181B]">₹1,29,906</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Institutional Application Trust Badges */}
        <MotionStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-lg border border-black/10 bg-[#FAFAFA] shadow-xs">
          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.medical", "HEALTHCARE & CRITICAL LABS")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.medicalDesc", "Zero-break transfer protecting diagnostic machinery, cold storage, and surgical lighting")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.dsp", "DUAL-PROCESSOR BRAIN")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.dspDesc", "Samples PV irradiance, battery health, and utility fluctuations at microsecond fidelity")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.galvanic", "COPPER GALVANIC BARRIER")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.galvanicDesc", "Heavy pure copper transformer safeguards sensitive electronics from surges and lightning spikes")}
              </p>
            </div>
          </MotionItem>

          <MotionItem className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full border border-black/10 bg-black/5 flex items-center justify-center shrink-0 text-[#18181B]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-xs font-normal text-[#18181B] tracking-[-0.1px]">
                {t("pcu.badges.inrush", "300% INRUSH OVERHEAD")}
              </p>
              <p className="body-sm text-xs text-[#71717A] mt-0.5">
                {t("pcu.badges.inrushDesc", "Effortlessly fires up inductive chiller compressors, vacuum pumps, and heavy motors")}
              </p>
            </div>
          </MotionItem>
        </MotionStagger>
      </div>

      {/* Quick Specs Interactive Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] rounded-lg bg-white border border-black/10 shadow-2xl overflow-y-auto flex flex-col text-[#18181B]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-black/10 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-normal text-white bg-primary px-3 py-1 rounded-full">
                  {activeModalProduct.capacity} {isHindi ? "हैवी PCU" : "HEAVY PCU"}
                </span>
                <span className="font-sans text-xs text-[#71717A]">{activeModalProduct.voltage}</span>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6">
              {/* Top Summary Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-40 h-40 shrink-0 rounded-lg border border-black/10 bg-[#FAFAFA] p-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    loading="lazy"
                    decoding="async"
                    width={160}
                    height={160}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-normal text-[#18181B] leading-snug tracking-[-0.4px]">
                    {activeModalProduct.name}
                  </h3>
                  <p className="body-sm text-xs text-[#71717A]">
                    {isHindi ? "अनुशंसित अनुप्रयोग: " : "Recommended for: "}
                    {isHindi && activeModalProduct.idealForHi ? activeModalProduct.idealForHi : activeModalProduct.idealFor}
                  </p>
                  <div className="flex items-baseline gap-2 pt-1 font-sans">
                    <span className="text-2xl font-normal text-[#18181B] tracking-[-0.5px]">
                      {activeModalProduct.salePrice}
                    </span>
                    <span className="text-xs line-through text-[#71717A]">
                      {activeModalProduct.originalPrice}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-black/10 bg-black/5 text-[#18181B] text-xs font-normal">
                      {activeModalProduct.discount}
                    </span>
                  </div>
                  <span className="font-sans text-[11px] text-[#71717A]">
                    {isHindi
                      ? `${activeModalProduct.saveAmount} की तत्काल बचत (सभी कर सहित)`
                      : `Instant Savings of ${activeModalProduct.saveAmount} (Inclusive of all taxes)`}
                  </span>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
                  {isHindi ? "हैवी इंजीनियरिंग विनिर्देश" : "Heavy Engineering Specifications"}
                </h4>
                <div className="rounded-lg overflow-hidden border border-black/10 font-sans text-xs">
                  {[
                    {
                      label: isHindi ? "रेटेड क्षमता" : "Rated Capacity",
                      val: `${activeModalProduct.capacity} (${activeModalProduct.loadPower})`,
                    },
                    {
                      label: isHindi ? "सोलर चार्जर" : "Solar Charger",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.mpptController
                        : activeModalProduct.techDetails.mpptController,
                    },
                    {
                      label: isHindi ? "ट्रांसफॉर्मर कोर" : "Transformer Core",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.transformerType
                        : activeModalProduct.techDetails.transformerType,
                    },
                    {
                      label: isHindi ? "अधिकतम सोलर PV इनपुट" : "Max Solar PV Input",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.pvInputCapacity
                        : activeModalProduct.techDetails.pvInputCapacity,
                    },
                    {
                      label: isHindi ? "बैटरी बैंक सेटअप" : "Battery Bank Setup",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.batteryBank
                        : activeModalProduct.techDetails.batteryBank,
                    },
                    {
                      label: isHindi ? "चेसिस व कैबिनेट" : "Chassis & Enclosure",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.enclosure
                        : activeModalProduct.techDetails.enclosure,
                    },
                    {
                      label: isHindi ? "डिस्प्ले डैशबोर्ड" : "Display Dashboard",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.displayType
                        : activeModalProduct.techDetails.displayType,
                    },
                    {
                      label: isHindi ? "वारंटी और सपोर्ट" : "Warranty & Support",
                      val: isHindi && activeModalProduct.techDetailsHi
                        ? activeModalProduct.techDetailsHi.warranty
                        : activeModalProduct.techDetails.warranty,
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-2 p-3 ${
                        idx % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      } border-b border-black/10 last:border-b-0`}
                    >
                      <span className="text-[#71717A]">{row.label}</span>
                      <span className="text-[#18181B] font-normal">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-2">
                <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
                  {isHindi ? "इंजीनियरिंग मुख्य विशेषताएं" : "Engineering Highlights"}
                </h4>
                <ul className="flex flex-col gap-2 body-sm text-xs text-[#18181B]">
                  {(isHindi && activeModalProduct.specsHi ? activeModalProduct.specsHi : activeModalProduct.specs).map(
                    (spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{spec}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="sticky bottom-0 p-6 bg-white border-t border-black/10 rounded-b-lg flex items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[11px] text-[#71717A]">
                  {isHindi ? "कमर्शियल फैक्ट्री टैरिफ:" : "COMMERCIAL FACTORY TARIFF:"}
                </span>
                <p className="font-sans text-lg font-normal text-[#18181B]">{activeModalProduct.salePrice}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="btn-secondary h-[46px] px-5 text-xs rounded-full"
                >
                  {isHindi ? "बंद करें" : "DISMISS"}
                </button>
                <a
                  href="#partner-form"
                  onClick={() => setActiveModalProduct(null)}
                  className="btn-primary h-[46px] px-6 text-xs rounded-full flex items-center gap-2"
                >
                  <span>{isHindi ? "कमर्शियल आवंटन का अनुरोध करें" : "REQUEST COMMERCIAL ALLOCATION"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
