import React, {
  ChangeEvent,
  ReactNode,
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
import PopoverComp from "@/components/core/PopoverComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AvatarGroup from "@/components/core/AvatarGroup";
import AvatarComp from "@/components/core/AvatarComp";
import { Trash2, X } from "lucide-react";
import { BoardType } from "@/types/boardTypes";
import { PulseType } from "@/types/pulseTypes";
import { UserType } from "@/types/userTypes";
import { StateSetter } from "@/types/genericTypes";
// import useRealtimeChannels from "@/hooks/useRealtimeChannels";

type AssignedProps = {
  board: BoardType;
  pulse: PulseType;
  setPulse?: StateSetter<PulseType>;
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

  console.log(
    `%c assignedUsers `,
    "color: green;border:1px solid green",
    assignedUsers
  );
  useEffect(() => {
    setAssignedUsers(
      membersAndAdmins.filter((u) => pulse.assigned.includes(u._id))
    );
  }, [membersAndAdmins, pulse.assigned]);

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
        content:
          "bg-main-fg p-3 shadow-lg shadow-foreground w-fit max-w-[28rem]",
      }}
      content={
        <div className={cn("flex flex-col gap-2", "assigned-cont")}>
          <div className="addigned-list flex flex-wrap gap-2">
            {assignedUsers.map((assigned) => {
              return (
                <Button
                  variant={"ghost"}
                  className={cn(
                    "h-fit w-fit rounded-xl hover:bg-transparent",
                    "flex flex-row items-center",
                    "space-x-2 border-2 border-highlighter-dark px-2 py-0"
                  )}
                >
                  <AvatarComp src={assigned.picture} className="h-5 w-5" />
                  <h2 className="text-xs">{assigned.username}</h2>
                  <Button
                    className="py-0 px-2"
                    variant={"ghost"}
                    size={"xsm"}
                    onClick={() => {
                      updateAssigned(assigned, "remove");
                    }}
                  >
                    <X size={16} className="stroke-text-color" />
                  </Button>
                </Button>
              );
            })}
          </div>

          <AssignedSelector
            handleNotAssignedUserSearch={handleNotAssignedUserSearch}
            usersToPreview={allUsers}
            onUserClick={updateAssigned}
          />
        </div>
        // <Tabs defaultValue="account" className="w-full">
        //   <TabsList className="w-full bg-transparent">
        //     <TabsTrigger value="Assigned">Assigned</TabsTrigger>
        //     <TabsTrigger value="Members">Members</TabsTrigger>
        //   </TabsList>
        //   <TabsContent value="Assigned">
        //     <AssignedSelector
        //       handleNotAssignedUserSearch={handleAssignedUserSearch}
        //       usersToPreview={assignedUsers}
        //       className="justify-between flex flex-row"
        //       extra={
        //         <Button variant={"ghost"} className="p-0 m-0">
        //           <Trash2 color="#e68181" size={20} />
        //         </Button>
        //       }
        //       onUserClick={(user) => {
        //         updateAssigned(user, "remove");
        //       }}
        //     />
        //   </TabsContent>
        //   <TabsContent value="Members">
        //     <AssignedSelector
        //       handleNotAssignedUserSearch={handleNotAssignedUserSearch}
        //       usersToPreview={allUsers}
        //       onUserClick={updateAssigned}
        //     />
        //   </TabsContent>
        // </Tabs>
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
        placeholder="Search user"
        ref={inpRef}
        className="space-y-4 bg-transparent"
        onChange={handleNotAssignedUserSearch}
      />

      <div
        className={cn(
          "assigned-content",
          "flex flex-col gap-2",
          "max-h-60 overflow-y-auto"
        )}
      >
        {usersToPreview.length === 0 ? (
          <Button className="text-center">No one here</Button>
        ) : (
          usersToPreview.map((user, i) => {
            return (
              <Button
                key={user._id}
                onClick={() => {
                  if (inpRef.current?.value) inpRef.current.value = "";
                  if (inpRef.current?.value) inpRef.current.focus();
                  onUserClick(user);
                }}
                variant={"ghost"}
                className={cn(
                  "animate-fadeIn",
                  "hover:bg-main-bg p-2 px-4 flex-grow w-full",
                  "pl-0 py-2 flex flex-row gap-4 justify-start items-center",
                  className
                )}
              >
                <div className="gap-3 flex flex-row items-center justify-center">
                  <AvatarComp
                    className={cn(
                      "border-main-bg border-2",
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
