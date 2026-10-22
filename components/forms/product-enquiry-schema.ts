import { z } from "zod";

export const productEnquirySchema = z.object({
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

  state: z.string().min(1, "State is required"),

  propertyType: z.string().min(1, "Property type is required"),

  productInterest: z.string().min(1, "Please select product interest"),

  monthlyBill: z.string().min(1, "Monthly bill range is required"),

  requiredCapacityKw: z.string().optional().or(z.literal("")),

  rooftopAreaSqFt: z.string().optional().or(z.literal("")),

  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  consentAgreed: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to proceed with quotation" }),
  }),
});

export type ProductEnquiryValues = z.infer<typeof productEnquirySchema>;

export const DEFAULT_PRODUCT_ENQUIRY_VALUES: ProductEnquiryValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "Gujarat",
  propertyType: "residential_rooftop",
  productInterest: "Rooftop Solar EPC System",
  monthlyBill: "tier_5k_15k",
  requiredCapacityKw: "",
  rooftopAreaSqFt: "",
  notes: "",
  consentAgreed: false as unknown as true, // unchecked initially, validated as true on submit
};
