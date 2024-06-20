import axiosInstance from "@/utils/axiosinstance";
import { toast } from "sonner";

const INVITATION_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_INVITATION_BASE_URL) as string;

async function acceptInvitation(payload: any) {
  try {
    const { data } = await axiosInstance().post(
      `${INVITATION_BASE_URL}/invite-accept`,
      payload
    );
    console.log("data", data);
    return {
      response: data.response,
      message: data.message,
      success: data.success,
    };
  } catch (error: any) {
    toast.error(error.message);
    return {
      message: error.message,
      success: error.success,
    };
  }
}
async function getInvitation(id: string) {
  try {
    const { data } = await axiosInstance().get(
      `${INVITATION_BASE_URL}/get/${id}`
    );
    console.log("data", data);
    return {
      response: data.response,
      message: data.message,
      success: data.success,
    };
  } catch (error: any) {
    toast.error(error.message);
    return {
      message: error.message,
      success: error.success,
    };
  }
}

export { acceptInvitation, getInvitation };
