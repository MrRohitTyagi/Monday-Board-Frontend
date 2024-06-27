import { ConfigType } from "@/types/configTypes";
import axiosInstance from "@/utils/axiosinstance";

const CONFIG_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_CONFIG_BASE_URL) as string;

async function getConfig(): Promise<ConfigType> {
  const { data } = await axiosInstance().get(`${CONFIG_BASE_URL}/get`);
  return data.response;
}

async function updateConfig(payload: any) {
  const { data } = await axiosInstance().put(
    `${CONFIG_BASE_URL}/update/${payload._id}`,
    payload
  );
  return data.response;
}

export { getConfig, updateConfig };
