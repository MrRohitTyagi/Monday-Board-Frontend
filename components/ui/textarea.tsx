import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxHeight = true, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "!bg-transparent border-2 border-main-light",
          "flex min-h-[80px] w-full rounded-md ",
          "px-3 py-2 text-sm  placeholder:text-muted-foreground ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus:outline-none",
          maxHeight === true && "max-h-60",
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
