import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[160px] w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 shadow-xs transition-colors focus-visible:outline-none focus-visible:border-[#059669] focus-visible:ring-1 focus-visible:ring-[#059669] disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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
