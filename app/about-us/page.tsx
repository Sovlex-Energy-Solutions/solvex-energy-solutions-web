import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Leading Clean Energy Infrastructure & Tier-1 Solar Engineering",
  description:
    "Learn about Solvex Energy Solutions Private Limited. Headquartered in Surat, Gujarat with 1+ GW manufacturing pipeline, ALMM Tier-1 bifacial modules, smart rMPPT inverters, and nationwide PM Surya Ghar EPC execution.",
  keywords: [
    "About Solvex Energy",
    "Solvex Energy Solutions Private Limited",
    "Solar manufacturer Gujarat",
    "Surat solar company",
    "Tier-1 ALMM solar panels",
    "PM Surya Ghar partner",
    "Solar EPC company India",
    "Clean energy infrastructure India",
    "Commercial rooftop solar",
    "Solar franchise opportunity",
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
    title: "About Solvex Energy Solutions | Tier-1 Clean Tech Infrastructure",
    description:
      "Bridging institutional photovoltaic manufacturing with agile on-ground EPC execution across India. Headquartered in Surat, Gujarat.",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/about/about_hero_headquarters.jpg`,
        width: 1200,
        height: 630,
        alt: "Solvex Energy Solutions Corporate Headquarters & Engineering Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Solvex Energy Solutions | Tier-1 Clean Tech Infrastructure",
    description:
      "Bridging institutional photovoltaic manufacturing with agile on-ground EPC execution across India. Headquartered in Surat, Gujarat.",
    images: [`${SITE_CONFIG.url}/images/about/about_hero_headquarters.jpg`],
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Solvex Energy Solutions",
    description:
      "Corporate profile, manufacturing infrastructure, and mission of Solvex Energy Solutions Private Limited.",
    url: `${SITE_CONFIG.url}/about-us`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.legalName,
      alternateName: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
      description:
        "Manufacturer of Tier-1 ALMM bifacial solar arrays, smart rMPPT hybrid inverters, and industrial PCUs.",
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
      knowsAbout: [
        "Photovoltaic Solar Manufacturing",
        "PM Surya Ghar Muft Bijli Yojana",
        "Utility Solar EPC",
        "rMPPT Inverters",
        "Hybrid Renewable Energy",
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
