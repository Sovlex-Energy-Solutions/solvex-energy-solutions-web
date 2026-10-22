import { z } from "zod";

export const buyerEnquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  phone: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(18, "Mobile number cannot exceed 18 digits")
    .regex(
      /^(?:\+?91)?[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number (+91)"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .min(2, "City / District is required")
    .max(100, "City cannot exceed 100 characters"),

  propertyType: z.string().min(1, "Property type is required"),

  productInterest: z.string().min(1, "Product interest is required"),

  monthlyBill: z.string().min(1, "Monthly bill range is required"),

  capacityKw: z.string().optional().or(z.literal("")),

  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  consentAgreed: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to proceed with quotation" }),
  }),
});

export type BuyerEnquiryValues = z.infer<typeof buyerEnquirySchema>;

export const DEFAULT_BUYER_VALUES: BuyerEnquiryValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  propertyType: "residential_rooftop",
  productInterest: "Rooftop Solar EPC System",
  monthlyBill: "tier_5k_15k",
  capacityKw: "",
  notes: "",
  consentAgreed: false as unknown as true,
};

export const partnerEnquirySchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(60, "First name cannot exceed 60 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(60, "Last name cannot exceed 60 characters"),

  email: z
    .string()
    .min(1, "Business email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(18, "Mobile number cannot exceed 18 digits")
    .regex(
      /^(?:\+?91)?[6-9]\d{9}$/,
      "Please enter a valid 10-digit mobile number (+91)"
    ),

  city: z
    .string()
    .min(2, "Target city / district is required")
    .max(100, "City cannot exceed 100 characters"),

  partnershipType: z.string().min(1, "Please select partnership tier"),

  investmentCapacity: z.string().min(1, "Please select estimated investment budget"),

  experience: z.string().optional().or(z.literal("")),

  consentAgreed: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit partner application" }),
  }),
});

export type PartnerEnquiryValues = z.infer<typeof partnerEnquirySchema>;

export const DEFAULT_PARTNER_VALUES: PartnerEnquiryValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  partnershipType: "",
  investmentCapacity: "",
  experience: "",
  consentAgreed: false as unknown as true,
};
