import axiosInstance from "@/utils/axiosinstance";

const NOTIFICATION_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_NOTIFICATION_BASE_URL) as string;

async function getNotifications(user_id: string) {
  try {
    const { data } = await axiosInstance().get(
      `${NOTIFICATION_BASE_URL}/get/${user_id}`
    );

    return data.response;
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

async function deleteNotifications(_id: string) {
  try {
    await axiosInstance().delete(`${NOTIFICATION_BASE_URL}/delete/${_id}`);
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

export { getNotifications, deleteNotifications };
