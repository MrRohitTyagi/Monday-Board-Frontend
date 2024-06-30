import { PriorityType, StatusesType } from "./pulseTypes";
import { SprintType } from "./sprintTypes";
import { UserType } from "./userTypes";

export type BoardType = {
  createdAt: string;
  _id: string;
  title: string;
  picture: string;
  description: string;
  admins: UserType[];
  members: UserType[];
  statuses: StatusesType;
  priority: PriorityType;
  sprints: SprintType[];
};
