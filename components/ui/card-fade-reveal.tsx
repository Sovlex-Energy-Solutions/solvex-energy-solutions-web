"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CardElementTag = "div" | "article" | "li" | "section" | "a";

export type CardFadeRevealProps<T extends CardElementTag = "div"> = {
  children: React.ReactNode;
  as?: T;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  viewportMargin?: string;
  index?: number;
  staggerStep?: number;
  maxStaggerColumns?: number;
} & Omit<HTMLMotionProps<T>, "children" | "as">;

export function CardFadeReveal<T extends CardElementTag = "div">({
  children,
  as,
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  once = true,
  viewportMargin = "-35px",
  index,
  staggerStep = 0.08,
  maxStaggerColumns = 4,
  ...props
}: CardFadeRevealProps<T>) {
  const Tag = (as || "div") as CardElementTag;
  const shouldReduceMotion = useReducedMotion();

  // Compute staggered delay when an index is provided
  const computedDelay =
    index !== undefined
      ? delay + (index % maxStaggerColumns) * staggerStep
      : delay;

  if (shouldReduceMotion) {
    const Component = Tag as "div";
    return (
      <Component className={className} {...(props as Record<string, unknown>)}>
        {children}
      </Component>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = (motion[Tag as keyof typeof motion] || motion.div) as React.ComponentType<any>;

  return (
    <MotionComponent
      className={cn("will-change-[transform,opacity]", className)}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay: computedDelay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default CardFadeReveal;
