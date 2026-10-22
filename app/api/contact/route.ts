import { NextResponse } from "next/server";
import { z } from "zod";
import { dispatchServerConversion } from "@/lib/analytics/server";

// ------------------------------------------------------------------------------
// Validation Schemas for ContactSection (Dual-Tab)
// ------------------------------------------------------------------------------

const buyerSubSchema = z.object({
  leadType: z.literal("product_buyer").optional().default("product_buyer"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Valid 10-digit mobile number is required"),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2, "City or District is required"),
  state: z.string().optional().default("Rajasthan"),
  propertyType: z.string().optional().default("residential_rooftop"),
  productInterest: z.string().min(1, "Product interest is required"),
  monthlyBill: z.string().optional().default("tier_5k_15k"),
  capacityKw: z.string().optional().default(""),
  requiredCapacityKw: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing is required",
  }),
  channelSource: z.string().optional().default("contact_section_buyer_tab"),
});

const partnerSubSchema = z.object({
  leadType: z.literal("franchise_partner").optional().default("franchise_partner"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Valid business email is required").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid mobile number is required"),
  city: z.string().min(2, "Target operating district or city is required"),
  state: z.string().optional().default("Rajasthan"),
  pincode: z.string().optional().default(""),
  partnershipType: z.string().min(1, "Partnership tier is required"),
  investmentCapacity: z.string().min(1, "Capital allocation band is required"),
  experience: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "Consent to commercial terms is required",
  }),
  channelSource: z.string().optional().default("contact_section_partner_tab"),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // Determine lead type (auto-detect if leadType not explicitly specified)
    const isPartner =
      rawBody.leadType === "franchise_partner" ||
      Boolean(rawBody.partnershipType || rawBody.investmentCapacity);

    const parseResult = isPartner
      ? partnerSubSchema.safeParse({ ...rawBody, leadType: "franchise_partner" })
      : buyerSubSchema.safeParse({ ...rawBody, leadType: "product_buyer" });

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

    const data = parseResult.data;
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);

    const referenceId = isPartner
      ? `SLX-PRT-${year}-${randomSuffix}`
      : `SLX-PRD-${year}-${randomSuffix}`;

    const timestamp = new Date().toISOString();

    const enrichedPayload = isPartner
      ? {
          leadType: "franchise_partner",
          referenceId,
          firstName: (data as any).firstName,
          lastName: (data as any).lastName,
          fullName: `${(data as any).firstName} ${(data as any).lastName}`.trim(),
          email: data.email || "",
          phone: data.phone,
          city: data.city,
          state: data.state || "Rajasthan",
          pincode: (data as any).pincode || "",
          partnershipType: (data as any).partnershipType,
          investmentCapacity: (data as any).investmentCapacity,
          experience: (data as any).experience || "",
          notes: (data as any).notes || "",
          channelSource: data.channelSource || "contact_section_partner_tab",
          submittedAt: timestamp,
          status: "NEW_APPLICATION",
          slaCommitment: "Territory Feasibility Review within 24 Hours",
        }
      : {
          leadType: "product_buyer",
          referenceId,
          fullName: (data as any).fullName,
          phone: data.phone,
          email: data.email || "",
          city: data.city,
          state: data.state || "Rajasthan",
          propertyType: (data as any).propertyType || "residential_rooftop",
          productInterest: (data as any).productInterest,
          monthlyBill: (data as any).monthlyBill || "tier_5k_15k",
          capacityKw: (data as any).capacityKw || (data as any).requiredCapacityKw || "",
          notes: (data as any).notes || "",
          channelSource: data.channelSource || "contact_section_buyer_tab",
          submittedAt: timestamp,
          status: "NEW_INQUIRY",
          slaCommitment: "Dedicated Solar Engineer Callback < 24 Hrs",
        };

    // Forward to Google Sheets Web App
    const googleSheetUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.FRANCHISE_SHEET_WEBAPP_URL;

    if (googleSheetUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const sheetUrlWithParams = new URL(googleSheetUrl);
        sheetUrlWithParams.searchParams.set("leadType", enrichedPayload.leadType);
        sheetUrlWithParams.searchParams.set("referenceId", referenceId);
        sheetUrlWithParams.searchParams.set("phone", enrichedPayload.phone);
        sheetUrlWithParams.searchParams.set("city", enrichedPayload.city);
        sheetUrlWithParams.searchParams.set("state", enrichedPayload.state);

        if (isPartner) {
          const p = enrichedPayload as any;
          sheetUrlWithParams.searchParams.set("firstName", p.firstName);
          sheetUrlWithParams.searchParams.set("lastName", p.lastName);
          sheetUrlWithParams.searchParams.set("fullName", p.fullName);
          sheetUrlWithParams.searchParams.set("email", p.email);
          sheetUrlWithParams.searchParams.set("partnershipType", p.partnershipType);
          sheetUrlWithParams.searchParams.set("investmentCapacity", p.investmentCapacity);
          sheetUrlWithParams.searchParams.set("experience", p.experience);
          sheetUrlWithParams.searchParams.set("source", p.channelSource);
        } else {
          const b = enrichedPayload as any;
          sheetUrlWithParams.searchParams.set("fullName", b.fullName);
          sheetUrlWithParams.searchParams.set("email", b.email);
          sheetUrlWithParams.searchParams.set("productInterest", b.productInterest);
          sheetUrlWithParams.searchParams.set("monthlyBill", b.monthlyBill);
          sheetUrlWithParams.searchParams.set("propertyType", b.propertyType);
          sheetUrlWithParams.searchParams.set("capacityKw", b.capacityKw);
          sheetUrlWithParams.searchParams.set("notes", b.notes);
          sheetUrlWithParams.searchParams.set("source", b.channelSource);
        }

        const sheetResponse = await fetch(sheetUrlWithParams.toString(), {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(enrichedPayload),
          signal: controller.signal,
          redirect: "follow",
        });
        clearTimeout(timeoutId);

        if (sheetResponse.status === 401 || sheetResponse.status === 403) {
          console.warn(
            "[Google Sheets Sync 401]: Please ensure Apps Script is deployed with 'Who has access' set to 'Anyone'."
          );
        } else {
          console.log(`[Google Sheets Contact Sync - ${referenceId}]: HTTP ${sheetResponse.status}`);
        }
      } catch (sheetErr) {
        console.warn("[Google Sheets Contact Sync Warning]:", sheetErr);
      }
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
          body: JSON.stringify(enrichedPayload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (crmErr) {
        console.warn("[CRM Contact Forward Warning]:", crmErr);
      }
    }

    // Server-side GA4 conversion event
    dispatchServerConversion({
      eventName: isPartner ? "partner_enquiry_submitted" : "product_enquiry_submitted",
      referenceId,
      leadType: isPartner ? "franchise_partner" : "product_buyer",
      city: enrichedPayload.city,
      category: isPartner ? (enrichedPayload as any).partnershipType : (enrichedPayload as any).productInterest,
    }).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: isPartner
          ? "Franchise partner dossier submitted successfully."
          : "Product buyer quote request logged successfully.",
        timestamp,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while processing contact form submission.",
      },
      { status: 500 }
    );
  }
}
