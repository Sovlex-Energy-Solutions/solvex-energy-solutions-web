import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import ProjectsPageClient from "@/components/projects/ProjectsPageClient";
import { PROJECTS_DATA } from "@/data/projects-data";

export const metadata: Metadata = {
  title: "Clean Energy Projects & Portfolio | Solvex Energy Solutions",
  description:
    "Explore Solvex Energy's multi-gigawatt renewable energy project portfolio across India: utility-scale solar parks, wind-solar hybrids, BESS energy storage, and commercial C&I captive rooftop installations.",
  keywords: [
    "Solvex Energy Projects",
    "Utility Scale Solar India",
    "Commercial Solar EPC",
    "Wind Solar Hybrid Projects",
    "Floating Solar PV India",
    "Captive Solar Rooftop",
    "Industrial Open Access Solar",
    "Solar BESS Energy Storage",
    "SECI Solar Projects",
    "C&I Renewable Power India",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/projects`,
    languages: {
      "en-IN": `${SITE_CONFIG.url}/projects?lang=en`,
      "hi-IN": `${SITE_CONFIG.url}/projects?lang=hi`,
      "x-default": `${SITE_CONFIG.url}/projects`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: `${SITE_CONFIG.url}/projects`,
    siteName: SITE_CONFIG.name,
    title: "Clean Energy Projects & Portfolio | Solvex Energy Solutions",
    description:
      "Explore Solvex Energy's multi-gigawatt clean energy portfolio across 23+ Indian states: utility solar, floating PV, wind-solar hybrids, and C&I open access arrays.",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/solar_plant_3.png`,
        width: 1200,
        height: 630,
        alt: "Solvex Energy Clean Energy Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clean Energy Projects & Portfolio | Solvex Energy Solutions",
    description:
      "Explore Solvex Energy's multi-gigawatt clean energy portfolio across 23+ Indian states: utility solar, floating PV, wind-solar hybrids, and C&I open access arrays.",
    images: [`${SITE_CONFIG.url}/images/solar_plant_3.png`],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Solvex Energy Solutions Projects Portfolio",
    description:
      "Showcase of operational and under-execution renewable energy projects across India including utility-scale solar, hybrids, and commercial rooftop solar.",
    url: `${SITE_CONFIG.url}/projects`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.legalName,
      logo: `${SITE_CONFIG.url}/logo.png`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PROJECTS_DATA.slice(0, 8).map((proj, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Project",
          name: proj.title,
          description: proj.summary,
          location: {
            "@type": "Place",
            name: `${proj.state}, India`,
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageClient />
    </>
  );
}
