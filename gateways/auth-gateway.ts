import axiosInstance, { MyErrorType } from "@/utils/axiosinstance";
import { AxiosError } from "axios";

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

export { login, signup };
