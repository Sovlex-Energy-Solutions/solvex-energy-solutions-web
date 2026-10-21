import { LanguageProvider } from "@/context/LanguageContext";
import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import QuickContactWidget from "@/components/ui/QuickContactWidget";
import ProductEnquiryDialog from "@/components/forms/ProductEnquiryDialog";

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
  themeColor: "#059669",
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
    "Empowering India's clean energy transition. Manufacturer of Tier-1 ALMM bifacial solar arrays, smart rMPPT hybrid inverters, and heavy-duty PCUs. Turnkey PM Surya Ghar EPC execution and high-margin dealership opportunities.",
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
    "Gujarat solar manufacturer",
    "Renewable energy distributor",
  ],
  authors: [{ name: "Solvex Energy Solutions Private Limited" }],
  creator: "Solvex Energy Solutions Private Limited",
  publisher: "Solvex Energy Solutions Private Limited",
  alternates: {
    canonical: "https://solvexenergy.com",
    languages: {
      "en-IN": "https://solvexenergy.com/?lang=en",
      "hi-IN": "https://solvexenergy.com/?lang=hi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://solvexenergy.com",
    siteName: "Solvex Energy Solutions",
    title: "Solvex Energy Solutions | Tier-1 B2B Solar Inverters, PCU & Franchise Ecosystem",
    description:
      "Direct manufacturing allocations, ALMM Tier-1 hardware, smart rMPPT inverters, and commercial solar EPC partnerships across India.",
    images: [
      {
        url: "/images/solar_hero_landscape.jpg",
        width: 1200,
        height: 630,
        alt: "Solvex Energy Solutions Industrial Solar Power Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvex Energy Solutions | Solar Franchise & Hardware Ecosystem",
    description:
      "Join India's fastest-growing solar franchise ecosystem under PM Surya Ghar. High-margin territorial distributorships and Tier-1 ALMM hardware.",
    images: ["/images/solar_hero_landscape.jpg"],
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
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
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
        width: 512,
        height: 512,
      },
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
          {/* Global Quick Contact Speed Dial (Working Call & WhatsApp) */}
          <QuickContactWidget />
          {/* Global Product & Subsidy Enquiry Dialog */}
          <ProductEnquiryDialog />
        </LanguageProvider>
      </body>
    </html>
  );
}

