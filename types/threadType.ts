import { UserType } from "./userTypes";

export type ThreadType = {
  _id: string;
  chatId: string;
  createdBy: UserType;
  content: string;
  createdAt: string;
  updatedAt: string;
};
