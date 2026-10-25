export type ProjectCategory = "utility" | "ci-open-access" | "distributed-rooftop";
export type ProjectRegion = "North" | "West" | "South" | "East";
export type ProjectStatus = "Commissioned" | "Under Execution";

export interface ProjectItem {
  id: string;
  title: string;
  titleHi?: string;
  category: ProjectCategory;
  categoryLabel: string;
  categoryLabelHi?: string;
  capacity: string;
  capacityValMW: number;
  offTaker: string;
  state: string;
  region: ProjectRegion;
  technology: string;
  status: ProjectStatus;
  annualGeneration: string;
  co2Offset: string;
  image: string;
  imageAlt: string;
  summary: string;
  summaryHi?: string;
  details: {
    gridVoltage: string;
    moduleType: string;
    inverterTech: string;
    mountingStructure: string;
    landOrArea?: string;
    keyHighlight: string;
  };
}

export interface RegionalMetric {
  region: ProjectRegion;
  name: string;
  capacityMW: string;
  projectCount: number;
  primaryStates: string[];
  description: string;
}

export const PROJECTS_METRICS = {
  totalCapacity: "6.2+ GWp",
  totalCapacitySub: "Aggregate Fleet & Active Pipeline",
  statesCovered: "23+",
  statesCoveredSub: "Pan-India Grid Interconnection",
  projectsCompleted: "75+",
  projectsCompletedSub: "High-Yield Utility & C&I Deployments",
  carbonOffset: "3.8M+ T",
  carbonOffsetSub: "Annual CO₂ Emissions Abated",
};

