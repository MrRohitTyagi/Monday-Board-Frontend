import AvatarComp from "@/components/core/AvatarComp";
import TooltipComp from "@/components/core/TooltipComp";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/userTypes";
import { generatePictureFallback } from "@/utils/helperFunctions";
import { Eye } from "lucide-react";
import React, { memo } from "react";

type ViededByProps = { viewers: UserType[] };
const ViededBy = ({ viewers }: ViededByProps) => {
  return (
    <div
      className={cn(
        "items-center px-3 viewers-row h-6 flex flex-row justify-end",
        "animate-fadeIn transition-all"
      )}
    >
      <TooltipComp
        className="shadow-black shadow-lg border-main-fg border-2"
        delayDuration={400}
        title={
          <div
            className={cn(
              "viewed-by-cont",
              "grid grid-cols-3",
              "min-h-6 min-w-6",
              "transition-all",
              "bg-main-bg"
            )}
          >
            {viewers.map((viewer, i) => {
              return (
                <div
                  className="per-viewer shrink-0 p-2 animate-fadeIn"
                  key={viewer._id + i}
                >
                  <AvatarComp
                    className="h-8 w-8"
                    src={viewer.picture}
                    fallback={generatePictureFallback(viewer.username)}
                  />
                </div>
              );
            })}
          </div>
        }
      >
        <Eye size={18} />
      </TooltipComp>
    </div>
  );
};

export default memo(ViededBy);
