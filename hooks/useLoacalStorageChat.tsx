"use client";

import React, { useCallback } from "react";

const useLoacalStorageChat = (pulse_id: string) => {
  const saveToLocal = useCallback(
    (content: string) => {
      localStorage.setItem(pulse_id + "local_chat", content);
    },
    [pulse_id]
  );
  const deleteLocal = useCallback(() => {
    localStorage.removeItem(pulse_id + "local_chat");
  }, [pulse_id]);

  const content = localStorage.getItem(pulse_id + "local_chat") || "";
  const haveDraft = content.length > 0;
  return { content, saveToLocal, haveDraft, deleteLocal };
};

export default useLoacalStorageChat;
