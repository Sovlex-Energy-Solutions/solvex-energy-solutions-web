"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";
import { TermsOfServiceContent } from "./TermsOfServiceContent";

export type LegalTab = "privacy" | "terms";

/**
 * Custom event to open legal modal from anywhere (Footer, Contact form, Cookie banner)
 */
export function openLegalModal(tab: LegalTab = "privacy") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-legal-modal", { detail: { tab } }));
  }
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
        <div className="flex border-b border-black/10 bg-zinc-100/50 px-6 sm:px-8 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0",
              activeTab === "privacy"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            )}
          >
            Privacy Policy (DPDP 2023)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0",
              activeTab === "terms"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
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
