"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { ChatType, PulseType } from "@/zstore";
import { getPulse } from "@/gateways/pulse-gateway";
import { cn } from "@/lib/utils";
import PulseChatSkeletonLoader from "./components/PulseChatSkeletonLoader";
import SingleChatBox from "./components/SingleChatBox";
import Space from "@/components/core/Space";
import { Textarea } from "@/components/ui/textarea";
import { getChats } from "@/gateways/chat-gateway";

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

  console.log(`%c chats `, "color: green;border:1px solid green", chats);
  console.log(
    `%c pulse `,
    "color: burlywood;border:2px solid burlywood",
    pulse
  );

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
              "chat-scroll-area",
              // "animate-chat-cont-scroll",
              "overflow-y-auto scrollbar-thin",
              "h-full p-4 pt-0 items-center",
              "flex flex-col gap-4"
            )}
          >
            <Space />
            <Textarea
              placeholder="Write an update ..."
              className={cn("max-w-[40rem] w-full", "h-fit shrink-0")}
            />
            {chats.map((chat, i) => {
              return (
                <SingleChatBox
                  key={chat._id + i}
                  chat={chat}
                  pulse={pulse}
                  setChats={setChats}
                  setPulse={setPulse}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PulseChatMain;
