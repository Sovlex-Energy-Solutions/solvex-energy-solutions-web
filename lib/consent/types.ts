/**
 * Solvex Energy Solutions - Privacy & Consent Management State Types
 * Compliant with India's Digital Personal Data Protection Act (DPDP Act 2023)
 * and Google Analytics Basic Consent Mode specifications.
 */

export type ConsentDecision = "unknown" | "accepted" | "rejected" | "customized";

export interface ConsentRecord {
  /** Schema version for forward-compatible migrations */
  schemaVersion: 1;
  /** Active policy identifier matching current terms & notices */
  policyVersion: string;
  /** Primary decision taken by the visitor */
  decision: ConsentDecision;
  /** Explicit opt-in flag for Google Analytics 4 telemetry */
  analyticsGranted: boolean;
  /** Timestamp (epoch ms) of initial consent recording */
  timestamp: number;
  /** Timestamp (epoch ms) of the most recent preference change or withdrawal */
  updatedAt: number;
}

export interface ConsentStateContextType {
  record: ConsentRecord;
  hasAnalyticsConsent: boolean;
  isHydrated: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (analyticsOptIn: boolean) => void;
  withdraw: () => void;
  openPreferences: () => void;
}

export const CONSENT_STORAGE_KEY = "solvex_privacy_consent_v1";
export const CURRENT_POLICY_VERSION = "2026.1-dpdp";
export const CONSENT_CHANGE_EVENT = "solvex-consent-change";
export const OPEN_PREFERENCES_EVENT = "solvex-open-consent-preferences";
