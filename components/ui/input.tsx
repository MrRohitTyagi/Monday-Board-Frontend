import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
type ExtendedInputProps = {
  customOnChange?: (e: any) => void;
};

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & ExtendedInputProps
>(({ className, type, onChange, customOnChange, ...props }, ref) => {
  const [visible, setvisible] = React.useState(false);
  return (
    <div className="relative !m-0">
      <input
        type={visible === true ? "text" : type}
        className={cn(
          // "!bg-transparent",
          "flex h-10 w-full rounded-md border-2 border-main-light",
          "px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground focus-visible:outline-none",
          "focus-visible:shadow-lg shadow-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        onChange={(e) => {
          onChange?.(e);
          customOnChange?.(e);
        }}
      />
      {type === "password" && (
        <div
          className="absolute right-4 top-1/4 opacity-70 transition-all duration-200"
          onClick={() => setvisible((ps) => !ps)}
        >
          {visible ? <EyeIcon size="22px" /> : <EyeOff size="22px" />}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
