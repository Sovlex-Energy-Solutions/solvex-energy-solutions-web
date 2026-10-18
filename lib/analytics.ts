/**
 * Solvex Energy Solutions - Analytics & Conversion Event Tracking
 * Dispatches events to Google Analytics (gtag.js), Google Tag Manager (dataLayer),
 * Meta Pixel (fbq), and browser telemetry.
 */

export type AnalyticsEventType =
  | "lead_form_submitted"
  | "franchise_lead_submitted"
  | "product_enquiry_submitted"
  | "calculator_simulated"
  | "calculator_lead_initiated"
  | "whatsapp_cta_clicked"
  | "call_cta_clicked"
  | "product_spec_modal_opened"
  | "legal_modal_viewed";

export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  formType?: "product_buyer" | "franchise_partner" | "calculator_survey";
  productName?: string;
  systemSizeKw?: string | number;
  leadReferenceId?: string;
  sourceLocation?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Universal Event Dispatcher
 */
export function trackEvent(
  eventName: AnalyticsEventType | string,
  params: AnalyticsEventParams = {}
): void {
  const timestamp = new Date().toISOString();
  const eventPayload = {
    ...params,
    timestamp,
    page_url: typeof window !== "undefined" ? window.location.href : "",
  };

  // 1. Log in development mode
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(`%c[Analytics Event]%c ${eventName}`, "color: #10b981; font-weight: bold;", "color: inherit;", eventPayload);
  }

  if (typeof window === "undefined") return;

  try {
    // 2. Google Analytics 4 (gtag)
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventPayload);
    }

    // 3. Google Tag Manager (dataLayer push)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });

    // 4. Meta Pixel (fbq) for lead & contact conversions
    if (typeof window.fbq === "function") {
      if (eventName.includes("lead") || eventName.includes("submitted")) {
        window.fbq("track", "Lead", eventPayload);
      } else if (eventName.includes("whatsapp") || eventName.includes("call")) {
        window.fbq("track", "Contact", eventPayload);
      } else {
        window.fbq("trackCustom", eventName, eventPayload);
      }
    }
  } catch (err) {
    // Non-blocking telemetry error suppression
    // eslint-disable-next-line no-console
    console.warn("Analytics dispatch warning:", err);
  }
}
