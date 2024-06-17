"use client";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";
import { Bell, UserRoundPlus } from "lucide-react";

import { Button } from "../ui/button";
import UserProfile from "@/pages/UserProfile";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import TooltipComp from "./TooltipComp";
import { useParams } from "next/navigation";

type Props = {};

const Navbar = ({}: Props) => {
  //
  const [openUserInviteFOrm, setopenUserInviteFOrm] = useState("");
  const params = useParams();

  const { isAuthenticated, user } = useAuth();

  const currentBoard = useMemo(() => {
    return user.boards.find((b) => b._id === params?.board);
  }, [params, user]);

  return (
    <div
      className={cn(
        "p-2 pr-8 items-center w-full h-navbar-height",
        " flex flex-row justify-between",
        isAuthenticated ? "" : "pointer-events-none opacity-50"
      )}
    >
      <Link href="/">TaskBoard.io</Link>
      <div className="right-side-navbar-stuff gap-4 flex flex-row items-center">
        {!!currentBoard && (
          <Button
            key={currentBoard?._id}
            className="p-0 m-0  animate-fadeIn"
            variant="ghost"
          >
            <TooltipComp title="Invite members" side="left">
              <UserRoundPlus />
            </TooltipComp>
          </Button>
        )}
        <Button className="p-0 m-0" variant="ghost">
          <Bell />
        </Button>
        <UserProfile />
      </div>
    </div>
  );
};

export default memo(Navbar);
