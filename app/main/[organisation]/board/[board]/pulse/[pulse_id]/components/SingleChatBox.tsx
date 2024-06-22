import { isEmpty, startCase } from "lodash";
import { Reply, Settings, ThumbsUp, Timer } from "lucide-react";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

//core
import AvatarComp from "@/components/core/AvatarComp";
import Divider from "@/components/core/Divider";
import TooltipComp from "@/components/core/TooltipComp";
import PopoverComp from "@/components/core/PopoverComp";

// UI
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Utils
import { cn } from "@/lib/utils";

//components
import ViewedBy from "./ViewedBy";
import ChatContentViwer from "./ChatContentViwer";
import PulseChatSkeletonLoader from "./PulseChatSkeletonLoader";
import Threads from "./Threads/Threads";
import ChatActions from "./ChatActions";
import SaveAndCancelButton from "./SaveAndCancelButton";

//hooks
import useChat from "@/hooks/useChat";

//types
import { ChatType } from "@/types/chatTypes";
import { PulseType } from "@/types/pulseTypes";

// Extra
import { generatePictureFallback, timeBetween } from "@/utils/helperFunctions";
import { StateSetter } from "@/types/genericTypes";

type SingleChatBoxProps = {
  chat: ChatType;
  pulse?: PulseType;
  setChats: StateSetter<ChatType[]>;
};
const saveStateConfig = {
  DELETING: "DELETING",
  SAVING: "SAVING",
};
const SingleChatBox = ({ chat: masterChat, setChats }: SingleChatBoxProps) => {
  //
  const [chat, setchat] = useState<ChatType>({} as ChatType);
  const [isEditing, setIsEditing] = useState(!isEmpty(masterChat.draft));
  const [isLoading, setIsLoading] = useState(true);
  const [saveState, setSaveState] = useState("");

  const { updateChatContent, updateChatDraft, deleteSingleChat } = useChat();

  const { userFriendlyDate, displayText } = useMemo(() => {
    if (!masterChat._id)
      return {
        userFriendlyDate: null,
        displayText: null,
      };
    return timeBetween(masterChat.createdAt);
  }, [masterChat.createdAt]);

  useEffect(() => {
    setchat(masterChat);
    setIsLoading(false);
  }, [masterChat]);

  // save the chat content
  const onSaveClick = useCallback(async () => {
    setSaveState(saveStateConfig.SAVING);
    await updateChatContent(chat.content, masterChat._id);
    setIsEditing(false);
    setSaveState("");
  }, [chat, updateChatContent, masterChat._id]);

  // cancel the chat draft
  const onCancelClick = useCallback(() => {
    setchat((pc) => ({ ...pc, draft: "", content: masterChat.content }));
    setIsEditing(false);
  }, [masterChat.draft]);

  // Delete Chat
  const deleteChat = useCallback(
    async (_id: string) => {
      setSaveState(saveStateConfig.DELETING);
      await deleteSingleChat(_id);
      setChats((ps) => {
        return ps.filter((c) => c._id !== _id);
      });
      setSaveState("");
    },
    [deleteSingleChat]
  );

  const hasThread = chat?.threadCount > 0;

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
              content={
                <ChatActions
                  isDeleting={saveState === saveStateConfig.DELETING}
                  chat={chat}
                  deleteChat={deleteChat}
                  setIsEditing={setIsEditing}
                />
              }
            />
          </div>
        </div>
        {isEditing === true ? (
          <Textarea
            disabled={saveState === saveStateConfig.SAVING}
            value={chat.draft ? chat.draft : chat.content}
            dynamicHeight={true}
            className="border-highlighter border-[1px]"
            placeholder="White an update ..."
            onChange={(e) => {
              const value = e.target.value;
              setchat((pc) => ({ ...pc, content: value, draft: value }));
              updateChatDraft(value, masterChat._id);
            }}
          />
        ) : (
          <ChatContentViwer chat={chat} />
        )}
      </div>
      <ViewedBy viewers={chat.seenBy} />
      {isEditing === true ? (
        <SaveAndCancelButton
          disabled={saveState === saveStateConfig.SAVING}
          loading={saveState === saveStateConfig.SAVING}
          onCancelClick={onCancelClick}
          onSaveClick={onSaveClick}
        />
      ) : (
        <div
          className={cn(
            "h-fit flex flex-row border-transparent border-t-main-light border-2",
            hasThread &&
              "border-b-2 border-x-transparent border-main-light rounded-md"
          )}
        >
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

      {hasThread === true && <Threads chat={chat} />}
    </div>
  );
};

export default memo(SingleChatBox);
