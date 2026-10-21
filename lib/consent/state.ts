/**
 * Solvex Energy Solutions - Consent State Machine & Persistence
 * Fail-closed design: Defaults to completely denied until explicit opt-in.
 */

import {
  ConsentRecord,
  ConsentDecision,
  CONSENT_STORAGE_KEY,
  CURRENT_POLICY_VERSION,
  CONSENT_CHANGE_EVENT,
  OPEN_PREFERENCES_EVENT,
} from "./types";

/**
 * Baseline default consent state (fail-closed, strictly denied)
 */
export const DEFAULT_DENIED_CONSENT: ConsentRecord = Object.freeze({
  schemaVersion: 1,
  policyVersion: CURRENT_POLICY_VERSION,
  decision: "unknown",
  analyticsGranted: false,
  timestamp: 0,
  updatedAt: 0,
});

/**
 * Validate a candidate consent record at runtime.
 * Any malformed, missing, tampered, or unsupported schema immediately returns null.
 */
export function validateConsentRecord(data: unknown): ConsentRecord | null {
  if (!data || typeof data !== "object") return null;

  const candidate = data as Record<string, unknown>;

  if (candidate.schemaVersion !== 1) return null;
  if (typeof candidate.policyVersion !== "string" || !candidate.policyVersion) return null;

  const validDecisions: ConsentDecision[] = ["unknown", "accepted", "rejected", "customized"];
  if (
    typeof candidate.decision !== "string" ||
    !validDecisions.includes(candidate.decision as ConsentDecision)
  ) {
    return null;
  }

  if (typeof candidate.analyticsGranted !== "boolean") return null;
  if (typeof candidate.timestamp !== "number" || isNaN(candidate.timestamp)) return null;
  if (typeof candidate.updatedAt !== "number" || isNaN(candidate.updatedAt)) return null;

  // Inconsistent states: decision 'rejected' cannot have analyticsGranted true
  if (candidate.decision === "rejected" && candidate.analyticsGranted === true) {
    return null;
  }

  // If policy version has migrated, treat as unknown to require fresh notice
  if (candidate.policyVersion !== CURRENT_POLICY_VERSION) {
    return null;
  }

  return {
    schemaVersion: 1,
    policyVersion: candidate.policyVersion,
    decision: candidate.decision as ConsentDecision,
    analyticsGranted: candidate.analyticsGranted,
    timestamp: candidate.timestamp,
    updatedAt: candidate.updatedAt,
  };
}

/**
 * Read current consent from browser storage.
 * Always fails closed to DEFAULT_DENIED_CONSENT if anything goes wrong.
 */
export function getStoredConsent(): ConsentRecord {
  if (typeof window === "undefined") {
    return DEFAULT_DENIED_CONSENT;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_DENIED_CONSENT;

    const parsed = JSON.parse(raw);
    const valid = validateConsentRecord(parsed);
    return valid || DEFAULT_DENIED_CONSENT;
  } catch {
    // LocalStorage quota or access error in private browsing -> fail closed
    return DEFAULT_DENIED_CONSENT;
  }
}

/**
 * Check whether analytics tracking is strictly permitted.
 * Returns true ONLY if explicit affirmative opt-in was recorded.
 */
export function hasAnalyticsConsent(): boolean {
  const current = getStoredConsent();
  return (
    current.decision !== "unknown" &&
    current.decision !== "rejected" &&
    current.analyticsGranted === true
  );
}

/**
 * Persist consent record and notify subscribers
 */
function persistConsentRecord(record: ConsentRecord): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Log safe warning if local storage is blocked
  }

  try {
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { record } })
    );
  } catch {
    // Ignore dispatch error in unsupported environments
  }
}

/**
 * User action: Accept all optional analytics
 */
export function acceptAllConsent(): ConsentRecord {
  const now = Date.now();
  const existing = getStoredConsent();
  const record: ConsentRecord = {
    schemaVersion: 1,
    policyVersion: CURRENT_POLICY_VERSION,
    decision: "accepted",
    analyticsGranted: true,
    timestamp: existing.timestamp || now,
    updatedAt: now,
  };
  persistConsentRecord(record);
  return record;
}

/**
 * User action: Reject all optional analytics
 */
export function rejectAllConsent(): ConsentRecord {
  const now = Date.now();
  const existing = getStoredConsent();
  const record: ConsentRecord = {
    schemaVersion: 1,
    policyVersion: CURRENT_POLICY_VERSION,
    decision: "rejected",
    analyticsGranted: false,
    timestamp: existing.timestamp || now,
    updatedAt: now,
  };
  persistConsentRecord(record);
  return record;
}

/**
 * User action: Save customized preference
 */
export function saveCustomConsent(analyticsOptIn: boolean): ConsentRecord {
  const now = Date.now();
  const existing = getStoredConsent();
  const record: ConsentRecord = {
    schemaVersion: 1,
    policyVersion: CURRENT_POLICY_VERSION,
    decision: "customized",
    analyticsGranted: analyticsOptIn,
    timestamp: existing.timestamp || now,
    updatedAt: now,
  };
  persistConsentRecord(record);
  return record;
}

/**
 * User action: Withdraw consent immediately
 */
export function withdrawConsent(): ConsentRecord {
  return rejectAllConsent();
}

/**
 * Trigger global event to open consent preferences modal
 */
export function openConsentPreferences(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
  }
}
