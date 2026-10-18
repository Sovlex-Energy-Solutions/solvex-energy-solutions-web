"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cookie, FileText, Lock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type LegalTab = "privacy" | "terms";

// Custom event to open legal modal from anywhere (Footer, Contact form, Cookie banner)
export function openLegalModal(tab: LegalTab = "privacy") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-legal-modal", { detail: { tab } }));
  }
}

/**
 * Privacy Policy Content (compliant with India's DPDP Act 2023)
 */
export function PrivacyPolicyContent() {
  return (
    <div className="space-y-5 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          1. Institutional Commitment & Governance
        </h3>
        <p>
          Solvex Energy Solutions Private Limited (CIN: U43219GJ2025PTC168167) respects the integrity and confidentiality of commercial data submitted by prospective franchise partners, channel EPC distributors, and institutional clients. This Privacy Policy outlines our compliance with India&apos;s Digital Personal Data Protection Act (DPDP Act 2023) and international best practices.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          2. Collection of Commercial Onboarding Data
        </h3>
        <p>
          When you submit an application through the Commercial Enrollment Dossier, we collect:
        </p>
        <ul className="list-disc pl-5 mt-1.5 space-y-1">
          <li>Authorized executive contact credentials (Name, Official Email, Phone).</li>
          <li>Territorial jurisdiction details (District, City, Operating State).</li>
          <li>Commercial tier preferences and capital allocation ranges.</li>
          <li>Electrical trade footprint, GSTIN details, and rooftop EPC track record.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          3. Non-Disclosure & Territorial Exclusivity Protections
        </h3>
        <p>
          All applications undergo confidential internal vetting by our Commercial Committee. We do not sell, rent, or lease applicant lists or trade secrets to any third parties. Applicant information is strictly utilized to:
        </p>
        <ul className="list-disc pl-5 mt-1.5 space-y-1">
          <li>Evaluate territorial non-compete buffers and district franchise exclusivity.</li>
          <li>Verify MNRE ALMM hardware allocation quotas and DISCOM liaison feasibility.</li>
          <li>Process direct factory tariff agreements and PM Surya Ghar scheme documentation.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          4. Data Security & Retention
        </h3>
        <p>
          Submitted dossiers are encrypted in transit via TLS 1.3 and stored in compliant Tier-IV data centers. Information is retained for the active duration of the commercial relationship or up to 24 months post-evaluation for statutory audits.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          5. Grievance Redressal Officer
        </h3>
        <p>
          In accordance with the DPDP Act 2023, for inquiries, access requests, or deletion notices, contact:
        </p>
        <div className="mt-2 p-3 rounded-xl bg-zinc-100 text-zinc-800 text-xs font-mono">
          Grievance Officer: Legal & Regulatory Desk<br />
          Solvex Energy Solutions Pvt. Ltd.<br />
          204 Capital Square, Parvat Godadara BRTS Road, Surat 395010, Gujarat, India<br />
          Email: corporate@solvexenergy.com | Phone: +91-98765-43210
        </div>
      </div>
    </div>
  );
}

/**
 * Commercial Terms of Service Content
 */
export function TermsOfServiceContent() {
  return (
    <div className="space-y-5 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          1. Acceptance of Commercial Terms
        </h3>
        <p>
          By accessing the Solvex Energy Solutions commercial portal, browsing technical spec sheets, or submitting a Partnership Evaluation Form, you agree to be bound by these Terms of Commercial Service.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          2. Territorial Allocation & Dealership Rights
        </h3>
        <p>
          Submission of an enrollment dossier does not constitute an automatic grant of franchise or distributorship. Solvex reserves the unilateral right to approve or decline applicants based on existing territorial saturation, credit assessments, and technical EPC capabilities. Official rights are conferred only upon execution of a bilateral Master Franchise Agreement.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          3. Hardware Specifications & MNRE ALMM Standards
        </h3>
        <p>
          All photovoltaic modules, hybrid inverters, and heavy-duty PCUs supplied by Solvex adhere strictly to Ministry of New and Renewable Energy (MNRE) Approved Models and Manufacturers (ALMM) regulations and BIS standards. Solvex warrants linear performance metrics as detailed in official product warranty certificates.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          4. Intellectual Property
        </h3>
        <p>
          &ldquo;Solvex&rdquo;, the Solvex Energy Solutions badge, rMPPT proprietary algorithms, circuit layouts, and marketing assets remain the exclusive intellectual property of Solvex Energy Solutions Private Limited. Channel partners are granted limited, revocable licenses strictly within their authorized territory.
        </p>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 mb-1">
          5. Governing Law & Dispute Resolution
        </h3>
        <p>
          These terms are governed by the laws of the Republic of India. Any legal disputes arising from commercial partnerships or platform use shall be subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.
        </p>
      </div>
    </div>
  );
}

