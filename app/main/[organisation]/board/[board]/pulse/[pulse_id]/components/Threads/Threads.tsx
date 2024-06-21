import { ChatType } from "@/zstore";
import React from "react";

type ThreadsProps = {
  thread: ChatType[];
};
const Threads = ({ thread }: ThreadsProps) => {
  return <div>Threads</div>;
};

export default Threads;
