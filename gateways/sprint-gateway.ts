import axiosInstance from "@/utils/axiosinstance";
import { SprintType } from "@/zstore";

const SPRINT_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_SPRINT_BASE_URL) as string;

async function getSprint(id: string): Promise<SprintType> {
  const { data } = await axiosInstance().get(`${SPRINT_BASE_URL}/get/${id}`);
  return data.response;
}
async function deleteSprint(id: string) {
  await axiosInstance().delete(`${SPRINT_BASE_URL}/delete/${id}`);
}
async function createSprint(payload: any): Promise<SprintType> {
  const { data } = await axiosInstance().post(
    `${SPRINT_BASE_URL}/create`,
    payload
  );
  return data.response;
}
async function updateSprint(payload: any): Promise<SprintType> {
  const { data } = await axiosInstance().put(
    `${SPRINT_BASE_URL}/update/${payload._id}`,
    payload
  );
  return data.response;
}

export { getSprint, deleteSprint, updateSprint, createSprint };
