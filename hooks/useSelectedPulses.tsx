"use client";

import { createContext, useCallback, useMemo, useState } from "react";

import { PulseType } from "@/types/pulseTypes";

type SelectedPulsesType = {
  selected: { [key: string]: PulseType };
  handleSelect: (p: PulseType) => void;
  handleUnSelect: (p: string) => void;
  unSelectAll: () => void;
};

const SelectedPulseContext = createContext<SelectedPulsesType>(
  {} as SelectedPulsesType
);
const useSelectedPulses = () => {
  const [selectedPulses, setSelectedPulses] = useState<{
    [key: string]: PulseType;
  }>({});

  console.log(
    `%c selectedPulses `,
    "color: orange;border:2px solid cyan",
    selectedPulses
  );

  const handleSelect = useCallback((pulse: PulseType) => {
    setSelectedPulses((ps) => ({ ...ps, [pulse._id]: { ...pulse } }));
  }, []);

  const handleUnSelect = useCallback((pulse_id: string) => {
    setSelectedPulses((ps) => {
      const { [pulse_id]: __, ...rest } = { ...ps };
      return { ...rest };
    });
  }, []);

  const unSelectAll = useCallback(() => {
    setSelectedPulses({});
  }, []);

  return useMemo(
    () => ({
      selected: selectedPulses,
      handleUnSelect,
      handleSelect,
      unSelectAll,
    }),
    [selectedPulses, handleUnSelect, handleSelect]
  );
};

export { SelectedPulseContext };
export default useSelectedPulses;
