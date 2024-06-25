"use client";
import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { StateSetter } from "@/types/genericTypes";
import { NotificationType } from "@/types/notificationTypes";
import AvatarComp from "@/components/core/AvatarComp";
import LowOpacityText from "@/components/core/LowOpacityText";
import { timeBetween } from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";
import useNavigate from "@/hooks/useNavigate";
import { CheckCircle, Trash2 } from "lucide-react";
import TooltipComp from "@/components/core/TooltipComp";
import useLoading from "@/hooks/useLoading";
import Loader from "@/components/core/Loader";

type NotificationCardProps = {
  notification: NotificationType;
  setNotifications?: StateSetter<NotificationType[]>;
  handleMarkAsRead: (e: string) => void;
  handleDeleteOne: (e: string) => void;
  handleLayerClose: () => void;
};
const NotificationCard = ({
  notification = {} as NotificationType,
  // setNotifications,
  handleMarkAsRead,
  handleLayerClose,
  handleDeleteOne,
}: NotificationCardProps) => {
  //
  const { displayText = "" } = useMemo(() => {
    return timeBetween(notification.createdAt);
  }, [notification.createdAt]);
  const { isDeleting, triggerDeleting } = useLoading({});

  const {navigate} = useNavigate();

  return notification.isDeleted === true ? (
    <div className="animate-unmount-box w-full" />
  ) : (
    <Button
      onClick={() => {
        navigate(notification.redirect_url);
        if (notification.seen === false) handleMarkAsRead(notification._id);
        handleLayerClose();
      }}
      variant={"ghost"}
      className={cn(
        "notification-card-cont transition-all animate-fadeIn",
        "min-h-16 h-fit w-full rounded-lg",
        "flex flex-row py-4 px-3 mt-2",
        "shrink-0 relative group opacity-0",
        notification.seen === true && "bg-main-bg",
        notification.seen === false && "bg-main-active-dark",
        notification.seen === false && "hover:bg-main-active",

        "border border-main-light",
        "hover:!border-highlighter"

        // notification.seen === false
        //   ? "hover:bg-main-active-dark"
        //   : "hover:border-highlighter border",
        // notification.seen === false && "bg-main-active-dark"
      )}
    >
      <div
        className={cn(
          "flex flex-row",
          "absolute right-0 bottom-0 group-hover:opacity-100"
        )}
      >
        {notification.seen === false && (
          <TooltipComp title={"Mark as read"} className="z-[20] px-3 py-2">
            <Button
              size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMarkAsRead(notification._id);
              }}
              className="px-2 flex z-50 flex-row gap-2 hover:bg-transparent"
              variant={"ghost"}
            >
              <CheckCircle size={20} />
            </Button>
          </TooltipComp>
        )}
        <TooltipComp title={"Delete notification"} className="z-[20] px-3 py-2">
          <Button
            size={"sm"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              triggerDeleting(true);
              handleDeleteOne(notification._id);
            }}
            className="px-2 flex z-50 flex-row gap-2 hover:bg-transparent"
            variant={"ghost"}
          >
            {isDeleting ? <Loader className="h-6 w-6" /> : <Trash2 size={20} />}
          </Button>
        </TooltipComp>
      </div>

      {/* // */}
      <div className="noti-profile flex flex-row justify-center min-w-20 max-w-20 shrink-0">
        <AvatarComp
          className="h-12 w-12"
          src={notification?.createdBy?.picture}
        />
      </div>

      <div className="noti-content flex flex-col gap-2 grow shrink overflow-hidden">
        <div className="noti-title flex flex-row gap-2">
          <div
            className="w-full opacity-80 text-ellipsis overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `<h1 style="text-align:start;">${notification?.createdBy?.username} <strong class='noti-prefix'>${notification?.prefix_text}</strong> ${notification.postfix_text}.</h1>`,
            }}
          />
        </div>

        <LowOpacityText className="noti-content overflow-hidden text-ellipsis text-start">
          {notification.content}
        </LowOpacityText>

        <LowOpacityText className="noti-footer text-gray-400 text-start">
          {`${displayText} ▸ ${notification?.attachedPulse?.title}`}
        </LowOpacityText>
      </div>
    </Button>
  );
};

export default memo(NotificationCard);
