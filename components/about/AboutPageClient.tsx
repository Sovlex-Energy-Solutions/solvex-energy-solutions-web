"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RenewablePlatformDashboard from "@/components/about/RenewablePlatformDashboard";
import { CookieConsentBanner, LegalModal } from "@/components/ui/consent-and-legal-modals";

export default function AboutPageClient() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#18181B] font-sans antialiased selection:bg-[#059669] selection:text-white">
      {/* Universal Floating Navbar */}
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col relative w-full overflow-hidden outline-none"
      >
        {/* Audited FY 2024–25 Scale & Impact Renewable Platform Dashboard */}
        <RenewablePlatformDashboard className="pt-28 sm:pt-36" />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Legal & Consent Modals */}
      <CookieConsentBanner />
      <LegalModal />
    </div>
  );
}
