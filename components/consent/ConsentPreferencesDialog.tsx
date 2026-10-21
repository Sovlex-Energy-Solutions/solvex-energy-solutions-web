"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useConsent } from "@/lib/consent/useConsent";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";

interface ConsentPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PreferencesFormContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const { record, saveCustom, rejectAll } = useConsent();

  // Initialize from current saved preference (never pre-checked for new users)
  const initialChecked = record.decision !== "rejected" && record.analyticsGranted;
  const [analyticsOptIn, setAnalyticsOptIn] = useState<boolean>(initialChecked);

  const handleSave = () => {
    saveCustom(analyticsOptIn);
    onClose();
  };

  const handleRejectAll = () => {
    rejectAll();
    setAnalyticsOptIn(false);
    onClose();
  };

  return (
    <>
      {/* Categories List */}
      <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
        {/* Explanation of Choice */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-xs leading-relaxed">
          <p>
            In compliance with the <strong>Digital Personal Data Protection Act, 2023</strong>,
            all optional telemetry remains strictly blocked until you give express opt-in consent.
            You may adjust or withdraw consent at any time without penalty.
          </p>
        </div>

        {/* 1. Essential Category */}
        <div className="p-4 rounded-xl border border-black/10 bg-zinc-50 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                1. Essential Website Functionality
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Always Active
            </span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Required for core website security, language preferences (English/Hindi),
            CSRF protection, and enquiry routing. These cannot be disabled as the site
            cannot function safely without them. No cross-site profiling is performed.
          </p>
        </div>

        {/* 2. Optional Analytics Category */}
        <div className="p-4 rounded-xl border border-black/10 bg-white space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <label
                  htmlFor="analytics-toggle"
                  className="font-bold text-zinc-900 text-xs sm:text-sm cursor-pointer select-none"
                >
                  2. Regional Telemetry & Analytics
                </label>
              </div>
              <p className="text-[11px] font-medium text-zinc-500">
                Recipient: Google Analytics 4 (Google Ireland Limited / Google LLC)
              </p>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <Checkbox
                id="analytics-toggle"
                checked={analyticsOptIn}
                onCheckedChange={(checked) => setAnalyticsOptIn(Boolean(checked))}
                aria-label="Allow Google Analytics 4 Telemetry"
              />
            </div>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            Helps us measure regional clean-energy interest across Indian states and districts,
            identifying demand for solar inverters and PM Surya Ghar subsidies.
          </p>

          <div className="pt-1 text-[11px] text-zinc-500 space-y-1">
            <p>• <strong>Safeguards:</strong> Basic Consent Mode (no scripts load without opt-in), IP anonymization active, and automatic PII scrubbing enabled.</p>
            <p>• <strong>Prohibited:</strong> No names, email addresses, phone numbers, or quotation form inputs are ever sent.</p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                openLegalModal("privacy");
              }}
              className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 cursor-pointer"
            >
              <span>Read Full Privacy Notice & Retention Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Current Selection Status */}
        <div className="text-xs text-zinc-500 flex items-center justify-between px-1">
          <span>Current Status:</span>
          <span className="font-semibold text-zinc-800">
            {record.decision === "accepted" || (record.decision === "customized" && record.analyticsGranted)
              ? "Analytics Permitted"
              : record.decision === "rejected" || (record.decision === "customized" && !record.analyticsGranted)
              ? "Analytics Denied (Blocked)"
              : "No Choice Recorded (Default: Blocked)"}
          </span>
        </div>
      </div>

      {/* Dialog Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-6 py-4 border-t border-black/10 bg-zinc-50">
        <button
          type="button"
          onClick={handleRejectAll}
          className="px-4 py-2 rounded-full border border-black/15 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-semibold transition-all cursor-pointer text-center"
        >
          Reject Optional Analytics
        </button>

        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-zinc-600 hover:text-zinc-900 text-xs font-medium transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </>
  );
}

export default function ConsentPreferencesDialog({
  open,
  onOpenChange,
}: ConsentPreferencesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl max-h-[90vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border border-black/10 bg-white shadow-2xl"
        aria-describedby="privacy-preferences-desc"
      >
        {/* Dialog Header */}
        <DialogHeader className="px-6 py-5 border-b border-black/10 bg-zinc-50/90 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                Privacy & Analytics Preferences
              </DialogTitle>
              <DialogDescription
                id="privacy-preferences-desc"
                className="text-xs text-zinc-500 font-mono mt-0.5"
              >
                DPDP Act 2023 Compliant • Solvex Energy Solutions Private Limited
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {open && <PreferencesFormContent onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
