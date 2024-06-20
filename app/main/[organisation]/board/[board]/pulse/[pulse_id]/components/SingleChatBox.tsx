import Divider from "@/components/core/Divider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reply, ThumbsUp } from "lucide-react";
import React from "react";
type SingleChatBoxProps = {};
const SingleChatBox = (props: SingleChatBoxProps) => {
  return (
    <div
      className={cn(
        "max-w-[40rem] w-full",
        "flex flex-col shrink-0 animate-fadeIn",
        "single-chat-cont rounded-lg border-2 border-main-light"
      )}
    >
      <div className="message-container h-40 p-4 flex flex-row  gap-4">
        person
      </div>
      <div className="h-fit flex flex-row border-transparent border-t-main-light border-2">
        <Button
          variant={"ghost"}
          className={cn(
            "overflow-hidden",
            "grow gap-3 flex flex-row items-center m-1"
          )}
        >
          <ThumbsUp color="white" size={16} />
          <h1 className="text-base">Like</h1>
        </Button>

        <Divider horizontal />
        <Button
          variant={"ghost"}
          className={cn(
            "overflow-hidden",
            "grow gap-3 flex flex-row items-center m-1"
          )}
        >
          <Reply color="white" size={16} />
          <h1 className="text-base">Reply</h1>
        </Button>
      </div>
    </div>
  );
};

export default SingleChatBox;
