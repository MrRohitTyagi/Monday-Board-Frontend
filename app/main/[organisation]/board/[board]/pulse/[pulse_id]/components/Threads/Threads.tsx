"use client";
import React, { memo, useEffect, useState } from "react";

import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { getThreads } from "@/gateways/thread-gateway";
import { cn, waitfor } from "@/lib/utils";
import { Reply, ThumbsUp } from "lucide-react";
import NewThread from "./NewThread";
import { ThreadType } from "@/types/threadType";
import useSingleChat from "@/hooks/useSingleChat";
import SingleThread from "./SingleThread";

type ThreadsProps = {};

const Threads = ({}: ThreadsProps) => {
  //
  const { chat, isEditing } = useSingleChat();

  const [openNewChatBox, setOpenNewChatBox] = useState(false);
  const [threads, setThreads] = useState<ThreadType[]>([]);

  useEffect(() => {
    async function init() {
      const threads = await getThreads(chat._id);
      await waitfor(10000);
      setThreads(threads);
    }
    init();
  }, [chat._id]);

  return (
    <div>
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
      {openNewChatBox === true && (
        <NewThread
          setThreads={setThreads}
          setOpenNewChatBox={setOpenNewChatBox}
        />
      )}
      {threads.map((thread) => {
        return (
          <SingleThread
            key={thread._id}
            mainThread={thread}
            setThreads={setThreads}
          />
        );
      })}
    </div>
  );
};

export default memo(Threads);
