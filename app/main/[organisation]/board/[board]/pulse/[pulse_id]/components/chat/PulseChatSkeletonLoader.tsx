import React, { memo } from "react";

import Divider from "@/components/core/Divider";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type PulseChatSkeletonLoaderProps = { onlyChat?: boolean };

const PulseChatSkeletonLoader = ({
  onlyChat = false,
}: PulseChatSkeletonLoaderProps) => {
  return (
    <div className={cn("flex flex-col gap-3 animate-pulse", "items-center p-4")}>
      {onlyChat === false && (
        <>
          <div className="flex flex-row gap-3 w-full px-4 pt-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-10" />
          </div>
          <Divider />
          <Textarea
            className="bg-main-bg animate-pulse-layer max-w-[40rem] w-full"
            disabled={true}
            placeholder="Write an update..."
          />
        </>
      )}
      {(onlyChat === true ? [1] : [1, 2]).map((e) => (
        <div
          key={"loader+i" + e}
          className={cn(
            "max-w-[40rem] w-full",
            "flex flex-col mt-4",
            "single-chat-cont rounded-lg border-2 border-main-bg"
          )}
        >
          <div className="h-40 p-4 flex flex-row  gap-4">
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="w-1/2 h-6" />
          </div>
          <div className="h-9 flex flex-row border-transparent border-t-main-bg border-2">
            <Skeleton className="grow m-1 mx-4" />

            <Divider horizontal />
            <Skeleton className="grow m-1 mx-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(PulseChatSkeletonLoader);
