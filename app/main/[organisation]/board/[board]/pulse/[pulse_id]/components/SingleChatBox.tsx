import AvatarComp from "@/components/core/AvatarComp";
import Divider from "@/components/core/Divider";
import TooltipComp from "@/components/core/TooltipComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types";
import {
  generateUserPictureFallback,
  timeBetween,
} from "@/utils/helperFunctions";
import { ChatType, PulseType } from "@/zstore";
import { startCase } from "lodash";
import { Eye, Reply, ThumbsUp, Timer } from "lucide-react";
import React, { memo, useState } from "react";
import ViewedBy from "./ViewedBy";
import ChatContentViwer from "./ChatContentViwer";
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

  const { userFriendlyDate, displayText } = timeBetween(chat.createdAt);

  return (
    <div
      className={cn(
        "max-w-[40rem] w-full",
        "transition-all duration-300",
        "flex flex-col shrink-0 animate-fadeIn",
        "single-chat-cont rounded-lg border-2 border-main-light"
      )}
    >
      <div className="single-chat-editor flex flex-col min-h-32 p-4 pb-2 gap-3">
        <div className="chat-avatar gap-3 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <AvatarComp
              src={chat.createdBy.picture}
              fallback={generateUserPictureFallback(chat?.createdBy?.username)}
            />
            <h1>{startCase(chat?.createdBy?.username)}</h1>
          </div>
          <div className="chat-date">
            <TooltipComp
              className={cn(
                "border-[1px] border-main-active",
                "shadow-black shadow-lg"
              )}
              title={<div className="p-2 px-4">{userFriendlyDate}</div>}
            >
              <div className="flex flex-row gap-2 items-center opacity-60 cursor-pointer">
                <Timer size={15} color="white" />
                <h1 className="text-sm">{displayText}</h1>
              </div>
            </TooltipComp>
          </div>
        </div>
        {isEditing === true ? (
          <Textarea
            value={chat.content}
            className="border-none"
            placeholder="White an update ..."
          />
        ) : (
          <ChatContentViwer chat={chat} />
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
