import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Save, Trash2 } from "lucide-react";

type ThreadsButtonsProps = {
  isWritting: boolean;
  isSaving: boolean;
  onCancelClick: (e?: boolean) => void;
  onSaveClick: () => void;
  handleWriteAI: () => void;
};
const ThreadsButtons = ({
  onCancelClick,
  isWritting,
  handleWriteAI,
  onSaveClick,
  isSaving,
}: ThreadsButtonsProps) => {
  return (
    <div
      className={cn(
        "new-thread-buttons",
        "flex flex-row gap-2 items-center justify-end"
      )}
    >
      <Button
        variant={"ghost"}
        onClick={() => {
          onCancelClick(false);
        }}
        className="flex flex-row gap-1 py-0"
        size="xsm"
      >
        <Trash2 size={12} color="white" />
        <h1>Cancel</h1>
      </Button>

      <Button
        disabled={isWritting}
        variant={"ghost"}
        onClick={handleWriteAI}
        className="flex flex-row gap-1 py-0"
        size="xsm"
      >
        <Bot size={12} color="white" />
        {isWritting ? <h1>Writing...</h1> : <h1>Write AI</h1>}
      </Button>

      <Button
        disabled={isSaving}
        onClick={onSaveClick}
        variant={"ghost"}
        className="flex flex-row gap-1 py-0"
        size="xsm"
      >
        <Save size={12} color="white" />
        {isSaving ? <h1>Saving...</h1> : <h1>Save</h1>}
      </Button>
    </div>
  );
};

export default ThreadsButtons;
