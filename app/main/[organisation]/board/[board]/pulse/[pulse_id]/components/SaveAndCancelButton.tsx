import React from "react";
import { Save, Trash2 } from "lucide-react";

import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SaveAndCancelButtonProps = {
  onSaveClick: (e: any) => void;
  onCancelClick: (e: any) => void;
};
const SaveAndCancelButton = ({
  onCancelClick,
  onSaveClick,
}: SaveAndCancelButtonProps) => {
  return (
    <div
      className={cn(
        "h-fit flex flex-row border-transparent",
        "border-t-main-light border-2",
        "animate-fadeIn"
      )}
    >
      <Button
        onClick={onSaveClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-3 flex flex-row items-center m-1"
        )}
      >
        <Trash2 color="white" size={16} />
        <h1 className="text-base">Cancel</h1>
      </Button>
      <Divider horizontal className="w-1" />
      <Button
        onClick={onCancelClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-3 flex flex-row items-center m-1"
        )}
      >
        <Save color="white" size={16} />
        <h1 className="text-base">Save</h1>
      </Button>
    </div>
  );
};

export default SaveAndCancelButton;
