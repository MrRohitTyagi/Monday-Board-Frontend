import React, { memo } from "react";
import { Bot, Save, Trash2 } from "lucide-react";

import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loader from "@/components/core/Loader";

type SaveAndCancelButtonProps = {
  onSaveClick: (e: any) => void;
  onCancelClick: (e: any) => void;
  handleWriteAI: (e: any) => void;
  disabled?: boolean;
  isWritting?: boolean;
  loading?: boolean;
};
const SaveAndCancelButton = ({
  onCancelClick,
  onSaveClick,
  handleWriteAI,
  disabled,
  loading,
  isWritting,
}: SaveAndCancelButtonProps) => {
  return (
    <div
      className={cn(
        "h-fit flex flex-row border-transparent",
        "border-y-main-bg border-2"
      )}
    >
      <Button
        disabled={disabled}
        onClick={onCancelClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-1 flex flex-row items-center m-1 justify-center"
        )}
      >
        <Trash2 color="white" size={16} className="stroke-main-delete" />
        <h1 className="text-base">Cancel</h1>
      </Button>
      <Divider horizontal className="w-1" />
      {/* Write AI */}

      <Button
        disabled={isWritting || disabled}
        onClick={handleWriteAI}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-1 flex flex-row items-center m-1 justify-center"
        )}
      >
        {isWritting === true ? (
          <Loader className="h-4 w-4" />
        ) : (
          <Bot className="stroke-highlighter" size={16} />
        )}
        <h1 className="text-base">
          {isWritting === true ? "Writing..." : "Write AI"}
        </h1>
      </Button>

      <Divider horizontal className="w-1" />

      {/* Save button */}
      <Button
        disabled={disabled}
        onClick={onSaveClick}
        size={"sm"}
        variant={"ghost"}
        className={cn(
          "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
          "grow gap-1 flex flex-row items-center m-1 justify-center"
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
