import { PulseType } from "./pulseTypes";
import { UserType } from "./userTypes";

export type NotificationType = {
  _id: string;
  seen: boolean;
  createdBy: UserType;
  createdAt: string;
  attachedUser: UserType;
  attachedPulse: PulseType;
  postfix_text: string;
  prefix_text: string;
  notificationType: "ASSIGNED_TO" | "NEW_UPDATE" | "NEW_REPLY";
  content: string;
  redirect_url: string;
};
