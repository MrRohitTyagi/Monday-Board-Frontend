"use client";
import React, { memo, useEffect, useState } from "react";

import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { getThreads } from "@/gateways/thread-gateway";
import NewThread from "./NewThread";
import { ThreadType } from "@/types/threadType";
import useSingleChat from "@/hooks/useSingleChat";
import SingleThread from "./SingleThread";
import ThreadSkeletonLoader from "./ThreadSkeletonLoader";
import useLoading from "@/hooks/useLoading";

type ThreadsProps = {};

const Threads = ({}: ThreadsProps) => {
  //
  const { chat, openNewChatBox, setOpenNewChatBox } = useSingleChat();

  const [threads, setThreads] = useState<ThreadType[]>([]);
  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });

  useEffect(() => {
    async function init() {
      const threads = await getThreads(chat._id);
      // await waitfor();
      setThreads(threads);
      triggerLoading(false);
    }
    init();
  }, [chat._id]);

  return (
    <div>
      {chat.threadCount === 0 ? null : isLoading ? (
        <ThreadSkeletonLoader count={chat.threadCount} />
      ) : (
        threads.map((thread) => {
          return (
            <SingleThread
              key={thread._id + "THREEAD CONTAINER"}
              mainThread={thread}
              setThreads={setThreads}
            />
          );
        })
      )}
      
      {openNewChatBox === true && (
        <NewThread
          setThreads={setThreads}
          setOpenNewChatBox={setOpenNewChatBox}
        />
      )}
    </div>
  );
};

export default memo(Threads);
