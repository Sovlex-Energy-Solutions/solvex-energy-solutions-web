import { z } from "zod";

export const franchiseApplicationSchema = z.object({
  // Honeypot field for anti-spam (must remain empty)
  website: z.string().max(0, "Invalid submission").optional().or(z.literal("")),

  // Section 01: Personal details
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  phone: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(18, "Mobile number cannot exceed 18 characters")
    .regex(
      /^[+]?[\d\s()-]{10,18}$/,
      "Please enter a valid mobile number (10–15 digits)"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  // Section 02: Preferred location
  city: z
    .string()
    .min(2, "Please provide your city or district")
    .max(100, "City/district cannot exceed 100 characters"),

  state: z
    .string()
    .min(2, "Please select or enter your State / Union Territory")
    .max(100, "State cannot exceed 100 characters"),

  pinCode: z
    .string()
    .regex(/^\d{6}$/, "PIN code must be exactly 6 numeric digits")
    .optional()
    .or(z.literal("")),

  // Section 03: Business profile
  applicantType: z.enum(
    [
      "New entrepreneur / aspiring business owner",
      "Existing business owner",
      "Solar / electrical industry professional",
      "Investor exploring opportunities",
    ],
    {
      required_error: "Please select which profile best describes you",
    }
  ),

  investment: z.enum(
    [
      "Below ₹2 lakh",
      "₹2–5 lakh",
      "₹5–10 lakh",
      "₹10–25 lakh",
      "₹25 lakh+",
      "Need guidance",
    ],
    {
      required_error: "Please select your estimated investment budget range",
    }
  ),

  experience: z.enum(
    [
      "No prior solar experience",
      "Sales or distribution",
      "Electrical or renewable energy",
      "Other business experience",
    ],
    {
      required_error: "Please select your level of relevant experience",
    }
  ),

  // Section 04: Your business goals
  opportunity: z
    .string({
      required_error: "Please select your primary opportunity of interest",
    })
    .min(1, "Please select an opportunity of interest"),

  timeline: z
    .string({
      required_error: "Please select your expected start timeline",
    })
    .min(1, "Please select an expected start timeline"),

  notes: z
    .string()
    .max(1500, "Additional details cannot exceed 1500 characters")
    .optional()
    .or(z.literal("")),

  // Consent & Compliance
  consent: z.literal(true, {
    errorMap: () => ({
      message:
        "You must consent to being contacted by SOLVEX to submit this enquiry",
    }),
  }),
});

export type FranchiseApplicationValues = z.infer<
  typeof franchiseApplicationSchema
>;

export const DEFAULT_FRANCHISE_FORM_VALUES: FranchiseApplicationValues = {
  website: "",
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  pinCode: "",
  applicantType: "New entrepreneur / aspiring business owner",
  investment: "₹5–10 lakh",
  experience: "No prior solar experience",
  opportunity: "Solar franchise",
  timeline: "Within 1–3 months",
  notes: "",
  consent: true,
};
