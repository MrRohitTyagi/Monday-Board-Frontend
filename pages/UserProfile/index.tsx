"use client";
import { LogOut, User, UserCog } from "lucide-react";
import React, { memo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteToken } from "@/utils/cookie";
// import { Button } from "@/components/ui/button";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  // TODO
  return (
    <Popover>
      <PopoverTrigger>
        <User />
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-main-light w-fit">
        <div className="flex flex-col gap-2">
          <Button
            className={cn(
              "user-settings",
              "flex flex-row items-center ",
              " justify-start gap-3 w-full"
            )}
          >
            <UserCog color="white" size={20} />
            <h2>User Profile</h2>
          </Button>
          <Button
            onClick={() => {
              deleteToken();
              window.location.href = "/login";
            }}
            className={cn(
              "logout ",
              "flex flex-row items-center ",
              " justify-start gap-3 w-full"
            )}
          >
            <LogOut color="white" size={20} />
            <h2>Logout</h2>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserProfile);
