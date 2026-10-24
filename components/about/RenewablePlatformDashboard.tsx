"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flag,
  Landmark,
  Building2,
  Network,
  HardHat,
} from "lucide-react";

interface RenewablePlatformDashboardProps {
  className?: string;
  badgeText?: string;
}

export default function RenewablePlatformDashboard({
  className = "",
  badgeText = "ABOUT SOLVEX • AUDITED FY 2024–25",
}: RenewablePlatformDashboardProps) {
  return (
    <section
      id="scale-and-impact"
      aria-label="Scale and Impact Dashboard"
      className={`py-12 sm:py-16 bg-white text-zinc-900 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Container */}
        <div className="relative">
          {/* Top Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 sm:pb-10 border-b border-zinc-100">
            {/* Left Header: Badge & Main Title */}
            <div className="max-w-2xl">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{badgeText}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-zinc-900 tracking-tight leading-[1.12]">
                About Solvex: Powering India&apos;s
                <br />
                Clean Energy Vanguard
              </h2>
            </div>

            {/* Right Header: Subtitle & CTA Button */}
            <div className="lg:max-w-md flex flex-col lg:items-start">
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal mb-6">
                Delivering gigawatt-scale zero-carbon power architectures exclusively engineered for sovereign national grids and tier-1 corporate leaders.
              </p>

              {/* Action Button */}
              <div>
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#059669] text-white text-sm font-medium hover:bg-[#047857] shadow-sm hover:shadow transition-all duration-200 group"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Unified 6-Metric Telemetry Bar */}
          <div className="mt-8 sm:mt-10 bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
              {/* 1. ACTIVE FLEET */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    ACTIVE FLEET
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    6.3
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-[#059669] ml-1.5">
                    GWp
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  COMMISSIONED
                  <br />
                  ASSETS
                </div>
              </div>

              {/* 2. PIPELINE */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    PIPELINE
                  </span>
                  <HardHat className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    2
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    GW
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  SHOVEL-READY
                  <br />
                  PORTFOLIO
                </div>
              </div>

              {/* 3. HORIZON 2030 */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    HORIZON 2030
                  </span>
                  <Flag className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    20
                  </span>
                  <span className="text-lg sm:text-xl font-medium text-[#059669] ml-1.5">
                    GW
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  DECARBONIZATION
                  <br />
                  GOAL
                </div>
              </div>

              {/* 4. EQUITY */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    EQUITY
                  </span>
                  <Landmark className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    ~$1
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    Billion
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  INSTITUTIONAL
                  <br />
                  EQUITY
                </div>
              </div>

              {/* 5. OFF-TAKERS */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    OFF-TAKERS
                  </span>
                  <Building2 className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    200+
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  ENTERPRISE
                  <br />
                  CLIENTS
                </div>
              </div>

              {/* 6. NETWORK */}
              <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-zinc-50/70 transition-colors duration-200 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">
                    NETWORK
                  </span>
                  <Network className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>

                <div className="my-3.5 flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-normal text-zinc-900 tracking-tight">
                    23
                  </span>
                  <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1.5">
                    States
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 tracking-wider uppercase leading-tight">
                  INTERCONNECTED
                  <br />
                  GRID
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