export const REGIONAL_METRICS: RegionalMetric[] = [
  {
    region: "North",
    name: "Northern Grid Corridor",
    capacityMW: "2.1 GWp",
    projectCount: 22,
    primaryStates: ["Rajasthan", "Uttar Pradesh", "Haryana"],
    description: "High-irradiance desert utility complexes and NCR industrial microgrids feeding sovereign ISTS transmission lines.",
  },
  {
    region: "West",
    name: "Western Industrial Hub",
    capacityMW: "1.9 GWp",
    projectCount: 24,
    primaryStates: ["Gujarat", "Maharashtra", "Madhya Pradesh"],
    description: "Coastal wind-solar hybrids, floating solar arrays, and automotive manufacturing open access corridors.",
  },
  {
    region: "South",
    name: "Southern Clean Energy Belt",
    capacityMW: "1.6 GWp",
    projectCount: 20,
    primaryStates: ["Karnataka", "Tamil Nadu", "Telangana", "Kerala"],
    description: "Multi-tenant tech parks, mass transit elevated metro rooftops, and hybrid solar-BESS energy storage systems.",
  },
  {
    region: "East",
    name: "Eastern Industrial Belt",
    capacityMW: "600+ MWp",
    projectCount: 11,
    primaryStates: ["West Bengal", "Bihar", "Odisha"],
    description: "Heavy manufacturing captive installations and institutional campuses driving Eastern India's green industrial switch.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  // 1. SECI IX – 135 MWp (Utility-Scale, North) - project4.jpg
  {
    id: "seci-ix-135mwp",
    title: "SECI IX – 135 MWp",
    titleHi: "सेकी IX – 135 MWp",
    category: "utility",
    categoryLabel: "Utility",
    categoryLabelHi: "यूटिलिटी",
    capacity: "135 MWp",
    capacityValMW: 135,
    offTaker: "SECI",
    state: "Rajasthan",
    region: "North",
    technology: "Solar PV",
    status: "Commissioned",
    annualGeneration: "245 GWh / Year",
    co2Offset: "200,000+ Tons / Year",
    image: "/projects/project4.jpg",
    imageAlt: "SECI IX 135 MWp Utility-Scale Solar Project in Phalodi Rajasthan",
    summary:
      "Spread across 585 acres of challenging terrain in Phalodi, Rajasthan, this 135 MWp utility-scale solar project was developed under SECI Tranche IX. Completed in a record-breaking 4 months (six months ahead of scheduled SCOD) with an installation speed of 8 MW per day. Equipped with single-axis tracker technology to optimize generation efficiency under a 25-year PPA with SECI.",
    summaryHi:
      "फलोदी, राजस्थान में 585 एकड़ में फैला यह 135 MWp यूटिलिटी-स्केल सौर संयंत्र सेकी ट्रेंच IX के तहत रिकॉर्ड 4 महीनों में (निर्धारित तिथि से छह महीने पहले) चालू किया गया। सिंगल-एक्सिस ट्रैकर तकनीक से लैस यह संयंत्र सेकी के साथ 25-वर्षीय पीपीए के तहत संचालित है।",
    details: {
      gridVoltage: "33 kV / 220 kV ISTS Interconnection",
      moduleType: "High-Efficiency Bifacial Solar Photovoltaic Modules",
      inverterTech: "Smart 1500V String Inverter Architecture with Real-Time Telemetry",
      mountingStructure: "Single-Axis Astronomical Trackers",
      landOrArea: "585 Acres in Phalodi, Rajasthan",
      keyHighlight:
        "Completed 6 months ahead of SCOD in a record 4 months (8 MW/day installation pace) with single-axis trackers under a 25-year SECI PPA.",
    },
  },

  // 2. RUMSL – 140 MWp (Utility-Scale Floating Solar, West) - project2.jpg
  {
    id: "rumsl-140mwp",
    title: "RUMSL – 140 MWp",
    titleHi: "रीवा आरयूएमएसएल – 140 MWp",
    category: "utility",
    categoryLabel: "Utility",
    categoryLabelHi: "यूटिलिटी",
    capacity: "140 MWp",
    capacityValMW: 140,
    offTaker: "Rewa Ultra Mega Solar Ltd. (RUMSL)",
    state: "Madhya Pradesh",
    region: "West",
    technology: "Floating Solar PV",
    status: "Commissioned",
    annualGeneration: "198 GWh / Year",
    co2Offset: "170,000+ Tons / Year",
    image: "/projects/project2.jpg",
    imageAlt: "RUMSL 140 MWp Floating Solar Project in Omkareshwar Reservoir Madhya Pradesh",
    summary:
      "India's largest floating solar project, inaugurated by Hon'ble Prime Minister Shri Narendra Modi. Located at the Omkareshwar Reservoir in Madhya Pradesh, this landmark 140 MWp plant supplies clean power to Rewa Ultra Mega Solar Limited (RUMSL), a joint venture between the Solar Energy Corporation of India (SECI) and MP Urja Vikas Nigam Ltd. under a 25-year BOOT PPA.",
    summaryHi:
      "मध्य प्रदेश के ओंकारेश्वर जलाशय में स्थित 140 MWp फ्लोटिंग सोलर संयंत्र भारत का सबसे बड़ा फ्लोटिंग सौर संयंत्र है, जिसका उद्घाटन माननीय प्रधानमंत्री श्री नरेंद्र मोदी द्वारा किया गया। यह रीवा अल्ट्रा मेगा सोलर लिमिटेड (RUMSL) को 25-वर्षीय समझौते के तहत स्वच्छ ऊर्जा की आपूर्ति करता है।",
    details: {
      gridVoltage: "220 kV Inter-State Transmission Substation",
      moduleType: "Marine-Grade Glass-Glass High-Yield Solar PV Modules",
      inverterTech: "High-Efficiency Central Inverter Units with Evaporative Cooling",
      mountingStructure: "High-Density Polyethylene (HDPE) Floating Pontoons & Marine Anchors",
      landOrArea: "Omkareshwar Reservoir Waterbody",
      keyHighlight:
        "India's largest floating solar installation, curbing reservoir water evaporation while supplying clean power to RUMSL under a 25-year PPA.",
    },
  },

  // 3. SECI – FDRE VII – 199 MW (Utility-Scale Solar + BESS, South) - project3.jpg
  {
    id: "seci-fdre-vii-199mw",
    title: "SECI – FDRE VII – 199 MW",
    titleHi: "सेकी – FDRE VII – 199 MW",
    category: "utility",
    categoryLabel: "Utility",
    categoryLabelHi: "यूटिलिटी",
    capacity: "199 MW",
    capacityValMW: 199,
    offTaker: "SECI",
    state: "Karnataka",
    region: "South",
    technology: "Solar PV and BESS",
    status: "Under Execution",
    annualGeneration: "300 GWh / Year",
    co2Offset: "270,000+ Tons / Year",
    image: "/projects/project3.jpg",
    imageAlt: "SECI FDRE VII 199 MW Solar PV and BESS Site Project Inspection Team",
    summary:
      "A flagship 199 MW / ~800 MWh Firm and Dispatchable Renewable Energy (FDRE) asset awarded under SECI Tranche VII with a 25-year PPA. Combining utility-scale solar photovoltaic generation with utility-grade Battery Energy Storage Systems (BESS) to deliver firm round-the-clock and peak-load clean power to the national transmission grid.",
    summaryHi:
      "सेकी ट्रेंच VII के तहत अनुबंधित 199 MW / ~800 MWh फर्म एंड डिस्पैचेबल रिन्यूएबल एनर्जी (FDRE) परियोजना, जो सोलर पीवी और उन्नत बैटरी ऊर्जा भंडारण प्रणाली (BESS) को मिलाकर राष्ट्रीय ग्रिड को चौबीसों घंटे और पीक आवर्स में स्वच्छ ऊर्जा प्रदान करती है।",
    details: {
      gridVoltage: "400 kV / 220 kV ISTS Pooling Substation",
      moduleType: "High-Capacity Bifacial Dual-Glass PV Modules",
      inverterTech: "Grid-Forming Hybrid Inverters & BESS Power Conversion System",
      mountingStructure: "Single-Axis Smart Astronomical Trackers",
      landOrArea: "Dedicated National Renewable Energy Corridor",
      keyHighlight:
        "Pairs 199 MW solar with ~800 MWh BESS to guarantee 100% firm dispatchable clean electricity during peak grid demand hours.",
    },
  },

  // 4. Amazon Web Services – 135 MWp (C&I Open Access, North) - project1.jpg
  {
    id: "amazon-web-services-135mwp",
    title: "Amazon Web Services – 135 MWp",
    titleHi: "अमेज़न वेब सर्विसेज – 135 MWp",
    category: "ci-open-access",
    categoryLabel: "C&I - Open Access",
    categoryLabelHi: "सी एंड आई - ओपन एक्सेस",
    capacity: "135 MWp",
    capacityValMW: 135,
    offTaker: "C&I Customers",
    state: "Rajasthan",
    region: "North",
    technology: "Solar PV",
    status: "Commissioned",
    annualGeneration: "225 GWh / Year",
    co2Offset: "185,000+ Tons / Year",
    image: "/projects/project1.jpg",
    imageAlt: "Amazon Web Services 135 MWp ISTS Connected Solar Project in Bhadla Rajasthan",
    summary:
      "India's largest Interstate Transmission System (ISTS)-connected solar plant for a Commercial & Industrial (C&I) customer, Amazon Web Services (AWS). Spanning approximately 580 acres in Bhadla, Rajasthan, this 135 MWp (100 MWac) ground-mounted project supports Amazon's global commitment to power operations with 100% renewable energy and advance Digital India.",
    summaryHi:
      "भारत में सीएंडआई ग्राहक अमेज़न वेब सर्विसेज (AWS) के लिए स्थापित 135 MWp क्षमता का देश का सबसे बड़ा ISTS-कनेक्टेड सौर संयंत्र। भादला, राजस्थान में 580 एकड़ में फैला यह संयंत्र अमेज़न के 100% नवीकरणीय ऊर्जा लक्ष्य का समर्थन करता है।",
    details: {
      gridVoltage: "220 kV ISTS Dedicated Intertie Substation",
      moduleType: "Tier-1 ALMM Certified Bifacial Solar PV Modules",
      inverterTech: "Central Inverter Stations with Automated SCADA Plant Monitoring",
      mountingStructure: "Single-Axis Solar Astronomical Tracking Systems",
      landOrArea: "580 Acres in Bhadla, Rajasthan",
      keyHighlight:
        "India's largest ISTS-connected corporate C&I solar project, wheeling clean green energy to Amazon Web Services (AWS).",
    },
  },

  // 5. Tata Hitachi Construction Machinery Equipment – 10.5 MWp (Distributed Generation, East) - project5.jpg
  {
    id: "tata-hitachi-10-5mwp",
    title: "Tata Hitachi Construction Machinery Equipment – 10.5 MWp",
    titleHi: "टाटा हिताची कंस्ट्रक्शन मशीनरी इक्विपमेंट – 10.5 MWp",
    category: "distributed-rooftop",
    categoryLabel: "Distributed Generation",
    categoryLabelHi: "डिस्ट्रिब्यूटेड जेनरेशन",
    capacity: "10.5 MWp",
    capacityValMW: 10.5,
    offTaker: "Tata Hitachi Construction Machinery Equipment",
    state: "West Bengal",
    region: "East",
    technology: "Solar PV",
    status: "Commissioned",
    annualGeneration: "14.5 GWh / Year",
    co2Offset: "5,055+ Tons / Year",
    image: "/projects/project5.jpg",
    imageAlt: "Tata Hitachi Construction Machinery 10.5 MWp Industrial Behind-the-Meter Solar Plant in West Bengal",
    summary:
      "The largest industrial 'Behind the Meter' solar project in Eastern India, operating 10.5 MWp for Tata Hitachi Construction Machinery Company at Kharagpur, West Bengal. Governed by a 25-year PPA, this captive ground-mounted solar plant offsets over 5,055 tonnes of CO₂ emissions annually and demonstrates the programmatic approach of sustainable industrial partnerships.",
    summaryHi:
      "पूर्वी भारत में टाटा हिताची कंस्ट्रक्शन मशीनरी की खड़गपुर इकाई के लिए संचालित 10.5 MWp का सबसे बड़ा इंडस्ट्रियल 'बिहाइंड द मीटर' सोलर प्रोजेक्ट। 25-वर्षीय समझौते के तहत यह संयंत्र प्रति वर्ष 5,055 टन से अधिक कार्बन उत्सर्जन कम करता है।",
    details: {
      gridVoltage: "33 kV / 11 kV Captive Industrial Substation",
      moduleType: "High-Efficiency Half-Cut Mono PERC Modules",
      inverterTech: "Smart Industrial String Inverters with Rapid Islanding Protection",
      mountingStructure: "Fixed-Tilt Ground-Mounted Engineered Racks",
      landOrArea: "On-site Manufacturing Campus, Kharagpur",
      keyHighlight:
        "Largest behind-the-meter industrial solar deployment in Eastern India, offsetting 5,055+ tonnes of CO₂ annually under a 25-year PPA.",
    },
  },
];
