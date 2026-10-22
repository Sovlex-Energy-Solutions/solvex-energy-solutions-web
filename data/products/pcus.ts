export interface PCUProduct {
  id: string;
  name: string;
  capacity: string;
  loadPower: string;
  voltage: string;
  batteryCount: string;
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

export const pcuProducts: PCUProduct[] = [
  {
    id: "alfa-3kva",
    name: "Solvex Alfa+ Pro 3kVA/48V Industrial PCU",
    capacity: "3 kVA",
    loadPower: "2400W True Continuous Capacity",
    voltage: "48V DC Bus",
    batteryCount: "4 Batteries (4x 12V)",
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
