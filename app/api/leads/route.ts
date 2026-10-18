import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for Product Buyer Inquiries
const productBuyerSchema = z.object({
  leadType: z.literal("product_buyer"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  state: z.string().optional().default("Gujarat"),
  propertyType: z.string().optional().default("residential_rooftop"),
  productInterest: z.string().min(1, "Product interest is required"),
  monthlyBill: z.string().optional().default("tier_5k_15k"),
  requiredCapacityKw: z.string().optional().default(""),
  rooftopAreaSqFt: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing is required",
  }),
  channelSource: z.string().optional().default("website_product_enquiry"),
});

// Schema for Prospective Franchise Partners
const franchisePartnerSchema = z.object({
  leadType: z.literal("franchise_partner"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Valid business email is required").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid phone number is required"),
  city: z.string().min(2, "Target city/district is required"),
  state: z.string().optional().default("Gujarat"),
  pincode: z.string().optional(),
  firmName: z.string().optional(),
  gstNumber: z.string().optional(),
  partnershipType: z.string().min(1, "Partnership tier is required"),
  investmentCapacity: z.string().min(1, "Capital allocation band is required"),
  experience: z.string().optional(),
  notes: z.string().optional(),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent is required",
  }),
  consentDossier: z.boolean().optional(),
  channelSource: z.string().optional().default("website_franchise_application"),
});

const leadIngestSchema = z.discriminatedUnion("leadType", [
  productBuyerSchema,
  franchisePartnerSchema,
]);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = leadIngestSchema.safeParse(body);
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

    const leadData = parseResult.data;

    // Generate formatted Reference ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const year = new Date().getFullYear();
    const referenceId =
      leadData.leadType === "product_buyer"
        ? `SLX-PRD-${year}-${randomSuffix}`
        : `SLX-PRT-${year}-${randomSuffix}`;

    const enrichedLead = {
      ...leadData,
      referenceId,
      submittedAt: new Date().toISOString(),
      sourceIpCountry: "IN",
      discomTerritory: leadData.city,
      status: "NEW_UNASSIGNED",
      slaTargetMinutes: leadData.leadType === "product_buyer" ? 60 : 1440,
    };

    // Forward to external CRM Webhook if configured (Zoho CRM / Salesforce / LeadSquared)
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
        // Fallback: Continue without failing user response, log for recovery
        console.warn("[CRM Webhook Forward Warning]:", webhookErr);
      }
    } else {
      // In development or when webhook is pending config, log to structured lead store
      console.log(`[SOLVEX CRM Ingest Log - ${referenceId}]:`, JSON.stringify(enrichedLead, null, 2));
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message:
          leadData.leadType === "product_buyer"
            ? "Your solar product inquiry has been logged. An engineer will contact you within 24 hours."
            : "Your franchise partner application has been submitted for territorial allocation review.",
        timestamp: enrichedLead.submittedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Leads API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while capturing lead dossier.",
      },
      { status: 500 }
    );
  }
}
