"use client";

import React from "react";
import { Search, X, SlidersHorizontal, Check } from "lucide-react";
import { ProjectCategory, ProjectRegion, ProjectStatus } from "@/data/projects-data";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectsFilterBarProps {
  selectedCategory: "all" | ProjectCategory;
  onSelectCategory: (cat: "all" | ProjectCategory) => void;
  selectedRegion: "all" | ProjectRegion;
  onSelectRegion: (reg: "all" | ProjectRegion) => void;
  selectedStatus: "all" | ProjectStatus;
  onSelectStatus: (status: "all" | ProjectStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFilteredCount: number;
  totalCount: number;
  categoryCounts: {
    all: number;
    utility: number;
    "ci-open-access": number;
    "distributed-rooftop": number;
  };
}

export default function ProjectsFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  totalFilteredCount,
  totalCount,
  categoryCounts,
}: ProjectsFilterBarProps) {
  const { isHindi } = useLanguage();

  const isFiltered =
    selectedCategory !== "all" ||
    selectedRegion !== "all" ||
    selectedStatus !== "all" ||
    searchQuery.trim().length > 0;

  const handleReset = () => {
    onSelectCategory("all");
    onSelectRegion("all");
    onSelectStatus("all");
    onSearchChange("");
  };

  type CategoryFilterItem = { id: "all" | ProjectCategory; label: string; labelHi: string; count: number };
  const allCategories: CategoryFilterItem[] = [
    { id: "all", label: "All Projects", labelHi: "सभी परियोजनाएं", count: categoryCounts.all },
    { id: "utility", label: "Utility", labelHi: "यूटिलिटी", count: categoryCounts.utility },
    { id: "ci-open-access", label: "C&I - Open Access", labelHi: "सी एंड आई - ओपन एक्सेस", count: categoryCounts["ci-open-access"] },
    { id: "distributed-rooftop", label: "Distributed Generation", labelHi: "डिस्ट्रिब्यूटेड जेनरेशन", count: categoryCounts["distributed-rooftop"] },
  ];
  const categories = allCategories.filter((cat) => cat.id === "all" || cat.count > 0);

  const regions: Array<"all" | ProjectRegion> = ["all", "North", "West", "South", "East"];

  return (
    <div id="projects-catalog" className="w-full scroll-mt-24 space-y-5">
      {/* Primary Category Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[#059669] text-white shadow-sm font-semibold"
                  : "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 font-normal"
              }`}
            >
              <span>{isHindi ? cat.labelHi : cat.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-black/5 text-zinc-600"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Region Filter, Status, Search & Results Count */}
      <div className="p-3 sm:p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-zinc-500 font-medium px-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isHindi ? "क्षेत्र:" : "Region:"}</span>
          </span>
          {regions.map((reg) => {
            const isRegActive = selectedRegion === reg;
            return (
              <button
                key={reg}
                onClick={() => onSelectRegion(reg)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isRegActive
                    ? "bg-zinc-900 text-white font-medium shadow-xs"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {reg === "all" ? (isHindi ? "सभी क्षेत्र" : "All Regions") : reg}
              </button>
            );
          })}
        </div>

        {/* Right: Search Box + Clear Filters */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isHindi ? "परियोजना, राज्य या ग्राहक खोजें..." : "Search project, state, off-taker..."}
              className="w-full h-9 pl-9 pr-8 text-xs bg-white rounded-full border border-zinc-200 focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669] transition-all placeholder:text-zinc-400 text-zinc-900"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Reset button if active */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              {isHindi ? "रीसेट करें" : "Clear All"}
            </button>
          )}
        </div>
      </div>

      {/* Showing results summary */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          {isHindi ? (
            <>
              <strong>{totalFilteredCount}</strong> / {totalCount} परियोजनाएं प्रदर्शित
            </>
          ) : (
            <>
              Showing <strong>{totalFilteredCount}</strong> of {totalCount} Verified Projects
            </>
          )}
        </span>
        {selectedCategory !== "all" && (
          <span className="text-[#059669] font-medium hidden sm:inline">
            • Filtered by {categories.find((c) => c.id === selectedCategory)?.label}
          </span>
        )}
      </div>
    </div>
  );
}
