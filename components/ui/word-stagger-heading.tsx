"use client";

import React, { useMemo } from "react";
import { motion, type Variants, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export interface WordStaggerHeadingProps {
  as?: HeadingTag;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  yOffset?: number | string;
  once?: boolean;
  viewportMargin?: string;
  id?: string;
}

interface ParsedToken {
  type: "word" | "linebreak" | "element";
  content: React.ReactNode;
  key: string;
}

/**
 * Recursively parses children into individual words, line breaks, and elements.
 */
function parseTokens(children: React.ReactNode, prefix = "w"): { tokens: ParsedToken[]; textContent: string } {
  const tokens: ParsedToken[] = [];
  let textContent = "";
  let counter = 0;

  function traverse(node: React.ReactNode) {
    if (node === null || node === undefined || typeof node === "boolean") {
      return;
    }

    if (typeof node === "string" || typeof node === "number") {
      const str = String(node);
      textContent += (textContent ? " " : "") + str;
      const words = str.split(/(\s+)/);

      words.forEach((chunk) => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
          // Whitespace chunk
          return;
        }
        tokens.push({
          type: "word",
          content: chunk,
          key: `${prefix}-${counter++}-${chunk}`,
        });
      });
      return;
    }

    if (Array.isArray(node)) {
      node.forEach(traverse);
      return;
    }

    if (React.isValidElement(node)) {
      // Check for <br />
      if (node.type === "br") {
        textContent += "\n";
        tokens.push({
          type: "linebreak",
          content: <br key={`${prefix}-br-${counter++}`} />,
          key: `${prefix}-br-${counter++}`,
        });
        return;
      }

      // Check if node has children
      const props = node.props as { children?: React.ReactNode; className?: string };
      if (props && props.children) {
        traverse(props.children);
      } else {
        tokens.push({
          type: "element",
          content: node,
          key: `${prefix}-el-${counter++}`,
        });
      }
    }
  }

  traverse(children);
  return { tokens, textContent: textContent.replace(/\s+/g, " ").trim() };
}

export function WordStaggerHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0.04,
  staggerDelay = 0.045,
  duration = 0.55,
  yOffset = "100%",
  once = true,
  viewportMargin = "-40px",
  id,
}: WordStaggerHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const { tokens, textContent } = useMemo(() => {
    return parseTokens(children);
  }, [children]);

  const containerVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: {},
        visible: {},
      };
    }
    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      },
    };
  }, [staggerDelay, delay, shouldReduceMotion]);

  const wordVariants: Variants = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      };
    }
    return {
      hidden: {
        opacity: 0,
        y: yOffset,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      },
    };
  }, [duration, yOffset, shouldReduceMotion]);

  return (
    <Tag id={id} className={cn("inline-block", className)}>
      {/* Screen-reader accessible full text representation */}
      <span className="sr-only">{textContent}</span>

      {/* Visually animated words with bottom-to-top staggered reveal */}
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: viewportMargin }}
      >
        {tokens.map((token) => {
          if (token.type === "linebreak") {
            return (
              <span key={token.key} className="block w-full h-0 select-none">
                {token.content}
              </span>
            );
          }

          if (token.type === "element") {
            return (
              <span key={token.key} className="inline-block mr-[0.26em] last:mr-0">
                {token.content}
              </span>
            );
          }

          return (
            <span
              key={token.key}
              className="inline-block overflow-hidden align-top mr-[0.26em] last:mr-0 pb-[0.06em] -mb-[0.06em]"
            >
              <motion.span className="inline-block will-change-transform" variants={wordVariants}>
                {token.content}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

export default WordStaggerHeading;
