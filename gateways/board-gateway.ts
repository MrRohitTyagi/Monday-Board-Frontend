import { BoardType } from "@/types/boardTypes";
import axiosInstance from "@/utils/axiosinstance";

const BOARD_BASE_URL = ((process.env.NEXT_PUBLIC_BACKEND_URL as string) +
  process.env.NEXT_PUBLIC_BOARD_BASE_URL) as string;

async function getBoard(id: string): Promise<BoardType> {
  const { data } = await axiosInstance().get(`${BOARD_BASE_URL}/get/${id}`);
  return data.response;
}

async function getBoardPerUser(): Promise<BoardType[]> {
  const { data } = await axiosInstance().get(`${BOARD_BASE_URL}/get-assigned/`);
  return data.response;
}
async function createBoard(payload: any): Promise<BoardType> {
  const { data } = await axiosInstance().post(
    `${BOARD_BASE_URL}/create`,
    payload
  );
  return data.response;
}
async function deleteBoard(id: string) {
  await axiosInstance().delete(`${BOARD_BASE_URL}/delete/${id}`);
}
async function updateBoard(payload: any): Promise<BoardType> {
  const { data } = await axiosInstance().put(
    `${BOARD_BASE_URL}/update/${payload._id}`,
    payload
  );
  return data.response;
}

export { getBoardPerUser, getBoard, deleteBoard, updateBoard, createBoard };
