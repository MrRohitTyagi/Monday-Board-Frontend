import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types";
import { ChatType } from "@/zstore";
import React, { useState } from "react";
import SaveAndCancelButton from "./SaveAndCancelButton";
type NewChatCompProps = { setChats: StateSetter<ChatType[]> };
const NewChatComp = ({ setChats }: NewChatCompProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={cn(
        "max-w-[40rem] w-full",
        "h-fit shrink-0",
        "border-main-light border-2 rounded-lg"
      )}
    >
      {isEditing ? (
        <Textarea
          placeholder="Write an update ..."
          className={cn(
            "w-full rounded-none border-none",
            "h-fit shrink-0"
            // " border-highlighter border"
          )}
        />
      ) : (
        <Input
          onClick={() => setIsEditing(true)}
          className={cn(
            "bg-transparent  border-none"
            // "border-highlighter border"
          )}
          placeholder="Write an update..."
        />
      )}
      {isEditing === true && <SaveAndCancelButton />}
    </div>
  );
};

export default NewChatComp;
