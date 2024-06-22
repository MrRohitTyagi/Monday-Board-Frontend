import React from "react";

import { cn } from "@/lib/utils";
import { ChildrenType } from "@/types/genericTypes";

type LowOpacityTextProps = {
  className?: string;
} & ChildrenType;

const LowOpacityText = ({ children, className }: LowOpacityTextProps) => {
  return <h1 className={cn("text-sm opacity-80", className)}>{children}</h1>;
};

export default LowOpacityText;
