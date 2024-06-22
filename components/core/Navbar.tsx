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
import DialogueComp from "./DialogueComp";
import UserInvite from "@/pages/UserInvite";
import Notification from "@/pages/Notifications";

type Props = {};

const transitionStates = {
  OPEN: "OPEN",
  CLOSING: "CLOSING",
  CLOSED: "CLOSED",
};
const Navbar = ({}: Props) => {
  //
  const [openUserInviteForm, setopenUserInviteForm] = useState(false);
  const [openNotification, setOpenNotification] = useState(
    transitionStates.CLOSED
  );
  const params = useParams();

  const { isAuthenticated, user } = useAuth();

  const currentBoard = useMemo(() => {
    return user.boards.find((b) => b._id === params?.board);
  }, [params, user]);

  const handleLayerClose = () => {
    setOpenNotification(transitionStates.CLOSING);
    const id = setTimeout(() => {
      setOpenNotification(transitionStates.CLOSED);
      clearTimeout(id);
    }, 300);
  };

  return (
    <div
      className={cn(
        "p-2 pr-8 items-center w-full h-navbar-height",
        " flex flex-row justify-between",
        isAuthenticated ? "" : "pointer-events-none opacity-50"
      )}
    >
      <Link href="/">Logo here TODO</Link>
      <div className="right-side-navbar-stuff gap-4 flex flex-row items-center">
        {!!currentBoard && (
          <DialogueComp
            trigger={
              <Button
                key={currentBoard?._id}
                className="p-0 m-0  animate-fadeIn"
                variant="ghost"
              >
                <TooltipComp
                  className="px-3 py-2"
                  title={`Invite members to ${currentBoard.title}`}
                  side="left"
                >
                  <UserRoundPlus />
                </TooltipComp>
              </Button>
            }
            open={openUserInviteForm}
            setOpen={setopenUserInviteForm}
          >
            <UserInvite
              board={currentBoard}
              onClose={() => setopenUserInviteForm(false)}
            />
          </DialogueComp>
        )}

        {/* /Notification */}
        <Button
          onClick={() => {
            if (openNotification === transitionStates.CLOSED) {
              setOpenNotification(transitionStates.OPEN);
            } else handleLayerClose();
          }}
          className="p-0 m-0"
          variant="ghost"
        >
          <Bell
            className={cn(
              openNotification !== transitionStates.CLOSED &&
                "stroke-highlighter"
            )}
          />
        </Button>

        {/* // userprofile */}
        <UserProfile />
      </div>
      {openNotification !== transitionStates.CLOSED && (
        <Notification
          openNotification={openNotification}
          transitionStates={transitionStates}
          handleLayerClose={handleLayerClose}
        />
      )}
    </div>
  );
};

export default memo(Navbar);
