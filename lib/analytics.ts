/**
 * Solvex Energy Solutions - Privacy-First Centralized Analytics Engine
 * Compliant with DPDP Act 2023, Basic Consent Mode, and strict Data Minimization.
 *
 * Guarantees:
 * - No tracking before explicit affirmative consent.
 * - Centralized event and parameter allowlisting.
 * - Automatic PII stripping from all payloads and URLs.
 * - Immediate withdrawal enforcement (Google opt-out + storage denial).
 */

import { hasAnalyticsConsent } from "./consent/state";
import {
  GA_MEASUREMENT_ID_ENV,
  isValidMeasurementId,
  isAllowedEvent,
  isAllowedParamKey,
  AllowedAnalyticsEventType,
  AllowedParameterKey,
} from "./analytics/config";
import { sanitizeUrl, sanitizeParamValue } from "./analytics/sanitizer";

export type AnalyticsEventType = AllowedAnalyticsEventType;

export type AnalyticsEventParams = {
  [K in AllowedParameterKey]?: string | number | boolean;
} & Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

// Track the last recorded page path to prevent duplicate page_views
let lastTrackedPath: string | null = null;

/**
 * Get active validated Measurement ID
 */
export function getMeasurementId(): string | null {
  const id = GA_MEASUREMENT_ID_ENV;
  if (!id || !isValidMeasurementId(id)) {
    return null;
  }
  return id.trim();
}

/**
 * Initialize Google Analytics 4 in Basic Consent Mode
 * Called ONLY after affirmative consent is established.
 */
export function initGoogleAnalytics(overrideId?: string): boolean {
  if (typeof window === "undefined") return false;

  const gaId = overrideId || getMeasurementId();
  if (!gaId || !isValidMeasurementId(gaId)) {
    if (process.env.NODE_ENV !== "production") {
      // Safe diagnostic log in development
      console.info("[Analytics] No valid NEXT_PUBLIC_GA_ID configured. Tracking inactive.");
    }
    return false;
  }

  // Pre-condition: Strict fail-closed consent check
  if (!hasAnalyticsConsent()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Analytics] Initialization blocked: No affirmative analytics consent.");
    }
    return false;
  }

  // Lift any previous disable flag
  window[`ga-disable-${gaId}`] = false;

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // 1. Configure Basic Consent Mode signals
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  // 2. Elevate analytics storage on valid opt-in
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });

  // 3. Configure Google Analytics instance with security safeguards
  window.gtag("js", new Date());
  window.gtag("config", gaId, {
    send_page_view: false, // Page views are controlled manually to enforce URL sanitization
    anonymize_ip: true,
    cookie_flags: "SameSite=Lax;Secure",
  });

  return true;
}

/**
 * Dispatches a sanitized page_view event to GA4
 * Strictly blocked until consent is granted. Idempotent.
 */
export function trackPageView(customPath?: string): void {
  if (typeof window === "undefined") return;

  // 1. Strict consent check
  if (!hasAnalyticsConsent()) return;

  const rawUrl = customPath || window.location.href;
  const { sanitizedUrl, sanitizedPath } = sanitizeUrl(rawUrl);

  // Prevent duplicate page views for unchanged path (e.g. React Strict Mode)
  if (lastTrackedPath === sanitizedPath) {
    return;
  }
  lastTrackedPath = sanitizedPath;

  const pageTitle = typeof document !== "undefined" ? document.title : "";

  // Dispatch sanitized page_view
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_location: sanitizedUrl,
      page_path: sanitizedPath,
      page_title: pageTitle.slice(0, 100),
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "%c[Analytics Page View]%c " + sanitizedPath,
      "color: #10b981; font-weight: bold;",
      "color: inherit;",
      { location: sanitizedUrl }
    );
  }
}

/**
 * Universal Safe Event Dispatcher
 * Strictly validates event names and parameters, drops unknown keys, and strips PII.
 */
export function trackEvent(
  eventName: AnalyticsEventType | string,
  params: AnalyticsEventParams = {}
): void {
  if (typeof window === "undefined") return;

  // 1. Strict Consent Check - Fail closed
  if (!hasAnalyticsConsent()) {
    return;
  }

  // 2. Validate Event Name against allowlist
  if (!isAllowedEvent(eventName)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Analytics Blocked] Event '${eventName}' is not in the approved allowlist.`);
    }
    return;
  }

  // 3. Sanitize and Filter Parameters against allowlist
  const sanitizedPayload: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (!isAllowedParamKey(key)) {
      continue; // Drop unapproved parameters
    }

    const cleanedVal = sanitizeParamValue(key, value);
    if (cleanedVal !== undefined) {
      sanitizedPayload[key] = cleanedVal;
    }
  }

  // Append safe timestamp
  sanitizedPayload.timestamp = new Date().toISOString();

  // Log in development mode
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `%c[Analytics Event]%c ${eventName}`,
      "color: #10b981; font-weight: bold;",
      "color: inherit;",
      sanitizedPayload
    );
  }

  try {
    // Dispatch to GA4
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, sanitizedPayload);
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Analytics Warning] Failed to dispatch event:", err);
    }
  }
}

/**
 * Centralized Consent Withdrawal Operation
 * Immediately revokes analytics storage, engages Google opt-out, and clears tracking state.
 */
export function withdrawAnalyticsTracking(overrideId?: string): void {
  lastTrackedPath = null;

  if (typeof window === "undefined") return;

  const gaId = overrideId || getMeasurementId();

  // 1. Activate Google Analytics official disable flag
  if (gaId) {
    window[`ga-disable-${gaId}`] = true;
  }

  // Also disable any existing ga-disable keys on window
  for (const key of Object.keys(window)) {
    if (key.startsWith("ga-disable-")) {
      window[key as `ga-disable-${string}`] = true;
    }
  }

  // 2. Deny analytics storage via gtag
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[Analytics] Consent withdrawn. Google Analytics disabled and storage revoked.");
  }
}
