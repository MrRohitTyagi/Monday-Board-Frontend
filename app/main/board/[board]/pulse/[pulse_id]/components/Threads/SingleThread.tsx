"use client";
import React, { memo, useCallback, useEffect, useState } from "react";

import AvatarComp from "@/components/core/AvatarComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadType } from "@/types/threadType";
import { Bot, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "@/components/core/Loader";
import Textrenderer from "@/components/core/Textrenderer";
import { deleteThread, updateThread } from "@/gateways/thread-gateway";
import useLoading from "@/hooks/useLoading";
import AsyncButton from "@/components/core/AsyncButton";
import { StateSetter } from "@/types/genericTypes";
import ThreadActions from "./ThreadActions";
import useSingleChat from "@/hooks/useSingleChat";
import ThreadInfo from "./ThreadInfo";
import Space from "@/components/core/Space";
import { useAuth } from "@/zstore";
import useWriteAI from "@/hooks/useWriteAI";
import ThreadsButtons from "./ThreadsButtons";

type SingleThreadProps = {
  mainThread: ThreadType;
  setThreads: StateSetter<ThreadType[]>;
};
const SingleThread = ({ mainThread, setThreads }: SingleThreadProps) => {
  const [thread, setthread] = useState<ThreadType>({} as ThreadType);
  const { updateThreadCount } = useSingleChat();
  const { user } = useAuth();
  const { isWritting, writeWithAI, len } = useWriteAI();

  const {
    isLoading,
    isEditing,
    isSaving,
    isDeleting,
    triggerLoading,
    triggerEditing,
    triggerDeleting,
    triggerSaving,
  } = useLoading({ defaultLoading: true });

  useEffect(() => {
    setthread(mainThread);
    triggerLoading(false);
  }, [mainThread, triggerLoading]);

  const handleThreadSave = useCallback(async () => {
    triggerSaving(true);
    const payload = { _id: thread._id, content: thread.content };
    const updatedThread = await updateThread(payload);

    setthread(updatedThread);
    triggerSaving(false);
    triggerEditing(false);
  }, [thread._id, thread.content, triggerSaving]);

  const handleDeleteThread = useCallback(async () => {
    triggerDeleting(true);
    await deleteThread(mainThread._id);
    setThreads((pts) => {
      return pts.filter((t) => t._id !== mainThread._id);
    });
    triggerDeleting(false);
    updateThreadCount("SUB");
  }, [mainThread._id]);

  const handleWriteAI = useCallback(async () => {
    await writeWithAI({
      prompt: thread.content,
      onGenerate: (t) => {
        setthread((pt) => ({ ...pt, content: t }));
      },
    });
  }, [thread.content, writeWithAI]);

  return isLoading === true ? (
    <Loader />
  ) : (
    <div
      className={cn(
        "new-thread-cont",
        "flex flex-col gap-1",
        "p-3 animate-fadeIn"
      )}
    >
      <div className="flex flex-row gap-2 w-full">
        <div className="new-thread-left w-10 shrink-0 py-2 items-start justify-end flex flex-col">
          <AvatarComp src={thread.createdBy.picture} className="h-8 w-8" />
          <Space h={4} />
        </div>

        <div
          className={cn(
            "new-thread-right chat chat-start",
            "flex flex-col grow  w-full gap-1"
          )}
        >
          <h1 className="text-xs"> {thread.createdBy.username}</h1>
          <div
            className={cn(
              "thread-content-box chat-bubble",
              " bg-main-bg p-3 rounded-xl w-full before:w-4 relative",
              "group max-w-full min-h-16",
              (isDeleting === true || isSaving === true) &&
                "animate-pulse skeleton"
            )}
          >
            {isEditing === false && thread.createdBy._id === user._id && (
              <ThreadActions
                handleDeleteThread={handleDeleteThread}
                isDeleting={isDeleting}
                isEditing={isEditing}
                triggerEditing={triggerEditing}
              />
            )}

            {isEditing === true || isSaving === true ? (
              <Textarea
                disabled={isSaving}
                className="border border-highlighter"
                handleCtrlEnter={handleThreadSave}
                dynamicHeight={true}
                value={thread.content}
                onChange={(e) => {
                  setthread((pt) => ({ ...pt, content: e.target.value }));
                }}
              />
            ) : (
              <h1 className="opacity-80 text-sm">
                <Textrenderer str={thread.content} />
              </h1>
            )}
          </div>

          <ThreadInfo thread={thread} />
        </div>
      </div>

      {/* submitbuttons  */}
      {isEditing === true && (
        <ThreadsButtons
          isSaving={isSaving}
          handleWriteAI={handleWriteAI}
          isWritting={isWritting}
          onCancelClick={() => {
            setthread((pt) => ({ ...pt, content: mainThread.content }));
            triggerEditing(false);
          }}
          onSaveClick={handleThreadSave}
        />
      )}
    </div>
  );
};

export default memo(SingleThread);
