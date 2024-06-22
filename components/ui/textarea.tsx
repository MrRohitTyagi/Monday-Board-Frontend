"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: boolean;
  dynamicHeight?: boolean;
  handleCtrlEnter?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      maxHeight = true,
      dynamicHeight,
      value = "",
      handleCtrlEnter,
      ...props
    },
    ref
  ) => {
    const keyRecordRef = React.useRef("");
    //
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const key = e.key;
        console.log("key", key);
        if (key === "Enter" && keyRecordRef.current === "Control") {
          handleCtrlEnter?.();
          keyRecordRef.current = key;
        } else {
          keyRecordRef.current = key;
        }
      },
      [handleCtrlEnter]
    );

    const rows = React.useMemo(() => {
      if (typeof value === "string") {
        return value.split("\n").length;
      } else return 5;
    }, [value]);

    return (
      <textarea
        onKeyDown={handleKeyDown}
        rows={dynamicHeight === true ? rows : undefined}
        value={value}
        className={cn(
          "opacity-80",
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
