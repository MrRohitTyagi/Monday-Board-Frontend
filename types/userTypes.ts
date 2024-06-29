import { BoardType } from "./boardTypes";

export type UserType = {
  _id: string;
  username: string;
  email: string;
  picture: string;
  boards: BoardType[];
};
