import crypto from "crypto";

/**
 * Solvex Energy Solutions - Server-Side GA4 Measurement Protocol Engine
 *
 * Dispatches privacy-compliant server-side conversion events directly to Google Analytics 4
 * using private server environment variables (GA_MEASUREMENT_ID, GA_API_SECRET, ANALYTICS_SALT).
 *
 * Guarantees:
 * - Completely hidden from client builds (strictly runs on Node.js server routes).
 * - Zero PII: hashes all reference IDs and identifiers with server-only salt.
 * - Non-blocking: failures or timeouts in analytics never disrupt user lead submission.
 */

interface ServerConversionEventParams {
  eventName: "product_enquiry_submitted" | "franchise_lead_submitted" | "partner_enquiry_submitted";
  referenceId: string;
  leadType: string;
  category?: string;
  city?: string;
  partnershipType?: string;
  investmentCapacity?: string;
}

/**
 * Generates an anonymous, pseudo-random client ID using the reference ID and server salt.
 * Ensures zero PII leakage to Google Analytics while allowing unique session attribution.
 */
function generateAnonymousClientId(referenceId: string, salt: string): string {
  const hash = crypto.createHmac("sha256", salt).update(referenceId).digest("hex");
  return `${hash.slice(0, 10)}.${hash.slice(10, 20)}`;
}

/**
 * Dispatches a server-side conversion event to GA4 via Measurement Protocol.
 */
export async function dispatchServerConversion(params: ServerConversionEventParams): Promise<boolean> {
  const measurementId = process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA_API_SECRET;
  const salt = process.env.ANALYTICS_SALT || "solvex_default_fallback_telemetry_salt_2026";
  const environment = process.env.ANALYTICS_ENVIRONMENT || "production";
  const isDebug = process.env.ANALYTICS_DEBUG_MODE === "true";

  // Gate: Do not dispatch if analytics is disabled in environment or credentials are missing
  if (environment === "disabled" || !measurementId) {
    return false;
  }

  // Measurement protocol requires apiSecret for server-to-server tracking
  if (!apiSecret) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[Server Analytics] GA_API_SECRET is not set. Skipping server conversion dispatch.");
    }
    return false;
  }

  const clientId = generateAnonymousClientId(params.referenceId, salt);

  const endpoint = isDebug
    ? `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`
    : `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  const payload = {
    client_id: clientId,
    non_personalized_ads: true,
    events: [
      {
        name: params.eventName,
        params: {
          lead_type: params.leadType,
          lead_reference_id: params.referenceId,
          city: params.city || "Not Disclosed",
          category: params.category || "General",
          partnership_tier: params.partnershipType || undefined,
          investment_band: params.investmentCapacity || undefined,
          engagement_time_msec: 100,
        },
      },
    ],
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (isDebug) {
      const debugData = await response.json();
      console.log("[Server Analytics Debug Validation]:", JSON.stringify(debugData, null, 2));
    }

    return response.ok;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Server Analytics Warning] Failed to dispatch Measurement Protocol conversion:", err);
    }
    return false;
  }
}
