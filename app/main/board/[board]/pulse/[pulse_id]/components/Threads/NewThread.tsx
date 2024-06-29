import AvatarComp from "@/components/core/AvatarComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/gateways/thread-gateway";
import useRealtimeChannels from "@/hooks/useRealtimeChannels";
import useSingleChat from "@/hooks/useSingleChat";
import useWriteAI from "@/hooks/useWriteAI";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types/genericTypes";
import { ThreadType } from "@/types/threadType";
import { useAuth } from "@/zstore";
import { Bot, Save, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
import ThreadsButtons from "./ThreadsButtons";
import useLoading from "@/hooks/useLoading";

type NewThreadProps = {
  setThreads: StateSetter<ThreadType[]>;
  setOpenNewChatBox: StateSetter<boolean>;
};

const NewThread = ({ setThreads, setOpenNewChatBox }: NewThreadProps) => {
  //
  const [value, setvalue] = useState("");

  const { user } = useAuth();
  const { isSaving, triggerSaving } = useLoading({});
  const { chat, updateThreadCount, pulse } = useSingleChat();
  const { notificationChannel } = useRealtimeChannels();
  const params = useParams();
  const { isWritting, writeWithAI, len } = useWriteAI();

  const handleAddNewThread = useCallback(async () => {
    triggerSaving(true);
    const payload = {
      content: value,
      chatId: chat._id,
      pulseId: params?.pulse_id,
      boardId: params?.board,
    };
    const newThread = await createThread(payload);

    pulse.assigned.forEach((assignedUserId) => {
      notificationChannel.publish(assignedUserId, { type: "NEW_THREAD" });
    });

    setThreads((pt) => [...pt, newThread]);
    setOpenNewChatBox(false);
    updateThreadCount("ADD");
    triggerSaving(false);
  }, [user._id, chat._id, value, params]);

  const handleCtrlEnter = useCallback(() => {
    handleAddNewThread();
  }, [handleAddNewThread]);

  const handleWriteAI = useCallback(async () => {
    await writeWithAI({
      prompt: value,
      onGenerate: (t) => {
        setvalue(t);
      },
    });
  }, [value, writeWithAI]);

  return (
    <div className={cn("new-thread-cont", "flex flex-row gap-1", "p-3")}>
      <div className="new-thread-left w-10 shrink-0">
        <AvatarComp src={user.picture} className="h-8 w-8" />
      </div>
      <div className={cn("new-thread-right grow", "flex flex-col gap-1")}>
        <div
          className={cn(
            "p-3 rounded-xl",
            "thread-content-box bg-main-bg",
            "border-2 border-main-bg"
          )}
        >
          <h1 className="text-highlighter text-sm opacity-80">
            {user.username}
          </h1>
          <Textarea
            ref={(e) => {
              e?.focus();
            }}
            className="border border-highlighter"
            handleCtrlEnter={handleCtrlEnter}
            dynamicHeight={true}
            value={value}
            onChange={(e) => {
              setvalue(e.target.value);
            }}
          />
        </div>
        <ThreadsButtons
          isSaving={isSaving}
          handleWriteAI={handleWriteAI}
          isWritting={isWritting}
          onCancelClick={() => {
            setOpenNewChatBox(false);
          }}
          onSaveClick={handleAddNewThread}
        />
      </div>
    </div>
  );
};

export default memo(NewThread);
