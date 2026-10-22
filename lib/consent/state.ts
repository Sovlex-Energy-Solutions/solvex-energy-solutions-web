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
 * Write consent record to document.cookie (Cookie Storage)
 */
export function setConsentCookie(record: ConsentRecord): void {
  if (typeof document === "undefined") return;

  try {
    const serialized = encodeURIComponent(JSON.stringify(record));
    const maxAge = 60 * 60 * 24 * 365; // 365 days
    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const secureFlag = isHttps ? "; Secure" : "";

    document.cookie = `${CONSENT_STORAGE_KEY}=${serialized}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
  } catch {
    // Fail safe in restricted environments
  }
}

/**
 * Read and validate consent record from document.cookie (Cookie Storage)
 */
export function getConsentCookie(): ConsentRecord | null {
  if (typeof document === "undefined" || !document.cookie) return null;

  try {
    const match = document.cookie.match(
      new RegExp("(?:^|;\\s*)" + CONSENT_STORAGE_KEY + "=([^;]*)")
    );
    if (!match || !match[1]) return null;

    const raw = decodeURIComponent(match[1]);
    const parsed = JSON.parse(raw);
    return validateConsentRecord(parsed);
  } catch {
    return null;
  }
}

/**
 * Read current consent from browser storage (LocalStorage with Cookie Storage fallback).
 * Always fails closed to DEFAULT_DENIED_CONSENT if anything goes wrong.
 */
export function getStoredConsent(): ConsentRecord {
  if (typeof window === "undefined") {
    return DEFAULT_DENIED_CONSENT;
  }

  // 1. Check LocalStorage
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const valid = validateConsentRecord(parsed);
      if (valid) return valid;
    }
  } catch {
    // LocalStorage quota or access error in private browsing
  }

  // 2. Fallback to Cookie Storage
  try {
    const cookieRecord = getConsentCookie();
    if (cookieRecord) {
      // Re-populate localStorage if available
      try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(cookieRecord));
      } catch {
        // Ignore quota/access errors
      }
      return cookieRecord;
    }
  } catch {
    // Fall back to fail-closed
  }

  return DEFAULT_DENIED_CONSENT;
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
 * Persist consent record to both LocalStorage and Cookie Storage, then notify subscribers.
 */
function persistConsentRecord(record: ConsentRecord): void {
  if (typeof window === "undefined") return;

  // 1. Persist to LocalStorage
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // LocalStorage may be blocked in private browsing
  }

  // 2. Persist to Cookie Storage
  try {
    setConsentCookie(record);
  } catch {
    // Fail safe
  }

  // 3. Dispatch notification event for reactive subscribers
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
