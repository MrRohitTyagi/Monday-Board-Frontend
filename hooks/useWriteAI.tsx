import { useCallback, useState } from "react";
import useLoading from "./useLoading";
import { writeAI } from "@/gateways/ai-gateway";
import { toast } from "sonner";

const useWriteAI = () => {
  const { isSaving, triggerSaving } = useLoading({});
  const [len, setlen] = useState(0);
  //
  const writeWithAI = useCallback(
    async ({
      pulseID,
      prompt,
      onGenerate,
    }: {
      pulseID: string;
      prompt: string;
      onGenerate?: (e: string) => void;
    }) => {
      triggerSaving(true);
      const { message, success } = await writeAI({ prompt, pulseID });

      if (success === false) {
        triggerSaving(false);
        return toast.error(message);
      } else {
        if (onGenerate) {
          for (let i = 0; i <= message.length; i++) {
            let content = message.slice(0, i);
            onGenerate(content);
            setlen(content.length);
            await new Promise((resolve) => setTimeout(resolve, 3));
          }

          triggerSaving(false);
          return message;
        } else {
          triggerSaving(false);
          return message;
        }
      }
    },
    []
  );
  return { writeWithAI, isWritting: isSaving, len };
};

export default useWriteAI;
