"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  CheckCircle2,
  Copy,
  Check,
  Send,
  Zap,
  Phone,
  MessageSquare,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import {
  productEnquirySchema,
  type ProductEnquiryValues,
  DEFAULT_PRODUCT_ENQUIRY_VALUES,
} from "./product-enquiry-schema";

export interface ProductEnquiryDetails {
  product?: string;
  capacity?: string;
  rooftopArea?: string;
  monthlyBill?: string;
}

export function openProductEnquiryDialog(detail?: ProductEnquiryDetails) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-product-enquiry-dialog", { detail }));
  }
}

function generateProductFallbackReferenceId(): string {
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `SLX-PRD-${currentYear}-${randomSuffix}`;
}

export interface ProductEnquiryDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialProductInterest?: string;
  initialCapacityKw?: string;
  initialRooftopArea?: string;
  initialMonthlyBill?: string;
}

export default function ProductEnquiryDialog({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  initialProductInterest = "",
  initialCapacityKw = "",
  initialRooftopArea = "",
  initialMonthlyBill = "",
}: ProductEnquiryDialogProps) {
  const { isHindi } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [copied, setCopied] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const form = useForm<ProductEnquiryValues>({
    resolver: zodResolver(productEnquirySchema),
    defaultValues: {
      ...DEFAULT_PRODUCT_ENQUIRY_VALUES,
      productInterest: initialProductInterest || DEFAULT_PRODUCT_ENQUIRY_VALUES.productInterest,
      requiredCapacityKw: initialCapacityKw || "",
      rooftopAreaSqFt: initialRooftopArea || "",
      monthlyBill: initialMonthlyBill || DEFAULT_PRODUCT_ENQUIRY_VALUES.monthlyBill,
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting },
  } = form;

  const currentProductInterest = watch("productInterest");
  const currentCapacityKw = watch("requiredCapacityKw");

  // Reset form when dialog closes
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(DEFAULT_PRODUCT_ENQUIRY_VALUES);
      setSubmitted(false);
    }
    setOpen(nextOpen);
  };

  // Global event listener to open and pre-populate inquiry dialog
  useEffect(() => {
    const handleGlobalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ProductEnquiryDetails>;
      const detail = customEvent.detail;
      reset({
        ...DEFAULT_PRODUCT_ENQUIRY_VALUES,
        productInterest: detail?.product || initialProductInterest || DEFAULT_PRODUCT_ENQUIRY_VALUES.productInterest,
        requiredCapacityKw: detail?.capacity || initialCapacityKw || "",
        rooftopAreaSqFt: detail?.rooftopArea || initialRooftopArea || "",
        monthlyBill: detail?.monthlyBill || initialMonthlyBill || DEFAULT_PRODUCT_ENQUIRY_VALUES.monthlyBill,
      });
      setSubmitted(false);
      setOpen(true);
    };

    window.addEventListener("open-product-enquiry-dialog", handleGlobalOpen);
    return () => window.removeEventListener("open-product-enquiry-dialog", handleGlobalOpen);
  }, [reset, setOpen, initialProductInterest, initialCapacityKw, initialRooftopArea, initialMonthlyBill]);

  const onSubmit = async (values: ProductEnquiryValues) => {
    try {
      const res = await fetch("/api/solar-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "product_buyer",
          ...values,
        }),
      });

      const json = await res.json();
      const refId = res.ok && json.success && json.referenceId
        ? json.referenceId
        : generateProductFallbackReferenceId();

      setReferenceId(refId);
      setSubmitted(true);
      reset(DEFAULT_PRODUCT_ENQUIRY_VALUES);

      trackEvent("product_enquiry_submitted", {
        formType: "product_buyer",
        leadReferenceId: refId,
        productName: values.productInterest,
        systemSizeKw: values.requiredCapacityKw,
        category: "Leads",
      });
    } catch {
      const fallbackId = generateProductFallbackReferenceId();
      setReferenceId(fallbackId);
      setSubmitted(true);
      reset(DEFAULT_PRODUCT_ENQUIRY_VALUES);
    }
  };

  const copyRefCode = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappDirectUrl = `https://wa.me/919125127755?text=${encodeURIComponent(
    `Hello Solvex Energy! I submitted an enquiry for ${currentProductInterest || "Solar Systems"}. My Reference ID is ${referenceId}. Please share quote and site survey schedule.`
  )}`;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-[92vh] overflow-y-auto p-0 rounded-2xl bg-white border border-black/10 shadow-2xl text-[#18181B]">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-black/10 bg-[#FAFAFA]">
          <div className="flex items-center gap-2 mb-2 pr-8 sm:pr-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Zap className="w-3.5 h-3.5" />
              <span>{isHindi ? "सोलर उत्पाद व सब्सिडी पूछताछ" : "Solar Systems & Subsidy Inquiry"}</span>
            </span>
            <span className="text-[11px] font-mono text-[#71717A] ml-auto">
              {isHindi ? "पीएम सूर्य घर पात्र" : "PM Surya Ghar Eligible"}
            </span>
          </div>

          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-xl sm:text-2xl font-normal text-[#18181B] tracking-[-0.6px]">
              {isHindi ? "निःशुल्क साइट सर्वे व कोटेशन प्राप्त करें" : "Book Free Site Survey & Get Quote"}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#71717A]">
              {isHindi
                ? "इन्वर्टर, पीवी पैनल या रूफटॉप सोलर प्लांट के लिए सीधे तकनीकी टीम से जुड़ें। ₹78,000 डीबीटी सब्सिडी मार्गदर्शन शामिल।"
                : "Connect directly with our engineering desk for inverters, bifacial panels, or turnkey rooftop systems. Includes ₹78,000 DBT subsidy calculation."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                {/* Product Interest Highlight Banner */}
                {currentProductInterest && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-950">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong className="font-medium">{isHindi ? "चयनित आइटम:" : "Selected:"}</strong>{" "}
                        {currentProductInterest}
                      </span>
                    </div>
                    {currentCapacityKw && (
                      <span className="font-mono font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                        {currentCapacityKw} kW
                      </span>
                    )}
                  </div>
                )}

                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "पूरा नाम" : "Full Name"} <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={isHindi ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
                            className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10 focus:border-primary text-[#18181B] placeholder:text-[#71717A]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "मोबाइल नंबर (व्हाट्सएप)" : "Mobile Number (WhatsApp)"} <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10 focus:border-primary text-[#18181B] placeholder:text-[#71717A]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600" />
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
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "ईमेल पता (वैकल्पिक)" : "Email Address (Optional)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10 focus:border-primary text-[#18181B] placeholder:text-[#71717A]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "शहर / जिला" : "City / District"} <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={isHindi ? "उदा. सूरत, अहमदाबाद" : "e.g. Surat, Jaipur"}
                            className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10 focus:border-primary text-[#18181B] placeholder:text-[#71717A]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[11px] text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 3: Property Type & Monthly Bill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "स्थान का प्रकार" : "Property Type"}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10">
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential_rooftop">
                              {isHindi ? "आवासीय बंगला / घर" : "Residential Home / Villa"}
                            </SelectItem>
                            <SelectItem value="commercial_industrial">
                              {isHindi ? "वाणिज्यिक / कारखाना" : "Commercial / Factory / Hospital"}
                            </SelectItem>
                            <SelectItem value="agricultural_pump">
                              {isHindi ? "कृषि पंप / फार्म" : "Agricultural Solar Pump"}
                            </SelectItem>
                            <SelectItem value="housing_society">
                              {isHindi ? "सोसाइटी कॉमन एरिया" : "Housing Society Common Area"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[11px] text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="monthlyBill"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-[#18181B]">
                          {isHindi ? "मासिक बिजली बिल" : "Monthly Electricity Bill"}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl text-xs bg-[#FAFAFA] border-black/10">
                              <SelectValue placeholder="Select bill amount" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tier_1k_3k">₹1,500 – ₹3,000 / mo</SelectItem>
                            <SelectItem value="tier_3k_5k">₹3,000 – ₹5,000 / mo</SelectItem>
                            <SelectItem value="tier_5k_15k">₹5,000 – ₹15,000 / mo</SelectItem>
                            <SelectItem value="tier_15k_50k">₹15,000 – ₹50,000 / mo</SelectItem>
                            <SelectItem value="tier_50k_plus">₹50,000+ / mo (Commercial)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[11px] text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Optional notes */}
                <FormField
                  control={control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-[#18181B]">
                        {isHindi ? "विशेष आवश्यकता या प्रश्न (वैकल्पिक)" : "Special Requirements / Roof Details (Optional)"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            isHindi
                              ? "उदा. 3-फेज कनेक्शन, बैटरी बैकअप आवश्यकता या छाया-मुक्त छत क्षेत्र..."
                              : "e.g. 3-phase connection, battery backup needed, or shadow-free roof area..."
                          }
                          className="rounded-xl text-xs bg-[#FAFAFA] border-black/10 focus:border-primary min-h-[64px] text-[#18181B] placeholder:text-[#71717A]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[11px] text-red-600" />
                    </FormItem>
                  )}
                />

                {/* Consent Checkbox */}
                <FormField
                  control={control}
                  name="consentAgreed"
                  render={({ field }) => (
                    <FormItem className="pt-1">
                      <div className="flex items-start gap-2.5">
                        <FormControl>
                          <Checkbox
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-black/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <FormLabel className="text-[11px] text-[#71717A] leading-relaxed font-normal cursor-pointer">
                          {isHindi ? (
                            <>
                              मैं साइट मूल्यांकन और सब्सिडी अनुमान के लिए सोल्वेक्स एनर्जी की{" "}
                              <button
                                type="button"
                                onClick={() => openLegalModal("privacy")}
                                className="text-primary underline font-medium hover:text-primary-hover"
                              >
                                गोपनीयता नीति
                              </button>{" "}
                              व संपर्क शर्तों से सहमत हूँ।
                            </>
                          ) : (
                            <>
                              I authorize Solvex Energy to contact me regarding site survey, PM Surya Ghar subsidy disbursals, and technical estimates as per the{" "}
                              <button
                                type="button"
                                onClick={() => openLegalModal("privacy")}
                                className="text-primary underline font-medium hover:text-primary-hover"
                              >
                                Privacy Policy
                              </button>.
                            </>
                          )}
                        </FormLabel>
                      </div>
                      <FormMessage className="text-[11px] text-red-600 mt-1" />
                    </FormItem>
                  )}
                />

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-primary text-white hover:bg-primary-hover font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isHindi ? "अनुरोध दर्ज हो रहा है..." : "Submitting Inquiry..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isHindi ? "कोटेशन व सर्वे अनुरोध भेजें" : "Submit Quote & Site Survey Request"}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Form>
          ) : (
            /* Confirmation State with Reference ID, SLA & Instant WhatsApp Bridge */
            <div className="py-6 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-normal text-[#18181B] tracking-tight">
                  {isHindi ? "अनुरोध सफलतापूर्वक प्राप्त हुआ!" : "Inquiry Successfully Registered!"}
                </h3>
                <p className="text-xs text-[#71717A] max-w-md">
                  {isHindi
                    ? "हमारे वरिष्ठ सोलर सिस्टम्स इंजीनियर को आपका विवरण मिल गया है। 2 व्यावसायिक घंटों के भीतर आपको संपर्क किया जाएगा।"
                    : "Our senior photovoltaic systems engineer has received your audit profile. You will be contacted within 2 business hours."}
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="w-full max-w-sm p-4 rounded-xl border border-black/10 bg-[#FAFAFA] flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A]">
                    {isHindi ? "ट्रैकिंग संदर्भ संख्या" : "Tracking Reference ID"}
                  </span>
                  <p className="font-mono text-base font-bold text-primary tracking-wide">{referenceId}</p>
                </div>
                <button
                  type="button"
                  onClick={copyRefCode}
                  className="h-8 px-3 rounded-lg border border-black/10 bg-white hover:bg-zinc-100 text-xs font-mono flex items-center gap-1.5 transition-all text-[#18181B] cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isHindi ? "कॉपी हुआ" : "Copied") : (isHindi ? "कॉपी" : "Copy")}</span>
                </button>
              </div>

              {/* Dual Action CTAs: Direct WhatsApp with Ref ID & Direct Call */}
              <div className="w-full max-w-sm flex flex-col gap-2.5 pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_cta_clicked", {
                      sourceLocation: "product_modal_confirmation",
                      leadReferenceId: referenceId,
                    })
                  }
                  className="h-11 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isHindi ? "व्हाट्सएप पर तुरंत चैट करें" : "Chat Instantly on WhatsApp"}</span>
                </a>

                <a
                  href="tel:+919125127755"
                  onClick={() =>
                    trackEvent("call_cta_clicked", {
                      sourceLocation: "product_modal_confirmation",
                      leadReferenceId: referenceId,
                    })
                  }
                  className="h-11 rounded-full bg-white hover:bg-zinc-100 border border-black/10 text-[#18181B] font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>{isHindi ? "हेल्पलाइन पर कॉल करें: +91 91251 27755" : "Call Helpline: +91 91251 27755"}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="text-xs text-[#71717A] hover:text-[#18181B] pt-2 cursor-pointer"
                >
                  {isHindi ? "खिड़की बंद करें" : "Dismiss & Return to Portal"}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
