import React from "react";

import Divider from "@/components/core/Divider";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type PulseChatSkeletonLoaderProps = {};
const PulseChatSkeletonLoader = ({}: PulseChatSkeletonLoaderProps) => {
  return (
    <div className={cn("flex flex-col gap-3 animate-pulse", "items-center")}>
      <div className="flex flex-row gap-3 w-full">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-10" />
        <Skeleton className="h-8 w-10" />
      </div>
      <Divider />
      <Textarea
        className="bg-main-light animate-pulse-layer max-w-[40rem] w-full"
        disabled={true}
        placeholder="Write an update..."
      />
      {[1, 2].map((e) => (
        <div
          key={"loader+i" + e}
          className={cn(
            "max-w-[40rem] w-full",
            "flex flex-col mt-4",
            "single-chat-cont rounded-lg border-2 border-main-light"
          )}
        >
          <div className="h-40 p-4 flex flex-row  gap-4">
            <Skeleton className="rounded-full h-10 w-10" />
            <Skeleton className="w-1/2 h-6" />
          </div>
          <div className="h-9 flex flex-row border-transparent border-t-main-light border-2">
            <Skeleton className="grow m-1 mx-4" />

            <Divider horizontal />
            <Skeleton className="grow m-1 mx-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PulseChatSkeletonLoader;
