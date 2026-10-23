"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import CompanyStorySection from "@/components/about/CompanyStorySection";
import PillarsAndValuesSection from "@/components/about/PillarsAndValuesSection";
import InfrastructureShowcase from "@/components/about/InfrastructureShowcase";
import CertificationsSection from "@/components/about/CertificationsSection";
import NationalReachSection from "@/components/about/NationalReachSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";
import FranchiseApplicationDialog from "@/components/forms/FranchiseApplicationDialog";
import { CookieConsentBanner, LegalModal } from "@/components/ui/consent-and-legal-modals";

export default function AboutPageClient() {
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#18181B] font-sans antialiased selection:bg-primary selection:text-white">
      {/* Universal Floating Navbar */}
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col relative w-full overflow-hidden outline-none">
        {/* 1. Cinematic Hero with Headquarters & Key Metrics */}
        <AboutHero onApplyFranchise={() => setIsFranchiseOpen(true)} />

        {/* 2. Founding Genesis, Surat Roots & Strategic Milestones */}
        <CompanyStorySection />

        {/* 3. Foundational Tenets & The 4 Core Pillars */}
        <PillarsAndValuesSection />

        {/* 4. Automated Industrial Manufacturing & Testing Infrastructure */}
        <InfrastructureShowcase />

        {/* 5. Statutory Accreditations (MNRE, ALMM, BIS, ISO, DISCOM) */}
        <CertificationsSection />

        {/* 6. Pan-India Footprint & Solar Care 360 Network */}
        <NationalReachSection />

        {/* 7. Strategic Franchise & Partnership CTA */}
        <AboutCtaSection onApplyFranchise={() => setIsFranchiseOpen(true)} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Franchise Application Dialog */}
      <FranchiseApplicationDialog
        open={isFranchiseOpen}
        onOpenChange={setIsFranchiseOpen}
      />

      {/* Legal & Consent Modals */}
      <CookieConsentBanner />
      <LegalModal />
    </div>
  );
}
