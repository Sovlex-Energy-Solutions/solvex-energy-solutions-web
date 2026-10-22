import { NextResponse } from "next/server";
import { z } from "zod";
import { dispatchServerConversion } from "@/lib/analytics/server";

// Schema for Product Buyer Inquiries from ContactSection
const buyerInquirySchema = z.object({
  leadType: z.literal("product_buyer").optional().default("product_buyer"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  city: z.string().min(2, "City or District is required"),
  state: z.string().optional().default("Rajasthan"),
  propertyType: z.string().optional().default("residential_rooftop"),
  productInterest: z.string().min(1, "Product interest is required"),
  monthlyBill: z.string().optional().default("tier_5k_15k"),
  capacityKw: z.string().optional().default(""),
  requiredCapacityKw: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing under DPDP Act 2023 is required",
  }),
  channelSource: z.string().optional().default("contact_section_buyer_tab"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = buyerInquirySchema.safeParse(body);
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

    // Generate formatted Reference ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    const referenceId = `SLX-PRD-${year}-${randomSuffix}`;

    const systemCapacity = leadData.capacityKw || leadData.requiredCapacityKw || "";

    const enrichedLead = {
      leadType: "product_buyer",
      referenceId,
      fullName: leadData.fullName,
      phone: leadData.phone,
      email: leadData.email || "",
      city: leadData.city,
      state: leadData.state || "Rajasthan",
      propertyType: leadData.propertyType || "residential_rooftop",
      productInterest: leadData.productInterest,
      monthlyBill: leadData.monthlyBill || "tier_5k_15k",
      capacityKw: systemCapacity,
      notes: leadData.notes || "",
      channelSource: leadData.channelSource || "contact_section_buyer_tab",
      submittedAt: new Date().toISOString(),
      sourceIpCountry: "IN",
      status: "NEW_INQUIRY",
      slaCommitment: "Dedicated Solar Engineer Callback < 24 Hrs",
    };

    // Forward to Google Sheets Web App if configured
    const googleSheetUrl = process.env.GOOGLE_SHEETS_PRODUCT_BUYER_ENQUIRY_FORM;

    if (googleSheetUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // Fallback query parameters in case Google's 302 redirect turns POST into GET
        const sheetUrlWithParams = new URL(googleSheetUrl);
        sheetUrlWithParams.searchParams.set("leadType", "product_buyer");
        sheetUrlWithParams.searchParams.set("referenceId", referenceId);
        sheetUrlWithParams.searchParams.set("fullName", leadData.fullName);
        sheetUrlWithParams.searchParams.set("phone", leadData.phone);
        sheetUrlWithParams.searchParams.set("email", leadData.email || "");
        sheetUrlWithParams.searchParams.set("city", leadData.city);
        sheetUrlWithParams.searchParams.set("state", leadData.state || "Rajasthan");
        sheetUrlWithParams.searchParams.set("propertyType", leadData.propertyType || "residential_rooftop");
        sheetUrlWithParams.searchParams.set("productInterest", leadData.productInterest);
        sheetUrlWithParams.searchParams.set("monthlyBill", leadData.monthlyBill || "tier_5k_15k");
        sheetUrlWithParams.searchParams.set("capacityKw", systemCapacity);
        sheetUrlWithParams.searchParams.set("notes", leadData.notes || "");
        sheetUrlWithParams.searchParams.set("source", leadData.channelSource || "contact_section_buyer_tab");

        const sheetResponse = await fetch(sheetUrlWithParams.toString(), {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(enrichedLead),
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(timeoutId);

        if (sheetResponse.status === 401 || sheetResponse.status === 403) {
          console.warn(
            "[Google Sheets Sync Warning 401]: Access rejected. In Google Apps Script, click Deploy > Manage deployments > Edit > set 'Who has access' to 'Anyone'!"
          );
        } else {
          console.log(`[Google Sheets Ingestion - ${referenceId}]: HTTP`, sheetResponse.status);
        }
      } catch (sheetErr) {
        console.warn("[Google Sheets Lead Sync Warning]:", sheetErr);
      }
    } else {
      console.log(`[SOLVEX Buyer Ingestion Log - ${referenceId}]:`, JSON.stringify(enrichedLead, null, 2));
    }

    // Forward to external CRM if configured (Zoho / Salesforce / LeadSquared)
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
      } catch (webhookErr) {
        console.warn("[CRM Webhook Forward Warning]:", webhookErr);
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
        message: "Your solar quote request has been logged. An engineer will contact you within 24 hours.",
        timestamp: enrichedLead.submittedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Buyer API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while capturing solar product inquiry.",
      },
      { status: 500 }
    );
  }
}
