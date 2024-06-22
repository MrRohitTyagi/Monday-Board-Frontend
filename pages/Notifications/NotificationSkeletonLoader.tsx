import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

type NotificationSkeletonLoaderProps = {};
const NotificationSkeletonLoader = (props: NotificationSkeletonLoaderProps) => {
  //
  return (
    <div className=" flex flex-col gap-3">
      <div className="header w-full flex flex-row gap-3 justify-between">
        <Skeleton className="w-full h-7 grow items-center" />
        <div className="w-16 h-full">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
        </div>
      </div>
      {[1, 2, 3, 4].map((e) => {
        return (
          <Button
            key={e}
            variant={"ghost"}
            className={cn(
              "notification-card-cont transition-all animate-fadeIn",
              "min-h-16 h-fit w-full rounded-lg",
              "flex flex-row py-4 px-3",
              "shrink-0"
            )}
          >
            <div className="noti-profile flex flex-row justify-center min-w-20 max-w-20 shrink-0">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>

            <div className="noti-content flex flex-col gap-2 grow shrink overflow-hidden">
              <div className="noti-title flex flex-row gap-2">
                <Skeleton className="w-full h-4" />
              </div>

              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default NotificationSkeletonLoader;
