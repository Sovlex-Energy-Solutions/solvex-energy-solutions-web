"use client";

import React from "react";
import Image from "next/image";
import { X, Check, MessageSquare, ArrowRight } from "lucide-react";
import type { PCUProduct } from "@/data/products/pcus";
import { trackEvent } from "@/lib/analytics";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";

interface PCUModalProps {
  product: PCUProduct | null;
  onClose: () => void;
  isHindi?: boolean;
}

export function PCUModal({ product, onClose, isHindi = false }: PCUModalProps) {
  if (!product) return null;

  const tech = isHindi && product.techDetailsHi ? product.techDetailsHi : product.techDetails;
  const specs = isHindi && product.specsHi ? product.specsHi : product.specs;
  const ideal = isHindi && product.idealForHi ? product.idealForHi : product.idealFor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-lg bg-white border border-black/10 shadow-2xl overflow-y-auto flex flex-col text-[#18181B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-md border-b border-black/10 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs font-normal text-white bg-primary px-3 py-1 rounded-full">
              {product.capacity} {isHindi ? "हैवी PCU" : "HEAVY PCU"}
            </span>
            <span className="font-sans text-xs text-[#71717A]">{product.voltage}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full border border-black/10 bg-white hover:bg-zinc-100 text-[#18181B] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Top Summary Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-40 h-40 shrink-0 rounded-lg border border-black/10 bg-[#FAFAFA] p-3 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={160}
                height={160}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-normal text-[#18181B] leading-snug tracking-[-0.4px]">
                {product.name}
              </h3>
              <p className="body-sm text-xs text-[#71717A]">
                {isHindi ? "अनुशंसित अनुप्रयोग: " : "Recommended for: "}
                {ideal}
              </p>
              <div className="flex items-center gap-2 pt-1 font-sans">
                <span className="text-sm font-medium text-[#18181B]">
                  {isHindi ? "मूल्य: अनुरोध पर उपलब्ध" : "Pricing: Available on Request"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
                  {isHindi ? "कमर्शियल ग्रेड" : "Commercial Grade"}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="flex flex-col gap-2">
            <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
              {isHindi ? "हैवी इंजीनियरिंग विनिर्देश" : "Heavy Engineering Specifications"}
            </h4>
            <div className="rounded-lg overflow-hidden border border-black/10 font-sans text-xs">
              {[
                { label: isHindi ? "MPPT ट्रैकर क्षमता" : "MPPT Tracker Rating", val: tech.mpptController },
                { label: isHindi ? "आइसोलेशन ट्रांसफॉर्मर" : "Isolation Transformer", val: tech.transformerType },
                { label: isHindi ? "अधिकतम सोलर PV इनपुट" : "Max Solar PV Input", val: tech.pvInputCapacity },
                { label: isHindi ? "बैटरी बैंक आर्किटेक्चर" : "Battery Architecture", val: tech.batteryBank },
                { label: isHindi ? "चेसिस व कैबिनेट" : "Chassis & Enclosure", val: tech.enclosure },
                { label: isHindi ? "डिस्प्ले डैशबोर्ड" : "Display Dashboard", val: tech.displayType },
                { label: isHindi ? "वारंटी और सपोर्ट" : "Warranty & Support", val: tech.warranty },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-2 p-3 ${
                    idx % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } border-b border-black/10 last:border-b-0`}
                >
                  <span className="text-[#71717A]">{row.label}</span>
                  <span className="text-[#18181B] font-normal">{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-col gap-2">
            <h4 className="font-sans text-xs font-normal text-[#18181B] uppercase tracking-wider">
              {isHindi ? "इंजीनियरिंग मुख्य विशेषताएं" : "Engineering Highlights"}
            </h4>
            <ul className="flex flex-col gap-2 body-sm text-xs text-[#18181B]">
              {specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 p-6 bg-white border-t border-black/10 rounded-b-lg flex items-center justify-between gap-4">
          <div>
            <span className="font-sans text-[11px] text-[#71717A]">
              {isHindi ? "मूल्य निर्धारण:" : "PRICING:"}
            </span>
            <p className="font-sans text-sm font-medium text-[#18181B]">
              {isHindi ? "अनुरोध पर उपलब्ध" : "Available on Request"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onClose}
              className="btn-secondary h-[46px] px-4 text-xs rounded-full cursor-pointer"
            >
              {isHindi ? "बंद करें" : "DISMISS"}
            </button>
            <a
              href={`https://wa.me/919125127755?text=${encodeURIComponent(
                `Hello Solvex team, I need technical documentation and trade pricing for ${product.name} (${product.capacity}, ${product.voltage}). Please connect.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("cta_click", {
                  cta_name: "whatsapp_pcu_modal",
                  source: "pcu_modal",
                  product: product.name,
                });
              }}
              className="h-[46px] px-4 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-emerald-800 hover:bg-[#25D366]/20 flex items-center gap-2 text-xs font-medium transition-all"
              title="Inquire directly on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{isHindi ? "व्हाट्सएप पूछताछ" : "WhatsApp Inquire"}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                trackEvent("cta_click", {
                  cta_name: "request_pcu_allocation",
                  source: "pcu_modal",
                  product: product.name,
                });
                openProductEnquiryDialog({
                  product: product.name,
                  capacity: product.capacity,
                });
              }}
              className="btn-primary h-[46px] px-5 text-xs rounded-full flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>{isHindi ? "आवंटन अनुरोध" : "REQUEST ALLOCATION"}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
