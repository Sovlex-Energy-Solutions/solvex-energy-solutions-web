"use client";

import React from "react";
import { TableProperties } from "lucide-react";

interface PCUComparisonMatrixProps {
  onCollapse: () => void;
  isHindi?: boolean;
  t: (key: string, fallback: string) => string;
}

export function PCUComparisonMatrix({
  onCollapse,
  isHindi = false,
  t,
}: PCUComparisonMatrixProps) {
  return (
    <div className="rounded-lg border border-black/10 bg-[#FAFAFA] p-6 flex flex-col gap-4 animate-in fade-in duration-300 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-black/10">
        <div className="flex items-center gap-2">
          <TableProperties className="w-4 h-4 text-[#18181B]" />
          <h3 className="font-sans text-sm font-normal text-[#18181B] uppercase tracking-wider">
            {t("pcu.matrixTitle", "Solvex Alfa+ Pro Industrial PCU Matrix")}
          </h3>
        </div>
        <button
          onClick={onCollapse}
          className="font-sans text-xs text-[#71717A] hover:text-[#18181B] hover:underline cursor-pointer uppercase"
        >
          {t("pcu.hideCompare", "COLLAPSE MATRIX")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full font-sans text-xs text-left">
          <thead>
            <tr className="border-b border-black/10 bg-white">
              <th className="p-3 font-normal text-[#71717A]">{t("pcu.matrixHeaders.spec", "SPECIFICATION")}</th>
              <th className="p-3 font-normal text-[#18181B]">ALFA+ 3kVA</th>
              <th className="p-3 font-normal text-[#18181B] bg-black/5">ALFA+ 5kVA ({isHindi ? "उच्च उत्पादन" : "HIGH YIELD"})</th>
              <th className="p-3 font-normal text-[#18181B]">ALFA+ 7.5kVA</th>
              <th className="p-3 font-normal text-[#18181B]">ALFA+ 10kVA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            <tr className="bg-white">
              <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.output", "Continuous Output")}</td>
              <td className="p-3 font-normal text-[#18181B]">2400 Watts</td>
              <td className="p-3 font-normal text-[#18181B] bg-black/5">4000 Watts</td>
              <td className="p-3 font-normal text-[#18181B]">6000 Watts</td>
              <td className="p-3 font-normal text-[#18181B]">8000 Watts</td>
            </tr>
            <tr className="bg-[#FAFAFA]">
              <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.battery", "Battery Voltage")}</td>
              <td className="p-3 text-[#18181B]">48V (4 {isHindi ? "बैटरी" : "Batts"})</td>
              <td className="p-3 text-[#18181B] bg-black/5">48V (4 {isHindi ? "बैटरी" : "Batts"})</td>
              <td className="p-3 text-[#18181B]">96V (8 {isHindi ? "बैटरी" : "Batts"})</td>
              <td className="p-3 text-[#18181B]">180V (15 {isHindi ? "बैटरी" : "Batts"})</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.maxPv", "Max PV Input")}</td>
              <td className="p-3 text-[#18181B]">3000 Watts</td>
              <td className="p-3 text-[#18181B] bg-black/5">5000 Watts</td>
              <td className="p-3 text-[#18181B]">7500 Watts</td>
              <td className="p-3 text-[#18181B]">10,000 Watts</td>
            </tr>
            <tr className="bg-[#FAFAFA]">
              <td className="p-3 text-[#71717A]">{t("pcu.matrixHeaders.controller", "MPPT Controller")}</td>
              <td className="p-3 text-[#18181B]">50A / 48V</td>
              <td className="p-3 text-[#18181B] bg-black/5">80A / 48V</td>
              <td className="p-3 text-[#18181B]">75A / 96V</td>
              <td className="p-3 text-[#18181B]">65A / 180V</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
