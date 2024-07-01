"use client";

import React, { memo, useEffect, useState } from "react";
import Header from "./components/chat/Header";
import { getPulse } from "@/gateways/pulse-gateway";
import { cn } from "@/lib/utils";
import PulseChatSkeletonLoader from "./components/chat/PulseChatSkeletonLoader";
import SingleChatBox from "./components/chat/SingleChatBox";
import Space from "@/components/core/Space";
import { getChats } from "@/gateways/chat-gateway";
import NewChatComp from "./components/chat/NewChatComp";
import { PulseType } from "@/types/pulseTypes";
import { ChatType } from "@/types/chatTypes";
import NoChatsPlaceholder from "./components/chat/NoChatsPlaceholder";

type PulseChatMainType = {
  params: {
    pulse_id: string;
  };
};

const PulseChatMain = ({ params }: PulseChatMainType) => {
  const [pulse, setPulse] = useState<PulseType>({} as PulseType);
  const [chats, setChats] = useState<ChatType[]>([] as ChatType[]);
  const [isLoading, setisLoading] = useState(true);

  const pulse_id = params.pulse_id;

  useEffect(() => {
    async function init() {
      const [pulse, chats] = await Promise.all([
        getPulse(pulse_id),
        getChats(pulse_id),
      ]);
      // await waitfor();
      setPulse(pulse);
      setChats(chats);
      setisLoading(false);
    }
    init();
  }, []);

  return (
    <div
      className={cn(
        "main-chats-cont",
        "w-full h-full bg-main-fg flex flex-col"
      )}
    >
      {isLoading ? (
        <PulseChatSkeletonLoader />
      ) : (
        <>
          <Header pulse={pulse} setPulse={setPulse} />
          <div
            className={cn(
              "chat-scroll-area animate-fadeIn",
              // "animate-chat-cont-scroll",
              "overflow-y-auto scrollbar-thin",
              "h-full p-4 pt-0 items-center",
              "flex flex-col gap-4"
            )}
          >
            <Space />
            <NewChatComp setChats={setChats} pulse={pulse} />
            {chats.length === 0 ? (
              <NoChatsPlaceholder />
            ) : (
              chats.map((chat, i) => {
                return (
                  <SingleChatBox
                    key={chat._id + "chat"}
                    chat={chat}
                    pulse={pulse}
                    setChats={setChats}
                    // setPulse={setPulse}
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(PulseChatMain);
