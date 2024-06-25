"use client";

import React, { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import { ChildrenType } from "@/types/genericTypes";

type LowOpacityTextProps = {
  className?: string;
} & ChildrenType;

const LowOpacityText = forwardRef(
  ({ children, className }: LowOpacityTextProps, ref) => {
    return <h1 className={cn("text-sm opacity-80", className)}>{children}</h1>;
  }
);

export default memo(LowOpacityText);
