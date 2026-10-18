"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
}

interface SlidingTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  pillClassName?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
}

export function SlidingTabs({
  tabs,
  activeId,
  onChange,
  className,
  pillClassName,
  buttonClassName,
  wrapperClassName,
}: SlidingTabsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const activeEl = tabsRef.current.get(activeId);
    if (!activeEl || !containerRef.current) return;

    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      opacity: 1,
    });

    // Ensure active tab is comfortably in view if the container scrolls horizontally
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;
      const elLeft = activeEl.offsetLeft;
      const elRight = elLeft + activeEl.offsetWidth;
      const scrollLeft = wrapper.scrollLeft;
      const clientWidth = wrapper.clientWidth;

      if (elLeft < scrollLeft + 12) {
        wrapper.scrollTo({ left: Math.max(0, elLeft - 16), behavior: "smooth" });
      } else if (elRight > scrollLeft + clientWidth - 12) {
        wrapper.scrollTo({
          left: elRight - clientWidth + 16,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);

  useEffect(() => {
    updateIndicator();

    // Recalculate on window resize or container resize
    window.addEventListener("resize", updateIndicator);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateIndicator)
        : null;

    if (containerRef.current && observer) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer?.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "max-w-full overflow-x-auto scrollbar-none overscroll-x-contain touch-pan-x py-1 -my-1",
        wrapperClassName
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative p-1 rounded-full bg-white border border-black/10 inline-flex items-center gap-1 shadow-xs select-none w-max min-w-max shrink-0",
          className
        )}
      >
        {/* Smooth Sliding Active Pill Indicator */}
        <div
          style={{
            transform: `translateX(${indicator.left}px)`,
            width: `${indicator.width}px`,
            opacity: indicator.opacity,
          }}
          className={cn(
            "absolute inset-y-1 left-0 rounded-full bg-primary shadow-xs pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,width]",
            pillClassName
          )}
        />

        {/* Tab Buttons */}
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) {
                  tabsRef.current.set(tab.id, el);
                } else {
                  tabsRef.current.delete(tab.id);
                }
              }}
              onClick={() => onChange(tab.id)}
              title={tab.title}
              type="button"
              className={cn(
                "relative z-10 px-4 py-2 rounded-full text-xs font-normal tracking-[-0.1px] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 leading-none whitespace-nowrap",
                isActive
                  ? "text-white"
                  : "text-[#71717A] hover:text-[#18181B]",
                buttonClassName
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
