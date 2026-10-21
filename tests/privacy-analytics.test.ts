/**
 * Solvex Energy Solutions - Privacy-First GA4 Integration Test Suite
 * Covers Scenarios A through G as specified in the Senior Engineer Implementation Brief.
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Mock minimal browser environment
class MockLocalStorage {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

// Global setup for Node environment
const mockStorage = new MockLocalStorage();
const eventListeners = new Map<string, Array<(e: unknown) => void>>();

(globalThis as any).window = {
  localStorage: mockStorage,
  location: {
    href: "https://solvexenergy.com/",
    origin: "https://solvexenergy.com",
    pathname: "/",
    search: "",
    hash: "",
  },
  addEventListener(event: string, cb: (e: unknown) => void) {
    if (!eventListeners.has(event)) eventListeners.set(event, []);
    eventListeners.get(event)!.push(cb);
  },
  removeEventListener(event: string, cb: (e: unknown) => void) {
    const list = eventListeners.get(event) || [];
    eventListeners.set(
      event,
      list.filter((fn) => fn !== cb)
    );
  },
  dispatchEvent(event: { type?: string; detail?: unknown }) {
    const type = (event as any).type || (event as any).detail?.type;
    const list = eventListeners.get(type) || [];
    list.forEach((fn) => fn(event));
    return true;
  },
};

(globalThis as any).document = {
  title: "Solvex Energy Solutions",
};

// Polyfill CustomEvent if needed in Node
if (typeof (globalThis as any).CustomEvent === "undefined") {
  (globalThis as any).CustomEvent = class CustomEvent {
    type: string;
    detail: unknown;
    constructor(type: string, params?: { detail?: unknown }) {
      this.type = type;
      this.detail = params?.detail;
    }
  };
}

// Imports under test
import {
  DEFAULT_DENIED_CONSENT,
  getStoredConsent,
  hasAnalyticsConsent,
  acceptAllConsent,
  rejectAllConsent,
  saveCustomConsent,
  withdrawConsent,
  validateConsentRecord,
} from "../lib/consent/state";
import {
  initGoogleAnalytics,
  trackPageView,
  trackEvent,
  withdrawAnalyticsTracking,
} from "../lib/analytics";
import {
  isValidMeasurementId,
  isAllowedEvent,
  isAllowedParamKey,
} from "../lib/analytics/config";
import {
  sanitizeUrl,
  sanitizeString,
  sanitizeParamValue,
} from "../lib/analytics/sanitizer";

describe("Privacy-First GA4 & Consent Architecture", () => {
  const TEST_GA_ID = "G-ABC123XYZ9";

  beforeEach(() => {
    mockStorage.clear();
    delete (globalThis as any).window.gtag;
    delete (globalThis as any).window.dataLayer;
    delete (globalThis as any).window[`ga-disable-${TEST_GA_ID}`];
    (globalThis as any).window.location.href = "https://solvexenergy.com/";
    (globalThis as any).window.location.pathname = "/";
    (globalThis as any).window.location.search = "";
    (globalThis as any).window.location.hash = "";
  });

  describe("Scenario A: First Visit (Privacy-by-Default)", () => {
    it("defaults to fail-closed state with analytics blocked", () => {
      const consent = getStoredConsent();
      assert.equal(consent.decision, "unknown");
      assert.equal(consent.analyticsGranted, false);
      assert.equal(hasAnalyticsConsent(), false);
    });

    it("strictly prevents GA4 initialization before consent", () => {
      const initResult = initGoogleAnalytics(TEST_GA_ID);
      assert.equal(initResult, false);
      assert.equal((globalThis as any).window.gtag, undefined);
    });

    it("strictly blocks custom event dispatch before consent", () => {
      let eventFired = false;
      (globalThis as any).window.gtag = () => {
        eventFired = true;
      };

      trackEvent("cta_click", { cta_name: "phone_call", source: "hero" });
      assert.equal(eventFired, false);
    });

    it("strictly blocks page_view dispatch before consent", () => {
      let pageViewFired = false;
      (globalThis as any).window.gtag = () => {
        pageViewFired = true;
      };

      trackPageView();
      assert.equal(pageViewFired, false);
    });
  });

  describe("Scenario B: Accept Analytics (Explicit Opt-In)", () => {
    it("persists affirmative consent record with version and timestamps", () => {
      const recorded = acceptAllConsent();
      assert.equal(recorded.decision, "accepted");
      assert.equal(recorded.analyticsGranted, true);
      assert.equal(recorded.schemaVersion, 1);
      assert.equal(recorded.policyVersion, "2026.1-dpdp");
      assert.ok(recorded.timestamp > 0);
      assert.ok(recorded.updatedAt >= recorded.timestamp);
      assert.equal(hasAnalyticsConsent(), true);
    });

    it("initializes GA4 in Basic Consent Mode after opt-in", () => {
      acceptAllConsent();

      const gtagCalls: unknown[][] = [];
      (globalThis as any).window.dataLayer = [];

      const initSuccess = initGoogleAnalytics(TEST_GA_ID);
      assert.equal(initSuccess, true);
      assert.equal(typeof (globalThis as any).window.gtag, "function");

      // Verify gtag consent commands
      const dataLayer = (globalThis as any).window.dataLayer;
      assert.ok(dataLayer.length >= 3);

      // default consent denied signal
      assert.equal(dataLayer[0][0], "consent");
      assert.equal(dataLayer[0][1], "default");
      assert.equal(dataLayer[0][2].analytics_storage, "denied");

      // update consent granted signal
      assert.equal(dataLayer[1][0], "consent");
      assert.equal(dataLayer[1][1], "update");
      assert.equal(dataLayer[1][2].analytics_storage, "granted");

      // config call
      assert.equal(dataLayer[3][0], "config");
      assert.equal(dataLayer[3][1], TEST_GA_ID);
      assert.equal(dataLayer[3][2].send_page_view, false);
      assert.equal(dataLayer[3][2].anonymize_ip, true);
    });

    it("dispatches sanitized page_view and prevents duplicate tracking", () => {
      acceptAllConsent();
      initGoogleAnalytics(TEST_GA_ID);

      const capturedEvents: any[] = [];
      const originalGtag = (globalThis as any).window.gtag;
      (globalThis as any).window.gtag = (...args: any[]) => {
        capturedEvents.push(args);
        originalGtag(...args);
      };

      (globalThis as any).window.location.href = "https://solvexenergy.com/products";
      trackPageView("https://solvexenergy.com/products");

      const pageViews = capturedEvents.filter((ev) => ev[0] === "event" && ev[1] === "page_view");
      assert.equal(pageViews.length, 1);
      assert.equal(pageViews[0][2].page_path, "/products");

      // Duplicate navigation call with identical path should be ignored
      trackPageView("https://solvexenergy.com/products");
      const pageViewsAfter = capturedEvents.filter((ev) => ev[0] === "event" && ev[1] === "page_view");
      assert.equal(pageViewsAfter.length, 1);
    });
  });

  describe("Scenario C: Reject Analytics", () => {
    it("persists rejection and blocks analytics", () => {
      const record = rejectAllConsent();
      assert.equal(record.decision, "rejected");
      assert.equal(record.analyticsGranted, false);
      assert.equal(hasAnalyticsConsent(), false);

      const initResult = initGoogleAnalytics(TEST_GA_ID);
      assert.equal(initResult, false);
    });

    it("survives reloads and keeps tracking disabled", () => {
      rejectAllConsent();

      // Read afresh
      const restored = getStoredConsent();
      assert.equal(restored.decision, "rejected");
      assert.equal(restored.analyticsGranted, false);
      assert.equal(hasAnalyticsConsent(), false);
    });
  });

  describe("Scenario D: Customize Preferences", () => {
    it("allows enabling analytics explicitly through customized choice", () => {
      saveCustomConsent(true);
      assert.equal(hasAnalyticsConsent(), true);
      const consent = getStoredConsent();
      assert.equal(consent.decision, "customized");
      assert.equal(consent.analyticsGranted, true);
    });

    it("allows disabling analytics explicitly through customized choice", () => {
      saveCustomConsent(false);
      assert.equal(hasAnalyticsConsent(), false);
      const consent = getStoredConsent();
      assert.equal(consent.decision, "customized");
      assert.equal(consent.analyticsGranted, false);
    });
  });

  describe("Scenario E: Immediate Withdrawal", () => {
    it("immediately halts future tracking and sets Google disable flags", () => {
      acceptAllConsent();
      initGoogleAnalytics(TEST_GA_ID);
      assert.equal(hasAnalyticsConsent(), true);

      let gtagUpdateCall: any = null;
      (globalThis as any).window.gtag = (...args: any[]) => {
        if (args[0] === "consent" && args[1] === "update") {
          gtagUpdateCall = args[2];
        }
      };

      // User withdraws consent
      withdrawConsent();
      withdrawAnalyticsTracking(TEST_GA_ID);

      assert.equal(hasAnalyticsConsent(), false);
      assert.equal((globalThis as any).window[`ga-disable-${TEST_GA_ID}`], true);
      assert.ok(gtagUpdateCall);
      assert.equal(gtagUpdateCall.analytics_storage, "denied");

      // Verify subsequent events are dropped immediately
      let eventDispatched = false;
      (globalThis as any).window.gtag = (...args: any[]) => {
        if (args[0] === "event") eventDispatched = true;
      };

      trackEvent("cta_click", { cta_name: "whatsapp_chat" });
      trackPageView("/contact");

      assert.equal(eventDispatched, false);
    });
  });

  describe("Scenario F: Malformed & Corrupted Storage (Fail Closed)", () => {
    it("fails closed on missing or corrupted JSON", () => {
      mockStorage.setItem("solvex_privacy_consent_v1", "{ malformed json ..");
      const consent = getStoredConsent();
      assert.deepEqual(consent, DEFAULT_DENIED_CONSENT);
      assert.equal(hasAnalyticsConsent(), false);
    });

    it("fails closed on unsupported schema version", () => {
      mockStorage.setItem(
        "solvex_privacy_consent_v1",
        JSON.stringify({
          schemaVersion: 99,
          policyVersion: "2026.1-dpdp",
          decision: "accepted",
          analyticsGranted: true,
          timestamp: 1000,
          updatedAt: 1000,
        })
      );
      assert.equal(hasAnalyticsConsent(), false);
    });

    it("fails closed on outdated policy version", () => {
      mockStorage.setItem(
        "solvex_privacy_consent_v1",
        JSON.stringify({
          schemaVersion: 1,
          policyVersion: "2020.1-old-policy",
          decision: "accepted",
          analyticsGranted: true,
          timestamp: 1000,
          updatedAt: 1000,
        })
      );
      assert.equal(hasAnalyticsConsent(), false);
    });

    it("fails closed on inconsistent decision/flag combination", () => {
      mockStorage.setItem(
        "solvex_privacy_consent_v1",
        JSON.stringify({
          schemaVersion: 1,
          policyVersion: "2026.1-dpdp",
          decision: "rejected",
          analyticsGranted: true, // Invalid combination!
          timestamp: 1000,
          updatedAt: 1000,
        })
      );
      assert.equal(hasAnalyticsConsent(), false);
    });

    it("validates Measurement ID format strictly", () => {
      assert.equal(isValidMeasurementId(undefined), false);
      assert.equal(isValidMeasurementId(""), false);
      assert.equal(isValidMeasurementId("UA-12345-6"), false);
      assert.equal(isValidMeasurementId("G-INVALID_CHAR!"), false);
      assert.equal(isValidMeasurementId("G-1234567890"), true);
      assert.equal(isValidMeasurementId("G-ABCDEF1234"), true);
    });
  });

  describe("Scenario G: URL and Parameter Privacy Sanitization", () => {
    it("sanitizes email addresses from path segments", () => {
      const { sanitizedUrl, sanitizedPath } = sanitizeUrl(
        "https://solvexenergy.com/quote/john.doe@example.com"
      );
      assert.equal(sanitizedPath, "/quote/[email]");
      assert.ok(!sanitizedUrl.includes("john.doe@example.com"));
    });

    it("sanitizes phone numbers and tokens from path segments", () => {
      const { sanitizedPath } = sanitizeUrl(
        "https://solvexenergy.com/verify/9876543210/slx98765"
      );
      assert.equal(sanitizedPath, "/verify/[phone]/[id]");
    });

    it("strips sensitive query parameters and preserves only safe allowlisted params", () => {
      const { sanitizedPath } = sanitizeUrl(
        "https://solvexenergy.com/contact?phone=9876543210&token=sec_abc123&lang=hi&tab=calculator"
      );
      assert.equal(sanitizedPath, "/contact?lang=hi&tab=calculator");
      assert.ok(!sanitizedPath.includes("phone"));
      assert.ok(!sanitizedPath.includes("token"));
    });

    it("strips hash fragments completely from URLs", () => {
      const { sanitizedUrl, sanitizedPath } = sanitizeUrl(
        "https://solvexenergy.com/solar-pcu#access_token=eyJhbGciOiJIUzI1NiJ9.test"
      );
      assert.equal(sanitizedPath, "/solar-pcu");
      assert.ok(!sanitizedUrl.includes("#"));
      assert.ok(!sanitizedUrl.includes("access_token"));
    });

    it("scrubs PII and tokens from event parameter strings", () => {
      const scrubbed = sanitizeString("Customer phone is +91-9125127755 and email test@solvex.com");
      assert.ok(!scrubbed.includes("9125127755"));
      assert.ok(!scrubbed.includes("test@solvex.com"));
      assert.ok(scrubbed.includes("[REDACTED_PHONE]"));
      assert.ok(scrubbed.includes("[REDACTED_EMAIL]"));
    });

    it("rejects sensitive parameter keys", () => {
      assert.equal(sanitizeParamValue("customer_email", "test@test.com"), undefined);
      assert.equal(sanitizeParamValue("mobile_number", "9125127755"), undefined);
      assert.equal(sanitizeParamValue("user_password", "pass123"), undefined);
      assert.equal(sanitizeParamValue("bearer_token", "jwt"), undefined);
    });

    it("allows approved parameter keys and sanitizes values", () => {
      assert.equal(sanitizeParamValue("city", "Jaipur"), "Jaipur");
      assert.equal(sanitizeParamValue("value", 5000), 5000);
      assert.equal(sanitizeParamValue("productName", "10kVA PCU"), "10kVA PCU");
    });

    it("validates allowlisted event names", () => {
      assert.equal(isAllowedEvent("page_view"), true);
      assert.equal(isAllowedEvent("cta_click"), true);
      assert.equal(isAllowedEvent("product_enquiry_submitted"), true);
      assert.equal(isAllowedEvent("arbitrary_tracker_event"), false);
      assert.equal(isAllowedEvent("user_logged_in"), false);
    });

    it("validates allowlisted parameter keys", () => {
      assert.equal(isAllowedParamKey("cta_name"), true);
      assert.equal(isAllowedParamKey("leadReferenceId"), true);
      assert.equal(isAllowedParamKey("credit_card_number"), false);
      assert.equal(isAllowedParamKey("social_security_number"), false);
    });
  });

  describe("Scenario H: Server-Side Measurement Protocol Conversion Telemetry", () => {
    const { dispatchServerConversion } = require("../lib/analytics/server");

    it("safely handles conversion dispatch when credentials are set or omitted", async () => {
      process.env.GA_MEASUREMENT_ID = "G-SLVX2026IN";
      process.env.GA_API_SECRET = "XIyfDbwq5HmtOjzgWrDtyDGd";
      process.env.ANALYTICS_SALT = "8b7a01e7d1a8596e0742955390db7be18b0931cb4f79417ec8323223a544e1ce";

      // Mock global fetch
      const originalFetch = (globalThis as any).fetch;
      let requestPayload: any = null;
      let targetUrl = "";

      (globalThis as any).fetch = async (url: string, init: any) => {
        targetUrl = url;
        requestPayload = JSON.parse(init.body);
        return { ok: true, status: 204 };
      };

      const result = await dispatchServerConversion({
        eventName: "product_enquiry_submitted",
        referenceId: "SLX-PRD-2026-98765",
        leadType: "product_buyer",
        city: "Ahmedabad",
        category: "Hybrid PCU",
      });

      assert.equal(result, true);
      assert.ok(targetUrl.includes("measurement_id=G-SLVX2026IN"));
      assert.ok(targetUrl.includes("api_secret=XIyfDbwq5HmtOjzgWrDtyDGd"));
      assert.equal(requestPayload.events[0].name, "product_enquiry_submitted");
      assert.equal(requestPayload.events[0].params.lead_reference_id, "SLX-PRD-2026-98765");
      assert.ok(requestPayload.client_id.includes("."));

      // Clean up mock
      (globalThis as any).fetch = originalFetch;
    });

    it("respects ANALYTICS_ENVIRONMENT=disabled gate", async () => {
      process.env.ANALYTICS_ENVIRONMENT = "disabled";
      const result = await dispatchServerConversion({
        eventName: "franchise_lead_submitted",
        referenceId: "SLX-PRT-2026-12345",
        leadType: "franchise_partner",
      });
      assert.equal(result, false);
      process.env.ANALYTICS_ENVIRONMENT = "production";
    });
  });
});

