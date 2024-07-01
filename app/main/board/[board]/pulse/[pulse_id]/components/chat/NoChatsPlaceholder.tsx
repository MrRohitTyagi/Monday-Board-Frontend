import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import noCHats from "@/assets/noCHats.svg";
import LowOpacityText from "@/components/core/LowOpacityText";
type NoChatsPlaceholderProps = {};

const NoChatsPlaceholder = (props: NoChatsPlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex w-full h-full ",
        "flex-col gap-2 items-center",
        "px-16 select-none"
      )}
    >
      <Image
        src={noCHats}
        alt="NO CHATS"
        height={100}
        width={100}
        className=" h-48 w-52"
        unoptimized
      />
      <LowOpacityText className=" opacity-60 text-2xl text-center">
        No updates yet for this item
      </LowOpacityText>
      <LowOpacityText className=" opacity-60 text-md text-center">
        Be the first one to update about progress, mention someone or upload
        files to share with your team members
      </LowOpacityText>
    </div>
  );
};

export default NoChatsPlaceholder;
