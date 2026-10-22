export interface RawComboItem {
  id: string;
  category: "all" | "residential" | "commercial" | "offgrid";
  nameEn: string;
  nameHi: string;
  systemTypeEn: string;
  systemTypeHi: string;
  dailyGenerationEn: string;
  dailyGenerationHi: string;
  image: string;
  recommendedForEn: string;
  recommendedForHi: string;
  badgeEn?: string;
  badgeHi?: string;
  isPopular?: boolean;
  subsidyTextEn: string;
  subsidyTextHi: string;
}

export const rawCombos: RawComboItem[] = [
  {
    id: "combo-3kw",
    category: "residential",
    nameEn: "Solvex Prime 3.2kW Monocrystalline Grid-Tied Suite",
    nameHi: "Solvex Prime 3.2kW मोनोक्रिस्टलाइन ग्रिड-टाइड सुइट",
    systemTypeEn: "Single-Phase Synchronous Array",
    systemTypeHi: "सिंगल-फेज सिंक्रोनस एरे",
    dailyGenerationEn: "12-14 Units / Day",
    dailyGenerationHi: "12-14 यूनिट / प्रतिदिन",
    image: "/products/Solvex_Prime_3.2kW_Monocrystalline_Grid_Tied_Suite.jpg",
    recommendedForEn: "Urban 2-3 BHK Residences & Independent Floors",
    recommendedForHi: "शहरी 2-3 बीएचके मकान एवं स्वतंत्र आवास",
    badgeEn: "RESIDENTIAL BENCHMARK",
    badgeHi: "आवासीय बेंचमार्क",
    isPopular: true,
    subsidyTextEn: "PM Surya Ghar DBT Subsidy Eligible (Up to ₹78,000)",
    subsidyTextHi: "पीएम सूर्य घर योजना के तहत ₹78,000 तक डीबीटी सब्सिडी हेतु मान्य",
  },
  {
    id: "combo-5kw",
    category: "residential",
    nameEn: "Solvex Apex 5kW Three-Phase High-Capacity Array",
    nameHi: "Solvex Apex 5kW थ्री-फेज उच्च-क्षमता एरे",
    systemTypeEn: "Three-Phase Synchronous Grid-Tie",
    systemTypeHi: "थ्री-फेज सिंक्रोनस ग्रिड-टाई",
    dailyGenerationEn: "20-22 Units / Day",
    dailyGenerationHi: "20-22 यूनिट / प्रतिदिन",
    image: "/products/Solvex_Apex_5kW_Three_Phase_High_Capacity_Array.jpg",
    recommendedForEn: "Bungalows, Duplexes & Multi-Story Villas",
    recommendedForHi: "बड़े बंगले, डुप्लेक्स एवं बहुमंजिला विला",
    badgeEn: "SUPERIOR HARVEST",
    badgeHi: "उत्कृष्ट उत्पादन",
    subsidyTextEn: "PM Surya Ghar DBT Subsidy Eligible (Up to ₹78,000)",
    subsidyTextHi: "पीएम सूर्य घर योजना के तहत ₹78,000 तक डीबीटी सब्सिडी हेतु मान्य",
  },
  {
    id: "combo-500w",
    category: "offgrid",
    nameEn: "Solvex Nomad 500W Autonomous Micro-Generation Kit",
    nameHi: "Solvex Nomad 500W ऑटोनॉमस माइक्रो-जेनरेशन किट",
    systemTypeEn: "Islanded Off-Grid DC/AC Core",
    systemTypeHi: "आइसलैंडेड ऑफ-ग्रिड DC/AC कोर",
    dailyGenerationEn: "2-2.5 Units / Day",
    dailyGenerationHi: "2-2.5 यूनिट / प्रतिदिन",
    image: "/products/Solvex_Nomad_500W_Autonomous_Micro_Generation_Kit.jpg",
    recommendedForEn: "Farmhouses, Outposts & Remote Agri-Stations",
    recommendedForHi: "फार्महाउस, रिमोट आउटपोस्ट एवं कृषि स्टेशन",
    badgeEn: "TRUE GRID INDEPENDENCE",
    badgeHi: "पूर्ण ग्रिड स्वतंत्रता",
    subsidyTextEn: "100% Autonomous Storage — Zero Grid Dependency",
    subsidyTextHi: "100% स्वतंत्र स्टोरेज — ग्रिड पर शून्य निर्भरता",
  },
  {
    id: "combo-10kw",
    category: "commercial",
    nameEn: "Solvex Enterprise 10kW Three-Phase Commercial Suite",
    nameHi: "Solvex Enterprise 10kW थ्री-फेज कमर्शियल सुइट",
    systemTypeEn: "High-Yield C&I Synchronous Array",
    systemTypeHi: "उच्च-उत्पादन सीएंडआई सिंक्रोनस एरे",
    dailyGenerationEn: "40-45 Units / Day",
    dailyGenerationHi: "40-45 यूनिट / प्रतिदिन",
    image: "/products/Solvex_Enterprise_10kW_Three_Phase_Commercial_Suite.jpg",
    recommendedForEn: "Corporate Showrooms, Clinics & Light Factories",
    recommendedForHi: "कॉर्पोरेट शोरूम, क्लिनिक एवं लघु कारखाने",
    badgeEn: "COMMERCIAL ASSET",
    badgeHi: "कमर्शियल संपत्ति",
    subsidyTextEn: "Qualifies for Section 32 40% Tax Depreciation",
    subsidyTextHi: "धारा 32 के तहत 40% कर मूल्यह्रास (Depreciation) हेतु मान्य",
  },
];
