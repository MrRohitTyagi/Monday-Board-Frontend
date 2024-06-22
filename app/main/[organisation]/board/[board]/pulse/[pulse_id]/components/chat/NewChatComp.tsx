import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuth } from "@/zstore";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import SaveAndCancelButton from "./SaveAndCancelButton";
import useLoacalStorageChat from "@/hooks/useLoacalStorageChat";
import useChat from "@/hooks/useChat";
import Space from "@/components/core/Space";
import { ChatType } from "@/types/chatTypes";
import { PulseType } from "@/types/pulseTypes";
import { StateSetter } from "@/types/genericTypes";
import OutsideClickBox from "@/components/core/OutsideClickBox";

type NewChatCompProps = { setChats: StateSetter<ChatType[]>; pulse: PulseType };

const NewChatComp = ({ setChats, pulse }: NewChatCompProps) => {
  const {
    saveToLocal,
    content = "",
    haveDraft,
    deleteLocal,
  } = useLoacalStorageChat(pulse._id);

  const {
    user: { _id: user_id },
  } = useAuth();

  const [isEditing, setIsEditing] = useState(haveDraft);
  const { createNewChat } = useChat();
  const [text, settext] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    settext(content);
  }, []);

  const handleCreateNew = useCallback(async () => {
    setIsSaving(true);
    const payload = {
      content: content,
      createdBy: user_id,
      pulseId: pulse._id,
    };

    const newChat = await createNewChat(payload);
    setChats((ps) => [newChat, ...ps]);
    deleteLocal();
    setIsEditing(false);
    settext("");
    setIsSaving(false);
  }, [user_id, pulse._id, createNewChat, content]);

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
                "h-fit shrink-0",
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
        {(haveDraft === true || isEditing === true) && (
          <>
            <Space />
            <div className="w-row justify-end px-2">
              <h2 className="text-sm opacity-80">Draft</h2>
            </div>
          </>
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
