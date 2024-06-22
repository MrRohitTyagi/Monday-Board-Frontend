import React from "react";

import { cn } from "@/lib/utils";
import { StateSetter } from "@/types/genericTypes";
import { NotificationType } from "@/types/notificationTypes";
import AvatarComp from "@/components/core/AvatarComp";
import LowOpacityText from "@/components/core/LowOpacityText";
import { timeBetween } from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";

type NotificationCardProps = {
  notification: NotificationType;
  setNotifications: StateSetter<NotificationType[]>;
};
const NotificationCard = ({
  notification,
  setNotifications,
}: NotificationCardProps) => {
  const { displayText } = timeBetween(notification.createdAt);

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "notification-card-cont transition-all animate-fadeIn",
        "min-h-16 h-fit w-full rounded-lg",
        "flex flex-row py-4 px-3",
        notification.seen === false
          ? "hover:bg-main-active-dark"
          : "hover:bg-main-light",
        notification.seen === false && "bg-main-active-dark",
        "shrink-0"
      )}
    >
      <div className="noti-profile flex flex-row justify-center min-w-20 max-w-20 shrink-0">
        <AvatarComp
          className="h-12 w-12"
          src={notification.createdBy.picture}
        />
      </div>

      <div className="noti-content flex flex-col gap-2 grow shrink overflow-hidden">
        <div className="noti-title flex flex-row gap-2">
          <div
            className="w-full text-ellipsis overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: `<h1 style="text-align:start;">${notification.createdBy.username} <strong class='noti-prefix'>${notification.prefix_text}</strong> ${notification.postfix_text}</h1>`,
            }}
          />
        </div>

        <LowOpacityText className="noti-content overflow-hidden text-ellipsis">
          {notification.content}
        </LowOpacityText>

        <LowOpacityText className="noti-footer text-gray-500 text-start">
          {`${displayText} ▸ ${notification.attachedPulse.title}`}
        </LowOpacityText>
      </div>
    </Button>
  );
};

export default NotificationCard;
