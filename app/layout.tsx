import type { Metadata } from "next";
import { Geist, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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

export const metadata: Metadata = {
  title: "Solvex Energy Solutions | Clean Energy & Solar Franchise Ecosystem",
  description:
    "Launch a low-cost, high-support solar business under PM Surya Ghar with Solvex Energy Solutions. Onboarding, EPC execution, subsidies and certified training.",
  keywords: [
    "Solvex Energy Solutions",
    "Solvex Energy",
    "Solar franchise India",
    "PM Surya Ghar",
    "Rooftop solar",
    "Solar EPC",
    "Solar business opportunity",
    "Renewable energy",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
        <noscript>
          <style>{`
            #solvex-cinematic-preloader { display: none !important; }
            body { overflow: auto !important; }
          `}</style>
        </noscript>
      </head>
      <body className="bg-[#FFFFFF] text-[#18181B] font-sans antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
