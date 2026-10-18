"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#0d1a14",
  colors = [
    [78, 222, 163], // Solvex primary #4edea3
    [16, 185, 129], // Emerald 500
  ],
  dotSize = 3,
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  colors?: number[][];
  dotSize?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-8 rounded-xl relative border border-white/15 bg-black/60 overflow-hidden transition-all duration-300 hover:border-[#059669]/40 hover:shadow-[0_0_30px_rgba(5,150,105,0.15)]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={3.5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={colors}
            dotSize={dotSize}
          />
        )}
      </motion.div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
