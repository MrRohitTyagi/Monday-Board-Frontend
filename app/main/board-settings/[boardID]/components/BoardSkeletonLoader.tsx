import Space from "@/components/core/Space";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
type BoardSkeletonLoaderProps = {};
const BoardSkeletonLoader = (props: BoardSkeletonLoaderProps) => {
  return (
    <div className="board-settings-conatiner p-4 pr-8">
      <h1 className="text-2xl font-bold">
        <Skeleton className="h-6 w-52" />
      </h1>

      <div className="divider m-0"></div>
      <Space h={2} />
      <div className="flex flex-col gap-4">
        {/* // Title  */}
        <Skeleton className="h-6 w-9/12" />
        <Space h={2} />

        {/* // Description  */}
        {/* // */}
        <Skeleton className="h-6 w-9/12" />
        <Space h={2} />

        {/* // Picture  */}
        <Skeleton className="h-6 w-9/12" />

        <Space h={2} />
        {/* // Priority */}
        <div className="flex felx-row gap-2">
          <Skeleton className="h-32 w-44" />
          <Skeleton className="h-32 w-44" />
        </div>
        <Space h={2} />

        {/* Statuses */}
        <div className="flex felx-row gap-2">
          <Skeleton className="h-32 w-44" />
          <Skeleton className="h-32 w-44" />
        </div>
        <Space h={2} />

        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

export default BoardSkeletonLoader;
