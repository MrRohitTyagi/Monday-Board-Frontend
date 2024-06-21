import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarCompProps = {
  src?: string;
  fallback?: React.ReactNode | string;
  className?: string;
  defaultBorder?: boolean;
};
const AvatarComp = ({
  src,
  fallback = "CN",
  className,
  defaultBorder = false,
}: AvatarCompProps) => {
  return (
    <Avatar
      className={cn(
        className,
        "cursor-pointer transition-all duration-300",
        defaultBorder && "hover:border border-highlighter"
      )}
    >
      <AvatarImage src={src} />
      <AvatarFallback className="bg-main-fg text-sm cursor-pointer">
        {fallback || "NA"}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComp;
