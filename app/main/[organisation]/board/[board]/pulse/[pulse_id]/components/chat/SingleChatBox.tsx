import { isEmpty, startCase } from "lodash";
import { Reply, Settings, ThumbsUp, Timer } from "lucide-react";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

//core
import AvatarComp from "@/components/core/AvatarComp";
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
import Threads from "../Threads/Threads";
import ChatActions from "./ChatActions";
import SaveAndCancelButton from "./SaveAndCancelButton";

//hooks
import useChat from "@/hooks/useChat";

//types
import { ChatType } from "@/types/chatTypes";
import { PulseType } from "@/types/pulseTypes";

// Extra
import { generatePictureFallback } from "@/utils/helperFunctions";
import { StateSetter } from "@/types/genericTypes";
import { SingleChatContext } from "@/hooks/useSingleChat";
import Divider from "@/components/core/Divider";
import useLoading from "@/hooks/useLoading";
import ChatInfo from "./ChatInfo";
import useWriteAI from "@/hooks/useWriteAI";

type SingleChatBoxProps = {
  chat: ChatType;
  pulse?: PulseType;
  setChats: StateSetter<ChatType[]>;
};

const SingleChatBox = ({
  chat: masterChat,
  setChats,
  pulse,
}: SingleChatBoxProps) => {
  //
  const [chat, setchat] = useState<ChatType>({} as ChatType);
  const [openNewChatBox, setOpenNewChatBox] = useState(false);

  const {
    isLoading,
    triggerLoading,
    isEditing,
    triggerEditing,
    isDeleting,
    isSaving,
    triggerDeleting,
    triggerSaving,
  } = useLoading({
    defaultLoading: true,
    defaultEditing: !isEmpty(masterChat.draft),
  });
  const { isWritting, writeWithAI } = useWriteAI();

  const { updateChatContent, updateChatDraft, deleteSingleChat } = useChat();

  useEffect(() => {
    setchat(masterChat);
    triggerLoading(false);
  }, [masterChat]);

  const handleWriteAI = useCallback(async () => {
    const data = await writeWithAI({
      pulseID: pulse?._id || "",
      prompt: chat.draft ? chat.draft : chat.content,
      setchat: setchat,
    });
    updateChatContent(data, masterChat._id);
  }, [pulse?._id, chat.draft, chat.content]);

  // save the chat content
  const onSaveClick = useCallback(async () => {
    triggerSaving(true);
    await updateChatContent(chat.content, masterChat._id);

    triggerEditing(false);
    triggerSaving(false);
  }, [chat, updateChatContent, masterChat._id]);

  // cancel the chat draft
  const onCancelClick = useCallback(() => {
    setchat((pc) => ({ ...pc, draft: "", content: masterChat.content }));
    triggerEditing(false);
  }, [masterChat.draft]);

  // Delete Chat
  const deleteChat = useCallback(
    async (_id: string) => {
      triggerDeleting(true);
      await deleteSingleChat(_id);
      setChats((ps) => {
        return ps.filter((c) => c._id !== _id);
      });
      triggerDeleting(false);
    },
    [deleteSingleChat]
  );

  const updateThreadCount = useCallback((state: "ADD" | "SUB") => {
    setchat((pc) => {
      const threadCount =
        state === "ADD" ? pc.threadCount + 1 : pc.threadCount - 1;
      return { ...pc, threadCount: threadCount };
    });
  }, []);

  return isLoading === true ? (
    <div className="w-full">
      <PulseChatSkeletonLoader onlyChat={true} />
    </div>
  ) : (
    <SingleChatContext.Provider
      value={{
        chat: chat,
        isEditing: isEditing,
        openNewChatBox,
        setOpenNewChatBox,
        updateThreadCount,
        pulse: pulse as PulseType,
      }}
    >
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
            <div className="chat-actions flex flex-row gap-3">
              <ChatInfo chat={masterChat} />
              <PopoverComp
                additional={{ content: { align: "end" } }}
                classNames={{
                  content: "bg-main-fg shadow-lg shadow-black w-fit",
                }}
                trigger={
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="p-0 opacity-80 hover:bg-transparent"
                  >
                    <Settings color="white" size={15} />
                  </Button>
                }
                content={
                  <ChatActions
                    isDeleting={isDeleting}
                    chat={chat}
                    deleteChat={deleteChat}
                    triggerEditing={triggerEditing}
                  />
                }
              />
            </div>
          </div>
          {isEditing === true ? (
            <Textarea
              disabled={isSaving}
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

        {isEditing === true && (
          <SaveAndCancelButton
            isWritting={isWritting}
            handleWriteAI={handleWriteAI}
            disabled={isSaving}
            loading={isSaving}
            onCancelClick={onCancelClick}
            onSaveClick={onSaveClick}
          />
        )}
        {isEditing === false && (
          <div
            className={cn(
              "h-fit flex flex-row border-transparent border-t-main-light border-2",

              "border-b-2 border-x-transparent border-main-light"
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
              onClick={() => setOpenNewChatBox(true)}
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
        {(chat.threadCount > 0 || openNewChatBox === true) && <Threads />}
      </div>
    </SingleChatContext.Provider>
  );
};

export default memo(SingleChatBox);
