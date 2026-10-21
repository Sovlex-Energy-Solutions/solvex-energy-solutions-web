import { LanguageProvider } from "@/context/LanguageContext";
import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import QuickContactWidget from "@/components/ui/QuickContactWidget";
import ProductEnquiryDialog from "@/components/forms/ProductEnquiryDialog";
import GoogleAnalyticsLoader from "@/components/analytics/GoogleAnalyticsLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://solvexenergy.com"),
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
  authors: [{ name: "Solvex Energy Solutions Private Limited", url: "https://solvexenergy.com" }],
  creator: "Solvex Energy Solutions Private Limited",
  publisher: "Solvex Energy Solutions Private Limited",
  category: "Renewable Energy & Solar Manufacturing",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://solvexenergy.com",
    languages: {
      "en-IN": "https://solvexenergy.com/?lang=en",
      "hi-IN": "https://solvexenergy.com/?lang=hi",
      "x-default": "https://solvexenergy.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: "https://solvexenergy.com",
    siteName: "Solvex Energy Solutions",
    title: "Solvex Energy Solutions | Tier-1 B2B Solar Inverters, PCU & Franchise Ecosystem",
    description:
      "Direct manufacturing allocations, ALMM Tier-1 hardware, smart rMPPT inverters, and commercial solar EPC partnerships across India under PM Surya Ghar.",
    images: [
      {
        url: "https://solvexenergy.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Solvex Energy Solutions - Tier-1 Solar Inverters, PCU & Franchise Ecosystem",
      },
      {
        url: "https://solvexenergy.com/images/solar_hero_landscape.jpg",
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
    images: ["https://solvexenergy.com/og-image.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://solvexenergy.com/#organization",
      name: "Solvex Energy Solutions",
      legalName: "Solvex Energy Solutions Private Limited",
      url: "https://solvexenergy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://solvexenergy.com/logo.png",
        width: 500,
        height: 500,
      },
      image: "https://solvexenergy.com/og-image.png",
      description:
        "Leading clean tech manufacturer and national franchise network delivering Tier-1 ALMM bifacial solar arrays, smart rMPPT hybrid inverters, and industrial PCUs under PM Surya Ghar Muft Bijli Yojana.",
      telephone: "+91-91251-27755",
      email: "Infosolvexenergysoltuion@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "F-5A Shyam Nagar , EX Shiv Sadan",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302019",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-91251-27755",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-91251-27755",
          contactType: "sales",
          contactOption: "TollFree",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      ],
      identifier: "CIN: U43219GJ2025PTC168167",
      sameAs: [
        "https://www.linkedin.com/company/solvex-energy",
        "https://twitter.com/solvexenergy",
      ],
      award: [
        "MNRE ALMM Tier-1 Certified",
        "PM Surya Ghar Approved Channel Partner",
      ],
    },
    {
      "@type": "SolarEnergyCompany",
      "@id": "https://solvexenergy.com/#localbusiness",
      name: "Solvex Energy Solutions Head Office",
      image: "https://solvexenergy.com/og-image.png",
      telephone: "+91-91251-27755",
      email: "Infosolvexenergysoltuion@gmail.com",
      url: "https://solvexenergy.com",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "F-5A Shyam Nagar , EX Shiv Sadan",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302019",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.8928,
        longitude: 75.7683,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "18:30",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://solvexenergy.com/#website",
      url: "https://solvexenergy.com",
      name: "Solvex Energy Solutions",
      publisher: {
        "@id": "https://solvexenergy.com/#organization",
      },
      inLanguage: ["en-IN", "hi-IN"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://solvexenergy.com/#faq",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${notoDevanagari.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`
            #solvex-cinematic-preloader { display: none !important; }
            body { overflow: auto !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className="bg-[#FFFFFF] text-[#18181B] font-sans antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white"
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
          {/* Privacy-First Google Analytics 4 Loader (Basic Consent Mode: Blocks all tags until consent) */}
          <GoogleAnalyticsLoader />
          {/* Global Quick Contact Speed Dial (Working Call & WhatsApp) */}
          <QuickContactWidget />
          {/* Global Product & Subsidy Enquiry Dialog */}
          <ProductEnquiryDialog />
        </LanguageProvider>
      </body>
    </html>
  );
}

