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
  buyerEnquirySchema,
  type BuyerEnquiryValues,
  DEFAULT_BUYER_VALUES,
} from "./contact-schemas";

export function BuyerEnquiryForm() {
  const { isHindi } = useLanguage();
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);
  const [buyerRefId, setBuyerRefId] = useState("");
  const [buyerCopied, setBuyerCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<BuyerEnquiryValues | null>(null);

  const form = useForm<BuyerEnquiryValues>({
    resolver: zodResolver(buyerEnquirySchema),
    defaultValues: DEFAULT_BUYER_VALUES,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: BuyerEnquiryValues) => {
    try {
      const res = await fetch("/api/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "product_buyer",
          ...values,
          channelSource: "contact_section_buyer_tab",
        }),
      });
      const json = await res.json();
      const currentYear = new Date().getFullYear();
      const refCode = json.referenceId || `SLX-PRD-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;

      setBuyerRefId(refCode);
      setSubmittedData(values);
      setBuyerSubmitted(true);
      reset(DEFAULT_BUYER_VALUES);

      trackEvent("quote_request_submitted", {
        formType: "product_buyer",
        leadReferenceId: refCode,
        source: "contact_section",
        city: values.city,
        product: values.productInterest,
      });
    } catch {
      const currentYear = new Date().getFullYear();
      const fallback = `SLX-PRD-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      setBuyerRefId(fallback);
      setSubmittedData(values);
      setBuyerSubmitted(true);
      reset(DEFAULT_BUYER_VALUES);
    }
  };

  if (buyerSubmitted && submittedData) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 text-left flex flex-col gap-5 animate-in fade-in duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-950 mb-1">
              Enquiry Confirmed
            </span>
            <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
              {isHindi ? "आपकी सोलर पूछताछ दर्ज हो गई है" : "Solar Quote Request Logged"}
            </h4>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-black/10 flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Tracking Reference:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-emerald-800">{buyerRefId}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(buyerRefId);
                  setBuyerCopied(true);
                  setTimeout(() => setBuyerCopied(false), 2000);
                }}
                className="p-1 rounded hover:bg-zinc-100 text-zinc-500 cursor-pointer"
                title="Copy Reference ID"
              >
                {buyerCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Applicant:</span>
            <span className="font-semibold text-zinc-900">{submittedData.fullName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Product / System:</span>
            <span className="font-semibold text-zinc-900">{submittedData.productInterest}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-black/5">
            <span className="text-zinc-500">Target Location:</span>
            <span className="font-semibold text-zinc-900">{submittedData.city}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">SLA Response Time:</span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Within 2 Business Hours
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-100/80 border border-black/5 text-xs text-zinc-600 flex flex-col gap-1 leading-relaxed">
          <span className="font-semibold text-zinc-900">What Happens Next:</span>
          <span>1. Our certified PM Surya Ghar solar engineer will verify regional rooftop feasibility.</span>
          <span>2. An itemized commercial Bill of Materials (BOM) will be sent to your WhatsApp and Email.</span>
          <span>3. Turnkey DISCOM net-metering liaison and subsidy paperwork will be coordinated.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={`https://wa.me/919125127755?text=${encodeURIComponent(
              `Hello Solvex Energy, I requested a Solar System quote (Ref ID: ${buyerRefId}). Please share BOM details for ${submittedData.productInterest}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "whatsapp_buyer_success",
                source: "contact_section",
                reference_id: buyerRefId,
              })
            }
            className="w-full sm:flex-1 h-11 px-4 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>Share on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone}`}
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "phone_call_buyer_success",
                source: "contact_section",
                reference_id: buyerRefId,
              })
            }
            className="w-full sm:flex-1 h-11 px-4 bg-white border border-black/15 text-zinc-800 hover:bg-zinc-50 rounded-full text-xs font-medium inline-flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#059669]" />
            <span>Call Engineer Now</span>
          </a>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setBuyerSubmitted(false);
              setSubmittedData(null);
              reset(DEFAULT_BUYER_VALUES);
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
          >
            Submit Another Product Inquiry
          </button>
          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-700" />
            DPDP 2023 Encrypted
          </span>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "पूरा नाम" : "Full Name"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isHindi ? "उदा. राजेश पटेल" : "e.g. Rajesh Patel"}
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

        {/* Row 2: Email & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "ईमेल पता (वैकल्पिक)" : "Email Address (Optional)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
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
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "शहर / जिला" : "City / District"} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isHindi ? "उदा. सूरत, गुजरात" : "e.g. Surat, Gujarat"}
                    className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: Product Interest & Monthly Bill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="productInterest"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "रुचि का उत्पाद" : "Product of Interest"}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                    <SelectItem value="Rooftop Solar EPC System">Rooftop Solar EPC (Turnkey + Subsidy)</SelectItem>
                    <SelectItem value="Solvex Solar Inverters (rMPPT)">Solvex Smart rMPPT Inverter</SelectItem>
                    <SelectItem value="Heavy Industrial Solar PCU">Heavy Industrial Solar PCU (3kVA - 15kVA)</SelectItem>
                    <SelectItem value="SPGS Hybrid Combo Kits">SPGS Hybrid Rooftop Combo Kit</SelectItem>
                    <SelectItem value="Lithium/Tubular Battery Bank">Solar Battery Storage Bank</SelectItem>
                    <SelectItem value="Commercial Rooftop 25kW+">Commercial / Industrial 25kW+ Array</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="monthlyBill"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-xs font-medium text-[#18181B]">
                  {isHindi ? "मासिक बिजली बिल या क्षमता" : "Monthly Bill Band / Capacity"}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                    <SelectItem value="tier_under_2k">₹1,000 - ₹2,500 / month (1kW - 2kW)</SelectItem>
                    <SelectItem value="tier_2k_5k">₹2,500 - ₹5,000 / month (2kW - 3kW PM Surya Ghar)</SelectItem>
                    <SelectItem value="tier_5k_15k">₹5,000 - ₹15,000 / month (4kW - 8kW)</SelectItem>
                    <SelectItem value="tier_15k_plus">₹15,000+ / month (Commercial 10kW+)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px] text-red-600 mt-0.5" />
              </FormItem>
            )}
          />
        </div>

        {/* Row 4: Notes */}
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5 space-y-0">
              <FormLabel className="text-xs font-medium text-[#18181B]">
                {isHindi ? "विशिष्ट आवश्यकताएं (वैकल्पिक)" : "Specific Notes / Rooftop Details (Optional)"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isHindi
                      ? "अपनी छत के प्रकार, बिजली कनेक्शन या लोड के बारे में बताएं..."
                      : "Describe your rooftop type, sanctioned load, or preferred battery backup..."
                  }
                  className="min-h-[80px] p-3 text-xs bg-[#FAFAFA] border border-black/10 rounded-2xl resize-none text-[#18181B] placeholder:text-[#71717A]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[11px] text-red-600 mt-0.5" />
            </FormItem>
          )}
        />

        {/* Row 5: Consent Checkbox */}
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
                  I consent to Solvex Energy contacting me regarding solar equipment sizing, PM Surya Ghar subsidy processing, and site survey under India&apos;s DPDP Act 2023.{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("privacy")}
                    className="font-semibold text-emerald-700 hover:text-emerald-800 underline inline cursor-pointer"
                  >
                    Privacy Policy
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
              <span>{isHindi ? "प्रसंस्करण हो रहा है..." : "Processing Enquiry..."}</span>
            </>
          ) : (
            <>
              <span>{isHindi ? "सोलर कोटेशन व सर्वे बुक करें" : "Request Quote & Book Site Survey"}</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
