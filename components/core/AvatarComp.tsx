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
      <AvatarImage
        src={
          src ||
          "https://res.cloudinary.com/derplm8c6/image/upload/v1718526303/dkm7ezl1whano6p8osei.png"
        }
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComp;
