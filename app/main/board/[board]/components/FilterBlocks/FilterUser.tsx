import AvatarComp from "@/components/core/AvatarComp";
import PopoverComp from "@/components/core/PopoverComp";
import Space from "@/components/core/Space";
import { Button } from "@/components/ui/button";
import useBoardContext from "@/hooks/useBoardContext";
import { cn } from "@/lib/utils";
import { useConfig } from "@/store/configStore";
import { UserType } from "@/types/userTypes";
import { generatePictureFallback } from "@/utils/helperFunctions";
import { UserCircle, X } from "lucide-react";
import React, { memo, useMemo } from "react";

type FilterUserProps = {};
const FilterUser = (props: FilterUserProps) => {
  const { board } = useBoardContext();
  // const { user, setUser } = useConfig();
  const {
    filters: { [board._id]: filterPerBoard },
    setUser,
  } = useConfig();

  const { user = "" } = filterPerBoard || {};

  const membersAndAdmins: UserType[] = useMemo(
    () => [...(board.admins || []), ...(board.members || [])],
    [board.admins, board.members]
  );
  const selectedUser = membersAndAdmins.find((m) => m._id === user);

  return (
    <PopoverComp
      classNames={{ content: "p-0 bg-main-bg shadow-black shadow-lg" }}
      content={
        <div
          className={cn(
            // "border-2 border-highlighter-dark",
            "viewed-by-cont ",
            "grid grid-cols-6 rounded-md",
            "min-h-6 min-w-6",
            "transition-all",
            "bg-main-bg p-2"
          )}
        >
          {membersAndAdmins.map((viewer, i) => {
            return (
              <Button
                variant={"ghost"}
                onClick={() => setUser(viewer._id, board._id)}
                className="per-viewer shrink-0 p-2 animate-fadeIn"
                key={viewer._id}
              >
                <AvatarComp
                  className="h-8 w-8"
                  src={viewer.picture}
                  fallback={generatePictureFallback(viewer.username)}
                />
              </Button>
            );
          })}
        </div>
      }
      trigger={
        <Button
          className={cn(
            "flex flex-row gap-2 items-center",
            "border-2 border-highlighter-dark",
            "rounded-sm"
          )}
          variant={"ghost"}
        >
          {selectedUser ? (
            <>
              <AvatarComp src={selectedUser?.picture} className="h-7 w-7" />
              <h1 className="text-ellipsis overflow-hidden">
                {selectedUser.username}
              </h1>
              <Space />
              <Button
                className="p-0 hover:bg-transparent"
                variant={"ghost"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setUser("", board._id);
                }}
              >
                <X size={18} />
              </Button>
            </>
          ) : (
            <>
              <UserCircle size={18} />
              <h1>Person</h1>
            </>
          )}
        </Button>
      }
    />
  );
};

export default memo(FilterUser);
