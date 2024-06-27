export type PulseType = {
  isNew?: boolean;
  _id: string;
  title: string;
  assigned: string[];
  timeline: { start?: string; end?: string };
  tag: string;
  status: string;
  priority: string;
};
export type PriorityType = {
  [key: string]: ValueType;
};
export type StatusesType = {
  [key: string]: ValueType;
};
export type ValueType = {
  id: string;
  title: string;
  color: string;
  textColor: string;
};
