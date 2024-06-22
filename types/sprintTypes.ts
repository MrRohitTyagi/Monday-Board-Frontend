import { PulseType } from "./pulseTypes";

export type SprintType = {
  _id: string;
  title: string;
  color: string;
  pulses: PulseType[];
};
