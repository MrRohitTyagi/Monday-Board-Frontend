"use client";
import useLoading from "@/hooks/useLoading";
import { useAuth } from "@/zstore";
import React, { useEffect, useState } from "react";
import NotificationSkeletonLoader from "./NotificationSkeletonLoader";
import { cn, waitfor } from "@/lib/utils";
import { getNotifications } from "@/gateways/notification-gateway";
import { NotificationType } from "@/types/notificationTypes";
import NotificationCard from "./NotificationCard";
import ResizableSplit from "@/components/core/ResizableSplit";
import { StateSetter } from "@/types/genericTypes";
import NotificationHeader from "./NotificationHeader";

type NotificationProps = {
  openNotification: string;
  handleLayerClose: () => void;
  transitionStates: {
    [key: string]: string;
  };
};
const Notification = ({
  openNotification,
  handleLayerClose,
  transitionStates,
}: NotificationProps) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useAuth();
  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });

  const isClosing = openNotification === transitionStates.CLOSING;

  useEffect(() => {
    async function init() {
      const notis = await getNotifications(user._id);
      // await waitfor(501110);
      setNotifications(notis);
      triggerLoading(false);
    }
    init();
  }, [user._id]);

  return (
    <div
      className={cn(
        "transition-all z-[10]",
        "fixed right-0 top-[var(--navbar-height)] bottom-0 ",
        isClosing && "animate-pulse-layer-close overflow-hidden",
        openNotification === transitionStates.OPEN && "animate-pulse-layer"
      )}
    >
      <ResizableSplit
        closed={isClosing}
        childMode={true}
        id={"Notification-slider"}
        onLeftPannelClick={handleLayerClose}
      >
        {isLoading ? (
          <div
            className={cn("noti-main-container bg-main-fg w-full h-full p-3")}
          >
            <NotificationSkeletonLoader />
          </div>
        ) : (
          <div
            className={cn(
              "noti-main-container",
              "bg-main-fg w-full h-full",
              "p-3"
            )}
          >
            <NotificationHeader handleLayerClose={handleLayerClose} />
            <div className="full flex-col flex gap-2">
              {notifications.map((notification) => {
                return (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}
                    setNotifications={setNotifications}
                  />
                );
              })}
            </div>
          </div>
        )}
      </ResizableSplit>
    </div>
  );
};

export default Notification;
