"use client";

import axios, { AxiosRequestHeaders, AxiosResponse, AxiosError } from "axios";
import { deleteToken, getToken } from "@/utils/cookie";
import NProgress from "nprogress";
import { toast } from "sonner";
NProgress.configure({ showSpinner: false });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export type MyErrorType = {
  message: string;
  status: boolean;
};
class MyError extends Error {
  success: boolean;
  constructor(error: string) {
    super(error);
    this.name = "MyError";
    this.message = error;
    this.stack = new Error(error).stack;
    this.success = false;
  }
}

const axiosInstance = (headers?: AxiosRequestHeaders | {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: { authorization: getToken(), ...(headers || {}) },
  });

  instance.interceptors.request.use(
    (config) => {
      NProgress.start();
      return config;
    },
    (error) => {
      console.error("Request error", error);
      NProgress.done();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      NProgress.done();
      return response;
    },
    (error: any) => {
      console.log('error  AXIOS ERROR',error)
      NProgress.done();
      if (error.response) {
        if (error.response.status === 401) {
          toast.error(
            error?.response?.data?.message ||
              "Session expired, please login again"
          );
          deleteToken();
          setTimeout(() => {
            window.location.href = "/";
            window.location.reload();
          }, 1000);
        } else {
          let message = error.response.data?.message || "Something went wrong";
          throw new MyError(message);
        }
      } else {
        throw new MyError("Network error");
      }
    }
  );

  return instance;
};

export default axiosInstance;
