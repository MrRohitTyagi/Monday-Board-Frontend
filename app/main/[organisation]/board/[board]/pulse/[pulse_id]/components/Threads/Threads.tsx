"use client";

import { getThreads } from "@/gateways/thread-gateway";
import { ChatType } from "@/types/chatTypes";
import React, { memo, useEffect } from "react";

type ThreadsProps = {
  chat: ChatType;
};

const Threads = ({ chat }: ThreadsProps) => {
  useEffect(() => {
    async function init() {
      const threads = await getThreads(chat._id);
      console.log(
        `%c threads `,
        "color: green;border:1px solid green",
        threads
      );
    }
    init();
  }, [chat._id]);
  return <div>Threads</div>;
};

export default memo(Threads);
