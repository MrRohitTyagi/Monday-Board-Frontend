"use client";
import Link from "next/link";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Bell, UserRoundPlus } from "lucide-react";

import { Button } from "../ui/button";
import UserProfile from "@/components/pages/UserProfile";
import { useAuth } from "@/zstore";
import { cn } from "@/lib/utils";
import TooltipComp from "./TooltipComp";
import { useParams } from "next/navigation";
import DialogueComp from "./DialogueComp";
import UserInvite from "@/components/pages/UserInvite";
import Notification from "@/components/pages/Notifications/Notifications";
import useRealtimeChannels from "@/hooks/useRealtimeChannels";
import useAudio from "@/utils/useAudio";
import { useNotificationStore } from "@/store/notificationStore";

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
  const [notiCount, setNotiCount] = useState<number>(0);

  const params = useParams();
  const { isAuthenticated, user } = useAuth();
  const { notificationChannel } = useRealtimeChannels();
  const { notiFicationAudio } = useAudio();
  const { setHasNew } = useNotificationStore();

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

  useEffect(() => {
    notificationChannel.subscribe(user._id, (res) => {
      console.log("res", res);
      if (notiFicationAudio) notiFicationAudio.play();
      setNotiCount((pc) => (pc || 0) + 1);
      setHasNew(true);
    });
  }, [user._id]);

  return (
    <div
      className={cn(
        "p-2 pr-8 items-center w-full h-navbar-height",
        " flex flex-row justify-between",
        isAuthenticated === false && "pointer-events-none opacity-50"
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
            if (notiCount > 0) setNotiCount(0);
          }}
          className="p-0 m-0"
          variant="ghost"
        >
          <div className="indicator">
            {notiCount !== null && notiCount > 0 && (
              <div
                className={cn(
                  "opacity-100",
                  "indicator-item bg-highlighter",
                  " rounded-full h-5 w-5 items-center justify-center flex"
                )}
              >
                {notiCount}
              </div>
            )}
            <Bell
              className={cn(
                openNotification !== transitionStates.CLOSED &&
                  "stroke-highlighter"
              )}
            />
          </div>
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
