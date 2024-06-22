"use client";
import React, { memo, useEffect, useState } from "react";

import AvatarComp from "@/components/core/AvatarComp";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadType } from "@/types/threadType";
import { Edit, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Loader from "@/components/core/Loader";
import Textrenderer from "@/components/core/Textrenderer";

type SingleThreadProps = {
  mainThread: ThreadType;
};
const SingleThread = ({ mainThread }: SingleThreadProps) => {
  console.log(
    `%c mainThread `,
    "color: pink;border:1px solid pink",
    mainThread
  );
  const [thread, setthread] = useState<ThreadType>({} as ThreadType);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setthread(mainThread);
    setIsLoading(false);
  }, [mainThread]);

  return isLoading === true ? (
    <Loader />
  ) : (
    <div className={cn("new-thread-cont", "flex flex-row gap-1", "p-3")}>
      {/* <div className="">
        <div className=""></div>
        <div className=""></div>
      </div>
      submitbuttons  */}

      <div className="new-thread-left w-10 shrink-0 py-2 items-end content-end">
        <AvatarComp src={thread.createdBy.picture} className="h-8 w-8" />
      </div>
      <div
        className={cn(
          "new-thread-right grow",
          "flex flex-col gap-1",
          "chat chat-start"
        )}
      >
        <div
          className={cn(
            "chat-bubble",
            "before:w-4",
            "relative",
            "p-3 rounded-xl  w-full",
            "thread-content-box bg-main-light ",
            "group"
          )}
        >
          <div
            className={cn(
              "transition-all duration-300",
              "group-hover:opacity-100",
              "absolute right-2 z-14",
              "top-0 flex flex-row",
              "thread-actions opacity-0"
            )}
          >
            <Button
              size={"sm"}
              variant={"ghost"}
              className={cn(
                "cursor-pointer border border-main-light",
                "p-2",
                " hover:bg-main-bg"
              )}
            >
              <Trash2 size={16} className="stroke-main-delete cursor-pointer" />
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              size={"sm"}
              className={cn(
                "cursor-pointer border border-main-light",
                "p-2",
                " hover:bg-main-bg"
              )}
              variant={"ghost"}
            >
              <Edit size={16} color="white" className=" cursor-pointer" />
            </Button>
          </div>

          <h1 className="text-highlighter text-sm opacity-80 w-fit">
            {thread.createdBy.username}
          </h1>
          {isEditing === true ? (
            <Textarea
              className="border border-highlighter"
              // handleCtrlEnter={handleCtrlEnter}
              dynamicHeight={true}
              value={thread.content}
              onChange={(e) => {
                setthread((pt) => ({ ...pt, content: e.target.value }));
              }}
            />
          ) : (
            <h1 className="opacity-80 text-sm">
              <Textrenderer str={thread.content} />
            </h1>
          )}
        </div>
        {isEditing === true && (
          <div
            className={cn(
              "new-thread-buttons",
              "flex flex-row gap-2 items-center justify-end"
            )}
          >
            <Button
              // onClick={() => {
              //   setOpenNewChatBox(false);
              // }}
              size={"sm"}
              className="flex flex-row gap-1"
            >
              <Trash2 size={12} color="white" />
              <h1>Cancel</h1>
            </Button>
            <Button
              // onClick={handleAddNewThread}
              size={"sm"}
              className="flex flex-row gap-1"
            >
              <Save size={12} color="white" />
              <h1>Save</h1>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SingleThread);
