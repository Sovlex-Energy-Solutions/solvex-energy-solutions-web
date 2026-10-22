export interface RawCategoryItem {
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

export const rawCategories: RawCategoryItem[] = [
  {
    id: "rooftop",
    category: "rooftop",
    image: "/products/turnkey_rooftop_solar_system.webp",
    nameEn: "Turnkey Rooftop Solar Systems",
    nameHi: "टर्नकी रूफटॉप सोलर सिस्टम",
    descriptionEn:
      "Engineered on-grid photovoltaic arrays custom-built for residential, institutional, and commercial rooftops under PM Surya Ghar.",
    descriptionHi:
      "पीएम सूर्य घर योजना के तहत आवासीय, संस्थागत और वाणिज्यिक छतों हेतु विशेष रूप से निर्मित ऑन-ग्रिड सोलर सिस्टम।",
    featuresEn: ["Direct DBT Subsidy Linked", "Bi-Directional Net Metering", "Turnkey Structural EPC"],
    featuresHi: ["सीधी डीबीटी सब्सिडी से संबद्ध", "द्विदिशी नेट मीटरिंग", "टर्नकी स्ट्रक्चरल ईपीसी"],
    badgeEn: "SUBSIDY VALIDATED",
    badgeHi: "सब्सिडी मान्य",
  },
  {
    id: "panels",
    category: "panels",
    image: "/products/bifacial_solar_pv_modules.webp",
    nameEn: "High-Density Bifacial PV Modules",
    nameHi: "हाई-डेंसिटी बाइफेशियल पीवी मॉड्यूल",
    descriptionEn:
      "N-Type TOPCon and Mono PERC dual-glass panels delivering enhanced low-light absorption and rear-side albedo energy boost.",
    descriptionHi:
      "N-टाइप TOPCon और मोनो PERC ड्यूल-ग्लास पैनल, जो कम रोशनी में भी अधिक ऊर्जा अवशोषित करते हैं और 30 साल तक विश्वसनीय बिजली देते हैं।",
    featuresEn: ["Up to 22.8% Conversion Efficiency", "30-Year Linear Power Warranty", "ALMM Tier-1 Certified Standard"],
    featuresHi: ["22.8% तक रूपांतरण दक्षता", "30-वर्षीय लीनियर पावर वारंटी", "ALMM टियर-1 प्रमाणित मानक"],
    badgeEn: "TOPCON / MONO PERC",
    badgeHi: "TOPCON / MONO PERC",
  },
  {
    id: "solar-inverters",
    category: "inverters",
    image: "/products/intelligent_mppt_solar_inverters.webp",
    nameEn: "Intelligent Hybrid & Solar Inverters",
    nameHi: "इंटेलिजेंट हाइब्रिड व सोलर इन्वर्टर",
    descriptionEn:
      "Transformerless digital power plants with ultra-fast dynamic MPPT algorithms and native cloud telemetry for real-time yield monitoring.",
    descriptionHi:
      "अल्ट्रा-फास्ट डायनामिक एमपीपीटी एल्गोरिदम और रीयल-टाइम मॉनिटरिंग हेतु क्लाउड टेलीमेट्री से सुसज्जित इन्वर्टर।",
    featuresEn: ["98.6% Euro Peak Efficiency", "Dual Independent MPPT Trackers", "Pure Sine Wave Architecture"],
    featuresHi: ["98.6% यूरो पीक दक्षता", "ड्यूल स्वतंत्र MPPT ट्रैकर्स", "प्योर साइन वेव आर्किटेक्चर"],
    badgeEn: "INTELLIGENT MPPT",
    badgeHi: "इंटेलिजेंट MPPT",
  },
  {
    id: "home-inverters",
    category: "inverters",
    image: "/products/pure_sine_wave_inverters.webp",
    nameEn: "Microcontroller Pure Sine Wave Inverters",
    nameHi: "माइक्रोकंट्रोलर प्योर साइन वेव इन्वर्टर",
    descriptionEn:
      "Silent domestic uninterruptible power systems engineered to safeguard sensitive electronics and high-surge induction motors.",
    descriptionHi:
      "संवेदनशील इलेक्ट्रॉनिक्स और भारी मोटरों को बिना रुकावट सुरक्षित बिजली देने वाले शांत घरेलू यूपीएस सिस्टम।",
    featuresEn: ["Microsecond Transfer Time", "Adaptive Multi-Stage Charging", "Intelligent Overload Protection"],
    featuresHi: ["माइक्रोसेकंड स्विचओवर टाइम", "अनुकूली मल्टी-स्टेज चार्जिंग", "इंटेलिजेंट ओवरलोड सुरक्षा"],
    badgeEn: "STUDIO SINE WAVE",
    badgeHi: "प्योर साइन वेव",
  },
  {
    id: "batteries",
    category: "batteries",
    image: "/products/tall_tubular_solar_batteries.webp",
    nameEn: "Heavy-Duty Tall Tubular Solar Batteries",
    nameHi: "हेवी-ड्यूटी टॉल ट्यूबलर सोलर बैटरियां",
    descriptionEn:
      "Thick-plate antimonial spine lead-acid batteries with enhanced electrolyte reserve, engineered to withstand continuous deep discharges.",
    descriptionHi:
      "अधिक इलेक्ट्रोलाइट रिज़र्व और मोटी प्लेट वाली लेड-एसिड बैटरियां, जो बार-बार होने वाले डीप डिस्चार्ज को आसानी से संभालती हैं।",
    featuresEn: ["C10 Deep Cycle Endurance", "Micro-Porous Ceramic Vent Plugs", "Ultra-Low Self-Discharge"],
    featuresHi: ["C10 डीप साइकल सहनशीलता", "माइक्रो-पोरस सेरामिक वेंट प्लग", "न्यूनतम सेल्फ-डिस्चार्ज"],
    badgeEn: "EXTREME CYCLIC LIFE",
    badgeHi: "दीर्घकालिक साइकल लाइफ",
  },
  {
    id: "lithium",
    category: "batteries",
    image: "/products/lifepo4_lithium_energy_storage.webp",
    nameEn: "Modular LiFePO4 Energy Storage Banks",
    nameHi: "मॉड्यूलर LiFePO4 स्टोरेज बैंक",
    descriptionEn:
      "High-density lithium iron phosphate storage units featuring integrated multi-layer thermal and electrical Battery Management Systems (BMS).",
    descriptionHi:
      "मल्टी-लेयर थर्मल व इलेक्ट्रिकल बीएमएस (BMS) से सुसज्जित उच्च-ऊर्जा लिथियम आयरन फॉस्फेट बैटरी मॉड्यूल।",
    featuresEn: ["6000+ Deep Charge Cycles", "Active Cell Balancing Architecture", "Compact Wall-Mount Form Factor"],
    featuresHi: ["6000+ डीप चार्ज साइकल", "सक्रिय सेल बैलेंसिंग तकनीक", "कॉम्पैक्ट वॉल-माउंट डिज़ाइन"],
    badgeEn: "SAFE LIFEPO4 TECH",
    badgeHi: "सुरक्षित LiFePO4 तकनीक",
  },
];
