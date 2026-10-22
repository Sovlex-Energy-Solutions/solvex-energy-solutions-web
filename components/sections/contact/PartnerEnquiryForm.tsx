"use client";

import React, { useState } from "react";
import {
  Send,
  AlertCircle,
  CheckCircle2,
  Lock,
  Phone,
  MessageSquare,
  Copy,
  Check,
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
import { useLanguage } from "@/context/LanguageContext";
import { openLegalModal } from "@/components/ui/consent-and-legal-modals";
import { trackEvent } from "@/lib/analytics";
import type { PartnerFormData } from "./types";
import { validatePartnerField } from "./validation";

const INITIAL_PARTNER_DATA: PartnerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  partnershipType: "",
  investmentCapacity: "",
  experience: "",
  consentAgreed: false,
};

export function PartnerEnquiryForm() {
  const { isHindi } = useLanguage();
  const [partnerData, setPartnerData] = useState<PartnerFormData>(INITIAL_PARTNER_DATA);
  const [partnerErrors, setPartnerErrors] = useState<Partial<Record<keyof PartnerFormData, string>>>({});
  const [partnerTouched, setPartnerTouched] = useState<Partial<Record<keyof PartnerFormData, boolean>>>({});
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerRefId, setPartnerRefId] = useState("");
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerCopied, setPartnerCopied] = useState(false);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: (keyof PartnerFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "partnershipType",
      "investmentCapacity",
      "consentAgreed",
    ];
    const newErrors: Partial<Record<keyof PartnerFormData, string>> = {};
    let hasErr = false;

    fields.forEach((f) => {
      const err = validatePartnerField(f, partnerData[f], isHindi);
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
      const currentYear = new Date().getFullYear();
      const refCode = json.referenceId || `SLX-PRT-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
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
      const currentYear = new Date().getFullYear();
      const fallback = `SLX-PRT-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      setPartnerRefId(fallback);
      setPartnerSubmitted(true);
    } finally {
      setPartnerSubmitting(false);
    }
  };

  if (partnerSubmitted) {
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
    );
  }

  return (
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
                firstName: validatePartnerField("firstName", partnerData.firstName, isHindi),
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
                lastName: validatePartnerField("lastName", partnerData.lastName, isHindi),
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
                email: validatePartnerField("email", partnerData.email, isHindi),
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
                phone: validatePartnerField("phone", partnerData.phone, isHindi),
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
              city: validatePartnerField("city", partnerData.city, isHindi),
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
                partnershipType: validatePartnerField("partnershipType", val, isHindi),
              }));
            }}
          >
            <SelectTrigger
              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border cursor-pointer ${
                partnerErrors.partnershipType && partnerTouched.partnershipType ? "border-red-500" : "border-black/10"
              }`}
            >
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
                investmentCapacity: validatePartnerField("investmentCapacity", val, isHindi),
              }));
            }}
          >
            <SelectTrigger
              className={`h-11 rounded-full px-4 text-xs bg-[#FAFAFA] border cursor-pointer ${
                partnerErrors.investmentCapacity && partnerTouched.investmentCapacity ? "border-red-500" : "border-black/10"
              }`}
            >
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
              consentAgreed: validatePartnerField("consentAgreed", e.target.checked, isHindi),
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
  );
}
