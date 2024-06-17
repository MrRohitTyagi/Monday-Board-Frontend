import React from "react";
import { cn } from "@/lib/utils";

type CustomDivProps = {
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CustomDiv = ({
  disabled = false,
  children,
  className,
  ...rest
}: CustomDivProps) => {
  return (
    <div
      className={cn(disabled && "pointer-events-none opacity-80", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CustomDiv;
