import { UserType } from "./userTypes";

export type ChatType = {
  _id: string;
  pulseId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType;
  thread: ChatType[];
  seenBy: UserType[];
  content: string;
  draft: string;
};
