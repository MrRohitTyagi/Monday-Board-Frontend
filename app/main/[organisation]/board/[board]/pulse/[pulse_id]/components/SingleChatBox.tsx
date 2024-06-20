import AvatarComp from "@/components/core/AvatarComp";
import Divider from "@/components/core/Divider";
import TooltipComp from "@/components/core/TooltipComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types";
import { generateUserPictureFallback } from "@/utils/helperFunctions";
import { ChatType, PulseType } from "@/zstore";
import { startCase } from "lodash";
import { Eye, Reply, ThumbsUp } from "lucide-react";
import React, { memo, useState } from "react";
import ViewedBy from "./ViewedBy";
type SingleChatBoxProps = {
  chat: ChatType;
  pulse: PulseType;
  setChats: StateSetter<ChatType[]>;
  setPulse: StateSetter<PulseType>;
};
const SingleChatBox = ({
  chat,
  pulse,
  setChats,
  setPulse,
}: SingleChatBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={cn(
        "max-w-[40rem] w-full",
        "flex flex-col shrink-0 animate-fadeIn",
        "single-chat-cont rounded-lg border-2 border-main-light"
      )}
    >
      <div className="single-chat-editor flex flex-col min-h-32 p-4 pb-2 gap-3">
        <div className="chat-avatar gap-3 flex flex-row items-center">
          <AvatarComp
            src={chat.createdBy.picture}
            fallback={generateUserPictureFallback(chat?.createdBy?.username)}
          />
          <h1>{startCase(chat?.createdBy?.username)}</h1>
        </div>
        {isEditing === true ? (
          <Textarea
            value={chat.content}
            className="border-none"
            placeholder="White an update ..."
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: chat.content }} />
        )}
      </div>
      <ViewedBy viewers={chat.seenBy} />

      <div className="h-fit flex flex-row border-transparent border-t-main-light border-2">
        <Button
          variant={"ghost"}
          size={"sm"}
          className={cn(
            "overflow-hidden py-0",
            "grow gap-3 flex flex-row items-center m-1"
          )}
        >
          <ThumbsUp color="white" size={16} />
          <h1 className="text-base">Like</h1>
        </Button>

        <Divider horizontal />
        <Button
          size={"sm"}
          variant={"ghost"}
          className={cn(
            "overflow-hidden py-0",
            "grow gap-3 flex flex-row items-center m-1"
          )}
        >
          <Reply color="white" size={16} />
          <h1 className="text-base">Reply</h1>
        </Button>
      </div>
    </div>
  );
};

export default memo(SingleChatBox);
