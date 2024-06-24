import {
  deleteAllNotification,
  deleteSingleNotification,
  getNotifications,
  markAllNotificationsAsRead,
  updateNotification,
} from "@/gateways/notification-gateway";
import { waitfor } from "@/lib/utils";
import { NotificationType } from "@/types/notificationTypes";
import { create } from "zustand";

type NotificationStoreType = {
  hasNew: boolean;
  notifications: NotificationType[];
  getNotifications: () => void;
  handleMarkAsRead: (e: string) => void;
  handleMarkAllAsRead: () => void;
  handleDeleteAll: () => void;
  handleDeleteOne: (e: string) => void;
  setHasNew: (e: boolean) => void;
};

export const useNotificationStore = create<NotificationStoreType>(
  (setState, getState) => ({
    hasNew: true,
    notifications: [],
    setHasNew: (e) => {
      setState((ps) => ({ ...ps, hasNew: e }));
    },
    getNotifications: async (): Promise<any> => {
      const { hasNew } = getState();
      if (hasNew === true) {
        const notis: NotificationType[] = await getNotifications();
        setState({
          notifications: notis,
          hasNew: false,
        });
      }
    },
    handleMarkAsRead: (_id: string) => {
      setState((ps) => {
        const updatedNotis = ps.notifications.map((n) => {
          if (n._id === _id) return { ...n, seen: true };
          else return n;
        });

        return { ...ps, notifications: updatedNotis };
      });

      const payload = { _id: _id, seen: true };
      updateNotification(payload);
    },
    //
    handleDeleteAll: async () => {
      for await (const __ of getState().notifications) {
        await waitfor(50);
        setState((ps) => {
          let clone = [...ps.notifications];
          clone.pop();
          return { ...ps, notifications: clone };
        });
      }
      deleteAllNotification();
    },
    //
    handleDeleteOne: async (_id: string) => {
      setState((ps) => {
        return {
          ...ps,
          notifications: ps.notifications.map((n) => {
            if (n._id === _id) {
              return { ...n, isDeleted: true };
            } else return n;
          }),
        };
      });
      deleteSingleNotification(_id);
    },
    //
    handleMarkAllAsRead: () => {
      setState((ps) => {
        return {
          ...ps,
          notifications: ps.notifications.map((n) => ({ ...n, seen: true })),
        };
      });
      markAllNotificationsAsRead();
    },
  })
);
