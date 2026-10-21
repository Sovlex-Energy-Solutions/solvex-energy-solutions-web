/**
 * Solvex Energy Solutions - Analytics Allowlist & Security Configuration
 * Strict Data Minimization & Privacy-by-Design
 */

export const GA_MEASUREMENT_ID_ENV =
  typeof window === "undefined"
    ? process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID
    : process.env.NEXT_PUBLIC_GA_ID;

/**
 * Validates Google Analytics 4 Measurement ID format (G-XXXXXXXXXX)
 */
export function isValidMeasurementId(id?: string | null): boolean {
  if (!id) return false;
  return /^G-[A-Z0-9]+$/i.test(id.trim());
}

/**
 * Strictly allowlisted event names.
 * Unknown events are rejected in accordance with data minimization.
 */
export const ALLOWED_ANALYTICS_EVENTS = [
  "page_view",
  "cta_click",
  "whatsapp_cta_clicked",
  "call_cta_clicked",
  "product_enquiry_submitted",
  "partner_enquiry_submitted",
  "franchise_lead_submitted",
  "calculator_simulated",
  "calculator_lead_initiated",
  "product_spec_modal_opened",
  "legal_modal_viewed",
  "consent_preferences_opened",
  "consent_choice_made",
] as const;

export type AllowedAnalyticsEventType = (typeof ALLOWED_ANALYTICS_EVENTS)[number];

export function isAllowedEvent(eventName: string): eventName is AllowedAnalyticsEventType {
  return (ALLOWED_ANALYTICS_EVENTS as readonly string[]).includes(eventName);
}

/**
 * Strictly allowlisted parameter keys.
 * Prohibits raw objects, user profile dumps, form field values, or unvetted keys.
 */
export const ALLOWED_PARAMETER_KEYS = [
  "page_location",
  "page_path",
  "page_title",
  "cta_name",
  "source",
  "category",
  "label",
  "value",
  "formType",
  "productName",
  "systemSizeKw",
  "leadReferenceId",
  "partnership_tier",
  "investment_band",
  "city",
  "consent_type",
  "timestamp",
] as const;

export type AllowedParameterKey = (typeof ALLOWED_PARAMETER_KEYS)[number];

export function isAllowedParamKey(key: string): key is AllowedParameterKey {
  return (ALLOWED_PARAMETER_KEYS as readonly string[]).includes(key);
}
