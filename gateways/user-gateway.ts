import axiosInstance from "@/utils/axiosinstance";
import { UserType } from "@/zstore";

const USER_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_USER_BASE_URL) as string;

async function getUser(id: string): Promise<UserType> {
  const { data } = await axiosInstance().get(`${USER_BASE_URL}/get/${id}`);
  console.log(`%c {data} `, "color: green;border:1px solid green", data);
  return data.response;
}
async function deleteUser(id: string) {
  await axiosInstance().delete(`${USER_BASE_URL}/delete/${id}`);
}
async function updateUser(payload: any): Promise<UserType> {
  const { id } = payload;
  const { data } = await axiosInstance().put(`${USER_BASE_URL}/update/${id}`);
  console.log(`%c {data} `, "color: green;border:1px solid green", data);
  return data.response;
}

export { getUser, deleteUser, updateUser };
