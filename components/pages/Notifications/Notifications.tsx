"use client";
import useLoading from "@/hooks/useLoading";
import React, { memo, useEffect } from "react";
import NotificationSkeletonLoader from "./NotificationSkeletonLoader";
import { cn } from "@/lib/utils";

import NotificationCard from "./NotificationCard";
import ResizableSplit from "@/components/core/ResizableSplit";
import NotificationHeader from "./NotificationHeader";
import Space from "@/components/core/Space";
import { useNotificationStore } from "@/store/notificationStore";

type NotificationProps = {
  openNotification: string;
  handleLayerClose: () => void;
  transitionStates?: {
    [key: string]: string;
  };
};
const transitionStates = {
  OPEN: "OPEN",
  CLOSING: "CLOSING",
  CLOSED: "CLOSED",
};
const Notification = ({
  openNotification,
  handleLayerClose,
}: // transitionStates,
NotificationProps) => {
  // const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const {
    getNotifications,
    notifications,
    handleDeleteAll,
    handleDeleteOne,
    handleMarkAllAsRead,
    handleMarkAsRead,
    setHasNew,
  } = useNotificationStore();
  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });

  const isClosing = openNotification === transitionStates.CLOSING;

  useEffect(() => {
    async function init() {
      await getNotifications();
      triggerLoading(false);
    }
    init();
  }, []);

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
        {isLoading === true ? (
          <div
            className={cn("noti-main-container bg-main-fg w-full h-full p-3")}
          >
            <NotificationSkeletonLoader />
          </div>
        ) : (
          <div
            className={cn(
              "noti-main-container",
              "bg-main-fg w-full h-full flex flex-col"
            )}
          >
            <NotificationHeader
              handleMarkAllAsRead={handleMarkAllAsRead}
              handleDeleteAll={handleDeleteAll}
              handleLayerClose={handleLayerClose}
            />
            {/* <Space /> */}
            <div className="flex flex-col h-full overflow-y-auto p-2">
              {notifications.map((notification) => {
                return (
                  <NotificationCard
                    handleLayerClose={handleLayerClose}
                    handleDeleteOne={handleDeleteOne}
                    handleMarkAsRead={handleMarkAsRead}
                    key={notification._id}
                    notification={notification}
                  />
                );
              })}
              <Space />
            </div>
          </div>
        )}
      </ResizableSplit>
    </div>
  );
};

export default memo(Notification);
