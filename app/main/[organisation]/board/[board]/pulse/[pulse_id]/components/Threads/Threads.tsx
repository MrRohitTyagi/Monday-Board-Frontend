import { ChatType } from "@/zstore";
import React, { memo } from "react";

type ThreadsProps = {
  thread: ChatType[];
};
const Threads = ({ thread }: ThreadsProps) => {
  return <div>Threads</div>;
};

export default memo(Threads);
