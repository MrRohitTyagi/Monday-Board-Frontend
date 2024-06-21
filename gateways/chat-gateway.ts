import axiosInstance from "@/utils/axiosinstance";
import { ChatType } from "@/zstore";

const CHAT_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_CHAT_BASE_URL) as string;

async function getChats(pulse_id: string): Promise<ChatType[]> {
  const { data } = await axiosInstance().get(
    `${CHAT_BASE_URL}/get/${pulse_id}`
  );
  return data.response;
}

async function deleteChat(id: string) {
  await axiosInstance().delete(`${CHAT_BASE_URL}/delete/${id}`);
}

async function updateChat(payload: any): Promise<ChatType> {
  const { _id } = payload;
  const { data } = await axiosInstance().put(
    `${CHAT_BASE_URL}/update/${_id}`,
    payload
  );
  return data.response;
}

async function createChat(payload: any): Promise<ChatType> {
  const { data } = await axiosInstance().post(
    `${CHAT_BASE_URL}/create/`,
    payload
  );
  return data.response;
}

export { getChats, deleteChat, updateChat, createChat };
