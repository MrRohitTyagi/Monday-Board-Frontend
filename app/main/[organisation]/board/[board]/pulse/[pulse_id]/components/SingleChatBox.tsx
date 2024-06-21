import AvatarComp from "@/components/core/AvatarComp";
import Divider from "@/components/core/Divider";
import TooltipComp from "@/components/core/TooltipComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generatePictureFallback, timeBetween } from "@/utils/helperFunctions";
import { ChatType, PulseType } from "@/zstore";
import { isEmpty, isEqual, startCase } from "lodash";
import { Reply, Save, Settings, ThumbsUp, Timer, Trash2 } from "lucide-react";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import ViewedBy from "./ViewedBy";
import ChatContentViwer from "./ChatContentViwer";
import PulseChatSkeletonLoader from "./PulseChatSkeletonLoader";
import PopoverComp from "@/components/core/PopoverComp";
import ChatActions from "./ChatActions";
import useChat from "@/hooks/useChat";
import SaveAndCancelButton from "./SaveAndCancelButton";

type SingleChatBoxProps = {
  chat: ChatType;
  pulse?: PulseType;
};
const SingleChatBox = ({ chat: masterChat }: SingleChatBoxProps) => {
  //
  const [chat, setchat] = useState<ChatType>({} as ChatType);
  const [isEditing, setIsEditing] = useState(!isEmpty(masterChat.draft));
  const [isLoading, setIsLoading] = useState(true);

  const { updateChatContent, updateChatDraft } = useChat({
    chat_id: masterChat._id,
    setchat,
    setIsEditing,
  });

  const { userFriendlyDate, displayText } = useMemo(() => {
    if (!chat._id)
      return {
        userFriendlyDate: null,
        displayText: null,
      };
    return timeBetween(chat.createdAt);
  }, [chat]);

  console.log(`%c chat `, "color: pink;border:1px solid pink", chat);

  useEffect(() => {
    setchat(masterChat);
    setIsLoading(false);
  }, [masterChat]);

  const onSaveClick = useCallback(() => {
    if (!isEqual(chat, masterChat)) updateChatContent(chat.content);
    setchat((ps) => ({ ...ps, content: masterChat.content }));
    setIsEditing(false);
  }, [chat, masterChat]);

  const onCancelClick = useCallback(() => {
    updateChatContent(chat.draft);
  }, [chat.draft]);

  return isLoading === true ? (
    <div className="w-full">
      <PulseChatSkeletonLoader onlyChat={true} />
    </div>
  ) : (
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
              fallback={generatePictureFallback(chat?.createdBy?.username)}
            />
            <h1>{startCase(chat?.createdBy?.username)}</h1>
          </div>
          <div className="chat-actions flex flex-row">
            <TooltipComp
              className={cn(
                "border-[1px] border-main-active",
                "shadow-black shadow-lg"
              )}
              title={
                <div className="p-2 px-4 text-sm opacity-90">
                  {userFriendlyDate}
                </div>
              }
            >
              <div className="flex flex-row gap-2 items-center opacity-60 cursor-pointer">
                <Timer size={15} color="white" />
                <h1 className="text-sm">{displayText}</h1>
              </div>
            </TooltipComp>
            <PopoverComp
              additional={{ content: { align: "end" } }}
              classNames={{
                content: "bg-main-fg shadow-lg shadow-black w-fit",
              }}
              trigger={
                <Button variant={"ghost"} size={"sm"}>
                  <Settings color="white" size={15} />
                </Button>
              }
              content={<ChatActions setIsEditing={setIsEditing} />}
            />
          </div>
        </div>
        {isEditing === true ? (
          <Textarea
            value={chat.draft ? chat.draft : chat.content}
            rows={chat.content.split(" ").length / 10}
            className="border-highlighter border-[1px] h-fit"
            placeholder="White an update ..."
            onChange={(e) => {
              const value = e.target.value;
              updateChatDraft(value);
            }}
          />
        ) : (
          <ChatContentViwer chat={chat} />
        )}
      </div>
      <ViewedBy viewers={chat.seenBy} />
      {isEditing === true ? (
        <SaveAndCancelButton
          onCancelClick={onCancelClick}
          onSaveClick={onSaveClick}
        />
      ) : (
        <div className="h-fit flex flex-row border-transparent border-t-main-light border-2">
          <Button
            variant={"ghost"}
            size={"sm"}
            className={cn(
              "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
              "grow gap-3 flex flex-row items-center m-1"
            )}
          >
            <ThumbsUp color="white" size={16} />
            <h1 className="text-base">Like</h1>
          </Button>

          <Divider horizontal className="w-1" />
          <Button
            size={"sm"}
            variant={"ghost"}
            className={cn(
              "overflow-hidden py-0 rounded-[1px] transition-all duration-200",
              "grow gap-3 flex flex-row items-center m-1"
            )}
          >
            <Reply color="white" size={16} />
            <h1 className="text-base">Reply</h1>
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(SingleChatBox);
