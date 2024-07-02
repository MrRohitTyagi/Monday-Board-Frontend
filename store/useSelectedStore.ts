import { PulseType } from "@/types/pulseTypes";
import { create } from "zustand";

type PulseTypwWithSprint = PulseType & { sprintID: string };
export type selectedPulsesType = { [key: string]: PulseTypwWithSprint };

type useSelectedStoreType = {
  selectedPulses: selectedPulsesType;
  setSelectedPulses: (
    state: (e: selectedPulsesType) => selectedPulsesType
  ) => void;
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
