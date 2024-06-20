export type ChildrenType = {
  children: React.ReactNode;
};
export type stateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type InvitationConfigType = {
  board_id: string;
  to: string;
  board_name: string;
  from: string;
  extra: string;
};
