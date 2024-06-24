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

type NewChatCompProps = { setChats: StateSetter<ChatType[]>; pulse: PulseType };

const NewChatComp = ({ setChats, pulse }: NewChatCompProps) => {
  const {
    saveToLocal,
    content = "",
    haveDraft,
    deleteLocal,
  } = useLoacalStorageChat(pulse._id);

  //states
  const [isEditing, setIsEditing] = useState(haveDraft);
  const [text, settext] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  //Hooks
  const params = useParams();
  const { createNewChat } = useChat();
  const { notificationChannel } = useRealtimeChannels();

  useEffect(() => {
    settext(content);
  }, []);

  const handleCreateNew = useCallback(async () => {
    setIsSaving(true);
    const payload = {
      content: content,
      pulseId: pulse._id,
      boardId: params?.board,
    };

    const newChat = await createNewChat(payload);

    pulse.assigned.forEach((assignedUserId) => {
      notificationChannel.publish(assignedUserId, { type: "NEW_CHAT" });
    });

    setChats((ps) => [newChat, ...ps]);
    deleteLocal();
    setIsEditing(false);
    settext("");
    setIsSaving(false);
  }, [pulse._id, createNewChat, content, params]);

  const handleKeyDown = useCallback(() => {
    handleCreateNew();
  }, [handleCreateNew]);

  return (
    <>
      <OutsideClickBox
        onOutsideClick={() => {
          setIsEditing(false);
        }}
        className={cn(
          "max-w-[40rem] w-full shrink-0",
          "h-fit shrink-0 transition-all duration-300",
          "border-main-light border-2 rounded-lg"
        )}
      >
        {isEditing ? (
          <div className=" p-2">
            <Textarea
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
            />
          </div>
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

        {isEditing === true && (
          <SaveAndCancelButton
            loading={isSaving}
            disabled={isSaving}
            onCancelClick={() => {
              settext("");
              setIsEditing(false);
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
