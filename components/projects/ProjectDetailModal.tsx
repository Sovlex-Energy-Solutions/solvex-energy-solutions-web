"use client";

import React, { useEffect } from "react";
import {
  X,
  MapPin,
  CheckCircle2,
  Clock,
  Zap,
  Leaf,
  ShieldCheck,
  Building2,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { ProjectItem } from "@/data/projects-data";
import { openProductEnquiryDialog } from "@/components/forms/ProductEnquiryDialog";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { isHindi } = useLanguage();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleInquire = () => {
    onClose();
    openProductEnquiryDialog({
      product: `${project.title} (${project.categoryLabel} - ${project.capacity})`,
      capacity: project.capacity,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fadeIn"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col text-zinc-900 transition-all animate-scaleUp">
        {/* Modal Header & Hero Media */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-zinc-900 rounded-t-2xl sm:rounded-t-3xl shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-sm cursor-pointer z-10 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#059669] text-white tracking-wide shadow-sm">
              {project.capacity}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-xs ${
                project.status === "Commissioned"
                  ? "bg-white/90 text-emerald-900 border border-emerald-300"
                  : "bg-amber-400/90 text-amber-950 border border-amber-300"
              }`}
            >
              {project.status === "Commissioned" ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-amber-700" />
              )}
              <span>{project.status}</span>
            </span>
          </div>

          {/* Location & Off-Taker at Bottom of Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {project.state}, {project.region} India
              </span>
            </div>
            <h3
              id="modal-project-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm"
            >
              {isHindi && project.titleHi ? project.titleHi : project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 flex-1">
          {/* Key Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                {isHindi ? "ऑफ-टेकर / ग्राहक" : "Off-Taker / Client"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5 truncate">
                {project.offTaker}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#059669]" />
                {isHindi ? "वार्षिक उत्पादन" : "Annual Output"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">
                {project.annualGeneration}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <Leaf className="w-3 h-3 text-emerald-600" />
                {isHindi ? "वार्षिक CO₂ कटौती" : "CO₂ Abatement"}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5">
                {project.co2Offset}
              </span>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              {isHindi ? "परियोजना का संक्षिप्त विवरण" : "Project Summary & Scope"}
            </h4>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
              {isHindi && project.summaryHi ? project.summaryHi : project.summary}
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>{isHindi ? "तकनीकी विनिर्देश व संरचना" : "Engineered Architecture & Specs"}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/60 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-zinc-500 font-medium">Grid Intertie Voltage</div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {project.details.gridVoltage}
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/60 flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-zinc-500 font-medium">Inverter Architecture</div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {project.details.inverterTech}
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/60 flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-zinc-500 font-medium">PV Module Specification</div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {project.details.moduleType}
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/60 flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-zinc-500 font-medium">Mounting & Structural Engineering</div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-900">
                    {project.details.mountingStructure}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Engineering Highlight Callout */}
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-950 font-normal leading-relaxed">
                <strong className="font-semibold text-emerald-900">Engineering Distinction: </strong>
                {project.details.keyHighlight}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl sm:rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {isHindi ? "बंद करें" : "Close"}
          </button>

          <button
            onClick={handleInquire}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-medium shadow-sm transition-all duration-200 inline-flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
          >
            <span>{isHindi ? "समान परियोजना प्रस्ताव मांगें" : "Request Project Proposal / Dossier"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
