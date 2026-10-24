"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
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
} & React.ComponentPropsWithoutRef<T>;

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
  const Tag = (as || "div") as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  // Compute staggered delay when an index is provided
  const computedDelay =
    index !== undefined
      ? delay + (index % maxStaggerColumns) * staggerStep
      : delay;

  useEffect(() => {
    const el = ref.current;
    if (!el || animatedRef.current) return;

    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      animatedRef.current = true;
      return;
    }

    // Set initial hidden state cleanly without permanent will-change in className
    gsap.set(el, {
      opacity: 0,
      y: yOffset,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            if (once) {
              observer.unobserve(el);
            }

            // Smooth entrance that doesn't delete or snap transform at completion
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration,
              delay: computedDelay,
              ease: "power2.out",
              onComplete: () => {
                // Keep transform locked at translate(0px, 0px) so no GPU layer demotion / flicker occurs
                // and clear any temporary willChange
                gsap.set(el, { clearProps: "willChange" });
              },
            });
          }
        });
      },
      {
        rootMargin: viewportMargin || "-35px",
        threshold: 0.05,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [computedDelay, duration, yOffset, once, viewportMargin]);

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Tag>
  );
}

export default CardFadeReveal;
