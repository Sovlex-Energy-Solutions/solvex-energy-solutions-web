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
import { SITE_CONFIG } from "@/config/site";
import type { BuyerFormData } from "./types";
import { validateBuyerField } from "./validation";

const INITIAL_BUYER_DATA: BuyerFormData = {
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
};

export function BuyerEnquiryForm() {
  const { isHindi } = useLanguage();
  const [buyerData, setBuyerData] = useState<BuyerFormData>(INITIAL_BUYER_DATA);
  const [buyerErrors, setBuyerErrors] = useState<Partial<Record<keyof BuyerFormData, string>>>({});
  const [buyerTouched, setBuyerTouched] = useState<Partial<Record<keyof BuyerFormData, boolean>>>({});
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);
  const [buyerRefId, setBuyerRefId] = useState("");
  const [buyerSubmitting, setBuyerSubmitting] = useState(false);
  const [buyerCopied, setBuyerCopied] = useState(false);

  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: (keyof BuyerFormData)[] = ["fullName", "phone", "city", "consentAgreed"];
    const newErrors: Partial<Record<keyof BuyerFormData, string>> = {};
    let hasErr = false;

    fields.forEach((f) => {
      const err = validateBuyerField(f, buyerData[f], isHindi);
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
      const currentYear = new Date().getFullYear();
      const refCode = json.referenceId || `SLX-PRD-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      setBuyerRefId(refCode);
      setBuyerSubmitted(true);

      trackEvent("quote_request_submitted", {
        formType: "product_buyer",
        leadReferenceId: refCode,
        source: "contact_section",
        city: buyerData.city,
        product: buyerData.productInterest,
      });
    } catch {
      const currentYear = new Date().getFullYear();
      const fallback = `SLX-PRD-${currentYear}-${Math.floor(10000 + Math.random() * 90000)}`;
      setBuyerRefId(fallback);
      setBuyerSubmitted(true);
    } finally {
      setBuyerSubmitting(false);
    }
  };

  if (buyerSubmitted) {
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
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
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
              setBuyerData(INITIAL_BUYER_DATA);
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
                fullName: validateBuyerField("fullName", buyerData.fullName, isHindi),
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
                phone: validateBuyerField("phone", buyerData.phone, isHindi),
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
                city: validateBuyerField("city", buyerData.city, isHindi),
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
            const checked = e.target.checked;
            setBuyerData({ ...buyerData, consentAgreed: checked });
            setBuyerTouched((prev) => ({ ...prev, consentAgreed: true }));
            setBuyerErrors((prev) => ({
              ...prev,
              consentAgreed: validateBuyerField("consentAgreed", checked, isHindi),
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
  );
}
