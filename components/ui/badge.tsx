import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "white" | "pill";
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-primary/20 bg-primary text-white",
    primary: "border-primary/20 bg-primary text-white font-medium",
    secondary: "border-white/10 bg-black/60 text-white/80",
    outline: "border-white/20 text-white/90 bg-transparent",
    white: "border-white bg-white text-black font-semibold",
    pill: "border-white/20 bg-white/10 text-white rounded-full",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 font-sans text-[11px] font-medium tracking-[0.88px] uppercase transition-colors rounded-md",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
