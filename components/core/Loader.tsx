import React, { memo } from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
};
const Loader = ({ className }: LoaderProps) => {
  return <LoaderCircle className={cn("animate-spin", className)} />;
};

export default memo(Loader);
