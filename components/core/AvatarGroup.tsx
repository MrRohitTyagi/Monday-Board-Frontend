import React, { memo } from "react";
import Image from "next/image";
import { UserType } from "@/zstore";
import TooltipComp from "./TooltipComp";
import { generatePictureFallback } from "@/utils/helperFunctions";
import AvatarComp from "./AvatarComp";
import { cn } from "@/lib/utils";

type AvatarGroupProps = { users: UserType[]; max?: number };

const AvatarGroup = ({ users, max = 3 }: AvatarGroupProps) => {
  const hasMore = users.length > max;
  const first3 = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="avatar-group -space-x-3 rtl:space-x-reverse">
      {first3.map((user, i) => (
        <div className="avatar border-[1px]" key={user.username + i + user._id}>
          <div className="w-8">
            <TooltipComp title={user.username} side="top" className="px-3 py-2">
              {user.picture ? (
                <Image
                  height={12}
                  width={12}
                  src={user.picture}
                  alt={generatePictureFallback(user.username)}
                  unoptimized
                />
              ) : (
                <div
                  className={cn(
                    "h-full w-full flex flex-row items-center",
                    "text-center justify-center"
                    ,'bg-slate-800'
                  )}
                >
                  {generatePictureFallback(user.username)}
                </div>
              )}
              {/* <AvatarComp
                className="w-full h-full"
                src={user.picture}
                fallback={generatePictureFallback(user.username)}
              /> */}
            </TooltipComp>
          </div>
        </div>
      ))}
      {hasMore === true && (
        <div className="avatar border-[1px] placeholder">
          <div className="w-8 bg-neutral text-neutral-content">
            <span>+{remaining}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(AvatarGroup);
