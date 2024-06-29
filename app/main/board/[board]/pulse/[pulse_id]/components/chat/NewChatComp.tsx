import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import SaveAndCancelButton from "./SaveAndCancelButton";
import useLoacalStorageChat from "@/hooks/useLoacalStorageChat";
import useChat from "@/hooks/useChat";
import { ChatType } from "@/types/chatTypes";
import { PulseType } from "@/types/pulseTypes";
import { StateSetter } from "@/types/genericTypes";
import OutsideClickBox from "@/components/core/OutsideClickBox";
import { useParams } from "next/navigation";
import useRealtimeChannels from "@/hooks/useRealtimeChannels";
import useLoading from "@/hooks/useLoading";
import useWriteAI from "@/hooks/useWriteAI";
import HTMLEditor from "@/components/core/HTMLEditor";
import { convert } from "html-to-text";
import { useAuth } from "@/zstore";

type NewChatCompProps = { setChats: StateSetter<ChatType[]>; pulse: PulseType };

const NewChatComp = ({ setChats, pulse }: NewChatCompProps) => {
  const {
    saveToLocal,
    content = "",
    haveDraft,
    deleteLocal,
  } = useLoacalStorageChat(pulse._id);
  const { user } = useAuth();
  const mentionRef = useRef([]);

  const [text, settext] = useState(content);

  const { isSaving, isEditing, triggerSaving, triggerEditing } = useLoading({
    defaultEditing: haveDraft,
  });

  //Hooks
  const params = useParams();
  const { createNewChat } = useChat();
  const { notificationChannel } = useRealtimeChannels();
  const { isWritting, writeWithAI, len } = useWriteAI();

  useEffect(() => {
    settext(content);
  }, []);

  const handleCreateNew = useCallback(async () => {
    triggerSaving(true);
    const payload = {
      content: text,
      pulseId: pulse._id,
      boardId: params?.board,
    };

    const newChat = await createNewChat(payload);

    pulse.assigned.forEach((assignedUserId) => {
      if (assignedUserId === user._id) return;
      notificationChannel.publish(assignedUserId, { type: "NEW_CHAT" });
    });

    setChats((ps) => [newChat, ...ps]);
    deleteLocal();
    triggerEditing(false);
    settext("");
    triggerSaving(false);
  }, [pulse._id, createNewChat, text, params]);

  const handleWriteAI = useCallback(async () => {
    const cleanContent = convert(text);
    await writeWithAI({
      prompt: cleanContent,
      onGenerate: (t) => {
        settext(t);
      },
    });
  }, [text, writeWithAI]);

  // const handleKeyDown = useCallback(() => {
  //   handleCreateNew();
  // }, [handleCreateNew]);

  return (
    <>
      <OutsideClickBox
        onOutsideClick={() => {
          // triggerEditing(false);
        }}
        className={cn(
          "max-w-[40rem] w-full shrink-0",
          "h-fit shrink-0 transition-all duration-300",
          "border-main-bg border-2 rounded-lg"
        )}
      >
        {isEditing ? (
          <div className=" animate-fadeIn">
            <HTMLEditor
              key={"new-chat" + String(isWritting) + len}
              initialContent={text}
              onContentChange={(e, mentions) => {
                mentionRef.current = mentions;
                settext(e);
                saveToLocal(e);
              }}
            />
            {/* <Textarea
              dynamicHeight={true}
              disabled={isSaving}
              handleCtrlEnter={handleKeyDown}
              ref={(e) => {
                e?.focus();
              }}
              value={text}
              onChange={(e) => {
                settext(e.target.value);
                saveToLocal(e.target.value);
              }}
              placeholder="Write an update ..."
              className={cn(
                "w-full opacity-80",
                "shrink-0",
                "border-highlighter border"
              )}
            /> */}
          </div>
        ) : (
          <Input
            onClick={() => triggerEditing(true)}
            className={cn(
              "bg-transparent  border-none"
              // "border-highlighter border"
            )}
            placeholder="Write an update..."
          />
        )}

        {isEditing === true && (
          <SaveAndCancelButton
            handleWriteAI={handleWriteAI}
            isWritting={isWritting}
            loading={isSaving}
            disabled={isSaving}
            onCancelClick={() => {
              settext("");
              triggerEditing(false);
              deleteLocal();
            }}
            onSaveClick={handleCreateNew}
          />
        )}
      </OutsideClickBox>
    </>
  );
};

export default memo(NewChatComp);
