import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | India's Complete Clean Energy Platform - Solvex Energy",
  description:
    "Learn about Solvex Energy: India's premier renewable energy platform delivering gigawatt-scale zero-carbon architectures. 6.3 GWp operating fleet, 20 GW 2030 target, ~$1B institutional equity, and national transmission across 23 states.",
  keywords: [
    "About Solvex Energy",
    "India Complete Renewable Platform",
    "Operating Clean Assets 6.3 GWp",
    "Decarbonization Target 20 GW",
    "Utility-Scale Solar India",
    "Hybrid Wind Solar BESS",
    "C&I Renewable Power India",
    "Institutional Green Energy Equity",
    "Clean Tech Surat Gujarat",
    "National Power Grid Interconnection",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/about-us`,
    languages: {
      "en-IN": `${SITE_CONFIG.url}/about-us?lang=en`,
      "hi-IN": `${SITE_CONFIG.url}/about-us?lang=hi`,
      "x-default": `${SITE_CONFIG.url}/about-us`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: `${SITE_CONFIG.url}/about-us`,
    siteName: SITE_CONFIG.name,
    title: "About Solvex Energy | India's First Complete Renewable Platform",
    description:
      "Delivering gigawatt-scale zero-carbon power architectures for sovereign grids and corporate leaders. 6.3 GWp operating clean assets, 20 GW 2030 target, and presence across 23 states.",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/about/about_hero_headquarters.jpg`,
        width: 1200,
        height: 630,
        alt: "Solvex Energy - India's Complete Renewable Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Solvex Energy | India's First Complete Renewable Platform",
    description:
      "Delivering gigawatt-scale zero-carbon power architectures for sovereign grids and corporate leaders. 6.3 GWp operating fleet and 20 GW 2030 target.",
    images: [`${SITE_CONFIG.url}/images/about/about_hero_headquarters.jpg`],
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Solvex Energy Solutions",
    description:
      "Corporate profile, audited operating capacity, decarbonization targets, and nationwide transmission network of Solvex Energy.",
    url: `${SITE_CONFIG.url}/about-us`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.legalName,
      alternateName: "Solvex Energy",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      foundingDate: "2016",
      description:
        "India's complete renewable energy platform with 6.3 GWp operating clean assets across utility solar, hybrid wind, and BESS.",
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
      foundingLocation: {
        "@type": "Place",
        name: "Surat, Gujarat, India",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      knowsAbout: [
        "Utility-Scale Solar Power (4.1 GWp)",
        "Hybrid Wind Power (1.8 GWp)",
        "Battery Energy Storage Systems (BESS)",
        "Inter-State Transmission Network (23 States)",
        "C&I Power Off-Take",
        "Build-Own-Operate (BOO) Infrastructure",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
