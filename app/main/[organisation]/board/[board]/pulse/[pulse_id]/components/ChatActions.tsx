import { Button } from "@/components/ui/button";
import { StateSetter } from "@/types";
import { Edit, Pin, Trash2 } from "lucide-react";
import React from "react";
type ChatActionsProps = { setIsEditing: StateSetter<boolean> };
const ChatActions = ({ setIsEditing }: ChatActionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Button className="w-row gap-3 justify-start" size={"sm"}>
        <Trash2 color="white" size={18} />
        <h1>Delete update</h1>
      </Button>
      {/* // */}
      <Button
        className="w-row gap-3 justify-start"
        size={"sm"}
        onClick={() => setIsEditing(true)}
      >
        <Edit color="white" size={18} />
        <h1>Edit update</h1>
      </Button>
      {/* // */}
      <Button className="w-row gap-3 justify-start" size={"sm"}>
        <Pin color="white" size={18} />
        <h1>Pin to top</h1>
      </Button>
    </div>
  );
};

export default ChatActions;
