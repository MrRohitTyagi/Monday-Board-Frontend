import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { BoardType, PulseType, UserType } from "@/zstore";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stateSetter } from "@/types";
import AvatarGroup from "@/components/core/AvatarGroup";
import AvatarComp from "@/components/core/AvatarComp";

type AssignedProps = {
  board: BoardType;
  pulse: PulseType;
  setPulse?: stateSetter<PulseType>;
};

const Assigned = ({ board, pulse }: AssignedProps) => {
  const { updateAssigned } = useContext(PulseContext);

  const [allUsers, setallUsers] = useState<UserType[]>([]);

  const membersAndAdmins = useMemo(
    () => [...(board.admins || []), ...(board.members || [])],
    [board.admins, board.members]
  );

  const assignedUsers = useMemo(() => {
    return membersAndAdmins.filter((u) => pulse.assigned.includes(u._id));
  }, [membersAndAdmins, pulse.assigned]);

  const handleSearchUser = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value.toLowerCase();

      setallUsers(() =>
        membersAndAdmins.filter((u) => u.username.toLowerCase().includes(name))
      );
    },
    [membersAndAdmins]
  );

  useEffect(() => {
    setallUsers(
      membersAndAdmins.filter((m) => !pulse.assigned.includes(m._id))
    );
  }, [board, pulse.assigned]);

  console.log(`%c {board,pulse} `, "color: orange;border:2px solid cyan", {
    board,
    pulse,
    allUsers,
    assignedUsers,
  });

  return (
    <PopoverComp
      trigger={
        <div
          className={cn(
            baseCssMiniItems(),
            "assigned-to",
            "flex flex-row items-center justify-center"
          )}
        >
          {<AvatarGroup users={assignedUsers} />}
        </div>
      }
      classNames={{
        trigger: "h-full",
        content: "bg-main-fg p-4 shadow-lg shadow-foreground",
      }}
      content={
        <div className="flex flex-col gap-3">
          <Input
            className="space-y-4 bg-transparent"
            onChange={handleSearchUser}
          />
          <div
            className={cn(
              "assigned-content",
              "flex flex-col gap-2",
              "max-h-96 overflow-y-auto"
            )}
          >
            {allUsers.map((user) => {
              return (
                <Button
                  onClick={() => updateAssigned(user)}
                  variant={"ghost"}
                  className={cn(
                    "hover:bg-main-light p-2 px-4 flex-grow w-full",
                    "pl-0 py-2 flex flex-row gap-4 justify-start items-center"
                  )}
                >
                  <AvatarComp
                    className={cn(
                      "hover:scale-105 w-9 h-9",
                      "transition-all duration-150"
                    )}
                    src={user.picture}
                    fallback={`${
                      user.username.charAt(0) +
                      user.username.charAt(user.username.length - 1)
                    }`}
                  />
                  <h2>{user.username}</h2>
                </Button>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export default memo(Assigned);
