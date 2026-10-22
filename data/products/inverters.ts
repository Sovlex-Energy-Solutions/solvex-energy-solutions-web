export interface InverterProduct {
  id: string;
  name: string;
  category: "rmppt" | "lithium" | "heavy-duty";
  categoryLabel: string;
  capacity: string;
  voltage: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  idealFor: string;
  specs: string[];
  techDetails: {
    controller: string;
    waveform: string;
    display: string;
    maxPvInput: string;
    batterySupport: string;
    warranty: string;
  };
}

export const inverters: InverterProduct[] = [
  {
    id: "gamma-1kva",
    name: "Solvex Gamma+ 1kVA Pure Sine Wave Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "800W Load",
    voltage: "12V Single Battery",
    image: "/images/inverters/gamma_1kva.png",
    badge: "RESIDENTIAL FLAGSHIP",
    isPopular: true,
    idealFor: "Modern Apartments, POS Terminal Hubs & Home Workstations",
    specs: [
      "40A Dynamic rMPPT Extraction Delivering 30% Greater Solar Capture",
      "Backlit Multi-Parameter Screen with Live Watt-Hour Telemetry",
      "Universal Chemistry Selector: C10 Tall Tubular, SMF & Gel",
    ],
    techDetails: {
      controller: "40A Inbuilt Ultra-Fast rMPPT Tracking Core",
      waveform: "Precision Pure Sine Wave (THD < 3%, Zero Harmonic Buzz)",
      display: "High-Resolution Multi-Color Informational LCD",
      maxPvInput: "Up to 1000W Photovoltaic Input String",
      batterySupport: "12V Single Battery Configuration",
      warranty: "2 Years Express On-Site Replacement Warranty",
    },
  },
  {
    id: "sunplus-920",
    name: "Solvex SunPlus Pro 920 Hybrid Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "560W Load",
    voltage: "12V Single Battery",
    image: "/images/inverters/sunplus_pro_920.png",
    badge: "HIGH VALUE COMPACT",
    idealFor: "Compact Dwellings, Micro-Retail & Rural Power Backups",
    specs: [
      "25A Rapid-Tracking Solar Maximum Power Point Extraction",
      "Diesel Generator Auxiliary Frequency Auto-Synchronizer",
      "Active Dual-Stage Short-Circuit and Thermal Overload Safeguard",
    ],
    techDetails: {
      controller: "25A Integrated Solid-State rMPPT Regulator",
      waveform: "Filtered Pure Sine Wave for Sensitive Electronics",
      display: "LED Diagnostic Cluster with Audible Alert Cues",
      maxPvInput: "Up to 600W Solar PV Module String",
      batterySupport: "12V Deep-Cycle Solar Battery Bank",
      warranty: "2 Years Standard Factory Backed Guarantee",
    },
  },
  {
    id: "gamma-2600",
    name: "Solvex Gamma+ 2600 Heavy-Duty 24V Core",
    category: "heavy-duty",
    categoryLabel: "Industrial High-kVA",
    capacity: "1600W Load (2kVA)",
    voltage: "24V Dual Battery",
    image: "/images/inverters/gamma_2600.png",
    badge: "DUAL-BATTERY ASSET",
    isPopular: true,
    idealFor: "Spacious Residences, Medical Diagnostic Centers & Retail Floors",
    specs: [
      "50A / 24V Rapid MPPT Architecture Operating at 98.2% Peak Efficiency",
      "Real-Time Digital Status Panel Indicating Load Reserve & Battery DoD",
      "Surge Overhead Designed for High Inductive Compressor Startups",
    ],
    techDetails: {
      controller: "50A / 24V Dual-Phase rMPPT Microprocessor",
      waveform: "Laboratory-Grade Pure Sine Wave (< 2% Distortion)",
      display: "Interactive Alphanumeric LCD with Power Gauge",
      maxPvInput: "Up to 2000W PV String Array",
      batterySupport: "24V Dual-Bank (2x 12V High-Amperage Tubular)",
      warranty: "2 Years Doorstep Engineer Service Guarantee",
    },
  },
  {
    id: "sunplus-1020",
    name: "Solvex SunPlus Pro 1020 Acoustic-Silent Inverter",
    category: "rmppt",
    categoryLabel: "Rapid-MPPT Series",
    capacity: "720W Load (900 VA)",
    voltage: "12V Single Battery",
    image: "/images/inverters/sunplus_pro_1020.png",
    badge: "WHISPER QUIET",
    idealFor: "Multi-Room Urban Residences, Consultancies & Office Suites",
    specs: [
      "30A Synchronous rMPPT Intelligent Power Routing",
      "Three-Stage Priority Logic: Solar First > Battery > Grid Feed",
      "Sub-28dB Natural Convection Cooling for Noise-Sensitive Interiors",
    ],
    techDetails: {
      controller: "30A Intelligent Synchronous rMPPT Optimizer",
      waveform: "True Pure Sine Wave Output",
      display: "Solid-State Multi-Status LED Matrix",
      maxPvInput: "Up to 800W Solar Collector Array",
      batterySupport: "12V Compatible with All Deep-Discharge Chemistries",
      warranty: "2 Years Solvex Pan-Regional Warranty Shield",
    },
  },
  {
    id: "gamma-lion-1200",
    name: "Solvex Gamma+ LiON 1200 Lithium Integrated Inverter",
    category: "lithium",
    categoryLabel: "Lithium BMS Ready",
    capacity: "1000W Load (1.2kVA)",
    voltage: "Lithium LiFePO4",
    image: "/images/inverters/gamma_lion_1200.png",
    badge: "NEXT-GEN LITHIUM",
    idealFor: "Luxury Condos, Enterprise Server Nodes & Modern Smart Homes",
    specs: [
      "Dedicated CAN/RS485 LiFePO4 Smart BMS Data Sync",
      "0-80% Ultra-Rapid 120-Minute Fast-Charge Cycle",
      "Rated for 6,000+ Deep Cycles for a Decade of Continuous Life",
    ],
    techDetails: {
      controller: "High-Bandwidth Digital rMPPT Lithium Modulator",
      waveform: "Precision Laboratory Sine Wave (Zero Voltage Ripple)",
      display: "OLED-Grade Telemetry Panel Indicating State-of-Health",
      maxPvInput: "Up to 1200W High-Efficiency Monocrystalline Input",
      batterySupport: "Native LiFePO4 Lithium Iron Phosphate Storage",
      warranty: "3 Years Comprehensive Full-System Warranty",
    },
  },
  {
    id: "gamma-3400",
    name: "Solvex Gamma+ 3400 Commercial Power Center",
    category: "heavy-duty",
    categoryLabel: "Industrial High-kVA",
    capacity: "2800W Load (3.4kVA)",
    voltage: "24V Dual Battery",
    image: "/images/inverters/gamma_3400.png",
    badge: "HIGH-DUTY CYCLE",
    idealFor: "Light Industrial Units, Educational Campuses & Departmental Outlets",
    specs: [
      "65A Heavy-Duty High-Voltage rMPPT Continuous Charge Controller",
      "Twin Variable-Speed Ball-Bearing Exhausts for 50°C Ambient Operation",
      "300% Peak Inrush Endurance for Cold Storage and Air Conditioning Loads",
    ],
    techDetails: {
      controller: "65A Multi-Stage Heavy Industrial rMPPT Controller",
      waveform: "High-Stability Industrial Pure Sine Wave",
      display: "Multi-Tiered Diagnostic Control Console",
      maxPvInput: "Up to 2800W High-Wattage Module Array",
      batterySupport: "24V Heavy Commercial Battery Bank",
      warranty: "2 Years Commercial Heavy-Duty Warranty",
    },
  },
  {
    id: "sunlion-1000",
    name: "Solvex SunLion 1000 Architectural Wall-Mount Inverter",
    category: "lithium",
    categoryLabel: "Lithium BMS Ready",
    capacity: "1 kVA All-in-One",
    voltage: "Built-In LiFePO4",
    image: "/images/inverters/sunlion_1000.png",
    badge: "ARCHITECTURAL MONOLITH",
    idealFor: "Designer Villas, Penthouse Lounges & Minimalist Studio Offices",
    specs: [
      "All-in-One Enclosed LiFePO4 Cell: Zero Exposed Cabling or Acid Fumes",
      "Slim Profile Chassis Engineered for Flush Wall Installation",
      "Sub-5ms Seamless Transfer Switching Ensuring Zero Computer Resets",
    ],
    techDetails: {
      controller: "Compact Integrated Solid-State MPPT & Battery Management Core",
      waveform: "Distortion-Free Pure Sine Wave Generation",
      display: "Edge-Illuminated Minimalist Capacitive Indicators",
      maxPvInput: "Up to 1000W Rooftop Solar Array",
      batterySupport: "Factory Sealed Internal Grade-A LiFePO4 Storage Module",
      warranty: "3 Years All-Inclusive Monolithic Enclosure Warranty",
    },
  },
];