/**
 * Unified shadcn Dialog for Privacy Policy & Terms of Service with Tabbed Navigation
 */
export function LegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: LegalTab }>;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
      setIsOpen(true);
    };

    window.addEventListener("open-legal-modal", handleOpen);
    return () => {
      window.removeEventListener("open-legal-modal", handleOpen);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        {/* Header with Title and Description */}
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                {activeTab === "privacy"
                  ? "Commercial Privacy & Data Protection"
                  : "Commercial Terms of Service"}
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited • Surat, Gujarat (DPDP Act 2023 Compliant)
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex border-b border-black/10 bg-zinc-100/50 px-6 sm:px-8">
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
              activeTab === "privacy"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            )}
          >
            Privacy Policy (DPDP 2023)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
              activeTab === "terms"
                ? "border-emerald-600 text-emerald-700 bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            )}
          >
            Terms of Commercial Service
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-200px)] flex-1">
          {activeTab === "privacy" ? (
            <PrivacyPolicyContent />
          ) : (
            <TermsOfServiceContent />
          )}
        </div>

        {/* Dialog Footer Actions */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              I Understand & Acknowledge
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dedicated Privacy Policy Dialog (shadcn Dialog wrapper)
 */
export function PrivacyPolicyDialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                Commercial Privacy & Data Protection
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited (DPDP Act 2023 Compliant)
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-180px)] flex-1">
          <PrivacyPolicyContent />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Close Policy
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dedicated Terms & Conditions Dialog (shadcn Dialog wrapper)
 */
export function TermsDialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                Commercial Terms of Service
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited • Legal & Franchise Governance
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-180px)] flex-1">
          <TermsOfServiceContent />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Close Terms
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Enterprise Cookie Consent Banner
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("solvex_consent_preferences");
      if (!stored) {
        // Show after a brief delay for smoother UX
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleAcceptAll = () => {
    const full = { essential: true, analytics: true, marketing: true, timestamp: Date.now() };
    try {
      localStorage.setItem("solvex_consent_preferences", JSON.stringify(full));
    } catch {}
    setVisible(false);
  };

  const handleDeclineOptional = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false, timestamp: Date.now() };
    try {
      localStorage.setItem("solvex_consent_preferences", JSON.stringify(essentialOnly));
    } catch {}
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const custom = { ...preferences, essential: true, timestamp: Date.now() };
    try {
      localStorage.setItem("solvex_consent_preferences", JSON.stringify(custom));
    } catch {}
    setVisible(false);
    setShowPreferences(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-[90] p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
              Enterprise Privacy & Cookies
            </h3>
            <button
              onClick={handleDeclineOptional}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Dismiss banner with essential cookies only"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
            Solvex uses essential cookies to secure partner sessions and optional telemetry to analyze regional clean-energy demand under India&apos;s DPDP Act 2023.
          </p>

          {!showPreferences ? (
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer active:scale-95 text-center shadow-xs"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDeclineOptional}
                className="px-4 py-2 rounded-full border border-black/15 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-medium transition-all cursor-pointer text-center"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-xs text-zinc-500 hover:text-emerald-700 underline underline-offset-2 py-1 text-center cursor-pointer"
              >
                Preferences
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-3 pt-3 border-t border-black/10">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-zinc-900 block">Strictly Necessary</span>
                  <span className="text-zinc-500 text-[11px]">Security & session tokens</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Always Active
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-zinc-900 block">Regional Analytics</span>
                  <span className="text-zinc-500 text-[11px]">Territory demand metrics</span>
                </div>
                <input
                  type="checkbox"
                  id="cookie-analytics"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-zinc-900 block">Marketing & Ads</span>
                  <span className="text-zinc-500 text-[11px]">Commercial campaign tracking</span>
                </div>
                <input
                  type="checkbox"
                  id="cookie-marketing"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-4 py-1.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Save Choices
                </button>
              </div>
            </div>
          )}

          <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center gap-3 text-[11px] text-zinc-500">
            <button
              type="button"
              onClick={() => openLegalModal("privacy")}
              className="hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => openLegalModal("terms")}
              className="hover:text-emerald-700 underline underline-offset-2 cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
