"use client";

import React from "react";
import { Cookie, X } from "lucide-react";
import { useConsent } from "@/lib/consent/useConsent";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import ConsentPreferencesDialog from "./ConsentPreferencesDialog";

export default function ConsentBanner() {
  const {
    record,
    isHydrated,
    isPreferencesOpen,
    acceptAll,
    rejectAll,
    openPreferences,
    closePreferences,
  } = useConsent();

  // Show banner only if client state is hydrated and user has NOT made a decision
  const showBanner = isHydrated && record.decision === "unknown";

  return (
    <>
      {showBanner && (
        <aside
          role="region"
          aria-label="Privacy and Consent Settings"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-[90] p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
                  Privacy & Analytics Notice
                </h3>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-label="Close notice and reject optional analytics"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                We respect your privacy under India&apos;s <strong>DPDP Act 2023</strong>.
                We use essential cookies to maintain secure sessions and optional
                Google Analytics 4 to evaluate regional clean-energy demand.
                Optional analytics remain <strong>completely blocked</strong> until you choose to opt in.
              </p>

              {/* Three Clear Choices: Accept, Reject, Customize */}
              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer active:scale-95 text-center shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Accept Analytics
                </button>

                <button
                  type="button"
                  onClick={rejectAll}
                  className="px-4 py-2 rounded-full border border-black/15 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold transition-all cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Reject Optional
                </button>

                <button
                  type="button"
                  onClick={openPreferences}
                  className="text-xs text-zinc-600 hover:text-emerald-700 font-medium underline underline-offset-2 py-1 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Customize
                </button>
              </div>

              {/* Legal Notice Links */}
              <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center gap-3 text-[11px] text-zinc-500">
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
      )}

      {/* Global Preferences Dialog */}
      <ConsentPreferencesDialog
        open={isPreferencesOpen}
        onOpenChange={closePreferences}
      />
    </>
  );
}
