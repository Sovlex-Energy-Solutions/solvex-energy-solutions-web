import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "paired-primary"
    | "paired-outline"
    | "pill";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, children, ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
      primary:
        "bg-primary text-primary-foreground hover:bg-[#047857] active:scale-[0.98]",
      outline:
        "border border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/15 active:scale-[0.98]",
      secondary:
        "border border-white/15 bg-black/60 text-white hover:border-white/30 hover:bg-white/5 active:scale-[0.98]",
      ghost:
        "text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]",
      link:
        "text-white underline-offset-4 hover:underline p-0 h-auto",
      "paired-primary":
        "bg-white text-black border border-white rounded-l-lg rounded-r-none font-sans text-[11px] uppercase tracking-[1.1px] font-semibold hover:opacity-85 active:scale-[0.98]",
      "paired-outline":
        "border border-white/30 bg-white/10 text-white rounded-r-lg rounded-l-none font-sans text-[11px] uppercase tracking-[1.1px] font-semibold hover:border-white/50 hover:bg-white/15 active:scale-[0.98]",
      pill:
        "bg-white text-black rounded-full font-sans text-[13px] font-medium hover:opacity-85 active:scale-[0.98]",
    };

    const sizeStyles = {
      default: "h-[38px] px-4 text-xs font-sans tracking-[1.1px] uppercase font-semibold",
      sm: "h-[34px] px-3.5 text-[11px] font-sans tracking-[0.88px]",
      lg: "h-[42px] px-6 text-xs font-sans tracking-[1.1px] uppercase font-semibold",
      icon: "h-[38px] w-[38px]",
    };

    const combinedClassName = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
        ...props,
      });
    }

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
