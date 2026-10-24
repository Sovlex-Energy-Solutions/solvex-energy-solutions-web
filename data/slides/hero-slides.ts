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
    tabLabelEn: "Solar Future",
    tabLabelHi: "सौर भविष्य",
    categoryEn: "CLEAN ENERGY VISION",
    categoryHi: "स्वच्छ ऊर्जा संकल्प",
    titleEn: "Advancing India's Solar Future",
    titleHi: "भारत के सौर भविष्य को नई दिशा",
    subtitleEn: "Engineering, advanced manufacturing, and high-efficiency solar solutions for a cleaner, greener nation.",
    subtitleHi: "स्वच्छ और हरित भारत के लिए उन्नत इंजीनियरिंग, विनिर्माण और उच्च दक्षता वाले सौर समाधान।",
    src: "/slider/file_0000000062848210a19efbcfcc5a7cfb.webp",
    alt: "Advancing India's Solar Future - Solvex Energy",
    Icon: Zap,
  },
  {
    id: 2,
    tabLabelEn: "Manufacturing",
    tabLabelHi: "विनिर्माण क्षमता",
    categoryEn: "CAPACITY EXPANSION",
    categoryHi: "क्षमता विस्तार",
    titleEn: "Industrial-Scale Manufacturing Capabilities",
    titleHi: "औद्योगिक-स्तरीय विनिर्माण क्षमताएं",
    subtitleEn: "High-density solar panels, lithium-ion storage, tubular batteries, and smart digital inverters.",
    subtitleHi: "उच्च दक्षता सोलर पैनल, लिथियम-आयन बैटरी, ट्यूबलर बैटरी और डिजिटल सोलर इनवर्टर।",
    src: "/slider/solvex_energy_manufacturing_capabilities_slider_4k.webp",
    alt: "Solvex Energy Manufacturing Capabilities",
    Icon: Factory,
  },
  {
    id: 3,
    tabLabelEn: "Trust & Quality",
    tabLabelHi: "विश्वसनीय गुणवत्ता",
    categoryEn: "ENGINEERED FOR TRUST",
    categoryHi: "विश्वास और अखंडता",
    titleEn: "Powering Confidence: A Name You Can Trust",
    titleHi: "आत्मविश्वास को शक्ति: एक विश्वसनीय नाम",
    subtitleEn: "Commitment to uncompromising quality, built for long-term performance and brighter tomorrows.",
    subtitleHi: "उच्च गुणवत्ता और दीर्घकालिक प्रदर्शन का अटूट संकल्प, जो कल को उज्ज्वल बनाए।",
    src: "/slider/solvex_energy_trust_slider_2560x1016-1.webp",
    alt: "Powering Confidence - A Name You Can Trust - Solvex Energy",
    Icon: ShieldCheck,
  },
  {
    id: 4,
    tabLabelEn: "Complete Solutions",
    tabLabelHi: "सम्पूर्ण समाधान",
    categoryEn: "SYSTEM HARMONY",
    categoryHi: "सिस्टम समन्वय",
    titleEn: "One-Stop Solar Solutions Across India",
    titleHi: "भारत भर में वन-स्टॉप सौर समाधान",
    subtitleEn: "Turnkey on-grid, off-grid, and hybrid solar systems engineered for homes and businesses.",
    subtitleHi: "घरों और व्यवसायों के लिए टर्नकी ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड सौर प्रणालियां।",
    src: "/slider/solvex_energy_one_stop_solar_solutions_2560x1016.webp",
    alt: "One-Stop Solar Solutions - Solvex Energy",
    Icon: Layers,
  },
  {
    id: 5,
    tabLabelEn: "Home Solar",
    tabLabelHi: "घरेलू सोलर",
    categoryEn: "RESIDENTIAL SOLAR",
    categoryHi: "आवासीय सौर ऊर्जा",
    titleEn: "Solarise Your Home Like a Pro",
    titleHi: "अपने घर को बनाएं सौर ऊर्जा से समृद्ध",
    subtitleEn: "Integrated home solar packages designed for lower electricity bills, reliability, and clean power.",
    subtitleHi: "कम बिजली बिल, विश्वसनीयता और स्वच्छ ऊर्जा के लिए संपूर्ण घरेलू सौर समाधान।",
    src: "/slider/solvex_energy_complete_product_portfolio_slider_2560x1016.webp",
    alt: "Solarise Your Home Like a Pro - Complete Product Portfolio",
    Icon: Trophy,
  },
  {
    id: 6,
    tabLabelEn: "Solar Advisory",
    tabLabelHi: "सोलर मार्गदर्शन",
    categoryEn: "PM SURYA GHAR & SUBSIDY",
    categoryHi: "पीएम सूर्य घर एवं सब्सिडी",
    titleEn: "Confused About Solar? We Make It Simple",
    titleHi: "सोलर को लेकर उलझन? हम बनाते हैं इसे आसान",
    subtitleEn: "Overcome high bills, power cuts, and subsidy doubts with expert guidance and seamless execution.",
    subtitleHi: "विशेषज्ञ मार्गदर्शन और पारदर्शी सब्सिडी प्रक्रिया से बिजली बिल और पावर कट से राहत पाएं।",
    src: "/slider/solvex_energy_solar_confusion_slider_2560x1016.webp",
    alt: "Confused About Solar? Let Solvex Energy Make It Simple",
    Icon: Wrench,
  },
  {
    id: 7,
    tabLabelEn: "Applied R&D",
    tabLabelHi: "अनुप्रयुक्त आरएंडडी",
    categoryEn: "CLEANTECH INNOVATION",
    categoryHi: "क्लीनटेक नवाचार",
    titleEn: "Innovative R&D: Engineering Reliable Solutions",
    titleHi: "नवाचारी आरएंडडी: अधिक विश्वसनीय समाधानों का निर्माण",
    subtitleEn: "Rigorous product testing, reliability engineering, continuous refinement, and field validation.",
    subtitleHi: "कठोर उत्पाद परीक्षण, विश्वसनीयता इंजीनियरिंग, निरंतर सुधार और फील्ड प्रदर्शन।",
    src: "/slider/file_0000000061b88210ba864a51e48cb771.webp",
    alt: "Innovative R&D - Engineering More Reliable Solar Solutions",
    Icon: FlaskConical,
  },
];
