"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MotionRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function MotionReveal({
  children,
  delay = 0,
  duration = 0.65,
  yOffset = 20,
  threshold = 0.05,
  rootMargin = "0px 0px -25px 0px",
  className = "",
  ...props
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animatedRef.current) return;

    // Accessibility check: skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      animatedRef.current = true;
      return;
    }

    // Set initial hidden state with subtle vertical displacement without scaling
    gsap.set(el, {
      opacity: 0,
      y: yOffset,
      willChange: "transform, opacity",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            observer.unobserve(el);

            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power2.out",
              clearProps: "willChange",
            });
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delay, duration, yOffset, threshold, rootMargin]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}

interface MotionStaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  yOffset?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export function MotionStagger({
  children,
  stagger = 0.06,
  delayChildren = 0,
  yOffset = 20,
  duration = 0.65,
  threshold = 0.05,
  rootMargin = "0px 0px -25px 0px",
  className = "",
  ...props
}: MotionStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedSetRef = useRef<WeakSet<Element>>(new WeakSet());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("[data-gsap-item='true']");
    const targets: HTMLElement[] =
      items.length > 0
        ? Array.from(items)
        : (Array.from(container.children) as HTMLElement[]);

    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    // Set initial visible state to hidden with subtle vertical displacement at original scale
    gsap.set(targets, {
      opacity: 0,
      y: yOffset,
      willChange: "transform, opacity",
    });

    // Observer batches newly entering cards so they slide up cleanly in waves
    let pendingBatch: HTMLElement[] = [];
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyIntersecting: HTMLElement[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedSetRef.current.has(entry.target)) {
            animatedSetRef.current.add(entry.target);
            observer.unobserve(entry.target);
            newlyIntersecting.push(entry.target as HTMLElement);
          }
        });

        if (newlyIntersecting.length > 0) {
          pendingBatch.push(...newlyIntersecting);

          if (!rafId) {
            rafId = requestAnimationFrame(() => {
              const batchToAnimate = [...pendingBatch];
              pendingBatch = [];
              rafId = null;

              gsap.to(batchToAnimate, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                delay: delayChildren,
                ease: "power2.out",
                clearProps: "willChange",
              });
            });
          }
        }
      },
      { rootMargin, threshold }
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [stagger, delayChildren, yOffset, duration, threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
}

interface MotionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export function MotionItem({
  children,
  className = "",
  ...props
}: MotionItemProps) {
  return (
    <div
      data-gsap-item="true"
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}


