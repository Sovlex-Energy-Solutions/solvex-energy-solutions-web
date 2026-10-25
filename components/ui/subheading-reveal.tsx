"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SubheadingTag = "p" | "span" | "div" | "h3" | "h4" | "h5" | "h6";

export interface SubheadingRevealProps {
  as?: SubheadingTag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  viewportMargin?: string;
  id?: string;
}

export function SubheadingReveal({
  as: Tag = "p",
  children,
  className = "",
  delay = 0.16,
  duration = 0.65,
  yOffset = 14,
  once = true,
  viewportMargin = "-40px",
  id,
}: SubheadingRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: viewportMargin as NonNullable<Parameters<typeof useInView>[1]>["margin"],
  });

  // Pick the appropriate motion HTML element
  const MotionComponent = motion[Tag as keyof typeof motion] as typeof motion.p;

  if (shouldReduceMotion) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      id={id}
      className={cn("will-change-transform", className)}
      initial={isInView ? false : { opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay: isInView ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </MotionComponent>
  );
}

export default SubheadingReveal;
