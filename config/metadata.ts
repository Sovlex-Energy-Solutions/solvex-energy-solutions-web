import type { Metadata, Viewport } from "next";
import { SITE_CONFIG } from "./site";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Solvex Energy Solutions | Tier-1 B2B Solar Inverters, PCU & Franchise Ecosystem",
    template: "%s | Solvex Energy Solutions",
  },
  description:
    "Empowering India's clean energy transition. Manufacturer of Tier-1 ALMM bifacial solar arrays, smart rMPPT hybrid inverters, and heavy-duty industrial PCUs. Turnkey PM Surya Ghar EPC execution and high-margin dealership franchise opportunities across India.",
  keywords: [
    "Solvex Energy Solutions",
    "Solvex Energy",
    "Solar franchise India",
    "Solar dealership opportunity",
    "PM Surya Ghar Muft Bijli Yojana",
    "Tier-1 ALMM solar panels",
    "rMPPT Solar Inverters",
    "Solar PCU manufacturer",
    "Commercial rooftop solar EPC",
    "Bifacial solar panels",
    "Rajasthan solar manufacturer",
    "Gujarat solar distributor",
    "Renewable energy distributor",
    "Solar EPC turnkey Jaipur",
  ],
  authors: [{ name: SITE_CONFIG.legalName, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.legalName,
  publisher: SITE_CONFIG.legalName,
  category: "Renewable Energy & Solar Manufacturing",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-IN": `${SITE_CONFIG.url}/?lang=en`,
      "hi-IN": `${SITE_CONFIG.url}/?lang=hi`,
      "x-default": SITE_CONFIG.url,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Solvex Energy Solutions | Tier-1 B2B Solar Inverters, PCU & Franchise Ecosystem",
    description:
      "Direct manufacturing allocations, ALMM Tier-1 hardware, smart rMPPT inverters, and commercial solar EPC partnerships across India under PM Surya Ghar.",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Solvex Energy Solutions - Tier-1 Solar Inverters, PCU & Franchise Ecosystem",
      },
      {
        url: `${SITE_CONFIG.url}/images/solar_hero_landscape.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Solvex Energy Solutions Industrial Solar Power Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@solvexenergy",
    creator: "@solvexenergy",
    title: "Solvex Energy Solutions | Tier-1 Solar Inverters, PCU & Franchise Ecosystem",
    description:
      "Join India's fastest-growing solar franchise ecosystem under PM Surya Ghar. High-margin territorial distributorships, smart rMPPT inverters & Tier-1 ALMM hardware.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Solvex Energy",
  },
  formatDetection: {
    telephone: false,
    address: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};
