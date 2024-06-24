import React, { useCallback, useState } from "react";
import useLoading from "./useLoading";
import { writeAI } from "@/gateways/ai-gateway";
import { toast } from "sonner";
import { StateSetter } from "@/types/genericTypes";
import { ChatType } from "@/types/chatTypes";

const useWriteAI = () => {
  const { isSaving, triggerSaving } = useLoading({});
  //
  const writeWithAI = useCallback(
    async ({
      pulseID,
      prompt,
      setchat,
    }: {
      pulseID: string;
      prompt: string;
      setchat?: StateSetter<ChatType>;
    }) => {
      triggerSaving(true);
      const { message, success } = await writeAI({ prompt, pulseID });
      triggerSaving(false);

      if (success === false) {
        return toast.error(message);
      } else {
        if (setchat) {
          for (let i = 0; i <= message.length; i++) {
            let content = message.slice(0, i);
            setchat((pc) => ({ ...pc, content, draft: content }));
            await new Promise((resolve) => setTimeout(resolve, 3));
          }
          return message;
        } else {
          return message;
        }
      }
    },
    []
  );
  return { writeWithAI, isWritting: isSaving };
};

export default useWriteAI;
