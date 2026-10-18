"use client";

import { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  FileCheck2,
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

export default function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    partnershipType: "",
    investmentCapacity: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

              <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="franchise-application">
                {/* Row: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="first-name" className="text-xs font-normal text-[#18181B]">
                      {t("contact.firstName", "First Name *")}
                    </Label>
                    <Input
                      id="first-name"
                      placeholder={t("contact.firstNamePlaceholder", "e.g. Vikram")}
                      required
                      type="text"
                      className="input-superpower w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] focus-visible:border-[#4edea3] focus-visible:ring-1 focus-visible:ring-[#4edea3] focus:outline-none focus-visible:outline-none transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="last-name" className="text-xs font-normal text-[#18181B]">
                      {t("contact.lastName", "Last Name *")}
                    </Label>
                    <Input
                      id="last-name"
                      placeholder={t("contact.lastNamePlaceholder", "e.g. Mehta")}
                      required
                      type="text"
                      className="input-superpower w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] focus-visible:border-[#4edea3] focus-visible:ring-1 focus-visible:ring-[#4edea3] focus:outline-none focus-visible:outline-none transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-xs font-normal text-[#18181B]">
                      {t("contact.email", "Official Email *")}
                    </Label>
                    <Input
                      id="email"
                      placeholder={t("contact.emailPlaceholder", "partner@company.com")}
                      required
                      type="email"
                      className="input-superpower w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] focus-visible:border-[#4edea3] focus-visible:ring-1 focus-visible:ring-[#4edea3] focus:outline-none focus-visible:outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-xs font-normal text-[#18181B]">
                      {t("contact.phone", "Mobile Number *")}
                    </Label>
                    <Input
                      id="phone"
                      placeholder={t("contact.phonePlaceholder", "+91 98765 43210")}
                      required
                      type="tel"
                      className="input-superpower w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] focus-visible:border-[#4edea3] focus-visible:ring-1 focus-visible:ring-[#4edea3] focus:outline-none focus-visible:outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Territory / City */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="city" className="text-xs font-normal text-[#18181B]">
                    {t("contact.city", "Target Operating District / City *")}
                  </Label>
                  <Input
                    id="city"
                    placeholder={t("contact.cityPlaceholder", "e.g. Ahmedabad, Gujarat")}
                    required
                    type="text"
                    className="input-superpower w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#4edea3] focus:ring-1 focus:ring-[#4edea3] focus-visible:border-[#4edea3] focus-visible:ring-1 focus-visible:ring-[#4edea3] focus:outline-none focus-visible:outline-none transition-all"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                {/* Row: Partnership Tier & Capital Allocation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-normal text-[#18181B]">
                      {t("contact.tier", "Partnership Tier *")}
                    </Label>
                    <Select
                      value={formData.partnershipType}
                      onValueChange={(val) => setFormData({ ...formData, partnershipType: val })}
                      required
                    >
                      <SelectTrigger
                        id="partnership-tier"
                        className="w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-xs text-[#18181B] focus:border-[#059669] focus:ring-1 focus:ring-[#059669] data-[state=open]:border-[#059669] data-[state=open]:ring-1 data-[state=open]:ring-[#059669] focus:outline-none transition-all cursor-pointer [&[data-placeholder]]:text-[#71717A]"
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-xs font-normal text-[#18181B]">
                      {t("contact.capital", "Capital Allocation *")}
                    </Label>
                    <Select
                      value={formData.investmentCapacity}
                      onValueChange={(val) => setFormData({ ...formData, investmentCapacity: val })}
                      required
                    >
                      <SelectTrigger
                        id="capital-allocation"
                        className="w-full h-[50px] rounded-full px-5 bg-[#FAFAFA] border border-black/10 text-xs text-[#18181B] focus:border-[#059669] focus:ring-1 focus:ring-[#059669] data-[state=open]:border-[#059669] data-[state=open]:ring-1 data-[state=open]:ring-[#059669] focus:outline-none transition-all cursor-pointer [&[data-placeholder]]:text-[#71717A]"
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
                  </div>
                </div>

                {/* Experience / Business Background */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="experience" className="text-xs font-normal text-[#18181B]">
                      {t("contact.experience", "Existing Business Background / Distribution Portfolio")}
                    </Label>
                    <span className="font-sans text-[10px] text-[#71717A] uppercase">
                      {t("contact.experienceOptional", "Optional • Max 1000 chars")}
                    </span>
                  </div>
                  <Textarea
                    id="experience"
                    className="min-h-[170px] sm:min-h-[200px] p-5 text-xs font-sans leading-relaxed resize-y bg-[#FAFAFA] border border-black/10 text-[#18181B] placeholder:text-[#71717A] focus:border-[#059669] focus:ring-1 focus:ring-[#059669] focus-visible:border-[#059669] focus-visible:ring-1 focus-visible:ring-[#059669] focus:outline-none focus-visible:outline-none rounded-3xl transition-all"
                    placeholder={t("contact.experiencePlaceholder", "Provide details regarding your current business footprint, electrical trade experience, team size, rooftop EPC installation volume, or regional customer network across your target district...")}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                  <p className="text-xs text-[#71717A] font-sans">
                    {t("contact.experienceHelp", "Detailed applications are prioritized for territorial exclusivity review by our commercial committee.")}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-[52px] rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-medium uppercase tracking-wider inline-flex items-center justify-center gap-2.5 mt-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer group"
                >
                  <span>{t("contact.submitBtn", "SUBMIT ENROLLMENT DOSSIER")}</span>
                  <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>

                {/* Submission Confirmation */}
                {submitted && (
                  <div
                    className="p-4 rounded-lg border border-black/10 bg-[#FAFAFA] text-center animate-in fade-in duration-200"
                    id="form-feedback"
                  >
                    <p className="font-sans text-xs uppercase tracking-wider text-[#18181B] font-normal">
                      {t("contact.submittedTitle", "Application Verified & Logged.")}
                    </p>
                    <p className="font-sans text-xs text-[#71717A] mt-1">
                      {t("contact.submittedDesc", "Our commercial partnership director will contact you within 24 business hours with territory viability specs.")}
                    </p>
                  </div>
                )}
              </form>
            </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
