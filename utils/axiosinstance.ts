"use client";

import axios from "axios";
import { deleteToken, getToken } from "@/utils/cookie";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = (headers: {} = {}) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: { token: getToken(), ...headers },
  });

  instance.interceptors.request.use(
    function (config) {
      NProgress.start();
      return config;
    },
    function (error) {
      console.log("error", error);
      NProgress.done();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      NProgress.done();
      return response;
    },
    function (error) {
      NProgress.done();
      if (error.response && error.response.status === 401) {
        deleteToken();
        window.location.href = "/";
        window.location.reload();
      }
      console.log("error", error);
      return Promise.reject(error);
    }
  );
  return instance;
};
export default axiosInstance;
