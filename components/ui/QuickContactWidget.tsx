"use client";

import { useState } from "react";
import { Phone, MessageCircle, X, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { trackEvent } from "@/lib/analytics";

export default function QuickContactWidget() {
  const { isHindi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const phoneHref = "tel:+919879012345";
  const whatsappHref = `https://wa.me/919879012345?text=${encodeURIComponent(
    isHindi
      ? "नमस्ते सोल्वेक्स एनर्जी! मैं सोलर इनवर्टर, रूफटॉप प्लांट और पीएम सूर्य घर सब्सिडी की जानकारी लेना चाहता हूँ।"
      : "Hello Solvex Energy! I would like to inquire about solar systems, inverters, and PM Surya Ghar subsidy."
  )}`;

  return (
    <div className="fixed left-5 bottom-6 z-40 flex flex-col items-start gap-2.5 select-none print:hidden">
      {/* Expanded Quick Contact Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl animate-in slide-in-from-bottom-3 duration-200 min-w-[210px] text-[#18181B]">
          <div className="flex items-center justify-between pb-2 border-b border-black/5 px-1">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#71717A] font-medium">
              {isHindi ? "त्वरित सहायता डेस्क" : "Direct Support Desk"}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isHindi ? "ऑनलाइन" : "Active"}
            </span>
          </div>

          {/* WhatsApp Action */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_cta_clicked", {
                sourceLocation: "floating_quick_widget",
              })
            }
            className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 transition-all text-xs font-medium cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div className="flex flex-col">
              <span>{isHindi ? "व्हाट्सएप चैट" : "WhatsApp Chat"}</span>
              <span className="text-[10px] text-emerald-700 font-normal">
                {isHindi ? "त्वरित उत्तर (2 मिनट)" : "Instant Reply (~2 min)"}
              </span>
            </div>
          </a>

          {/* Direct Phone Call Action */}
          <a
            href={phoneHref}
            onClick={() =>
              trackEvent("call_cta_clicked", {
                sourceLocation: "floating_quick_widget",
              })
            }
            className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 text-[#18181B] transition-all text-xs font-medium cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span>{isHindi ? "सीधे कॉल करें" : "Call Sales Desk"}</span>
              <span className="text-[10px] text-[#71717A] font-normal font-mono">
                +91 98790 12345
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close quick support menu" : "Open quick support menu"}
        className="group h-12 px-4 rounded-full bg-[#18181B] text-white hover:bg-black shadow-xl hover:shadow-2xl border border-white/15 flex items-center gap-2.5 transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <Headphones className="w-4 h-4 text-emerald-400" />
          )}
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <span className="text-xs font-normal tracking-[-0.1px]">
          {isOpen
            ? isHindi
              ? "बंद करें"
              : "Close"
            : isHindi
            ? "कॉल व व्हाट्सएप सहायता"
            : "Call & WhatsApp"}
        </span>
      </button>
    </div>
  );
}
