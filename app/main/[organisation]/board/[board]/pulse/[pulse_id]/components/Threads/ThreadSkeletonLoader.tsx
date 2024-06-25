import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React, { memo } from "react";

type ThreadSkeletonLoaderProps = {
  count: number;
};
const ThreadSkeletonLoader = ({ count = 3 }: ThreadSkeletonLoaderProps) => {
  const threadsCount = Array(count).fill(1);

  return (
    <div className={cn("new-thread-cont", "flex flex-col gap-1", "p-3")}>
      {threadsCount.map((_, i) => {
        return (
          <div
            className="flex flex-row gap-2 w-full"
            key={i + "THREAD SKELETON LOADER"}
          >
            <div className="new-thread-left w-10 shrink-0 py-2 items-end content-end">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            <div
              className={cn(
                "new-thread-right chat chat-start",
                "flex flex-col gap-1 grow  w-full"
              )}
            >
              <div
                className={cn(
                  "thread-content-box chat-bubble",
                  " bg-main-bg p-3 rounded-xl w-full before:w-4 relative",
                  "group max-w-full",

                  "animate-pulse skeleton"
                )}
              >
                <h1 className="text-highlighter text-sm opacity-80 w-fit">
                  <Skeleton className="h-4 w-10" />
                </h1>

                <h1 className="opacity-80 text-sm">
                  <Skeleton className="h-12 w-full" />
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ThreadSkeletonLoader);
