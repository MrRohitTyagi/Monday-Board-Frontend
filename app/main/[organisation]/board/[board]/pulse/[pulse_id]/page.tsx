"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { PulseType } from "@/zstore";
import { StateSetter } from "@/types";
import { getPulse } from "@/gateways/pulse-gateway";
import { useRouter } from "next/navigation";
import Loader from "@/components/core/Loader";
import { cn, waitfor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import PulseChatSkeletonLoader from "./components/PulseChatSkeletonLoader";
import SingleChatBox from "./components/SingleChatBox";
import Space from "@/components/core/Space";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PulseChatMainType = {
  params: {
    pulse_id: string;
  };
};

const PulseChatMain = ({ params }: PulseChatMainType) => {
  const [pulse, setPulse] = useState<PulseType>({} as PulseType);
  const [isLoading, setisLoading] = useState(true);

  const pulse_id = params.pulse_id;

  useEffect(() => {
    async function init() {
      const pulse = await getPulse(pulse_id);
      await waitfor();
      setPulse(pulse);
      setisLoading(false);
    }
    init();
  }, []);

  console.log(`%c {pulse} `, "color: red;border:2px dotted red", {
    pulse,
    isLoading,
    params,
  });

  return (
    <div className="w-full h-full bg-main-fg p-3 flex flex-col">
      {isLoading ? (
        <PulseChatSkeletonLoader />
      ) : (
        <>
          <Header pulse={pulse} setPulse={setPulse} />
          <div
            className={cn(
              "animate-chat-cont-scroll",
              "h-full p-6 pt-0 items-center",
              "main-chats-cont flex flex-col gap-4"
            )}
          >
            <Space />
            <Textarea
              // maxHeight={false}
              placeholder="Write an update ..."
              className={cn("max-w-[40rem] w-full", "h-fit shrink-0")}
            />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
          </div>
        </>
      )}
    </div>
  );
};

export default PulseChatMain;
