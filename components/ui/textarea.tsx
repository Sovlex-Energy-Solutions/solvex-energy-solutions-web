import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[160px] w-full rounded-lg border border-black/10 bg-[#FAFAFA] px-4 py-3 text-sm text-[#18181B] placeholder:text-[#71717A] shadow-xs transition-colors focus-visible:outline-none focus-visible:border-[#059669] focus-visible:ring-1 focus-visible:ring-[#059669] disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
