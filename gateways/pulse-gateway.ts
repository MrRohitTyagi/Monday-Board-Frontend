import axiosInstance from "@/utils/axiosinstance";
import { PulseType } from "@/zstore";

const PULSE_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_PULSE_BASE_URL) as string;

async function getPulse(id: string): Promise<PulseType> {
  const { data } = await axiosInstance().get(`${PULSE_BASE_URL}/get/${id}`);
  return data.response;
}
async function deletePulse(id: string) {
  await axiosInstance().delete(`${PULSE_BASE_URL}/delete/${id}`);
}
async function updatePulse(payload: any): Promise<PulseType> {
  const { id } = payload;
  const { data } = await axiosInstance().put(`${PULSE_BASE_URL}/update/${id}`);
  return data.response;
}

export { getPulse, deletePulse, updatePulse };
