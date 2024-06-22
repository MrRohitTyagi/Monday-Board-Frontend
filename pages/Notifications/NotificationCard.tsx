import React from "react";

import { cn } from "@/lib/utils";
import { StateSetter } from "@/types/genericTypes";
import { NotificationType } from "@/types/notificationTypes";
import AvatarComp from "@/components/core/AvatarComp";
import LowOpacityText from "@/components/core/LowOpacityText";
import { timeBetween } from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";
import useNavigate from "@/hooks/useNavigate";
import { CheckCircle } from "lucide-react";
import TooltipComp from "@/components/core/TooltipComp";

type NotificationCardProps = {
  notification: NotificationType;
  setNotifications?: StateSetter<NotificationType[]>;
  handleMarkAsRead: (e: string) => void;
  handleLayerClose: () => void;
};
const NotificationCard = ({
  notification,
  // setNotifications,
  handleMarkAsRead,
  handleLayerClose,
}: NotificationCardProps) => {
  //
  const { displayText } = timeBetween(notification.createdAt);
  const navigate = useNavigate();

  return (
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
        "flex flex-row py-4 px-3",
        "shrink-0 border border-main-light",
        notification.seen === false
          ? "hover:bg-main-active-dark"
          : "hover:border-highlighter border",
        notification.seen === false && "bg-main-active-dark",
        "relative group opacity-0"
      )}
    >
      <TooltipComp title={"Mark as read"} className="z-[9999] px-3 py-2">
        <div className="absolute right-0 bottom-0 group-hover:opacity-100">
          <Button
            onClick={() => handleMarkAsRead(notification._id)}
            className="flex z-50 flex-row gap-2 hover:bg-transparent"
            variant={"ghost"}
          >
            <CheckCircle size={20} />
          </Button>
        </div>
      </TooltipComp>

      {/* // */}
      <div className="noti-profile flex flex-row justify-center min-w-20 max-w-20 shrink-0">
        <AvatarComp
          className="h-12 w-12"
          src={notification.createdBy.picture}
        />
      </div>

      <div className="noti-content flex flex-col gap-2 grow shrink overflow-hidden">
        <div className="noti-title flex flex-row gap-2">
          <div
            className="w-full opacity-80 text-ellipsis overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `<h1 style="text-align:start;">${notification.createdBy.username} <strong class='noti-prefix'>${notification.prefix_text}</strong> ${notification.postfix_text}.</h1>`,
            }}
          />
        </div>

        <LowOpacityText className="noti-content overflow-hidden text-ellipsis text-start">
          {notification.content}
        </LowOpacityText>

        <LowOpacityText className="noti-footer text-gray-400 text-start">
          {`${displayText} ▸ ${notification.attachedPulse.title}`}
        </LowOpacityText>
      </div>
    </Button>
  );
};

export default NotificationCard;
