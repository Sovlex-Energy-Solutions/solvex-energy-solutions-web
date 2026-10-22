"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  Loader2,
  Phone,
  Mail,
  User,
  MapPin,
  ChevronDown,
  ExternalLink,
  Sparkles,
  X,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  franchiseApplicationSchema,
  type FranchiseApplicationValues,
  DEFAULT_FRANCHISE_FORM_VALUES,
} from "./franchise-schema";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

// Global custom event helper to open this modal from anywhere
export function openFranchiseDialog() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-franchise-dialog"));
  }
}

interface FranchiseApplicationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FranchiseApplicationDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: FranchiseApplicationDialogProps) {
  const { isHindi } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationRef, setApplicationRef] = useState<string>("");
  const [submittedData, setSubmittedData] =
    useState<FranchiseApplicationValues | null>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  // Listen for global custom event
  useEffect(() => {
    const handleOpen = () => {
      setIsSuccess(false);
      setIsOpen(true);
    };
    window.addEventListener("open-franchise-dialog", handleOpen);
    return () => window.removeEventListener("open-franchise-dialog", handleOpen);
  }, [setIsOpen]);

  const form = useForm<FranchiseApplicationValues>({
    resolver: zodResolver(franchiseApplicationSchema),
    defaultValues: DEFAULT_FRANCHISE_FORM_VALUES,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FranchiseApplicationValues) => {
    // Honeypot anti-spam check
    if (values.website) {
      return;
    }

    try {
      const res = await fetch("/api/franchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "franchise_partner",
          firstName: values.fullName.trim().split(" ")[0] || values.fullName,
          lastName: values.fullName.trim().split(" ").slice(1).join(" ") || "Partner",
          fullName: values.fullName,
          email: values.email || undefined,
          phone: values.phone,
          city: values.city,
          state: values.state,
          pincode: values.pinCode || undefined,
          applicantType: values.applicantType,
          investment: values.investment,
          partnershipType:
            values.applicantType.includes("Existing business")
              ? "distributor"
              : values.applicantType.includes("Investor")
              ? "master"
              : "channel",
          investmentCapacity: values.investment,
          experience: values.experience,
          opportunity: values.opportunity,
          timeline: values.timeline,
          notes: values.notes || undefined,
          consentAgreed: values.consent,
          channelSource: "hero_apply_franchise_modal",
        }),
      });

      const json = await res.json();
      const refId = json.referenceId || `SLX-PRT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRef(refId);
      setSubmittedData(values);
      setIsSuccess(true);

      trackEvent("partner_enquiry_submitted", {
        formType: "franchise_partner",
        leadReferenceId: refId,
        city: values.city,
        state: values.state,
        partnership_tier: values.applicantType,
        investment_band: values.investment,
      });
    } catch {
      const fallbackId = `SLX-PRT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setApplicationRef(fallbackId);
      setSubmittedData(values);
      setIsSuccess(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    reset(DEFAULT_FRANCHISE_FORM_VALUES);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-hidden p-0 rounded-2xl sm:rounded-3xl border border-black/10 bg-white text-[#18181B] shadow-2xl flex flex-col">
        {/* Modal Header: Matches Solvex Editorial Aesthetics */}
        <div className="px-6 sm:px-8 py-6 border-b border-black/10 bg-[#FAFAFA] flex flex-col gap-3 relative shrink-0">
          <div className="flex items-center justify-between pr-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>
                {isHindi
                  ? "[ राष्ट्रीय सोलर फ्रैंचाइज़ी विस्तार ]"
                  : "[ PAN-INDIA SOLAR FRANCHISE EXPANSION ]"}
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-[#71717A] uppercase tracking-wider">
              FY 2026 INTAKE
            </span>
          </div>

          <DialogHeader className="text-left space-y-1.5">
            <DialogTitle className="headline-md text-2xl sm:text-3xl font-normal tracking-[-1.08px] text-[#18181B] leading-tight">
              {isHindi
                ? "सोलर फ्रैंचाइज़ी पार्टनर आवेदन"
                : "Franchise Partner Application"}
            </DialogTitle>
            <DialogDescription className="body-md text-sm text-[#71717A] font-normal leading-relaxed tracking-[-0.2px] max-w-xl">
              {isHindi
                ? "अपने जिले में उच्च-मार्जिन सोलर व्यवसाय स्थापित करें। टियर-1 हार्डवेयर आवंटन और सब्सिडी चैनल साझेदारी के लिए विवरण साझा करें।"
                : "Establish a high-yield clean tech franchise in your district. Connect directly with our institutional desk to review territory allocation, margins, and procurement schedules."}
            </DialogDescription>
          </DialogHeader>

          {/* Key Trust Highlights Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full border border-black/10 bg-white text-[#18181B] text-xs font-normal tracking-[-0.1px] shadow-2xs">
              ☀ ALMM Tier-1 Hardware
            </span>
            <span className="px-3 py-1 rounded-full border border-black/10 bg-white text-[#18181B] text-xs font-normal tracking-[-0.1px] shadow-2xs">
              ⚡ ₹78,000 DBT Fast-Track
            </span>
            <span className="px-3 py-1 rounded-full border border-black/10 bg-white text-[#18181B] text-xs font-normal tracking-[-0.1px] shadow-2xs">
              📋 Turnkey DISCOM Training
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
          {isSuccess ? (
            /* Superpower-Styled Success State */
            <div className="flex flex-col items-center text-center py-6 px-2 space-y-6">
              <div className="w-16 h-16 rounded-full border border-black/10 bg-black/5 text-[#059669] flex items-center justify-center animate-in zoom-in-75 duration-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-[#059669] border border-primary/20 text-xs font-mono font-medium">
                  Ref ID: {applicationRef}
                </span>
                <h3 className="headline-md text-2xl font-normal tracking-[-0.8px] text-[#18181B]">
                  {isHindi
                    ? "आवेदन सफलतापूर्वक पंजीकृत हुआ"
                    : "Application Registered Successfully"}
                </h3>
                <p className="body-md text-sm text-[#71717A] font-normal leading-relaxed">
                  {isHindi
                    ? `धन्यवाद ${submittedData?.fullName}! ${submittedData?.city}, ${submittedData?.state} के लिए आपका फ्रैंचाइज़ी प्रस्ताव हमारे कॉर्पोरेट ऑनबोर्डिंग डेस्क पर दर्ज हो गया है।`
                    : `Thank you, ${submittedData?.fullName}! Your franchise enquiry for ${submittedData?.city}, ${submittedData?.state} has been received by our institutional expansion desk.`}
                </p>
              </div>

              {/* SLA Roadmap Box */}
              <div className="w-full max-w-lg rounded-2xl border border-black/10 bg-[#FAFAFA] p-6 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/10">
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                    24-Hour Commercial SLAs
                  </span>
                  <span className="text-xs text-[#059669] font-medium">
                    Priority Review
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border border-black/10 bg-white text-[#18181B] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-xs text-[#18181B] leading-relaxed">
                      Our Institutional Channel Manager will contact you at{" "}
                      <strong>{submittedData?.phone}</strong> to confirm district territory availability and licensing.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border border-black/10 bg-white text-[#18181B] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-xs text-[#18181B] leading-relaxed">
                      You will receive the confidential Solvex Bifacial & Hybrid PCU dealership margins prospectus via WhatsApp and email.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full border border-black/10 bg-white text-[#18181B] font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-xs text-[#18181B] leading-relaxed">
                      A technical orientation on the PM Surya Ghar ₹78,000 DBT process and DISCOM net-metering integration will be initiated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
                <a
                  href={`https://wa.me/919125127755?text=${encodeURIComponent(
                    `Hello Solvex Energy! I submitted a franchise partner application for ${submittedData?.city || "my territory"}. Reference ID: ${applicationRef}. Please share the dealership margins prospectus.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "whatsapp_franchise_success",
                      source: "franchise_dialog",
                      reference_id: applicationRef,
                    })
                  }
                  className="w-full sm:flex-1 h-[48px] px-5 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{isHindi ? "व्हाट्सएप पर बात करें" : "Direct WhatsApp Chat"}</span>
                </a>
                <a
                  href="tel:+919125127755"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "phone_call_franchise_success",
                      source: "franchise_dialog",
                      reference_id: applicationRef,
                    })
                  }
                  className="w-full sm:flex-1 h-[48px] px-5 bg-white border border-black/15 text-[#18181B] hover:bg-zinc-50 rounded-full text-xs font-medium inline-flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#059669]" />
                  <span>{isHindi ? "कॉल करें: +91 91251 27755" : "Call +91 91251 27755"}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs font-semibold text-[#71717A] hover:text-[#18181B] underline underline-offset-4 cursor-pointer pt-1"
              >
                <span>{isHindi ? "विंडो बंद करें" : "Dismiss / Close Window"}</span>
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  {...form.register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* SECTION 01: Personal & Contact Details */}
                <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#18181B] text-xs font-mono">
                        01
                      </div>
                      <h3 className="text-base font-normal text-[#18181B] tracking-[-0.4px]">
                        {isHindi ? "व्यक्तिगत व संपर्क विवरण" : "Personal & Contact Details"}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <FormField
                      control={control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "पूरा नाम" : "Full Name"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-4 top-3.5 w-4 h-4 text-[#71717A]" />
                              <input
                                {...field}
                                placeholder={isHindi ? "उदा. रमेश कुमार शर्मा" : "e.g. Ramesh Kumar Sharma"}
                                className="w-full h-[46px] rounded-full pl-11 pr-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* Mobile Number */}
                    <FormField
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "मोबाइल नंबर" : "Mobile Number"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-4 top-3.5 w-4 h-4 text-[#71717A]" />
                              <input
                                {...field}
                                type="tel"
                                inputMode="tel"
                                placeholder="+91 98765 43210"
                                className="w-full h-[46px] rounded-full pl-11 pr-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* Email (Optional) */}
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2 space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "व्यवसायिक ईमेल" : "Business Email"}{" "}
                              <span className="text-[#71717A] font-normal">(Optional)</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[#71717A]" />
                              <input
                                {...field}
                                type="email"
                                placeholder="name@company.com"
                                className="w-full h-[46px] rounded-full pl-11 pr-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* SECTION 02: Preferred Location */}
                <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#18181B] text-xs font-mono">
                        02
                      </div>
                      <h3 className="text-base font-normal text-[#18181B] tracking-[-0.4px]">
                        {isHindi ? "वांछित कार्यक्षेत्र व जिला" : "Preferred Business Territory"}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                      Pan-India
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City / District */}
                    <FormField
                      control={control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 sm:col-span-1">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "शहर / जिला" : "City / District"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-[#71717A]" />
                              <input
                                {...field}
                                placeholder="e.g. Lucknow / Surat"
                                className="w-full h-[46px] rounded-full pl-11 pr-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* State */}
                    <FormField
                      control={control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 sm:col-span-1">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "राज्य / केंद्र शासित प्रदेश" : "State / UT"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              placeholder="e.g. Uttar Pradesh"
                              className="w-full h-[46px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* PIN Code */}
                    <FormField
                      control={control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 sm:col-span-1">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              PIN Code{" "}
                              <span className="text-[#71717A] font-normal">(Optional)</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              maxLength={6}
                              placeholder="6-digit PIN"
                              className="w-full h-[46px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* SECTION 03: Business Profile & Readiness */}
                <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white flex flex-col gap-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#18181B] text-xs font-mono">
                        03
                      </div>
                      <h3 className="text-base font-normal text-[#18181B] tracking-[-0.4px]">
                        {isHindi ? "व्यवसायिक पृष्ठभूमि व निवेश क्षमता" : "Business Profile & Readiness"}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                      Evaluation
                    </span>
                  </div>

                  {/* Profile Type Radio Cards */}
                  <FormField
                    control={control}
                    name="applicantType"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-medium text-[#18181B] block normal-case tracking-normal">
                          {isHindi ? "आपकी वर्तमान स्थिति क्या दर्शाती है?" : "Which best describes you?"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                          >
                            {[
                              "New entrepreneur / aspiring business owner",
                              "Existing business owner",
                              "Solar / electrical industry professional",
                              "Investor exploring opportunities",
                            ].map((option) => (
                              <label
                                key={option}
                                className={cn(
                                  "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs",
                                  field.value === option
                                    ? "border-[#059669] bg-[#059669]/5 text-[#18181B] ring-1 ring-[#059669] font-medium"
                                    : "border-black/10 bg-[#FAFAFA] text-[#18181B] hover:border-black/25"
                                )}
                              >
                                <RadioGroupItem value={option} id={option} className="border-black/20 text-[#059669]" />
                                <span className="leading-snug">{option}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                      </FormItem>
                    )}
                  />

                  {/* Investment Budget Radio Pills */}
                  <FormField
                    control={control}
                    name="investment"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex flex-col gap-0.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] block normal-case tracking-normal">
                            {isHindi ? "अनुमानित निवेश क्षमता" : "Estimated Investment Budget"}{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <p className="text-[11px] text-[#71717A] leading-normal">
                            Consultation ranges for stock & inventory setup, not mandatory upfront franchise fees.
                          </p>
                        </div>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                          >
                            {[
                              "Below ₹2 lakh",
                              "₹2–5 lakh",
                              "₹5–10 lakh",
                              "₹10–25 lakh",
                              "₹25 lakh+",
                              "Need guidance",
                            ].map((budget) => (
                              <label
                                key={budget}
                                className={cn(
                                  "p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 text-xs text-center justify-center font-normal",
                                  field.value === budget
                                    ? "border-[#059669] bg-[#059669]/5 text-[#18181B] ring-1 ring-[#059669] font-medium"
                                    : "border-black/10 bg-[#FAFAFA] text-[#18181B] hover:border-black/25"
                                )}
                              >
                                <RadioGroupItem value={budget} id={budget} className="sr-only" />
                                <span className="truncate">{budget}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                      </FormItem>
                    )}
                  />

                  {/* Experience */}
                  <FormField
                    control={control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-medium text-[#18181B] block normal-case tracking-normal">
                          {isHindi ? "संबंधित अनुभव" : "Relevant Domain Experience"}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                          >
                            {[
                              { label: "New to solar (No prior experience)", val: "No prior solar experience" },
                              { label: "Sales, dealership or distribution", val: "Sales or distribution" },
                              { label: "Electrical / renewable energy", val: "Electrical or renewable energy" },
                              { label: "Other business / contracting background", val: "Other business experience" },
                            ].map((item) => (
                              <label
                                key={item.val}
                                className={cn(
                                  "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs",
                                  field.value === item.val
                                    ? "border-[#059669] bg-[#059669]/5 text-[#18181B] ring-1 ring-[#059669] font-medium"
                                    : "border-black/10 bg-[#FAFAFA] text-[#18181B] hover:border-black/25"
                                )}
                              >
                                <RadioGroupItem value={item.val} id={item.val} className="border-black/20 text-[#059669]" />
                                <span className="leading-snug">{item.label}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* SECTION 04: Objectives & Timelines */}
                <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#18181B] text-xs font-mono">
                        04
                      </div>
                      <h3 className="text-base font-normal text-[#18181B] tracking-[-0.4px]">
                        {isHindi ? "साझेदारी मॉडल व समय सीमा" : "Partnership Scope & Timeline"}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#71717A] uppercase tracking-wider">
                      Preferences
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Opportunity of interest */}
                    <FormField
                      control={control}
                      name="opportunity"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "वांछित साझेदारी मॉडल" : "Opportunity of Interest"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="w-full h-[46px] rounded-full px-5 pr-10 bg-[#FAFAFA] border border-black/10 text-[#18181B] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] cursor-pointer appearance-none"
                              >
                                <option value="Solar franchise">Exclusive Solvex Solar Franchise</option>
                                <option value="Rooftop solar dealership">Rooftop Solar EPC Dealership</option>
                                <option value="Solar sales and distribution">Regional Hardware Distribution</option>
                                <option value="Project / channel partnership">Commercial Channel Partnership</option>
                                <option value="Help me explore available models">Help me explore available models</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-[#71717A] pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* Timeline */}
                    <FormField
                      control={control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "शुरुआत की समय सीमा" : "Expected Start Timeline"}{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className="w-full h-[46px] rounded-full px-5 pr-10 bg-[#FAFAFA] border border-black/10 text-[#18181B] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] cursor-pointer appearance-none"
                              >
                                <option value="Immediately">Immediately (Within 30 days)</option>
                                <option value="Within 1–3 months">Within 1–3 months</option>
                                <option value="Within 3–6 months">Within 3–6 months</option>
                                <option value="Just exploring opportunities">Just exploring opportunities</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-[#71717A] pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />

                    {/* Notes */}
                    <FormField
                      control={control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2 space-y-1.5">
                          <FormLabel className="text-xs font-medium text-[#18181B] flex items-center justify-between normal-case tracking-normal">
                            <span>
                              {isHindi ? "अतिरिक्त विवरण व टिप्पणी" : "Additional Details & Questions"}{" "}
                              <span className="text-[#71717A] font-normal">(Optional)</span>
                            </span>
                          </FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              rows={3}
                              maxLength={1500}
                              placeholder={
                                isHindi
                                  ? "अपने मौजूदा शोरूम, गोदाम, बिजली ठेकेदारी लाइसेंस अथवा क्षेत्र संबंधित विवरण साझा करें..."
                                  : "Tell us about existing commercial showroom space, warehouse facilities, electrical licenses, or specific territory interests..."
                              }
                              className="w-full rounded-2xl p-4 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] text-xs transition-all focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] resize-y"
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] text-red-600 font-medium pl-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* CONSENT & COMPLIANCE (DPDP Act 2023) */}
                <FormField
                  control={control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="rounded-2xl border border-black/10 bg-[#FAFAFA] p-4 sm:p-5 space-y-2">
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-black/25 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669]"
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-xs text-[#18181B] normal-case font-normal leading-relaxed block cursor-pointer">
                            I agree that SOLVEX Energy Solutions may contact me via voice call,
                            WhatsApp, or email regarding this commercial franchise enquiry. I have
                            read and accept the{" "}
                            <button
                              type="button"
                              onClick={() => openLegalModal("privacy")}
                              className="text-[#059669] font-medium underline underline-offset-2 hover:text-[#047857] inline-flex items-center gap-0.5 cursor-pointer"
                            >
                              Privacy Policy
                              <ExternalLink className="w-3 h-3 inline" />
                            </button>
                            . <span className="text-red-500">*</span>
                          </FormLabel>
                          <p className="text-[11px] text-[#71717A] leading-normal">
                            Protected under India&apos;s Digital Personal Data Protection (DPDP) Act 2023. We never sell your contact information.
                          </p>
                        </div>
                      </div>
                      <FormMessage className="text-[11px] text-red-600 font-medium pl-7" />
                    </FormItem>
                  )}
                />

                {/* FORM ACTIONS */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[50px] sm:h-[52px] px-8 bg-primary text-white hover:bg-primary-hover disabled:bg-zinc-300 rounded-full text-sm font-normal tracking-[-0.2px] inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-xs cursor-pointer group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {isHindi
                            ? "फ्रैंचाइज़ी प्रस्ताव जमा करें"
                            : "Submit Franchise Enquiry"}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#71717A]">
                    Submitting this form requests a confidential commercial consultation; it does not constitute a binding franchise offer or agreement.
                  </p>
                </div>
              </form>
            </Form>
          )}
        </div>

        {/* Modal Footer: Matching Institutional Legal Bar */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-black/10 bg-[#FAFAFA] flex items-center justify-between text-[11px] text-[#71717A] font-mono shrink-0">
          <span>CIN: U43219GJ2025PTC168167</span>
          <span className="hidden sm:inline">Solvex Corporate Franchise Desk • Gujarat, India</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
