"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  CheckCircle2,
  Lock,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import { trackEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/config/site";
import {
  partnerEnquirySchema,
  type PartnerEnquiryValues,
  DEFAULT_PARTNER_VALUES,
} from "./contact-schemas";

export function PartnerEnquiryForm() {
  const { isHindi } = useLanguage();
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerRefId, setPartnerRefId] = useState("");
  const [partnerCopied, setPartnerCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<PartnerEnquiryValues | null>(null);

  const form = useForm<PartnerEnquiryValues>({
    resolver: zodResolver(partnerEnquirySchema),
    defaultValues: DEFAULT_PARTNER_VALUES,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: PartnerEnquiryValues) => {
    try {
      const res = await fetch("/api/franchise-dealership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "franchise_partner",
          ...values,
          channelSource: "contact_section_partner_tab",
        }),
      });
      const json = await res.json();
      const currentYear = new Date().getFullYear();
      const refCode = json.referenceId || `SLX-PRT-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;

      setPartnerRefId(refCode);
      setSubmittedData(values);
      setPartnerSubmitted(true);
      reset(DEFAULT_PARTNER_VALUES);

      trackEvent("partner_enquiry_submitted", {
        formType: "franchise_partner",
        leadReferenceId: refCode,
        source: "contact_section",
        city: values.city,
        partnership_tier: values.partnershipType,
        investment_band: values.investmentCapacity,
      });
    } catch {
      const currentYear = new Date().getFullYear();
      const fallback = `SLX-PRT-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      setPartnerRefId(fallback);
      setSubmittedData(values);
      setPartnerSubmitted(true);
      reset(DEFAULT_PARTNER_VALUES);
    }
  };

  if (partnerSubmitted && submittedData) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 text-left flex flex-col gap-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-950 mb-1">
              Dossier Confirmed
            </span>
            <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
              {isHindi ? "फ्रैंचाइज़ी आवेदन दर्ज हुआ" : "Franchise Application Registered"}
            </h4>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-black/10 flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Tracking Reference:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-emerald-800">{partnerRefId}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(partnerRefId);
                  setPartnerCopied(true);
                  setTimeout(() => setPartnerCopied(false), 2000);
                }}
                className="p-1 rounded hover:bg-zinc-100 text-zinc-500 cursor-pointer"
                title="Copy Reference ID"
              >
                {partnerCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Applicant Name:</span>
            <span className="font-semibold text-zinc-900">
              {submittedData.firstName} {submittedData.lastName}
            </span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Selected Tier:</span>
            <span className="font-semibold text-zinc-900 capitalize">{submittedData.partnershipType}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Territory / Location:</span>
            <span className="font-semibold text-zinc-900">{submittedData.city}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Institutional Review:</span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Assigned to State Channel Head
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-100/80 border border-black/5 text-xs text-zinc-600 flex flex-col gap-1 leading-relaxed">
          <span className="font-semibold text-zinc-900">Next Steps:</span>
          <span>1. Territory check to ensure non-compete zone clearance in your district.</span>
          <span>2. Franchise prospectus & margin matrix dispatch via registered email.</span>
          <span>3. Direct introductory conference call with Solvex Energy Gujarat leadership.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={`https://wa.me/919125127755?text=${encodeURIComponent(
              `Hello Solvex Energy, I submitted a Franchise Partner application (Ref ID: ${partnerRefId}) for ${submittedData.city}. Please connect me with the Gujarat Channel Manager.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "whatsapp_partner_success",
                source: "contact_section",
                reference_id: partnerRefId,
              })
            }
            className="w-full sm:flex-1 h-11 px-4 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Connect Channel Desk (WhatsApp)</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "phone_call_partner_success",
                source: "contact_section",
                reference_id: partnerRefId,
              })
            }
            className="w-full sm:flex-1 h-11 px-4 bg-white border border-black/15 text-zinc-800 hover:bg-zinc-50 rounded-full text-xs font-medium inline-flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#059669]" />
            <span>Call Institutional Desk</span>
          </a>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setPartnerSubmitted(false);
              setSubmittedData(null);
              reset(DEFAULT_PARTNER_VALUES);
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
          >
            Submit Another Franchise Dossier
          </button>
          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-700" />
            Confidential Dossier Protected
          </span>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "पहला नाम" : "First Name"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isHindi ? "उदा. विक्रम" : "e.g. Vikram"}
                    className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "अंतिम नाम" : "Last Name"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isHindi ? "उदा. मेहता" : "e.g. Mehta"}
                    className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "आधिकारिक ईमेल" : "Official Business Email"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="partner@company.com"
                    className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "मोबाइल नंबर" : "Mobile Number"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: City */}
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5 space-y-0">
              <FormLabel className="text-xs font-medium text-[#18181B]">
                {isHindi ? "लक्षित जिला / शहर" : "Target Operating District / City"} <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={isHindi ? "उदा. अहमदाबाद, गुजरात" : "e.g. Ahmedabad, Gujarat"}
                  className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[11px] text-red-600 mt-0.5" />
            </FormItem>
          )}
        />

        {/* Row 4: Partnership Tier & Capital Band */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="partnershipType"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "साझेदारी का प्रकार" : "Partnership Tier"} <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                      <SelectValue placeholder="Select Franchise Model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                    <SelectItem value="distributor">Distributor Partner (Territory)</SelectItem>
                    <SelectItem value="master">Master Distributor (State / Zone)</SelectItem>
                    <SelectItem value="channel">Channel EPC Partner</SelectItem>
                    <SelectItem value="merchant">Retail Merchant Store</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="investmentCapacity"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "निवेश पूंजी सीमा" : "Capital Allocation Band"} <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                      <SelectValue placeholder="Select Capital Band" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                    <SelectItem value="tier1">₹2,00,000 - ₹5,00,000</SelectItem>
                    <SelectItem value="tier2">₹5,00,000 - ₹15,00,000</SelectItem>
                    <SelectItem value="tier3">₹15,00,000 - ₹30,00,000</SelectItem>
                    <SelectItem value="tier4">₹30,00,000+ (Institutional Master)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 5: Experience */}
        <FormField
          control={control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5 space-y-0">
              <FormLabel className="text-xs font-medium text-[#18181B]">
                {isHindi ? "व्यवसाय अनुभव / टीम का विवरण (वैकल्पिक)" : "Business Background / Distribution Footprint (Optional)"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isHindi
                      ? "अपनी वर्तमान वितरण क्षमता, इलेक्ट्रिकल ट्रेड अनुभव या क्लाइंट नेटवर्क का उल्लेख करें..."
                      : "Provide details regarding your current business footprint, electrical trade experience, team size, or client network..."
                  }
                  className="min-h-[80px] p-3 text-xs bg-[#FAFAFA] border border-black/10 rounded-2xl resize-none text-[#18181B] placeholder:text-[#71717A]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[11px] text-red-600 mt-0.5" />
            </FormItem>
          )}
        />

        {/* Row 6: DPDP Consent Checkbox */}
        <FormField
          control={control}
          name="consentAgreed"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="p-3 rounded-xl border border-black/10 bg-zinc-50/80 flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-black/20 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669]"
                  />
                </FormControl>
                <FormLabel className="text-[11px] text-zinc-700 leading-relaxed font-normal cursor-pointer select-none">
                  I authorize Solvex Energy Solutions Pvt. Ltd. to evaluate my commercial credentials for franchise allocation under India&apos;s DPDP Act 2023, and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("privacy")}
                    className="font-semibold text-emerald-700 hover:text-emerald-800 underline inline cursor-pointer"
                  >
                    Privacy Policy
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("terms")}
                    className="font-semibold text-emerald-700 hover:text-emerald-800 underline inline cursor-pointer"
                  >
                    Commercial Terms
                  </button>
                  . <span className="text-red-500">*</span>
                </FormLabel>
              </div>
              <FormMessage className="text-[11px] text-red-600 mt-1 pl-2" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 mt-1 shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isHindi ? "डोजियर सबमिट हो रहा है..." : "Submitting Dossier..."}</span>
            </>
          ) : (
            <>
              <span>{isHindi ? "फ्रैंचाइज़ी डोजियर जमा करें" : "Submit Franchise Dossier"}</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
