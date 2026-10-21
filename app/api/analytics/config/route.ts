import { NextResponse } from "next/server";
import { isValidMeasurementId } from "@/lib/analytics/config";

/**
 * Server-side Runtime Analytics Configuration Endpoint
 *
 * Keeps analytics identifiers and secrets hidden from client-side build bundles.
 * Client components query this endpoint ONLY after affirmative user consent is granted.
 */
export async function GET() {
  // Read private server-side environment variables hidden from client bundles
  const serverMeasurementId = process.env.GA_MEASUREMENT_ID;
  const publicMeasurementId = process.env.NEXT_PUBLIC_GA_ID;

  const measurementId = (serverMeasurementId || publicMeasurementId || "").trim();

  // Fail closed if analytics is disabled via environment or ID is missing/invalid
  if (
    process.env.ANALYTICS_ENVIRONMENT === "disabled" ||
    !isValidMeasurementId(measurementId)
  ) {
    return NextResponse.json(
      {
        enabled: false,
        measurementId: null,
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
        },
      }
    );
  }

  return NextResponse.json(
    {
      enabled: true,
      measurementId,
    },
    {
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    }
  );
}
