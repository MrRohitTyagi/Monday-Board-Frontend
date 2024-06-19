import axiosInstance from "@/utils/axiosinstance";

const AUTH_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_EMAIL_BASE_URL) as string;

async function sendInvitation(payload: any) {
  try {
    const { data } = await axiosInstance().post(
      `${AUTH_BASE_URL}/send-invite`,
      payload
    );

    return {
      message: data.message,
      success: data.success,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

export { sendInvitation };
