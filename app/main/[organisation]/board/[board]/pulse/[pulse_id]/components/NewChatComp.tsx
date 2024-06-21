import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types";
import { ChatType, PulseType, useAuth } from "@/zstore";
import React, { useCallback, useEffect, useState } from "react";
import SaveAndCancelButton from "./SaveAndCancelButton";
import useLoacalStorageChat from "@/hooks/useLoacalStorageChat";
import useChat from "@/hooks/useChat";
import Space from "@/components/core/Space";

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
  const { createNewChat } = useChat({});
  const [text, settext] = useState(content);

  useEffect(() => {
    settext(content);
  }, []);

  const handleCreateNew = useCallback(async () => {
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
  }, [user_id, pulse._id, createNewChat, content]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {},
    []
  );

  return (
    <div
      className={cn(
        "max-w-[40rem] w-full",
        "h-fit shrink-0 animate-fadeIn",
        "border-main-light border-2 rounded-lg"
      )}
    >
      {isEditing ? (
        <div className=" p-2 animate-fadeIn">
          <Textarea
            onKeyDown={handleKeyDown}
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
              // " border-highlighter border"
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
          onCancelClick={() => {
            settext("");
            setIsEditing(false);
            deleteLocal();
          }}
          onSaveClick={handleCreateNew}
        />
      )}
    </div>
  );
};

export default NewChatComp;
