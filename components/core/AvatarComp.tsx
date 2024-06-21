import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarCompProps = {
  src?: string;
  fallback?: React.ReactNode | string;
  className?: string;
};
const AvatarComp = ({ src, fallback = "CN", className }: AvatarCompProps) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback || "NA"}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComp;
