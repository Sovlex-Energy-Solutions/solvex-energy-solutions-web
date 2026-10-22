"use client";

import { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle2,
  Lock,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Sun,
  Briefcase,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import { trackEvent } from "@/lib/analytics";

export default function ContactSection() {
  const { t, isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState<"buyer" | "partner">("buyer");

  // --- Product Buyer Form State ---
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);
  const [buyerRefId, setBuyerRefId] = useState("");
  const [buyerSubmitting, setBuyerSubmitting] = useState(false);
  const [buyerCopied, setBuyerCopied] = useState(false);
  const [buyerData, setBuyerData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    propertyType: "residential_rooftop",
    productInterest: "Rooftop Solar EPC System",
    monthlyBill: "tier_5k_15k",
    capacityKw: "",
    notes: "",
    consentAgreed: false,
  });
  const [buyerErrors, setBuyerErrors] = useState<Record<string, string>>({});
  const [buyerTouched, setBuyerTouched] = useState<Record<string, boolean>>({});

  // --- Partner Form State ---
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerRefId, setPartnerRefId] = useState("");
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerCopied, setPartnerCopied] = useState(false);
  const [partnerData, setPartnerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    partnershipType: "",
    investmentCapacity: "",
    experience: "",
    consentAgreed: false,
  });
  const [partnerErrors, setPartnerErrors] = useState<Record<string, string>>({});
  const [partnerTouched, setPartnerTouched] = useState<Record<string, boolean>>({});

  // Validation: Buyer
  const validateBuyerField = (field: string, value: any): string => {
    switch (field) {
      case "fullName":
        if (!value || !value.trim()) return isHindi ? "नाम दर्ज करना आवश्यक है" : "Full name is required.";
        if (value.trim().length < 2) return isHindi ? "कम से कम 2 अक्षर होने चाहिए" : "Must be at least 2 characters.";
        return "";
      case "phone":
        if (!value || !value.trim()) return isHindi ? "मोबाइल नंबर आवश्यक है" : "Mobile number is required.";
        const clean = value.replace(/[\s\-\(\)]/g, "");
        if (!/^(?:\+?91)?[6-9]\d{9}$/.test(clean)) {
          return isHindi ? "मान्य 10-अंकीय मोबाइल नंबर (+91) दर्ज करें" : "Enter a valid 10-digit mobile number (+91).";
        }
        return "";
      case "city":
        if (!value || !value.trim()) return isHindi ? "शहर या जिला आवश्यक है" : "City / District is required.";
        return "";
      case "consentAgreed":
        if (!value) return isHindi ? "डेटा प्रोसेसिंग के लिए सहमति आवश्यक है" : "Consent is required to proceed.";
        return "";
      default:
        return "";
    }
  };

  // Validation: Partner
  const validatePartnerField = (field: string, value: any): string => {
    switch (field) {
      case "firstName":
        if (!value || !value.trim()) return isHindi ? "पहला नाम आवश्यक है" : "First name is required.";
        if (value.trim().length < 2) return isHindi ? "कम से कम 2 अक्षर होने चाहिए" : "Must be at least 2 characters.";
        return "";
      case "lastName":
        if (!value || !value.trim()) return isHindi ? "अंतिम नाम आवश्यक है" : "Last name is required.";
        if (value.trim().length < 2) return isHindi ? "कम से कम 2 अक्षर होने चाहिए" : "Must be at least 2 characters.";
        return "";
      case "email":
        if (!value || !value.trim()) return isHindi ? "आधिकारिक ईमेल आवश्यक है" : "Official email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return isHindi ? "मान्य व्यावसायिक ईमेल दर्ज करें" : "Please enter a valid business email address.";
        return "";
      case "phone":
        if (!value || !value.trim()) return isHindi ? "मोबाइल नंबर आवश्यक है" : "Mobile number is required.";
        const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
        if (!/^(?:\+?91)?[6-9]\d{9}$|^\+?\d{9,14}$/.test(cleanPhone))
          return isHindi ? "मान्य 10-अंकीय मोबाइल नंबर (+91) दर्ज करें" : "Enter a valid 10-digit mobile number (+91).";
        return "";
      case "city":
        if (!value || !value.trim()) return isHindi ? "लक्षित जिला/शहर आवश्यक है" : "Target operating district or city is required.";
        return "";
      case "partnershipType":
        if (!value) return isHindi ? "साझेदारी का प्रकार चुनें" : "Please select a partnership tier.";
        return "";
      case "investmentCapacity":
        if (!value) return isHindi ? "निवेश सीमा चुनें" : "Please select a capital allocation band.";
        return "";
      case "consentAgreed":
        if (!value) return isHindi ? "वाणिज्यिक शर्तों के लिए सहमति आवश्यक है" : "You must consent to commercial terms to proceed.";
        return "";
      default:
        return "";
    }
  };

  // Submit Buyer
  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = ["fullName", "phone", "city", "consentAgreed"];
    const newErrors: Record<string, string> = {};
    let hasErr = false;

    fields.forEach((f) => {
      const err = validateBuyerField(f, (buyerData as any)[f]);
      if (err) {
        newErrors[f] = err;
        hasErr = true;
      }
    });

    setBuyerTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    setBuyerErrors(newErrors);
    if (hasErr) return;

    setBuyerSubmitting(true);
    try {
      const res = await fetch("/api/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "product_buyer",
          ...buyerData,
          channelSource: "contact_section_buyer_tab",
        }),
      });
      const json = await res.json();
      const refCode = json.referenceId || `SLX-PRD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setBuyerRefId(refCode);
      setBuyerSubmitted(true);

      trackEvent("product_enquiry_submitted", {
        formType: "product_buyer",
        leadReferenceId: refCode,
        source: "contact_section",
        city: buyerData.city,
        product: buyerData.productInterest,
      });
    } catch {
      const fallback = `SLX-PRD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setBuyerRefId(fallback);
      setBuyerSubmitted(true);
    } finally {
      setBuyerSubmitting(false);
    }
  };

  // Submit Partner
  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "partnershipType",
      "investmentCapacity",
      "consentAgreed",
    ];
    const newErrors: Record<string, string> = {};
    let hasErr = false;

    fields.forEach((f) => {
      const err = validatePartnerField(f, (partnerData as any)[f]);
      if (err) {
        newErrors[f] = err;
        hasErr = true;
      }
    });

    setPartnerTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    setPartnerErrors(newErrors);
    if (hasErr) return;

    setPartnerSubmitting(true);
    try {
      const res = await fetch("/api/franchise-dealership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "franchise_partner",
          ...partnerData,
          channelSource: "contact_section_partner_tab",
        }),
      });
      const json = await res.json();
      const refCode = json.referenceId || `SLX-PRT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setPartnerRefId(refCode);
      setPartnerSubmitted(true);

      trackEvent("partner_enquiry_submitted", {
        formType: "franchise_partner",
        leadReferenceId: refCode,
        source: "contact_section",
        city: partnerData.city,
        partnership_tier: partnerData.partnershipType,
        investment_band: partnerData.investmentCapacity,
      });
    } catch {
      const fallback = `SLX-PRT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setPartnerRefId(fallback);
      setPartnerSubmitted(true);
    } finally {
      setPartnerSubmitting(false);
    }
  };

  return (
    <section className="w-full pt-20 lg:pt-28 pb-14 lg:pb-20 bg-[#FFFFFF] relative" id="partner-form">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Corporate Desk & Direct CTAs */}
          <div className="lg:col-span-5">
            <MotionReveal className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>{t("contact.badge", "[ 11 // CORPORATE DESK & ALLOCATION ]")}</span>
                </div>
                <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                  {isHindi ? "सीधे हमारे एक्सपर्ट्स से संपर्क करें" : "Connect with Solvex Energy Desk"}
                </h2>
                <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                  {isHindi
                    ? "चाहे आप सोलर सिस्टम उत्पाद खरीद रहे हों या अपने जिले में फ्रैंचाइज़ी डीलरशिप ले रहे हों, हमारे विशेषज्ञ तुरंत सहायता के लिए उपलब्ध हैं।"
                    : "Whether you require Tier-1 solar equipment and turnkey PM Surya Ghar installation or district franchise territory allocation, our corporate desk is at your disposal."}
                </p>
              </div>

              {/* Working Direct Phone Call Card */}
              <a
                href="tel:+919125127755"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "phone_call",
                    source: "contact_section_left_card",
                  })
                }
                className="group p-5 rounded-2xl border border-black/10 bg-white hover:border-[#059669] hover:bg-emerald-50/40 transition-all duration-300 shadow-xs flex items-center justify-between cursor-pointer"
                aria-label="Direct Phone Consultation +91 91251 27755"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#059669]/10 text-[#059669] group-hover:bg-[#059669] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                    <Phone className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#71717A]">
                        {isHindi ? "सीधी फोन कंसल्टेशन" : "Direct Phone Consultation"}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <span className="text-base font-bold text-[#18181B] group-hover:text-[#059669] transition-colors mt-0.5">
                      +91 91251 27755
                    </span>
                    <span className="text-[11px] text-[#71717A] mt-0.5">
                      {isHindi ? "सोम—शनि: 09:30 - 18:30 IST" : "Mon—Sat: 09:30 - 18:30 IST"}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>

              {/* Working Direct WhatsApp Card */}
              <a
                href={`https://wa.me/919125127755?text=${encodeURIComponent(
                  "Hello Solvex Energy! I would like to inquire about solar systems, subsidy assistance, and equipment allocation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "whatsapp_chat",
                    source: "contact_section_left_card",
                  })
                }
                className="group p-5 rounded-2xl border border-black/10 bg-white hover:border-[#25D366] hover:bg-emerald-50/30 transition-all duration-300 shadow-xs flex items-center justify-between cursor-pointer"
                aria-label="Official WhatsApp Help Desk"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                    <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#71717A]">
                        {isHindi ? "आधिकारिक व्हाट्सएप डेस्क" : "Official WhatsApp Desk"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#059669] bg-emerald-100 px-2 py-0.5 rounded-full">
                        ⚡ Quick Response
                      </span>
                    </div>
                    <span className="text-base font-bold text-[#18181B] group-hover:text-[#059669] transition-colors mt-0.5">
                      +91 91251 27755
                    </span>
                    <span className="text-[11px] text-[#71717A] mt-0.5">
                      {isHindi ? "औसतन प्रतिक्रिया समय: < 15 मिनट" : "Average response: <15 mins"}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>

              {/* Corporate Desk Info Card */}
              <div className="card-superpower p-6 flex flex-col gap-5 bg-white shadow-xs">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#18181B]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                      {t("contact.hqLabel", "Corporate Headquarters")}
                    </span>
                    <span className="text-sm font-normal text-[#18181B] mt-1 leading-relaxed">
                      {t(
                        "contact.hqAddress",
                        "F-5A Shyam Nagar, EX Shiv Sadan, Jaipur 302019, Rajasthan, India"
                      )}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pt-4 border-t border-black/10">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#18181B]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                      {t("contact.deskLabel", "Institutional Desk")}
                    </span>
                    <a
                      href="mailto:Infosolvexenergysoltuion@gmail.com"
                      className="text-sm font-normal text-[#18181B] hover:text-[#059669] mt-1 transition-colors"
                    >
                      Infosolvexenergysoltuion@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operational Hours */}
                <div className="flex items-start gap-4 pt-4 border-t border-black/10">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 text-[#18181B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#18181B]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                      {t("contact.hoursLabel", "Operations & Dispatch")}
                    </span>
                    <span className="text-sm font-normal text-[#18181B] mt-1">
                      {t("contact.hoursTime", "Monday — Saturday: 09:30 - 18:30 IST")}
                    </span>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Dual Segmented Forms */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.1}>
              <div className="card-superpower p-6 sm:p-8 lg:p-10 flex flex-col gap-6 bg-white shadow-xs border-black/10">
                {/* Segmented Control Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                  <div className="inline-flex p-1 rounded-full bg-zinc-100 border border-black/10 w-fit">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("buyer");
                        trackEvent("cta_click", {
                          cta_name: "switch_tab_product_buyer",
                          source: "contact_section",
                        });
                      }}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 inline-flex items-center gap-2 cursor-pointer ${
                        activeTab === "buyer"
                          ? "bg-white text-[#18181B] shadow-sm"
                          : "text-[#71717A] hover:text-[#18181B]"
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isHindi ? "सोलर उपकरण व कोटेशन" : "Product Buyer Inquiry"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("partner");
                        trackEvent("cta_click", {
                          cta_name: "switch_tab_franchise_partner",
                          source: "contact_section",
                        });
                      }}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 inline-flex items-center gap-2 cursor-pointer ${
                        activeTab === "partner"
                          ? "bg-[#059669] text-white shadow-sm"
                          : "text-[#71717A] hover:text-[#18181B]"
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{isHindi ? "फ्रैंचाइज़ी व डीलरशिप" : "Franchise & Dealership"}</span>
                    </button>
                  </div>

                  <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium w-fit">
                    {activeTab === "buyer" ? "PM SURYA GHAR ELIGIBLE" : "FY 2026 TERRITORY INTAKE"}
                  </span>
                </div>

                {/* TAB 1: PRODUCT BUYER ENQUIRY FORM */}
                {activeTab === "buyer" && (
                  <div>
                    {!buyerSubmitted ? (
                      <form onSubmit={handleBuyerSubmit} noValidate className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="buyer-name" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "पूरा नाम" : "Full Name"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="buyer-name"
                              placeholder={isHindi ? "उदा. राजेश पटेल" : "e.g. Rajesh Patel"}
                              value={buyerData.fullName}
                              onChange={(e) => setBuyerData({ ...buyerData, fullName: e.target.value })}
                              onBlur={() => {
                                setBuyerTouched((prev) => ({ ...prev, fullName: true }));
                                setBuyerErrors((prev) => ({
                                  ...prev,
                                  fullName: validateBuyerField("fullName", buyerData.fullName),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                buyerErrors.fullName && buyerTouched.fullName ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {buyerErrors.fullName && buyerTouched.fullName && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {buyerErrors.fullName}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="buyer-phone" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "मोबाइल नंबर" : "Mobile Number"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="buyer-phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={buyerData.phone}
                              onChange={(e) => setBuyerData({ ...buyerData, phone: e.target.value })}
                              onBlur={() => {
                                setBuyerTouched((prev) => ({ ...prev, phone: true }));
                                setBuyerErrors((prev) => ({
                                  ...prev,
                                  phone: validateBuyerField("phone", buyerData.phone),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                buyerErrors.phone && buyerTouched.phone ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {buyerErrors.phone && buyerTouched.phone && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {buyerErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="buyer-email" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "ईमेल पता (वैकल्पिक)" : "Email Address (Optional)"}
                            </Label>
                            <Input
                              id="buyer-email"
                              type="email"
                              placeholder="name@example.com"
                              value={buyerData.email}
                              onChange={(e) => setBuyerData({ ...buyerData, email: e.target.value })}
                              className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A]"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="buyer-city" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "शहर / जिला" : "City / District"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="buyer-city"
                              placeholder={isHindi ? "उदा. सूरत, गुजरात" : "e.g. Surat, Gujarat"}
                              value={buyerData.city}
                              onChange={(e) => setBuyerData({ ...buyerData, city: e.target.value })}
                              onBlur={() => {
                                setBuyerTouched((prev) => ({ ...prev, city: true }));
                                setBuyerErrors((prev) => ({
                                  ...prev,
                                  city: validateBuyerField("city", buyerData.city),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                buyerErrors.city && buyerTouched.city ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {buyerErrors.city && buyerTouched.city && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {buyerErrors.city}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "रुचि का उत्पाद" : "Product of Interest"}
                            </Label>
                            <Select
                              value={buyerData.productInterest}
                              onValueChange={(val) => setBuyerData({ ...buyerData, productInterest: val })}
                            >
                              <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                                <SelectItem value="Rooftop Solar EPC System">Rooftop Solar EPC (Turnkey + Subsidy)</SelectItem>
                                <SelectItem value="Solvex Solar Inverters (rMPPT)">Solvex Smart rMPPT Inverter</SelectItem>
                                <SelectItem value="Heavy Industrial Solar PCU">Heavy Industrial Solar PCU (3kVA - 15kVA)</SelectItem>
                                <SelectItem value="SPGS Hybrid Combo Kits">SPGS Hybrid Rooftop Combo Kit</SelectItem>
                                <SelectItem value="Lithium/Tubular Battery Bank">Solar Battery Storage Bank</SelectItem>
                                <SelectItem value="Commercial Rooftop 25kW+">Commercial / Industrial 25kW+ Array</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "मासिक बिजली बिल या क्षमता" : "Monthly Bill Band / Capacity"}
                            </Label>
                            <Select
                              value={buyerData.monthlyBill}
                              onValueChange={(val) => setBuyerData({ ...buyerData, monthlyBill: val })}
                            >
                              <SelectTrigger className="h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border border-black/10 cursor-pointer">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                                <SelectItem value="tier_under_2k">₹1,000 - ₹2,500 / month (1kW - 2kW)</SelectItem>
                                <SelectItem value="tier_2k_5k">₹2,500 - ₹5,000 / month (2kW - 3kW PM Surya Ghar)</SelectItem>
                                <SelectItem value="tier_5k_15k">₹5,000 - ₹15,000 / month (4kW - 8kW)</SelectItem>
                                <SelectItem value="tier_15k_plus">₹15,000+ / month (Commercial 10kW+)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="buyer-notes" className="text-xs font-medium text-[#18181B]">
                            {isHindi ? "विशिष्ट आवश्यकताएं (वैकल्पिक)" : "Specific Notes / Rooftop Details (Optional)"}
                          </Label>
                          <Textarea
                            id="buyer-notes"
                            placeholder={
                              isHindi
                                ? "अपनी छत के प्रकार, बिजली कनेक्शन या लोड के बारे में बताएं..."
                                : "Describe your rooftop type, sanctioned load, or preferred battery backup..."
                            }
                            value={buyerData.notes}
                            onChange={(e) => setBuyerData({ ...buyerData, notes: e.target.value })}
                            className="min-h-[80px] p-3 text-xs bg-[#FAFAFA] border border-black/10 rounded-2xl resize-none text-[#18181B] placeholder:text-[#71717A]"
                          />
                        </div>

                        {/* DPDP Consent */}
                        <div className="p-3 rounded-xl border border-black/10 bg-zinc-50/80 flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="buyer-consent"
                            checked={buyerData.consentAgreed}
                            onChange={(e) => {
                              setBuyerData({ ...buyerData, consentAgreed: e.target.checked });
                              setBuyerTouched((prev) => ({ ...prev, consentAgreed: true }));
                              setBuyerErrors((prev) => ({
                                ...prev,
                                consentAgreed: validateBuyerField("consentAgreed", e.target.checked),
                              }));
                            }}
                            className="mt-0.5 w-4 h-4 rounded text-emerald-600 accent-[#059669] cursor-pointer shrink-0"
                          />
                          <label htmlFor="buyer-consent" className="text-[11px] text-zinc-700 leading-relaxed cursor-pointer select-none">
                            I consent to Solvex Energy contacting me regarding solar equipment sizing, PM Surya Ghar subsidy processing, and site survey under India&apos;s DPDP Act 2023.{" "}
                            <button
                              type="button"
                              onClick={() => openLegalModal("privacy")}
                              className="font-semibold text-emerald-700 hover:text-emerald-800 underline inline cursor-pointer"
                            >
                              Privacy Policy
                            </button>
                            . <span className="text-red-500">*</span>
                          </label>
                        </div>
                        {buyerErrors.consentAgreed && buyerTouched.consentAgreed && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 -mt-2 pl-2">
                            <AlertCircle className="w-3 h-3" />
                            {buyerErrors.consentAgreed}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={buyerSubmitting}
                          className="w-full h-12 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 mt-1 shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
                        >
                          {buyerSubmitting ? (
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
                    ) : (
                      /* Buyer Confirmation State */
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
                            <span className="font-semibold text-zinc-900">{buyerData.fullName}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-black/5">
                            <span className="text-zinc-500">Product / System:</span>
                            <span className="font-semibold text-zinc-900">{buyerData.productInterest}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500">SLA Commitment:</span>
                            <span className="font-semibold text-emerald-700">Dedicated Solar Engineer Callback &lt; 24 Hrs</span>
                          </div>
                        </div>

                        {/* Direct Follow-up CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-emerald-500/20">
                          <a
                            href={`https://wa.me/919125127755?text=${encodeURIComponent(
                              `Hello Solvex Energy! I requested a quote for ${buyerData.productInterest}. Reference ID: ${buyerRefId}. Please connect me with the site surveyor.`
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
                            href="tel:+919125127755"
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
                            onClick={() => setBuyerSubmitted(false)}
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
                    )}
                  </div>
                )}

                {/* TAB 2: PROSPECTIVE FRANCHISE PARTNER FORM */}
                {activeTab === "partner" && (
                  <div>
                    {!partnerSubmitted ? (
                      <form onSubmit={handlePartnerSubmit} noValidate className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="partner-first" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "पहला नाम" : "First Name"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partner-first"
                              placeholder={isHindi ? "उदा. विक्रम" : "e.g. Vikram"}
                              value={partnerData.firstName}
                              onChange={(e) => setPartnerData({ ...partnerData, firstName: e.target.value })}
                              onBlur={() => {
                                setPartnerTouched((prev) => ({ ...prev, firstName: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  firstName: validatePartnerField("firstName", partnerData.firstName),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                partnerErrors.firstName && partnerTouched.firstName ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {partnerErrors.firstName && partnerTouched.firstName && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.firstName}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="partner-last" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "अंतिम नाम" : "Last Name"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partner-last"
                              placeholder={isHindi ? "उदा. मेहता" : "e.g. Mehta"}
                              value={partnerData.lastName}
                              onChange={(e) => setPartnerData({ ...partnerData, lastName: e.target.value })}
                              onBlur={() => {
                                setPartnerTouched((prev) => ({ ...prev, lastName: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  lastName: validatePartnerField("lastName", partnerData.lastName),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                partnerErrors.lastName && partnerTouched.lastName ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {partnerErrors.lastName && partnerTouched.lastName && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="partner-email" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "आधिकारिक ईमेल" : "Official Business Email"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partner-email"
                              type="email"
                              placeholder="partner@company.com"
                              value={partnerData.email}
                              onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                              onBlur={() => {
                                setPartnerTouched((prev) => ({ ...prev, email: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  email: validatePartnerField("email", partnerData.email),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                partnerErrors.email && partnerTouched.email ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {partnerErrors.email && partnerTouched.email && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.email}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="partner-phone" className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "मोबाइल नंबर" : "Mobile Number"} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="partner-phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={partnerData.phone}
                              onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
                              onBlur={() => {
                                setPartnerTouched((prev) => ({ ...prev, phone: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  phone: validatePartnerField("phone", partnerData.phone),
                                }));
                              }}
                              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                                partnerErrors.phone && partnerTouched.phone ? "border-red-500" : "border-black/10"
                              }`}
                            />
                            {partnerErrors.phone && partnerTouched.phone && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.phone}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="partner-city" className="text-xs font-medium text-[#18181B]">
                            {isHindi ? "लक्षित जिला / शहर" : "Target Operating District / City"} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="partner-city"
                            placeholder={isHindi ? "उदा. अहमदाबाद, गुजरात" : "e.g. Ahmedabad, Gujarat"}
                            value={partnerData.city}
                            onChange={(e) => setPartnerData({ ...partnerData, city: e.target.value })}
                            onBlur={() => {
                              setPartnerTouched((prev) => ({ ...prev, city: true }));
                              setPartnerErrors((prev) => ({
                                ...prev,
                                city: validatePartnerField("city", partnerData.city),
                              }));
                            }}
                            className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] ${
                              partnerErrors.city && partnerTouched.city ? "border-red-500" : "border-black/10"
                            }`}
                          />
                          {partnerErrors.city && partnerTouched.city && (
                            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3 h-3" />
                              {partnerErrors.city}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "साझेदारी का प्रकार" : "Partnership Tier"} <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={partnerData.partnershipType}
                              onValueChange={(val) => {
                                setPartnerData({ ...partnerData, partnershipType: val });
                                setPartnerTouched((prev) => ({ ...prev, partnershipType: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  partnershipType: validatePartnerField("partnershipType", val),
                                }));
                              }}
                            >
                              <SelectTrigger className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border cursor-pointer ${
                                partnerErrors.partnershipType && partnerTouched.partnershipType ? "border-red-500" : "border-black/10"
                              }`}>
                                <SelectValue placeholder="Select Franchise Model" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                                <SelectItem value="distributor">Distributor Partner (Territory)</SelectItem>
                                <SelectItem value="master">Master Distributor (State / Zone)</SelectItem>
                                <SelectItem value="channel">Channel EPC Partner</SelectItem>
                                <SelectItem value="merchant">Retail Merchant Store</SelectItem>
                              </SelectContent>
                            </Select>
                            {partnerErrors.partnershipType && partnerTouched.partnershipType && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.partnershipType}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-medium text-[#18181B]">
                              {isHindi ? "निवेश पूंजी सीमा" : "Capital Allocation Band"} <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={partnerData.investmentCapacity}
                              onValueChange={(val) => {
                                setPartnerData({ ...partnerData, investmentCapacity: val });
                                setPartnerTouched((prev) => ({ ...prev, investmentCapacity: true }));
                                setPartnerErrors((prev) => ({
                                  ...prev,
                                  investmentCapacity: validatePartnerField("investmentCapacity", val),
                                }));
                              }}
                            >
                              <SelectTrigger className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border cursor-pointer ${
                                partnerErrors.investmentCapacity && partnerTouched.investmentCapacity ? "border-red-500" : "border-black/10"
                              }`}>
                                <SelectValue placeholder="Select Capital Band" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border border-black/10 shadow-2xl rounded-2xl">
                                <SelectItem value="tier1">₹2,00,000 - ₹5,00,000</SelectItem>
                                <SelectItem value="tier2">₹5,00,000 - ₹15,00,000</SelectItem>
                                <SelectItem value="tier3">₹15,00,000 - ₹30,00,000</SelectItem>
                                <SelectItem value="tier4">₹30,00,000+ (Institutional Master)</SelectItem>
                              </SelectContent>
                            </Select>
                            {partnerErrors.investmentCapacity && partnerTouched.investmentCapacity && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3 h-3" />
                                {partnerErrors.investmentCapacity}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label htmlFor="partner-exp" className="text-xs font-medium text-[#18181B]">
                            {isHindi ? "व्यवसाय अनुभव / टीम का विवरण (वैकल्पिक)" : "Business Background / Distribution Footprint (Optional)"}
                          </Label>
                          <Textarea
                            id="partner-exp"
                            placeholder={
                              isHindi
                                ? "अपनी वर्तमान वितरण क्षमता, इलेक्ट्रिकल ट्रेड अनुभव या क्लाइंट नेटवर्क का उल्लेख करें..."
                                : "Provide details regarding your current business footprint, electrical trade experience, team size, or client network..."
                            }
                            value={partnerData.experience}
                            onChange={(e) => setPartnerData({ ...partnerData, experience: e.target.value })}
                            className="min-h-[80px] p-3 text-xs bg-[#FAFAFA] border border-black/10 rounded-2xl resize-none text-[#18181B] placeholder:text-[#71717A]"
                          />
                        </div>

                        {/* DPDP Consent */}
                        <div className="p-3 rounded-xl border border-black/10 bg-zinc-50/80 flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="partner-consent"
                            checked={partnerData.consentAgreed}
                            onChange={(e) => {
                              setPartnerData({ ...partnerData, consentAgreed: e.target.checked });
                              setPartnerTouched((prev) => ({ ...prev, consentAgreed: true }));
                              setPartnerErrors((prev) => ({
                                ...prev,
                                consentAgreed: validatePartnerField("consentAgreed", e.target.checked),
                              }));
                            }}
                            className="mt-0.5 w-4 h-4 rounded text-emerald-600 accent-[#059669] cursor-pointer shrink-0"
                          />
                          <label htmlFor="partner-consent" className="text-[11px] text-zinc-700 leading-relaxed cursor-pointer select-none">
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
                          </label>
                        </div>
                        {partnerErrors.consentAgreed && partnerTouched.consentAgreed && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 -mt-2 pl-2">
                            <AlertCircle className="w-3 h-3" />
                            {partnerErrors.consentAgreed}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={partnerSubmitting}
                          className="w-full h-12 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 mt-1 shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
                        >
                          {partnerSubmitting ? (
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
                    ) : (
                      /* Partner Confirmation State */
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
                            <span className="text-zinc-500">Applicant:</span>
                            <span className="font-semibold text-zinc-900">{partnerData.firstName} {partnerData.lastName}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-black/5">
                            <span className="text-zinc-500">Target Territory:</span>
                            <span className="font-semibold text-zinc-900">{partnerData.city}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500">Commercial Committee SLA:</span>
                            <span className="font-semibold text-emerald-700">Territory Feasibility Review within 24 Hours</span>
                          </div>
                        </div>

                        {/* Direct Follow-up CTAs */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-emerald-500/20">
                          <a
                            href={`https://wa.me/919125127755?text=${encodeURIComponent(
                              `Hello Solvex Energy! I submitted a franchise partner application for ${partnerData.city}. Reference ID: ${partnerRefId}. Please share dealership margins and procurement prospectus.`
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
                            <span>Share on WhatsApp</span>
                          </a>

                          <a
                            href="tel:+919125127755"
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
                            <span>Call Expansion Desk</span>
                          </a>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setPartnerSubmitted(false)}
                            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
                          >
                            Submit Another Territory Inquiry
                          </button>
                          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-emerald-700" />
                            Confidential Dossier Protected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
