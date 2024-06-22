import { UserType } from "./userTypes";

export type ChatType = {
  _id: string;
  pulseId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserType;
  threadCount: number;
  seenBy: UserType[];
  content: string;
  draft: string;
};
