import {
  Factory,
  Trophy,
  ShieldCheck,
  Zap,
  Layers,
  Wrench,
  Cpu,
  FlaskConical,
} from "lucide-react";

export interface RawSlideItem {
  id: number;
  tabLabelEn: string;
  tabLabelHi: string;
  categoryEn: string;
  categoryHi: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  src: string;
  alt: string;
  Icon: React.ElementType;
}

export const rawHeroSlides: RawSlideItem[] = [
  {
    id: 1,
    tabLabelEn: "GW Capacity",
    tabLabelHi: "GW क्षमता",
    categoryEn: "CAPACITY EXPANSION",
    categoryHi: "क्षमता विस्तार",
    titleEn: "Industrial-Grade Photovoltaic Production Lines",
    titleHi: "औद्योगिक-ग्रेड फोटोवोल्टाइक उत्पादन लाइनें",
    subtitleEn: "Scaling domestic clean energy capacity to supply high-efficiency ALMM modules across western India.",
    subtitleHi: "उच्च दक्षता वाले ALMM मॉड्यूल की आपूर्ति हेतु स्वच्छ ऊर्जा विनिर्माण क्षमता का विस्तार।",
    src: "/images/slider/slide1_1gw_inauguration.jpeg",
    alt: "Industrial Solar Cell & Module Manufacturing Plant",
    Icon: Factory,
  },
  {
    id: 2,
    tabLabelEn: "Thermal Endurance",
    tabLabelHi: "थर्मल सहनशीलता",
    categoryEn: "CLIMATE RESILIENCE",
    categoryHi: "जलवायु लचीलापन",
    titleEn: "Tested for Extreme Heat & Continuous High-Yield Output",
    titleHi: "अत्यधिक गर्मी में निरंतर उच्च-उत्पादन हेतु परीक्षित",
    subtitleEn: "Proprietary anti-PID coatings and low thermal coefficients sustaining maximum output through 48°C+ peaks.",
    subtitleHi: "एंटी-PID कोटिंग्स और कम तापीय गुणांक 48°C+ में भी अधिकतम बिजली उत्पादन बनाए रखते हैं।",
    src: "/images/slider/slide2_player_banner.jpg",
    alt: "High-Efficiency Solar Performance Campaign",
    Icon: Trophy,
  },
  {
    id: 3,
    tabLabelEn: "Rooftop Standard",
    tabLabelHi: "रूफटॉप मानक",
    categoryEn: "ENGINEERING RIGOR",
    categoryHi: "इंजीनियरिंग उत्कृष्टता",
    titleEn: "Turnkey Grid-Synchronized Rooftop Solar Architecture",
    titleHi: "टर्नकी ग्रिड-सिंक्रोनाइज़्ड रूफटॉप सोलर आर्किटेक्चर",
    subtitleEn: "Delivering engineered on-grid and hybrid installations with verified DISCOM net-metering synchronization.",
    subtitleHi: "प्रमाणित डिस्कॉम नेट-मीटरिंग के साथ ऑन-ग्रिड और हाइब्रिड रूफटॉप इंस्टॉलेशन।",
    src: "/images/slider/slide3_trusted_brand.jpg",
    alt: "Trusted Rooftop Solar Architecture",
    Icon: ShieldCheck,
  },
  {
    id: 4,
    tabLabelEn: "PM Surya Ghar",
    tabLabelHi: "पीएम सूर्य घर",
    categoryEn: "DIRECT SUBSIDY PIPELINE",
    categoryHi: "प्रत्यक्ष सब्सिडी पाइपलाइन",
    titleEn: "Direct Central Subsidy Clearance Without Administrative Delay",
    titleHi: "बिना किसी प्रशासनिक देरी के सीधी केंद्रीय सब्सिडी",
    subtitleEn: "Streamlined documentation and DISCOM liaison securing up to ₹78,000 direct bank transfers for consumer rooftops.",
    subtitleHi: "पारदर्शी प्रलेखन और डिस्कॉम समन्वय से ₹78,000 तक का सीधा बैंक ट्रांसफर।",
    src: "/images/slider/slide4_anil_kapoor_subsidy.jpg",
    alt: "PM Surya Ghar Subsidy Fast-Track Execution",
    Icon: Zap,
  },
  {
    id: 5,
    tabLabelEn: "Unified Hardware",
    tabLabelHi: "एकीकृत हार्डवेयर",
    categoryEn: "SYSTEM HARMONY",
    categoryHi: "सिस्टम समन्वय",
    titleEn: "A Fully Harmonized Solar Ecosystem Under One Roof",
    titleHi: "एक ही छत के नीचे पूर्ण सौर ऊर्जा समाधान",
    subtitleEn: "From high-density TOPCon PV panels to hybrid digital MPPT inverters and heavy-duty tubular battery banks.",
    subtitleHi: "हाई-डेंसिटी TOPCon सोलर पैनल से लेकर स्मार्ट हाइब्रिड इन्वर्टर और बैटरियों तक।",
    src: "/images/slider/slide5_solar_solutions.jpg",
    alt: "Complete Clean Energy Equipment Portfolio",
    Icon: Layers,
  },
  {
    id: 6,
    tabLabelEn: "Solar Care 360",
    tabLabelHi: "सोलर केयर 360",
    categoryEn: "ON-GROUND DISPATCH",
    categoryHi: "ऑन-ग्राउंड फील्ड सहायता",
    titleEn: "Dedicated Regional Engineers & Rapid Field Support",
    titleHi: "समर्पित क्षेत्रीय इंजीनियर्स एवं त्वरित फील्ड सहायता",
    subtitleEn: "Field-deployed service units guaranteeing rapid on-site troubleshooting and continuous yield monitoring.",
    subtitleHi: "त्वरित ऑन-साइट समस्या समाधान और निरंतर उत्पादन निगरानी सुनिश्चित करने वाला नेटवर्क।",
    src: "/images/slider/slide6_solar_care.jpg",
    alt: "Solar Care 360 Regional Technical Network",
    Icon: Wrench,
  },
  {
    id: 7,
    tabLabelEn: "Robotic Assembly",
    tabLabelHi: "रोबोटिक असेंबली",
    categoryEn: "INDUSTRY 4.0 PRECISION",
    categoryHi: "इंडस्ट्री 4.0 परिशुद्धता",
    titleEn: "Automated Stringing, Soldering & Multi-Stage EL Diagnostics",
    titleHi: "स्वचालित स्ट्रिंगिंग, सोल्डरिंग व मल्टी-स्टेज ईएल परीक्षण",
    subtitleEn: "Zero micro-crack tolerance achieved through robotic assembly and rigorous multi-stage electroluminescence scanning.",
    subtitleHi: "रोबोटिक असेंबली और बहु-स्तरीय स्कैनिंग द्वारा शून्य माइक्रो-क्रैक सहनशीलता।",
    src: "/images/slider/slide7_manufacturing.jpg",
    alt: "Precision Solar Module Manufacturing Facility",
    Icon: Cpu,
  },
  {
    id: 8,
    tabLabelEn: "Applied R&D",
    tabLabelHi: "अनुप्रयुक्त आरएंडडी",
    categoryEn: "CLEANTECH INNOVATION",
    categoryHi: "क्लीनटेक नवाचार",
    titleEn: "Pioneering Next-Generation Photovoltaic & Inverter Tech",
    titleHi: "आधुनिक फोटोवोल्टाइक व इन्वर्टर तकनीक का विकास",
    subtitleEn: "Dedicated solar technologists advancing cell conversion rates, thermal dissipation, and MPPT response times.",
    subtitleHi: "सेल रूपांतरण दर, हीट डिसिपेशन और एमपीपीटी रिस्पॉन्स में निरंतर तकनीकी प्रगति।",
    src: "/images/slider/slide8_rd.jpg",
    alt: "Solar Technology Research and Development Lab",
    Icon: FlaskConical,
  },
];
