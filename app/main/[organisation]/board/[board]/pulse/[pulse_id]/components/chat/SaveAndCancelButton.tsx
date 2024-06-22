import React, { memo } from "react";
import { Save, Trash2 } from "lucide-react";

import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loader from "@/components/core/Loader";

type SaveAndCancelButtonProps = {
  onSaveClick: (e: any) => void;
  onCancelClick: (e: any) => void;
  disabled?: boolean;
  loading?: boolean;
};
const SaveAndCancelButton = ({
  onCancelClick,
  onSaveClick,
  disabled,
  loading,
}: SaveAndCancelButtonProps) => {
  return (
    <div
      className={cn(
        "h-fit flex flex-row border-transparent",
        "border-y-main-light border-2"
      )}
    >
      <Button
        disabled={disabled}
        onClick={onCancelClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-3 flex flex-row items-center m-1"
        )}
      >
        <Trash2 color="white" size={16} className="stroke-main-delete" />
        <h1 className="text-base">Cancel</h1>
      </Button>
      <Divider horizontal className="w-1" />
      <Button
        disabled={disabled}
        onClick={onSaveClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-3 flex flex-row items-center m-1"
        )}
      >
        {loading === true ? (
          <Loader className="h-4 w-4" />
        ) : (
          <Save className="stroke-highlighter" size={16} />
        )}
        <h1 className="text-base">{loading === true ? "Saving..." : "Save"}</h1>
      </Button>
    </div>
  );
};

export default memo(SaveAndCancelButton);
