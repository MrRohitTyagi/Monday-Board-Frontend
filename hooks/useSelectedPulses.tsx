"use client";

import { createContext, useCallback, useMemo, useState } from "react";

import { PulseType } from "@/types/pulseTypes";
import { deleteBulkPulses } from "@/gateways/pulse-gateway";
import { keys } from "lodash";
import useLoading from "./useLoading";
import { waitfor } from "@/lib/utils";
import { deletePulseInSprint } from "@/utils/customEvents";
import { StateSetter } from "@/types/genericTypes";
import { useSelectedStore } from "@/store/useSelectedStore";

type PulseTypwWithSprint = PulseType & { sprintID: string };

type SelectedPulsesType = {
  selected: { [key: string]: PulseTypwWithSprint };
  setSelectedPulses: StateSetter<{ [key: string]: PulseTypwWithSprint }>;
  handleSelect: (p: PulseTypwWithSprint) => void;
  handleUnSelect: (p: string) => void;
  unSelectAll: () => void;
  deleteAllSelected: () => void;
  moveFromTo: (e: string) => void;
  isDeleting: boolean;
  isSaving: boolean;
};

const SelectedPulseContext = createContext<SelectedPulsesType>(
  {} as SelectedPulsesType
);
const useSelectedPulses = () => {
  // const [selectedPulses, setSelectedPulses] = useState<{
  //   [key: string]: PulseTypwWithSprint;
  // }>({});

  const { selectedPulses, setSelectedPulses } = useSelectedStore();

  const { isDeleting, isSaving, triggerDeleting, triggerSaving } = useLoading(
    {}
  );

  const handleSelect = useCallback((pulse: PulseTypwWithSprint) => {
    setSelectedPulses((ps) => ({ ...ps, [pulse._id]: { ...pulse } }));
  }, []);

  const handleUnSelect = useCallback((pulse_id: string) => {
    setSelectedPulses((ps) => {
      const { [pulse_id]: __, ...rest } = { ...ps };
      return { ...rest };
    });
  }, []);

  const unSelectAll = useCallback(() => {
    setSelectedPulses(() => ({}));
  }, []);

  const deleteAllSelected = useCallback(async () => {
    triggerDeleting(true);
    // await waitfor();
    await deleteBulkPulses(keys(selectedPulses));

    const sprintsToEmitData: {
      [key: string]: string[];
    } = {};

    for (const pulseID in selectedPulses) {
      const pulse = selectedPulses[pulseID];

      sprintsToEmitData[pulse.sprintID] = [
        ...(sprintsToEmitData[pulse.sprintID] || []),
        pulseID,
      ];
    }

    for (const sprintID in sprintsToEmitData) {
      deletePulseInSprint(sprintID, sprintsToEmitData[sprintID]);
    }

    setSelectedPulses(() => ({}));
    triggerDeleting(false);
  }, [selectedPulses]);

  const moveFromTo = useCallback(
    async (toSprint: string) => {
      triggerSaving(true);
      await waitfor();

      triggerSaving(false);
    },
    [selectedPulses]
  );

  return {
    selected: selectedPulses,
    handleUnSelect,
    handleSelect,
    unSelectAll,
    deleteAllSelected,
    isDeleting,
    isSaving,
    moveFromTo,
    setSelectedPulses,
  };
};

export { SelectedPulseContext };
export default useSelectedPulses;
