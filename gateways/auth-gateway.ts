import axiosInstance, { MyErrorType } from "@/utils/axiosinstance";
import { AxiosError } from "axios";
import { toast } from "sonner";

const AUTH_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_AUTH_BASE_URL) as string;

async function login(payload: string) {
  try {
    const { data } = await axiosInstance().post(
      `${AUTH_BASE_URL}/login`,
      payload
    );
    if (data.success === false) {
      throw Error(data.message);
    }
    return {
      response: data.response,
      message: data.message,
      success: data.success,
      token: data.token,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

async function signup(payload: string) {
  try {
    const { data } = await axiosInstance().post(
      `${AUTH_BASE_URL}/signup`,
      payload
    );

    return {
      response: data.response,
      message: data.message,
      success: data.success,
      token: data.token,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: error.success,
    };
  }
}

async function checkPassAndSendOTP(payload: any): Promise<any> {
  try {
    const { data } = await axiosInstance().post(
      `${AUTH_BASE_URL}/check-password`,
      payload
    );
    return { success: data.success };
  } catch (error: any) {
    toast.error(error.message);
  }
}

async function checkOTPAndChangePass(payload: any): Promise<any> {
  try {
    const { data } = await axiosInstance().post(
      `${AUTH_BASE_URL}/change-password`,
      payload
    );
    toast.success(data.message);
    return { success: data.success, message: data.message };
  } catch (error: any) {
    toast.error(error.message);
  }
}

async function resendOTP(): Promise<any> {
  try {
    const { data } = await axiosInstance().post(`${AUTH_BASE_URL}/resend-otp`);
    toast.success(data.message);
    return { success: data.success, message: data.message };
  } catch (error: any) {
    toast.error(error.message);
  }
}

export { login, signup, checkPassAndSendOTP, checkOTPAndChangePass, resendOTP };
