export interface MediaSlide {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  tag: string;
  tagHi: string;
  caption: string;
  captionHi: string;
  duration: number; // in milliseconds
}

export const HERO_MEDIA_SLIDES: MediaSlide[] = [
  {
    id: "india-grid-video",
    type: "video",
    src: "/media/optimized/india_solar_network_cinematic.mp4",
    poster: "/media/optimized/india_solar_grid.webp",
    tag: "National Grid",
    tagHi: "राष्ट्रीय ग्रिड",
    caption: "Pan-India Decentralized Solar Network",
    captionHi: "अखिल भारतीय विकेंद्रीकृत सोलर नेटवर्क",
    duration: 8000,
  },
  {
    id: "bifacial-hardware-image",
    type: "image",
    src: "/media/optimized/bifacial_hardware_showcase.webp",
    poster: "/media/optimized/bifacial_hardware_showcase.webp",
    tag: "Tier-1 ALMM",
    tagHi: "टियर-1 ALMM",
    caption: "High-Efficiency Bifacial PV Modules",
    captionHi: "उच्च-दक्षता बाइफेशियल पीवी मॉड्यूल",
    duration: 7500,
  },
  {
    id: "renewable-hub-video",
    type: "video",
    src: "/media/optimized/renewable_energy_hub_cinematic.mp4",
    poster: "/media/optimized/clean_energy_wind_hub.webp",
    tag: "Hybrid Infrastructure",
    tagHi: "हाइब्रिड इन्फ्रास्ट्रक्चर",
    caption: "Integrated Solar & Clean Tech Ecosystem",
    captionHi: "एकीकृत सोलर व क्लीन टेक तंत्र",
    duration: 8000,
  },
  {
    id: "rooftop-engineering-image",
    type: "image",
    src: "/media/optimized/rooftop_solar_engineering.webp",
    poster: "/media/optimized/rooftop_solar_engineering.webp",
    tag: "PM Surya Ghar",
    tagHi: "पीएम सूर्य घर",
    caption: "Precision Rooftop EPC Engineering",
    captionHi: "सटीक रूफटॉप ईपीसी इंजीनियरिंग",
    duration: 7500,
  },
  {
    id: "rooftop-generation-video",
    type: "video",
    src: "/media/optimized/rooftop_solar_generation_cinematic.mp4",
    poster: "/media/optimized/rooftop_solar_engineering.webp",
    tag: "Turnkey EPC",
    tagHi: "टर्नकी ईपीसी",
    caption: "Residential & Commercial Net Metering",
    captionHi: "आवासीय व वाणिज्यिक नेट-मीटरिंग",
    duration: 8000,
  },
  {
    id: "wind-solar-hub-image",
    type: "image",
    src: "/media/optimized/clean_energy_wind_hub.webp",
    poster: "/media/optimized/clean_energy_wind_hub.webp",
    tag: "Clean Energy",
    tagHi: "स्वच्छ ऊर्जा",
    caption: "Sustainable Zero-Emission Horizon",
    captionHi: "शून्य-उत्सर्जन स्वच्छ भविष्य",
    duration: 7500,
  },
  {
    id: "solar-architecture-video",
    type: "video",
    src: "/media/optimized/solar_panels_architecture_cinematic.mp4",
    poster: "/media/optimized/bifacial_hardware_showcase.webp",
    tag: "PV Architecture",
    tagHi: "पीवी वास्तुकला",
    caption: "Next-Gen Photovoltaic Module Engineering",
    captionHi: "अगली पीढ़ी के फोटोवोल्टाइक मॉड्यूल",
    duration: 8000,
  },
  {
    id: "india-solar-map-image",
    type: "image",
    src: "/media/optimized/india_solar_grid.webp",
    poster: "/media/optimized/india_solar_grid.webp",
    tag: "Subsidies & Scale",
    tagHi: "सब्सिडी व विस्तार",
    caption: "Empowering Solar Entrepreneurs Across India",
    captionHi: "देशभर के सोलर उद्यमियों का सशक्तिकरण",
    duration: 7500,
  },
  {
    id: "energy-sparks-video",
    type: "video",
    src: "/media/optimized/energy_activation_sparks_16x9.mp4",
    poster: "/media/optimized/energy_activation_sparks.webp",
    tag: "Instant Energization",
    tagHi: "त्वरित ऊर्जाकरण",
    caption: "Seamless DISCOM Synchronization & DBT Disbursal",
    captionHi: "सुगम डिस्कॉम नेट-मीटरिंग व डीबीटी अंतरण",
    duration: 7500,
  },
];
