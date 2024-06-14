import React from "react";
import Image from "next/image";
import { UserType } from "@/zstore";

type AvatarGroupProps = { users: UserType[] };

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  return (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
      {users.map((user, i) => (
        <div
          key={(user._id + "user", +i)}
          className="tooltip tooltip-bottom"
          data-tip={user.username}
        >
          <div className="avatar border-[1px]">
            <div className="w-8">
              <Image height={12} width={12} src={user.picture} alt="pic" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
