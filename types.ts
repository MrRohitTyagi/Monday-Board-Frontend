export type ChildrenType = {
  children: React.ReactNode;
};
export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type InvitationConfigType = {
  board_id: string;
  to: string;
  board_name: string;
  from: string;
  extra: string;
};
