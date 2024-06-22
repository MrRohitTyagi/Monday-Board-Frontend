import React from "react";

import Divider from "@/components/core/Divider";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Settings2, Trash2, X } from "lucide-react";

type NotificationHeaderProps = {
  handleLayerClose: () => void;
  handleMarkAllAsRead: () => void;
  handleDeleteAll: () => void;
};

const NotificationHeader = ({
  handleLayerClose,
  handleDeleteAll,
  handleMarkAllAsRead,
}: NotificationHeaderProps) => {
  return (
    <div
      className={cn(
        "animate-chat-cont-heading",
        "flex flex-col shrink-0 animate-fadeIn"
      )}
    >
      <div
        className={cn("header flex flex-row justify-between items-start px-4")}
      >
        <h1 className={cn("", "text-lg overflow-hidden text-ellipsis mt-1")}>
          Notifications
        </h1>
        {/* // settings  */}
        <div className="pulse-chat-action-items flex flex-row">
          <PopoverComp
            additional={{ content: { align: "end" } }}
            classNames={{ content: "bg-main-bg w-fit p-3" }}
            content={
              <div className=" flex flex-col gap-2 items-center">
                <Button
                  onClick={handleMarkAllAsRead}
                  className="w-row w-full text-start items-start justify-start gap-3"
                >
                  <CheckCircle />
                  <h1>Mark all are read</h1>
                </Button>
                <Button
                  onClick={handleDeleteAll}
                  className="w-row w-full text-start items-start justify-start gap-3"
                >
                  <Trash2 />
                  <h1>Delete All</h1>
                </Button>
              </div>
            }
            trigger={
              <Button variant={"ghost"} className="py-0 px-2">
                <Settings2 size={20} />
              </Button>
            }
          />
          {/* CLOSE BUTTON */}
          <Button
            variant={"ghost"}
            onClick={handleLayerClose}
            className="py-0 px-2"
          >
            <X />
          </Button>
        </div>
      </div>
      <Divider className="h-2" />
    </div>
  );
};

export default NotificationHeader;
