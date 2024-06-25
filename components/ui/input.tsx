import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
type ExtendedInputProps = {
  customOnChange?: (e: any) => void;
};
const inputCss = [
  "flex h-10 w-full rounded-md border-2 border-main-bg",
  "px-3 py-2 text-sm ring-offset-background",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground focus-visible:outline-none",
  "focus-visible:shadow-lg shadow-foreground",
  "disabled:cursor-not-allowed disabled:opacity-50",
];

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & ExtendedInputProps
>(({ className, type, onChange, customOnChange, ...props }, ref) => {
  const [visible, setvisible] = React.useState(false);

  const inputCommonProps = {
    type: visible === true ? "text" : type,
    className: cn(...inputCss, className),
    ref: ref,
    ...props,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      customOnChange?.(e);
    },
  };
  return type === "password" ? (
    <div className="relative !m-0 w-full">
      <input {...inputCommonProps} />
      {type === "password" && (
        <div
          className={cn(
            "absolute right-4 top-1/4 opacity-70 transition-all duration-200 ",
            " cursor-pointer"
          )}
          onClick={() => setvisible((ps) => !ps)}
        >
          {visible ? <EyeIcon size="22px" /> : <EyeOff size="22px" />}
        </div>
      )}
    </div>
  ) : (
    <input {...inputCommonProps} />
  );
});
Input.displayName = "Input";

export { Input };
