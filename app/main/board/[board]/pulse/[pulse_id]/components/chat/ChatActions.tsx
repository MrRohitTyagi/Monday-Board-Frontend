"use client";

import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import { ChatType } from "@/types/chatTypes";
import { useAuth } from "@/zstore";
import { Edit, Pin, PinIcon, Trash2 } from "lucide-react";
import React, { memo } from "react";

type ChatActionsProps = {
  triggerEditing: (e: boolean) => void;
  deleteChat: (e: string) => void;
  chat: ChatType;
  isDeleting?: boolean;
};

const ChatActions = ({
  triggerEditing,
  deleteChat,
  chat,
  isDeleting,
}: ChatActionsProps) => {
  const {
    user: { _id: user_id },
  } = useAuth();

  return (
    <div className="flex flex-col gap-3">
      <Button
      disabled
        // onClick={() => deleteChat(chat._id)}
        className="w-row gap-3 justify-start opacity-80"
        size={"sm"}
      >
        <PinIcon color="white" size={18} />
        <h1>Pin Item</h1>
      </Button>

      {user_id === chat.createdBy._id && (
        <Button
          onClick={() => deleteChat(chat._id)}
          className="w-row gap-3 justify-start opacity-80"
          size={"sm"}
        >
          {isDeleting === true ? (
            <Loader />
          ) : (
            <Trash2 color="white" size={18} />
          )}
          {isDeleting === true ? <h2>Deleting...</h2> : <h1>Delete update</h1>}
        </Button>
      )}

      {/* // */}
      {user_id === chat.createdBy._id && (
        <Button
          className="w-row gap-3 justify-start opacity-80"
          size={"sm"}
          onClick={() => triggerEditing(true)}
        >
          <Edit color="white" size={18} />
          <h1>Edit update</h1>
        </Button>
      )}
    </div>
  );
};

export default memo(ChatActions);
