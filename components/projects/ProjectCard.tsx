"use client";

import React from "react";
import { ArrowRight, MapPin, CheckCircle2, Clock, Zap, Leaf } from "lucide-react";
import { ProjectItem } from "@/data/projects-data";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const { isHindi } = useLanguage();

  return (
    <article
      onClick={() => onOpenDetails(project)}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-black/10 hover:border-[#059669]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer active:scale-[0.99]"
    >
      {/* Media Image Header */}
      <div>
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          {/* Top Capacity Tag & Status Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white tracking-wide shadow-sm">
              {project.capacity}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md shadow-xs ${
                project.status === "Commissioned"
                  ? "bg-white/95 text-emerald-900 border border-emerald-300"
                  : "bg-amber-400/95 text-amber-950 border border-amber-300"
              }`}
            >
              {project.status === "Commissioned" ? (
                <CheckCircle2 className="w-3 h-3 text-[#059669]" />
              ) : (
                <Clock className="w-3 h-3 text-amber-700" />
              )}
              <span>{project.status}</span>
            </span>
          </div>

          {/* Location on bottom of image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-sm pointer-events-none">
            <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate">
              {project.state} • {project.region} India
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col gap-3">
          {/* Off-taker Tag */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#059669] truncate">
            {project.offTaker}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-[#059669] transition-colors line-clamp-1">
            {isHindi && project.titleHi ? project.titleHi : project.title}
          </h3>

          {/* Rephrased Short Summary */}
          <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed font-normal">
            {isHindi && project.summaryHi ? project.summaryHi : project.summary}
          </p>

          {/* Metric Chips */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium truncate">
              <Zap className="w-3.5 h-3.5 text-[#059669] shrink-0" />
              <span className="truncate">{project.annualGeneration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium truncate">
              <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{project.co2Offset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-5 pb-5 pt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="w-full h-10 rounded-full border border-zinc-200 group-hover:border-[#059669] bg-zinc-50 group-hover:bg-emerald-50/50 text-zinc-800 group-hover:text-[#059669] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
        >
          <span>{isHindi ? "परियोजना विवरण देखें" : "View Technical Dossier"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
