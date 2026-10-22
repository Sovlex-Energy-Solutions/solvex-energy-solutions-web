"use client";

import React from "react";
import ConsentBanner from "@/components/consent/ConsentBanner";
import {
  openLegalModal,
  LegalModal,
  type LegalTab,
} from "@/components/legal/LegalModal";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";
import { TermsOfServiceContent } from "@/components/legal/TermsOfServiceContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ShieldCheck, FileText } from "lucide-react";

export type { LegalTab };
export { openLegalModal, LegalModal, PrivacyPolicyContent, TermsOfServiceContent };

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
 * Enterprise Cookie Consent Banner (Wraps the Privacy-First ConsentBanner)
 */
export function CookieConsentBanner() {
  return <ConsentBanner />;
}
