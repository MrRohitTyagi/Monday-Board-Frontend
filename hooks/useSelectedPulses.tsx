"use client";

import { createContext, useCallback, useMemo, useState } from "react";

import { PulseType } from "@/types/pulseTypes";
import { deleteBulkPulses, moveBulkPulses } from "@/gateways/pulse-gateway";
import { keys, values } from "lodash";
import useLoading from "./useLoading";
import { waitfor } from "@/lib/utils";
import {
  deletePulseInSprint,
  moveFromOneToOtherSprint,
} from "@/utils/customEvents";
import { StateSetter } from "@/types/genericTypes";
import { useSelectedStore } from "@/store/useSelectedStore";
import { updateSprint } from "@/gateways/sprint-gateway";

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

  const emitDeleteFromSprints = useCallback(() => {
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
  }, [selectedPulses]);

  const deleteAllSelected = useCallback(async () => {
    triggerDeleting(true);
    // await waitfor();
    await deleteBulkPulses(keys(selectedPulses));
    emitDeleteFromSprints();

    setSelectedPulses(() => ({}));
    triggerDeleting(false);
  }, [selectedPulses]);

  const moveFromTo = useCallback(
    async (toSprint: string) => {
      triggerSaving(true);

      // await waitfor();

      emitDeleteFromSprints();
      moveFromOneToOtherSprint(toSprint, selectedPulses);

      const apiPayload = {
        toSprint: toSprint,
        pulses: values(selectedPulses).map((p) => ({
          _id: p._id,
          sprintID: p.sprintID,
        })),
      };

      moveBulkPulses(apiPayload);
      setSelectedPulses(() => ({}));
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
