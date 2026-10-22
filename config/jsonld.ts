import { SITE_CONFIG } from "./site";

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      legalName: SITE_CONFIG.legalName,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 500,
        height: 500,
      },
      image: `${SITE_CONFIG.url}/og-image.png`,
      description:
        "Leading clean tech manufacturer and national franchise network delivering Tier-1 ALMM bifacial solar arrays, smart rMPPT hybrid inverters, and industrial PCUs under PM Surya Ghar Muft Bijli Yojana.",
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.country,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE_CONFIG.phone,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          telephone: SITE_CONFIG.phone,
          contactType: "sales",
          contactOption: "TollFree",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      ],
      identifier: SITE_CONFIG.cin,
      sameAs: [
        SITE_CONFIG.socialLinks.linkedin,
        SITE_CONFIG.socialLinks.twitter,
      ],
      award: [
        "MNRE ALMM Tier-1 Certified",
        "PM Surya Ghar Approved Channel Partner",
      ],
    },
    {
      "@type": "SolarEnergyCompany",
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
      name: `${SITE_CONFIG.name} Head Office`,
      image: `${SITE_CONFIG.url}/og-image.png`,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      url: SITE_CONFIG.url,
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONFIG.geo.latitude,
        longitude: SITE_CONFIG.geo.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: SITE_CONFIG.operatingHours.days,
          opens: SITE_CONFIG.operatingHours.opens,
          closes: SITE_CONFIG.operatingHours.closes,
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      publisher: {
        "@id": `${SITE_CONFIG.url}/#organization`,
      },
      inLanguage: ["en-IN", "hi-IN"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_CONFIG.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is PM Surya Ghar Muft Bijli Yojana and how does Solvex assist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PM Surya Ghar Muft Bijli Yojana is a national initiative providing up to ₹78,000 direct subsidy for 1–3kW rooftop solar systems. Solvex provides turnkey EPC execution, ALMM Tier-1 hardware, DISCOM net-metering liaison, and subsidy paperwork clearance.",
          },
        },
        {
          "@type": "Question",
          name: "What are the requirements to become a Solvex Solar Franchise or Channel Partner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Solvex offers four partner tiers: Retail Merchant, Channel EPC Partner, Territory Distributor, and State Master Distributor with investment starting from ₹2 Lakhs to ₹30+ Lakhs. Solvex provides lead allocation, technician training, and direct factory pricing.",
          },
        },
        {
          "@type": "Question",
          name: "What warranties and certifications do Solvex solar inverters and PCUs provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All Solvex inverters, PCUs, and batteries carry BIS and MNRE certifications with comprehensive warranties ranging from 2 to 5 years on power electronics and up to 25 to 30 years linear performance on photovoltaic modules.",
          },
        },
      ],
    },
  ],
};
