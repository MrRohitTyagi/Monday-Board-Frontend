import { BoardType } from "./boardTypes";

export type UserType = {
    _id: string;
    username: string;
    email: string;
    org: string;
    picture: string;
    boards: BoardType[];
  };