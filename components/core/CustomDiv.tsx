import React from "react";
import { cn } from "@/lib/utils";
import { number } from "zod";

type CustomDivProps = {
  disabled?: boolean;
  lvl?: number;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CustomDiv = ({
  disabled = false,
  children,
  className,
  lvl = 80,
  ...rest
}: CustomDivProps) => {
  return (
    <div
      className={cn(
        disabled && `pointer-events-none opacity-${lvl}`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CustomDiv;
