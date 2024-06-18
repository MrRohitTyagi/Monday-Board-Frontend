import React, { memo } from "react";
import Image from "next/image";
import { UserType } from "@/zstore";
import TooltipComp from "./TooltipComp";

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
            <TooltipComp title={user.username} side="top">
              <Image
                height={12}
                width={12}
                src={
                  user.picture ||
                  "https://res.cloudinary.com/derplm8c6/image/upload/v1718526303/dkm7ezl1whano6p8osei.png"
                }
                alt="pic"
                unoptimized
              />
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
