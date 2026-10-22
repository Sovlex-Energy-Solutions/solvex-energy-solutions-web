import { NextResponse } from "next/server";
import { z } from "zod";
import { dispatchServerConversion } from "@/lib/analytics/server";

// Schema for Solar Quote & Site Survey Inquiry (ProductEnquiryDialog)
const solarQuoteSchema = z.object({
  leadType: z.string().optional().default("product_buyer"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Valid 10-digit mobile number is required"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  city: z.string().min(2, "City or District is required"),
  state: z.string().optional().default("Gujarat"),
  propertyType: z.string().optional().default("residential_rooftop"),
  productInterest: z.string().min(1, "Product interest is required"),
  monthlyBill: z.string().optional().default("tier_5k_15k"),
  requiredCapacityKw: z.string().optional().default(""),
  capacityKw: z.string().optional().default(""),
  rooftopAreaSqFt: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to site assessment and data processing is required",
  }),
  channelSource: z.string().optional().default("product_enquiry_dialog"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = solarQuoteSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten(),
          message: "Validation failed. Please verify all required fields.",
        },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    const referenceId = `SLX-PRD-${year}-${randomSuffix}`;
    const submittedAt = new Date().toISOString();

    const capacity = leadData.requiredCapacityKw || leadData.capacityKw || "";

    const enrichedLead = {
      leadType: "product_buyer",
      referenceId,
      fullName: leadData.fullName,
      phone: leadData.phone,
      email: leadData.email || "",
      city: leadData.city,
      state: leadData.state || "Gujarat",
      propertyType: leadData.propertyType || "residential_rooftop",
      productInterest: leadData.productInterest,
      monthlyBill: leadData.monthlyBill || "tier_5k_15k",
      requiredCapacityKw: capacity,
      capacityKw: capacity,
      rooftopAreaSqFt: leadData.rooftopAreaSqFt || "",
      notes: leadData.notes || "",
      channelSource: leadData.channelSource || "product_enquiry_dialog",
      submittedAt,
      sourceIpCountry: "IN",
      status: "NEW_INQUIRY",
      slaCommitment: "Senior Photovoltaic Engineer Contact < 2 Business Hours",
    };

    // Forward to Google Sheets Web App
    const googleSheetUrl =
      process.env.GOOGLE_SHEETS_SOLAR_QUOTE_FORM;

    let sheetLogged = false;

    if (googleSheetUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const sheetUrlWithParams = new URL(googleSheetUrl);
        sheetUrlWithParams.searchParams.set("leadType", "product_buyer");
        sheetUrlWithParams.searchParams.set("referenceId", referenceId);
        sheetUrlWithParams.searchParams.set("fullName", leadData.fullName);
        sheetUrlWithParams.searchParams.set("phone", leadData.phone);
        sheetUrlWithParams.searchParams.set("email", leadData.email || "");
        sheetUrlWithParams.searchParams.set("city", leadData.city);
        sheetUrlWithParams.searchParams.set("state", leadData.state || "Gujarat");
        sheetUrlWithParams.searchParams.set("propertyType", leadData.propertyType || "residential_rooftop");
        sheetUrlWithParams.searchParams.set("productInterest", leadData.productInterest);
        sheetUrlWithParams.searchParams.set("monthlyBill", leadData.monthlyBill || "tier_5k_15k");
        sheetUrlWithParams.searchParams.set("requiredCapacityKw", capacity);
        sheetUrlWithParams.searchParams.set("capacityKw", capacity);
        sheetUrlWithParams.searchParams.set("rooftopAreaSqFt", leadData.rooftopAreaSqFt || "");
        sheetUrlWithParams.searchParams.set("notes", leadData.notes || "");
        sheetUrlWithParams.searchParams.set("source", leadData.channelSource || "product_enquiry_dialog");

        const sheetResponse = await fetch(sheetUrlWithParams.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(enrichedLead),
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(timeoutId);

        if (sheetResponse.ok) {
          sheetLogged = true;
        } else {
          console.warn(`[Solar Quote Sheet Sync]: HTTP ${sheetResponse.status}`);
        }
      } catch (sheetErr) {
        console.warn("[Solar Quote Google Sheet Error]:", sheetErr);
      }
    } else {
      console.log(
        `[Solvex Solar Quote Log - ${referenceId}] (Google Sheets URL not configured):`,
        JSON.stringify(enrichedLead, null, 2)
      );
    }

    // Forward to CRM if configured
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    if (crmWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        await fetch(crmWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Solvex-Webhook-Secret": process.env.CRM_WEBHOOK_SECRET || "solvex_lead_secure_v1",
            "X-Solvex-Reference-ID": referenceId,
          },
          body: JSON.stringify(enrichedLead),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (crmErr) {
        console.warn("[CRM Solar Quote Forward Warning]:", crmErr);
      }
    }

    // Dispatch server-side GA4 conversion event via Measurement Protocol (Zero PII)
    dispatchServerConversion({
      eventName: "product_enquiry_submitted",
      referenceId,
      leadType: "product_buyer",
      city: leadData.city,
      category: leadData.productInterest,
    }).catch(() => { });

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Your solar quote request and site survey have been registered successfully.",
        timestamp: submittedAt,
        sheetLogged,
        lead: {
          referenceId,
          fullName: leadData.fullName,
          phone: leadData.phone,
          productInterest: leadData.productInterest,
          city: leadData.city,
          capacityKw: capacity,
          submittedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Solar Quote API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while capturing solar quote request.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isConfigured = Boolean(
    process.env.GOOGLE_SHEETS_SOLAR_QUOTE_FORM
  );

  return NextResponse.json({
    status: "ONLINE",
    endpoint: "/api/solar-quote",
    googleSheetsConnected: isConfigured,
    message: isConfigured
      ? "Google Sheets webhook is configured and receiving submissions."
      : "Google Sheets webhook URL is pending. Add GOOGLE_SHEETS_SOLAR_QUOTE_FORM to your .env file.",
  });
}
