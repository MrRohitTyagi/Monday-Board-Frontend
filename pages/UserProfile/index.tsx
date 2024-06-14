"use client";
import { User } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";

type UserProfileProps = {};

const UserProfile = (props: UserProfileProps) => {
  // TODO
  return (
    <Popover>
      <PopoverTrigger>
        <User />
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-transparent">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
