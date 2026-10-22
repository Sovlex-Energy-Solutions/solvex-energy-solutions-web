import { NextResponse } from "next/server";
import { z } from "zod";
import { dispatchServerConversion } from "@/lib/analytics/server";

// Schema for Franchise & Dealership Application
const franchiseSchema = z.object({
  leadType: z.string().optional().default("franchise_partner"),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid 10-digit mobile number is required"),
  city: z.string().min(2, "City / District is required"),
  state: z.string().optional().default("Rajasthan"),
  pincode: z.string().optional(),
  pinCode: z.string().optional(),
  applicantType: z.string().optional(),
  opportunity: z.string().optional(),
  timeline: z.string().optional(),
  investment: z.string().optional(),
  partnershipType: z.string().optional().default("distributor"),
  investmentCapacity: z.string().optional().default("₹5–10 lakh"),
  experience: z.string().optional().default(""),
  notes: z.string().optional(),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing is required",
  }),
  channelSource: z.string().optional().default("hero_apply_franchise_modal"),
});

// Helper to format friendly labels
const TIER_MAP: Record<string, string> = {
  distributor: "Distributor Partner (Territory)",
  master: "Master Distributor (State / Zone)",
  channel: "Channel EPC Partner",
  merchant: "Retail Merchant Store",
};

const CAPITAL_MAP: Record<string, string> = {
  tier1: "₹2,00,000 - ₹5,00,000",
  tier2: "₹5,00,000 - ₹15,00,000",
  tier3: "₹15,00,000 - ₹30,00,000",
  tier4: "₹30,00,000+ (Institutional Master)",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = franchiseSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten(),
          message: "Validation failed. Please verify required fields.",
        },
        { status: 400 }
      );
    }

    const lead = parseResult.data;

    // Resolve names
    let firstName = lead.firstName || "";
    let lastName = lead.lastName || "";
    if (!firstName && lead.fullName) {
      const parts = lead.fullName.trim().split(" ");
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }
    const fullName = lead.fullName || `${firstName} ${lastName}`.trim();

    // Generate Reference ID
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `SLX-PRT-${year}-${randomSuffix}`;
    const submittedAt = new Date().toISOString();

    const formattedTier = TIER_MAP[lead.partnershipType] || lead.partnershipType;
    const formattedCapital = CAPITAL_MAP[lead.investmentCapacity] || lead.investment || lead.investmentCapacity;
    const pincode = lead.pincode || lead.pinCode || "";

    const payloadForSheet = {
      leadType: "franchise_partner",
      referenceId,
      submittedAt,
      firstName,
      lastName,
      fullName,
      email: lead.email || "",
      phone: lead.phone,
      city: lead.city,
      state: lead.state,
      pincode,
      applicantType: lead.applicantType || "",
      partnershipType: formattedTier,
      investmentCapacity: formattedCapital,
      investment: lead.investment || formattedCapital,
      experience: lead.experience || "",
      opportunity: lead.opportunity || "Solar franchise",
      timeline: lead.timeline || "Within 1–3 months",
      notes: lead.notes || "",
      channelSource: lead.channelSource,
      status: "NEW_APPLICATION",
    };

    // Forward to Google Apps Script Web App URL (prioritize dedicated franchise sheet URL)
    const googleSheetUrl =
      process.env.GOOGLE_SHEETS_FRANCHISE_FORM;

    let sheetLogged = false;
    let sheetError: string | null = null;

    if (googleSheetUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const sheetUrlWithParams = new URL(googleSheetUrl);
        sheetUrlWithParams.searchParams.set("referenceId", referenceId);
        sheetUrlWithParams.searchParams.set("firstName", firstName);
        sheetUrlWithParams.searchParams.set("lastName", lastName);
        sheetUrlWithParams.searchParams.set("fullName", fullName);
        sheetUrlWithParams.searchParams.set("phone", lead.phone);
        sheetUrlWithParams.searchParams.set("email", lead.email || "");
        sheetUrlWithParams.searchParams.set("city", lead.city);
        sheetUrlWithParams.searchParams.set("state", lead.state || "Rajasthan");
        sheetUrlWithParams.searchParams.set("pincode", pincode);
        sheetUrlWithParams.searchParams.set("applicantType", lead.applicantType || "");
        sheetUrlWithParams.searchParams.set("tier", formattedTier);
        sheetUrlWithParams.searchParams.set("capital", formattedCapital);
        sheetUrlWithParams.searchParams.set("investment", formattedCapital);
        sheetUrlWithParams.searchParams.set("experience", lead.experience || "");
        sheetUrlWithParams.searchParams.set("opportunity", lead.opportunity || "Solar franchise");
        sheetUrlWithParams.searchParams.set("timeline", lead.timeline || "Within 1–3 months");
        sheetUrlWithParams.searchParams.set("notes", lead.notes || "");
        sheetUrlWithParams.searchParams.set("source", lead.channelSource || "hero_apply_franchise_modal");

        const sheetResponse = await fetch(sheetUrlWithParams.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payloadForSheet),
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(timeoutId);

        if (sheetResponse.ok) {
          sheetLogged = true;
        } else {
          sheetError = `HTTP ${sheetResponse.status}: ${sheetResponse.statusText}`;
          console.warn("[Google Sheet Post Warning]:", sheetError);
        }
      } catch (err: any) {
        sheetError = err?.message || String(err);
        console.warn("[Google Sheet Post Error]:", sheetError);
      }
    } else {
      console.log(
        `[Solvex Franchise Lead Log - ${referenceId}] (Google Sheets Webhook URL not set in env):`,
        JSON.stringify(payloadForSheet, null, 2)
      );
    }

    // Dispatch server-side GA4 conversion event via Measurement Protocol (Zero PII)
    dispatchServerConversion({
      eventName: "franchise_lead_submitted",
      referenceId,
      leadType: "franchise_partner",
      city: lead.city,
      category: formattedTier,
      partnershipType: formattedTier,
      investmentCapacity: formattedCapital,
    }).catch(() => { });

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message:
          "Your franchise partner application has been successfully logged. Our commercial committee will review your territory feasibility.",
        sheetLogged,
        lead: {
          referenceId,
          fullName,
          email: lead.email,
          phone: lead.phone,
          city: lead.city,
          tier: formattedTier,
          capital: formattedCapital,
          submittedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Franchise API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while capturing franchise lead.",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to verify status and provide instructions
export async function GET() {
  const isConfigured = Boolean(
    process.env.GOOGLE_SHEETS_FRANCHISE_FORM
  );

  return NextResponse.json({
    status: "ONLINE",
    endpoint: "/api/franchise",
    googleSheetsConnected: isConfigured,
    message: isConfigured
      ? "Google Sheets webhook is configured and receiving submissions."
      : "Google Sheets webhook URL is pending. Add GOOGLE_SHEETS_FRANCHISE_APPLICATION_FORM or FRANCHISE_SHEET_WEBAPP_URL to your .env file.",
  });
}
