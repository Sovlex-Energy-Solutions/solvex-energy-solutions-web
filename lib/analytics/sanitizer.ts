/**
 * Solvex Energy Solutions - Privacy Sanitizer Engine
 * Enforces strict data minimization by scrubbing PII, tokens, and unsafe query parameters
 * from URLs, referrers, and event parameters prior to dispatch.
 */

// Safe query parameters strictly allowed in analytics URLs
const ALLOWED_QUERY_PARAMS = new Set(["lang", "tab", "category", "page"]);

// Regex patterns for sensitive data detection
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const PHONE_REGEX = /(?:\+?91[\s-]?)?[6-9]\d{9}|\b\d{10,12}\b/g;
const JWT_REGEX = /\beyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g;
const HEX_HASH_REGEX = /\b[a-f0-9]{32,64}\b/gi;
const GENERIC_TOKEN_REGEX = /(?:bearer|token|secret|password|api[_-]?key)[=:\s]+[a-zA-Z0-9_\-]{6,}/gi;

/**
 * Sanitize a raw string to remove accidental personal data leakage
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") return "";

  let cleaned = input
    .replace(EMAIL_REGEX, "[REDACTED_EMAIL]")
    .replace(JWT_REGEX, "[REDACTED_TOKEN]")
    .replace(HEX_HASH_REGEX, "[REDACTED_HASH]")
    .replace(GENERIC_TOKEN_REGEX, "[REDACTED_SECRET]")
    .replace(PHONE_REGEX, "[REDACTED_PHONE]");

  // Length cap to avoid buffer overflows or telemetry payload stuffing
  if (cleaned.length > 120) {
    cleaned = cleaned.slice(0, 120);
  }

  return cleaned;
}

/**
 * Sanitize a URL (or relative path) before sending to Google Analytics.
 * - Discards hash fragments completely (often contain tokens or anchors)
 * - Allowlist-only query parameter filtering
 * - Replaces identifying path segments (emails, IDs, tokens) with placeholders
 */
export function sanitizeUrl(rawUrl: string, baseOrigin = "https://solvexenergy.com"): {
  sanitizedUrl: string;
  sanitizedPath: string;
} {
  if (!rawUrl || typeof rawUrl !== "string") {
    return {
      sanitizedUrl: baseOrigin + "/",
      sanitizedPath: "/",
    };
  }

  try {
    // Resolve to URL object
    const parsed = rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? new URL(rawUrl)
      : new URL(rawUrl, baseOrigin);

    // 1. Sanitize Path Segments
    const segments = parsed.pathname.split("/").map((seg) => {
      if (!seg) return "";
      // If segment is an email
      if (EMAIL_REGEX.test(decodeURIComponent(seg))) {
        return "[email]";
      }
      // If segment is a phone number
      if (PHONE_REGEX.test(decodeURIComponent(seg))) {
        return "[phone]";
      }
      // If segment looks like an ID, UUID, inquiry reference code, or hash
      if (
        /^\d{4,}$/.test(seg) ||
        /^(?:[a-zA-Z]{1,6}[-_]?)?\d{4,}[a-zA-Z0-9_-]*$/i.test(seg) ||
        /^[a-f0-9]{8,}(-[a-f0-9]{4,}){3}[a-f0-9]{8,}$/i.test(seg)
      ) {
        return "[id]";
      }
      // If segment is a token
      if (JWT_REGEX.test(seg) || HEX_HASH_REGEX.test(seg)) {
        return "[token]";
      }
      // Sanitize standard segment
      return sanitizeString(seg);
    });

    const safePathname = segments.join("/") || "/";

    // 2. Allowlist-only Query Parameter Filtering
    const safeSearchParams = new URLSearchParams();
    parsed.searchParams.forEach((val, key) => {
      const lowerKey = key.toLowerCase();
      if (ALLOWED_QUERY_PARAMS.has(lowerKey)) {
        // Even for allowlisted keys, sanitize the value for PII
        const sanitizedVal = sanitizeString(val);
        safeSearchParams.set(lowerKey, sanitizedVal);
      }
    });

    const queryString = safeSearchParams.toString();
    const safePath = queryString ? `${safePathname}?${queryString}` : safePathname;
    const safeUrl = `${parsed.origin}${safePath}`;

    return {
      sanitizedUrl: safeUrl,
      sanitizedPath: safePath,
    };
  } catch {
    // Fallback on parse failure
    return {
      sanitizedUrl: baseOrigin + "/",
      sanitizedPath: "/",
    };
  }
}

/**
 * Sanitize an individual event parameter value.
 * Prohibits complex objects, functions, or un-sanitized strings.
 */
export function sanitizeParamValue(
  key: string,
  value: unknown
): string | number | boolean | undefined {
  if (value === null || value === undefined) return undefined;

  // Block sensitive keys completely
  const lowerKey = key.toLowerCase();
  if (
    lowerKey.includes("email") ||
    lowerKey.includes("phone") ||
    lowerKey.includes("mobile") ||
    lowerKey.includes("token") ||
    lowerKey.includes("password") ||
    lowerKey.includes("secret") ||
    lowerKey.includes("firstname") ||
    lowerKey.includes("lastname") ||
    lowerKey.includes("address") ||
    lowerKey.includes("aadhaar") ||
    lowerKey.includes("pan")
  ) {
    return undefined;
  }

  if (typeof value === "boolean") return value;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  // Reject objects, functions, arrays to avoid arbitrary memory serialization
  return undefined;
}
