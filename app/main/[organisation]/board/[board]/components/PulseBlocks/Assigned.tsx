import React, {
  ChangeEvent,
  LegacyRef,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { PulseContext, baseCssMiniItems } from "../Pulse";
import { BoardType, PulseType, UserType } from "@/zstore";
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { stateSetter } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AvatarGroup from "@/components/core/AvatarGroup";
import AvatarComp from "@/components/core/AvatarComp";
import { Trash, Trash2 } from "lucide-react";

type AssignedProps = {
  board: BoardType;
  pulse: PulseType;
  setPulse?: stateSetter<PulseType>;
};

const Assigned = ({ board, pulse }: AssignedProps) => {
  const { updateAssigned } = useContext(PulseContext);

  const [allUsers, setallUsers] = useState<UserType[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<UserType[]>([]);

  const membersAndAdmins: UserType[] = useMemo(
    () => [...(board.admins || []), ...(board.members || [])],
    [board.admins, board.members]
  );

  const handleNotAssignedUserSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value.toLowerCase();

      setallUsers(() =>
        membersAndAdmins.filter((u) => {
          if (
            !pulse.assigned.includes(u._id) &&
            u.username.toLowerCase().includes(name)
          ) {
            return true;
          } else return false;
        })
      );
    },
    [membersAndAdmins, pulse.assigned]
  );
  const handleAssignedUserSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value.toLowerCase();

      setAssignedUsers(() =>
        membersAndAdmins.filter((u) => {
          if (
            pulse.assigned.includes(u._id) &&
            u.username.toLowerCase().includes(name)
          ) {
            return true;
          } else return false;
        })
      );
    },
    [membersAndAdmins, pulse.assigned]
  );

  useEffect(() => {
    setallUsers(
      membersAndAdmins.filter((m) => !pulse.assigned.includes(m._id))
    );
  }, [membersAndAdmins, pulse.assigned]);

  useEffect(() => {
    setAssignedUsers(
      membersAndAdmins.filter((u) => pulse.assigned.includes(u._id))
    );
  }, [membersAndAdmins, pulse.assigned]);

  console.log(`%c {board,pulse} `, "color: orange;border:2px solid cyan", {
    board,
    pulse,
    allUsers,
    assignedUsers,
    membersAndAdmins,
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
          {
            <AvatarGroup
              users={membersAndAdmins.filter((m_a) =>
                pulse.assigned.includes(m_a._id)
              )}
            />
          }
        </div>
      }
      classNames={{
        trigger: "h-full",
        content: "bg-main-fg p-4 shadow-lg shadow-foreground",
      }}
      content={
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger value="Assigned">Assigned</TabsTrigger>
            <TabsTrigger value="Members">Members</TabsTrigger>
          </TabsList>
          <TabsContent value="Assigned">
            <AssignedSelector
              handleNotAssignedUserSearch={handleAssignedUserSearch}
              usersToPreview={assignedUsers}
              className="justify-between flex flex-row"
              extra={
                <Button variant={"ghost"} className="p-0 m-0">
                  <Trash2 color="#e68181" size={20} />
                </Button>
              }
              onUserClick={(user) => {
                updateAssigned(user, "remove");
              }}
            />
          </TabsContent>
          <TabsContent value="Members">
            <AssignedSelector
              handleNotAssignedUserSearch={handleNotAssignedUserSearch}
              usersToPreview={allUsers}
              onUserClick={updateAssigned}
            />
          </TabsContent>
        </Tabs>
      }
    />
  );
};

type AssignedSelectorProps = {
  usersToPreview: UserType[];
  onUserClick: (e: UserType) => void;
  handleNotAssignedUserSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  extra?: ReactNode | string | null;
};

const AssignedSelector = ({
  usersToPreview,
  onUserClick,
  handleNotAssignedUserSearch,
  extra = null,
  className,
}: AssignedSelectorProps) => {
  const inpRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-3">
      <Input
        ref={inpRef}
        className="space-y-4 bg-transparent"
        onChange={handleNotAssignedUserSearch}
      />

      <div
        className={cn(
          "assigned-content",
          "flex flex-col gap-2",
          "max-h-96 overflow-y-auto"
        )}
      >
        {usersToPreview.length === 0 ? (
          <Button className="text-center">No one here</Button>
        ) : (
          usersToPreview.map((user) => {
            return (
              <Button
                onClick={() => {
                  if (inpRef.current?.value) inpRef.current.value = "";
                  if (inpRef.current?.value) inpRef.current.focus();
                  onUserClick(user);
                }}
                variant={"ghost"}
                className={cn(
                  "animate-fadeIn",
                  "hover:bg-main-light p-2 px-4 flex-grow w-full",
                  "pl-0 py-2 flex flex-row gap-4 justify-start items-center",
                  className
                )}
              >
                <div className="gap-3 flex flex-row items-center justify-center">
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
                </div>
                {extra}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default memo(Assigned);
