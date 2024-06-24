"use client";
import useLoading from "@/hooks/useLoading";
import { useAuth } from "@/zstore";
import React, { memo, useCallback, useEffect, useState } from "react";
import NotificationSkeletonLoader from "./NotificationSkeletonLoader";
import { cn, waitfor } from "@/lib/utils";
import {
  deleteAllNotification,
  deleteSingleNotification,
  getNotifications,
  markAllNotificationsAsRead,
  updateNotification,
} from "@/gateways/notification-gateway";
import { NotificationType } from "@/types/notificationTypes";
import NotificationCard from "./NotificationCard";
import ResizableSplit from "@/components/core/ResizableSplit";
import NotificationHeader from "./NotificationHeader";
import Space from "@/components/core/Space";

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
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useAuth();
  const { isLoading, triggerLoading } = useLoading({ defaultLoading: true });

  const isClosing = openNotification === transitionStates.CLOSING;

  const handleMarkAsRead = useCallback((_id: string) => {
    setNotifications((pn) => {
      return pn.map((n) => {
        if (n._id === _id) return { ...n, seen: true };
        else return n;
      });
    });
    const payload = {
      _id: _id,
      seen: true,
    };
    updateNotification(payload);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((pn) => pn.map((n) => ({ ...n, seen: true })));
    markAllNotificationsAsRead(user._id);
  }, [user._id]);

  const handleDeleteAll = useCallback(async () => {
    for await (const __ of notifications) {
      await waitfor(50);
      setNotifications((pn) => {
        let clone = [...pn];
        clone.pop();
        return clone;
      });
    }
    deleteAllNotification(user._id);
  }, [notifications, user._id]);

  const handleDeleteOne = useCallback(async (_id: string) => {
    setNotifications((pn) => {
      return pn.map((n) => {
        if (n._id === _id) {
          return { ...n, isDeleted: true };
        } else return n;
      });
    });
    await deleteSingleNotification(_id);
  }, []);

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
                    setNotifications={setNotifications}
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
