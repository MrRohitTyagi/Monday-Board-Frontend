import { LucideIcon, Save } from "lucide-react";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";
import Loader from "./Loader";

type AsyncButtonProps = ButtonProps &
  React.RefAttributes<HTMLButtonElement> & {
    isSaving?: boolean;
    noTitle?: boolean;
    title?: string;
    savingTitle?: string;
    className?: string;
    icon?: ReactNode;
    loaderProps?: { className?: string };
  };

const AsyncButton = ({
  isSaving,
  savingTitle,
  title,
  className,
  noTitle,
  icon,
  loaderProps,
  ...rest
}: AsyncButtonProps) => {
  return (
    <Button
      className={cn("flex flex-row gap-1 items-center", className)}
      {...rest}
    >
      {isSaving === true ? (
        <Loader className={loaderProps?.className} />
      ) : icon ? (
        icon
      ) : (
        <Save size={12} color="white" />
      )}

      {noTitle === true ? null : isSaving === true ? (
        <h1>{savingTitle ? savingTitle : "Saving..."}</h1>
      ) : (
        <h1>{title ? title : "Save"}</h1>
      )}
    </Button>
  );
};
export default AsyncButton;
