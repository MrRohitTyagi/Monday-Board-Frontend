import { NotificationType } from "@/types/notificationTypes";
import axiosInstance from "@/utils/axiosinstance";
import { toast } from "sonner";

const NOTIFICATION_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_NOTIFICATION_BASE_URL) as string;

async function getNotifications() {
  try {
    const { data } = await axiosInstance().get(`${NOTIFICATION_BASE_URL}/get`);

    return data.response;
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

async function deleteSingleNotification(_id: string) {
  try {
    await axiosInstance().delete(`${NOTIFICATION_BASE_URL}/delete/${_id}`);
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}
async function deleteAllNotification() {
  try {
    await axiosInstance().delete(`${NOTIFICATION_BASE_URL}/delete-all`);
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}
async function markAllNotificationsAsRead() {
  try {
    await axiosInstance().put(`${NOTIFICATION_BASE_URL}/read-all`);
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

async function updateNotification(payload: any) {
  try {
    await axiosInstance().put(
      `${NOTIFICATION_BASE_URL}/update/${payload._id}`,
      payload
    );
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

export {
  getNotifications,
  deleteSingleNotification,
  updateNotification,
  markAllNotificationsAsRead,
  deleteAllNotification,
};
