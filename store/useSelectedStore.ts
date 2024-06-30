import { PulseType } from "@/types/pulseTypes";
import { create } from "zustand";

type PulseTypwWithSprint = PulseType & { sprintID: string };
type cc = { [key: string]: PulseTypwWithSprint };

type useSelectedStoreType = {
  selectedPulses: cc;
  setSelectedPulses: (state: (e: cc) => cc) => void;
};

export const useSelectedStore = create<useSelectedStoreType>(
  (setState, get) => {
    return {
      selectedPulses: {},
      setSelectedPulses: (state) => {
        const sele = state(get().selectedPulses);
        setState({ selectedPulses: sele });
      },
    };
  }
);
