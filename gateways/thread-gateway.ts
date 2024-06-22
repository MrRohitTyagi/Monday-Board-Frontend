import { ThreadType } from "@/types/threadType";
import axiosInstance from "@/utils/axiosinstance";
import { toast } from "sonner";

const THREAD_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_THREAD_BASE_URL) as string;

async function getThreads(chat_id: string): Promise<ThreadType[]> {
  const { data } = await axiosInstance().get(
    `${THREAD_BASE_URL}/get/${chat_id}`
  );
  return data.response;
}
async function getSingleThread(thread_id: string): Promise<ThreadType> {
  const { data } = await axiosInstance().get(
    `${THREAD_BASE_URL}/get-single/${thread_id}`
  );
  return data.response;
}

async function deleteThread(id: string) {
  await axiosInstance().delete(`${THREAD_BASE_URL}/delete/${id}`);
}

async function updateThread(payload: any) {
  try {
    const { _id } = payload;
    const { data } = await axiosInstance().put(
      `${THREAD_BASE_URL}/update/${_id}`,
      payload
    );
    return data.response;
  } catch (error: any) {
    toast.error(error?.message || "Unable to save thread");
  }
}

async function createThread(payload: any): Promise<ThreadType> {
  try {
    const { data } = await axiosInstance().post(
      `${THREAD_BASE_URL}/create/`,
      payload
    );
    return data.response;
  } catch (error: any) {
    toast.error(error?.message || "Unable to create thread");
    return {} as ThreadType;
  }
}

export {
  getThreads,
  deleteThread,
  updateThread,
  createThread,
  getSingleThread,
};
