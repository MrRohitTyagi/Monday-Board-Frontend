import { ThreadType } from "@/types/threadType";
import axiosInstance from "@/utils/axiosinstance";

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
  const { _id } = payload;
  await axiosInstance().put(`${THREAD_BASE_URL}/update/${_id}`, payload);
  // return data.response;
}

async function createThread(payload: any): Promise<ThreadType> {
  const { data } = await axiosInstance().post(
    `${THREAD_BASE_URL}/create/`,
    payload
  );
  return data.response;
}

export {
  getThreads,
  deleteThread,
  updateThread,
  createThread,
  getSingleThread,
};
