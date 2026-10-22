import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import QuickContactWidget from "@/components/ui/QuickContactWidget";
import ProductEnquiryDialog from "@/components/forms/ProductEnquiryDialog";
import GoogleAnalyticsLoader from "@/components/analytics/GoogleAnalyticsLoader";
import { siteMetadata, viewport as siteViewport } from "@/config/metadata";
import { siteJsonLd } from "@/config/jsonld";

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

export const viewport: Viewport = siteViewport;
export const metadata: Metadata = siteMetadata;

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
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
