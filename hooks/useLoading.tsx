"use client";

import { useCallback, useMemo, useRef, useState } from "react";

const useLoading = ({
  defaultLoading = false,
  defaultEditing = false,
}: {
  defaultLoading?: boolean;
  defaultEditing?: boolean;
}) => {
  const [loadingState, setLoadingState] = useState(() => {
    return {
      LOADING: defaultLoading === true ? true : false,
      EDITING: defaultEditing === true ? true : false,
      DELETING: false,
      SAVING: false,
    };
  });

  const triggerLoading = useCallback((state: boolean) => {
    setLoadingState((ps) => ({ ...ps, LOADING: state }));
  }, []);

  const triggerSaving = useCallback((state: boolean) => {
    setLoadingState((ps) => ({ ...ps, SAVING: state }));
  }, []);

  const triggerDeleting = useCallback((state: boolean) => {
    setLoadingState((ps) => ({ ...ps, DELETING: state }));
  }, []);

  const triggerEditing = useCallback((state: boolean) => {
    setLoadingState((ps) => ({ ...ps, EDITING: state }));
  }, []);

  const { isDeleting, isLoading, isSaving, isEditing, inProcess } =
    useMemo(() => {
      return {
        isLoading: loadingState.LOADING,
        isDeleting: loadingState.DELETING,
        isSaving: loadingState.SAVING,
        isEditing: loadingState.EDITING,
        inProcess:
          loadingState.LOADING ||
          loadingState.DELETING ||
          loadingState.SAVING ||
          loadingState.EDITING,
      };
    }, [loadingState]);

  return {
    isDeleting,
    isLoading,
    isSaving,
    isEditing,
    inProcess,
    triggerDeleting,
    triggerLoading,
    triggerSaving,
    triggerEditing,
  };
};

export default useLoading;
