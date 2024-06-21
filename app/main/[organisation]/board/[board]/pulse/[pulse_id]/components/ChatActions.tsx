import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import { StateSetter } from "@/types";
import { ChatType, useAuth } from "@/zstore";
import { Edit, Pin, Trash2 } from "lucide-react";
import React from "react";

type ChatActionsProps = {
  setIsEditing: StateSetter<boolean>;
  deleteChat: (e: string) => void;
  chat: ChatType;
  isDeleting?: boolean;
};

const ChatActions = ({
  setIsEditing,
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
        onClick={() => deleteChat(chat._id)}
        className="w-row gap-3 justify-start opacity-80"
        size={"sm"}
      >
        {isDeleting === true ? <Loader /> : <Trash2 color="white" size={18} />}
        {isDeleting === true ? <h2>Deleting...</h2> : <h1>Delete update</h1>}
      </Button>
      {/* // */}
      {user_id === chat.createdBy._id && (
        <Button
          className="w-row gap-3 justify-start opacity-80"
          size={"sm"}
          onClick={() => setIsEditing(true)}
        >
          <Edit color="white" size={18} />
          <h1>Edit update</h1>
        </Button>
      )}
      <Button className="w-row gap-3 justify-start opacity-80" size={"sm"}>
        <Pin color="white" size={18} />
        <h1>Pin to top</h1>
      </Button>
    </div>
  );
};

export default ChatActions;
