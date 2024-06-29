import AsyncButton from "@/components/core/AsyncButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import React from "react";

type ThreadActionsProps = {
  isDeleting?: boolean;
  isEditing?: boolean;
  handleDeleteThread?: () => void;
  triggerEditing?: (e: boolean) => void;
};

const ThreadActions = ({
  handleDeleteThread,
  isDeleting,

  triggerEditing,
}: ThreadActionsProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        "group-hover:opacity-100 thread-actions opacity-0",
        "absolute right-2 z-14 top-0 flex flex-row",
        isDeleting && "!opacity-100"
      )}
    >
      <AsyncButton
        loaderProps={{ className: "h-4 w-4" }}
        onClick={handleDeleteThread}
        size={"sm"}
        variant={"ghost"}
        icon={
          <Trash2
            size={16}
            className="stroke-main-delete cursor-pointer"
            onClick={handleDeleteThread}
          />
        }
        noTitle={true}
        isSaving={isDeleting}
        className={cn(
          "cursor-pointer border border-main-bg p-2",
          "hover:bg-main-bg"
        )}
      />
      <Button
        onClick={() => triggerEditing?.(true)}
        size={"sm"}
        className={cn(
          "cursor-pointer border border-main-bg p-2",
          "hover:bg-main-bg"
        )}
        variant={"ghost"}
      >
        <Edit
          size={16}
          color="white"
          className=" cursor-pointer"
          onClick={() => triggerEditing?.(true)}
        />
      </Button>
    </div>
  );
};

export default ThreadActions;
