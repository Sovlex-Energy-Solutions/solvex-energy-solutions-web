"use client";

import { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Lock,
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

export default function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "firstName":
        if (!value || !value.trim()) return "First name is required.";
        if (value.trim().length < 2) return "Must be at least 2 characters.";
        return "";
      case "lastName":
        if (!value || !value.trim()) return "Last name is required.";
        if (value.trim().length < 2) return "Must be at least 2 characters.";
        return "";
      case "email":
        if (!value || !value.trim()) return "Official email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please enter a valid business email address.";
        return "";
      case "phone":
        if (!value || !value.trim()) return "Mobile number is required.";
        const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
        if (!/^(?:\+?91)?[6-9]\d{9}$|^\+?\d{9,14}$/.test(cleanPhone))
          return "Enter a valid 10-digit mobile number (+91).";
        return "";
      case "city":
        if (!value || !value.trim()) return "Operating district or city is required.";
        return "";
      case "partnershipType":
        if (!value) return "Please select a partnership tier.";
        return "";
      case "investmentCapacity":
        if (!value) return "Please select a capital allocation band.";
        return "";
      case "consentAgreed":
        if (!value) return "You must consent to data processing and commercial terms to proceed.";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allFields = [
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
    let hasError = false;

    allFields.forEach((field) => {
      const err = validateField(field, (formData as any)[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    setTouched(allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    setErrors(newErrors);

    if (hasError) {
      // Focus first error element
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    setReferenceId(`SOL-2026-${randomSuffix}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
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
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <section className="w-full pt-20 lg:pt-28 pb-10 lg:pb-14 bg-[#FFFFFF] relative" id="partner-form">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Corporate Desk & Institutional Details */}
          <div className="lg:col-span-5">
            <MotionReveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <Send className="w-3.5 h-3.5 text-white" />
                <span>{t("contact.badge", "[ 11 // COMMERCIAL ENROLLMENT ]")}</span>
              </div>
              <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                {t("contact.title", "Initiate Franchise Onboarding")}
              </h2>
              <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                {t("contact.description", "Connect directly with our corporate expansion desk. Review territory allocation, margins, and procurement schedules.")}
              </p>
            </div>

            {/* Corporate Desk Info Card */}
            <div className="card-superpower p-8 flex flex-col gap-6 bg-white shadow-xs">
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
                    {t("contact.hqAddress", "204 Capital Square, Parvat Godadara BRTS Road, Surat 395010, Gujarat, India")}
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
                  <span className="text-sm font-normal text-[#18181B] mt-1">
                    corporate@solvexenergy.com
                  </span>
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
                  <span className="text-xs font-sans text-[#71717A] mt-0.5">
                    {t("contact.hoursSunday", "Sunday: Emergency Dispatch Only")}
                  </span>
                </div>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="card-superpower p-6 flex items-center gap-4 bg-white shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#18181B] shrink-0" />
              <p className="body-sm text-xs text-[#71717A] leading-relaxed">
                {t("contact.guarantee", "Direct manufacturing allocations backed by MNRE ALMM standards. Partner applications undergo confidential institutional territory assessment within 24 hours.")}
              </p>
            </div>
            </MotionReveal>
          </div>

          {/* Right Column: Partnership Application Form */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.1}>
            <div className="card-superpower p-8 lg:p-10 flex flex-col gap-6 bg-white shadow-xs border-black/10">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-[#18181B]">
                    <FileCheck2 className="w-4 h-4 text-[#18181B]" />
                  </div>
                  <h3 className="text-lg font-normal text-[#18181B] tracking-[-0.4px]">
                    {t("contact.formTitle", "Partnership Evaluation Form")}
                  </h3>
                </div>
                <span className="font-sans text-[10px] tracking-wider uppercase text-white bg-primary px-3 py-1 rounded-full font-normal">
                  {t("contact.formYear", "FY 2026 ENROLLMENT")}
                </span>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" id="franchise-application" aria-label="Franchise Partnership Application">
                  {/* Row: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="first-name" className="text-xs font-medium text-[#18181B] flex items-center justify-between">
                        <span>{t("contact.firstName", "First Name")} <span className="text-red-500">*</span></span>
                      </Label>
                      <Input
                        id="first-name"
                        name="firstName"
                        placeholder={t("contact.firstNamePlaceholder", "e.g. Vikram")}
                        type="text"
                        autoComplete="given-name"
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "first-name-error" : undefined}
                        className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] text-xs transition-all ${
                          errors.firstName && touched.firstName
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                        }`}
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                      />
                      {errors.firstName && touched.firstName && (
                        <p id="first-name-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.firstName}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="last-name" className="text-xs font-medium text-[#18181B] flex items-center justify-between">
                        <span>{t("contact.lastName", "Last Name")} <span className="text-red-500">*</span></span>
                      </Label>
                      <Input
                        id="last-name"
                        name="lastName"
                        placeholder={t("contact.lastNamePlaceholder", "e.g. Mehta")}
                        type="text"
                        autoComplete="family-name"
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "last-name-error" : undefined}
                        className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] text-xs transition-all ${
                          errors.lastName && touched.lastName
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                        }`}
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                      />
                      {errors.lastName && touched.lastName && (
                        <p id="last-name-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.lastName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email" className="text-xs font-medium text-[#18181B] flex items-center justify-between">
                        <span>{t("contact.email", "Official Email")} <span className="text-red-500">*</span></span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder={t("contact.emailPlaceholder", "partner@company.com")}
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] text-xs transition-all ${
                          errors.email && touched.email
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                        }`}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                      />
                      {errors.email && touched.email && (
                        <p id="email-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-xs font-medium text-[#18181B] flex items-center justify-between">
                        <span>{t("contact.phone", "Mobile Number")} <span className="text-red-500">*</span></span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder={t("contact.phonePlaceholder", "+91 98765 43210")}
                        type="tel"
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] text-xs transition-all ${
                          errors.phone && touched.phone
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                        }`}
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                      />
                      {errors.phone && touched.phone && (
                        <p id="phone-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Territory / City */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="city" className="text-xs font-medium text-[#18181B] flex items-center justify-between">
                      <span>{t("contact.city", "Target Operating District / City")} <span className="text-red-500">*</span></span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder={t("contact.cityPlaceholder", "e.g. Ahmedabad, Gujarat")}
                      type="text"
                      autoComplete="address-level2"
                      aria-required="true"
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-[#18181B] placeholder:text-[#71717A] text-xs transition-all ${
                        errors.city && touched.city
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                      }`}
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      onBlur={() => handleBlur("city")}
                    />
                    {errors.city && touched.city && (
                      <p id="city-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  {/* Row: Partnership Tier & Capital Allocation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="partnership-tier" className="text-xs font-medium text-[#18181B]">
                        {t("contact.tier", "Partnership Tier")} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.partnershipType}
                        onValueChange={(val) => handleChange("partnershipType", val)}
                      >
                        <SelectTrigger
                          id="partnership-tier"
                          aria-required="true"
                          aria-invalid={!!errors.partnershipType}
                          aria-describedby={errors.partnershipType ? "tier-error" : undefined}
                          className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-xs text-[#18181B] transition-all cursor-pointer [&[data-placeholder]]:text-[#71717A] ${
                            errors.partnershipType && touched.partnershipType
                              ? "border-red-500"
                              : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                          }`}
                        >
                          <SelectValue placeholder={t("contact.tierPlaceholder", "Select Franchise Model")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-black/10 text-[#18181B] shadow-2xl rounded-2xl">
                          <SelectItem value="distributor">{t("contact.tierDistributor", "Distributor Partner (Territory)")}</SelectItem>
                          <SelectItem value="master">{t("contact.tierMaster", "Master Distributor (State / Zone)")}</SelectItem>
                          <SelectItem value="channel">{t("contact.tierChannel", "Channel EPC Partner")}</SelectItem>
                          <SelectItem value="merchant">{t("contact.tierMerchant", "Retail Merchant Store")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.partnershipType && touched.partnershipType && (
                        <p id="tier-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.partnershipType}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="capital-allocation" className="text-xs font-medium text-[#18181B]">
                        {t("contact.capital", "Capital Allocation")} <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.investmentCapacity}
                        onValueChange={(val) => handleChange("investmentCapacity", val)}
                      >
                        <SelectTrigger
                          id="capital-allocation"
                          aria-required="true"
                          aria-invalid={!!errors.investmentCapacity}
                          aria-describedby={errors.investmentCapacity ? "capital-error" : undefined}
                          className={`w-full h-[48px] rounded-full px-5 bg-[#FAFAFA] border text-xs text-[#18181B] transition-all cursor-pointer [&[data-placeholder]]:text-[#71717A] ${
                            errors.investmentCapacity && touched.investmentCapacity
                              ? "border-red-500"
                              : "border-black/10 focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
                          }`}
                        >
                          <SelectValue placeholder={t("contact.capitalPlaceholder", "Select Investment Band")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-black/10 text-[#18181B] shadow-2xl rounded-2xl">
                          <SelectItem value="tier1">₹2,00,000 - ₹5,00,000</SelectItem>
                          <SelectItem value="tier2">₹5,00,000 - ₹15,00,000</SelectItem>
                          <SelectItem value="tier3">₹15,00,000 - ₹30,00,000</SelectItem>
                          <SelectItem value="tier4">₹30,00,000+ (Institutional)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.investmentCapacity && touched.investmentCapacity && (
                        <p id="capital-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5 pl-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.investmentCapacity}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Experience / Business Background */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="experience" className="text-xs font-medium text-[#18181B]">
                        {t("contact.experience", "Existing Business Background / Distribution Footprint")}
                      </Label>
                      <span className="font-sans text-[10px] text-[#71717A] uppercase">
                        {t("contact.experienceOptional", "Optional • Max 1000 chars")}
                      </span>
                    </div>
                    <Textarea
                      id="experience"
                      name="experience"
                      className="min-h-[120px] p-4 text-xs font-sans leading-relaxed resize-y bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#059669] focus:ring-1 focus:ring-[#059669] rounded-2xl transition-all"
                      placeholder={t("contact.experiencePlaceholder", "Provide details regarding your current business footprint, electrical trade experience, team size, rooftop EPC volume, or client network across your district...")}
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>

                  {/* Mandatory DPDP Consent Checkbox */}
                  <div className="pt-2">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl border border-black/10 bg-zinc-50/80">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        name="consentAgreed"
                        checked={formData.consentAgreed}
                        onChange={(e) => handleChange("consentAgreed", e.target.checked)}
                        onBlur={() => handleBlur("consentAgreed")}
                        aria-required="true"
                        aria-invalid={!!errors.consentAgreed}
                        aria-describedby={errors.consentAgreed ? "consent-error" : undefined}
                        className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#059669] shrink-0"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs text-zinc-700 leading-relaxed cursor-pointer select-none">
                        I authorize Solvex Energy Solutions Pvt. Ltd. to evaluate my commercial credentials for franchise allocation under India&apos;s DPDP Act 2023, and agree to the{" "}
                        <button
                          type="button"
                          onClick={() => openLegalModal("privacy")}
                          className="font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 cursor-pointer inline"
                        >
                          Privacy Policy
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          onClick={() => openLegalModal("terms")}
                          className="font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 cursor-pointer inline"
                        >
                          Commercial Terms
                        </button>
                        . <span className="text-red-500">*</span>
                      </label>
                    </div>
                    {errors.consentAgreed && touched.consentAgreed && (
                      <p id="consent-error" role="alert" className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-1.5 pl-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.consentAgreed}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-[52px] rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2.5 mt-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer group"
                  >
                    <span>{t("contact.submitBtn", "SUBMIT ENROLLMENT DOSSIER")}</span>
                    <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </button>
                </form>
              ) : (
                /* Verified Enterprise Submission Card */
                <div
                  className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 text-left flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300"
                  id="form-feedback"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-900 mb-1">
                        Dossier Confirmed
                      </span>
                      <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
                        Partnership Application Logged
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-black/10 flex flex-col gap-2.5 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-black/5">
                      <span className="text-zinc-500 font-medium">Tracking Reference:</span>
                      <span className="font-mono font-bold text-zinc-900">{referenceId}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-black/5">
                      <span className="text-zinc-500 font-medium">Applicant:</span>
                      <span className="font-semibold text-zinc-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-black/5">
                      <span className="text-zinc-500 font-medium">Target Territory:</span>
                      <span className="font-semibold text-zinc-900">{formData.city}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 font-medium">Vetting SLA:</span>
                      <span className="font-semibold text-emerald-700">Commercial Committee Review within 24 Hours</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    A formal territorial feasibility dossier with factory procurement pricing and DISCOM net-metering liaison specs will be dispatched to <strong className="text-zinc-900">{formData.email}</strong>.
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-emerald-500/20">
                    <button
                      type="button"
                      onClick={handleReset}
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
          </MotionReveal>
        </div>
      </div>
    </div>
  </section>
  );
}
